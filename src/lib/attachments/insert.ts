import { getEventHost, getElementUnder, getFieldElement, isOnDropZone, getDropIndex } from '$lib/utils/dnd/helpers';
import GhostElement from '$lib/utils/dnd/ghost';
import { dndStore } from '$lib/stores/dnd.svelte';
import { insertField } from '$lib/utils/form';
import type { Attachment } from 'svelte/attachments';
import form from '$lib/stores/form.svelte';
import { DRAG_STATE } from '$lib/utils/enums';

function insertAttachment(element: HTMLElement, elementType: string) {
        let dragElem: HTMLElement | null = null;
        let ghost: GhostElement | null = null;

        /**
         * Updates drop zone indicators by calculating target drop index
         */
        function updateDropZone(event: TouchEvent | MouseEvent) {
                const elemUnder = getElementUnder(event);
                if (isOnDropZone(elemUnder)) {
                        dndStore.dragState = DRAG_STATE.INSERTING;
                        if (form.fields.length === 0) {
                                return;
                        }
                        const { element, index, centerY } = getFieldElement(elemUnder);
                        if (element) {
                                dndStore.dragState = DRAG_STATE.INSERTING;
                                const coords = getEventHost(event);
                                dndStore.dropIndex = getDropIndex(coords.clientY, centerY, index);
                        }
                } else {
                        dndStore.dragState = DRAG_STATE.DRAGGING;
                }
        }

        /**
         * Ends the drag operation and resets all state
         */
        function end() {
                ghost.clear();
                dndStore.clear();
                dragElem = null;
                ghost = null;
        }

        /**
         * Starts the drag operation
         */
        function start(event: TouchEvent | MouseEvent) {
                event.preventDefault();
                dragElem = element;
                dndStore.dragState = DRAG_STATE.DRAGGING;
                ghost = new GhostElement(dragElem, event, { elementType });
        }

        /**
         * Handles drag movement
         */
        function move(event: TouchEvent | MouseEvent) {
                if (!dragElem || !ghost) return;
                event.preventDefault();

                ghost.update(event);
                updateDropZone(event);
        }

        /**
         * Handles the drop operation
         */
        function drop(_: TouchEvent | MouseEvent) {
                if (!dragElem || !ghost) return;

                if (dndStore.dragState === DRAG_STATE.INSERTING) {
                        insertField(elementType, dndStore.dropIndex);
                }

                end();
        }

        // Register event listeners
        element.addEventListener('touchstart', start);
        element.addEventListener('touchmove', move);
        element.addEventListener('touchend', drop);
        element.addEventListener('mousedown', start);

        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', drop);

        // Cleanup function
        return () => {
                element.removeEventListener('touchstart', start);
                element.removeEventListener('touchmove', move);
                element.removeEventListener('touchend', drop);
                element.removeEventListener('mousedown', start);
                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', drop);
        };
}

export function insert(elementType: string): Attachment {
        return (element: HTMLElement) => insertAttachment(element, elementType);
}
