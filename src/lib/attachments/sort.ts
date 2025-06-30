import { getDropIndex, getElementUnder, getEventHost, getFieldElement, isOnDropZone } from '../utils/dnd/helpers';
import type { Attachment } from 'svelte/attachments';
import { dndStore } from '../stores/dnd.svelte';
import GhostElement from '../utils/dnd/ghost';
import { DRAG_STATE } from '../utils/enums';
import form from '$lib/stores/form.svelte';

function sortAttachment(sortBy: HTMLElement, elementIndex: number, field: any, RenderComponent: any) {
        let ghost: GhostElement | null = null;

        function updateDropZone(event: TouchEvent | MouseEvent) {
                const elemUnder = getElementUnder(event);
                if (isOnDropZone(elemUnder)) {
                        dndStore.dragState = DRAG_STATE.SORTING;
                        const { element, index, centerY } = getFieldElement(elemUnder);
                        if (element) {
                                const coords = getEventHost(event);
                                dndStore.dropIndex = getDropIndex(coords.clientY, centerY, index);
                        }
                } else {
                        dndStore.dragState = DRAG_STATE.IDLE;
                        dndStore.dropIndex = null;
                }
        }

        /**
 * Ends the drag operation and resets all state
 */
        function end() {
                ghost.clear();
                dndStore.clear();
                ghost = null;
        }

        /**
 * Starts the drag operation
 */
        function start(event: TouchEvent | MouseEvent) {
                event.preventDefault();
                const { element } = getFieldElement(sortBy);
                if (!element) return;
                dndStore.dragState = DRAG_STATE.DRAGGING;
                form.activeElement = field;
                ghost = new GhostElement(element, event, { field: field, component: RenderComponent });
        }

        /**
 * Handles drag movement
 */
        function move(event: TouchEvent | MouseEvent) {
                if (!ghost) return;
                event.preventDefault();

                ghost.update(event);
                updateDropZone(event);
        }

        /**
 * Handles the drop operation
 */
        function drop(_: TouchEvent | MouseEvent) {
                if (!ghost) return;

                if (dndStore.dragState === DRAG_STATE.SORTING) {
                        //  insertField(elementType, dndStore.dropIndex);
                        console.log('drop', dndStore.dropIndex);
                }

                end();
        }


        // Register event listeners
        sortBy.addEventListener('touchstart', start);
        sortBy.addEventListener('touchmove', move);
        sortBy.addEventListener('touchend', drop);
        sortBy.addEventListener('mousedown', start);

        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', drop);

        // Cleanup function
        return () => {
                sortBy.removeEventListener('touchstart', start);
                sortBy.removeEventListener('touchmove', move);
                sortBy.removeEventListener('touchend', drop);
                sortBy.removeEventListener('mousedown', start);
                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', drop);
        };
}

export function sort(elementIndex: number, field: any, RenderComponent: any): Attachment {
        return (sortElement: HTMLElement) => sortAttachment(sortElement, elementIndex, field, RenderComponent);
}
