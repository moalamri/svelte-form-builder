import { getElementAtPosition, getFieldElement } from '$lib/utils/dnd/element';
import { getSortIndex } from '$lib/utils/dnd/position';
import type { Attachment } from 'svelte/attachments';
import { dndStore } from '$lib/stores/dnd.svelte';
import GhostElement from '$lib/utils/dnd/ghost';
import { DRAG_STATE } from '$lib/utils/enums';
import form from '$lib/stores/form.svelte';
import { sortField } from '$lib/utils/form';

function sortAttachment(sortBy: HTMLElement, elementIndex: number, field: any, Component: any) {
        let ghost: GhostElement | null = null;

        function updateDropZone(event: TouchEvent | MouseEvent) {
                ghost.updateY(event);
                const { coords, element } = getElementAtPosition(ghost.ghostElement);
                dndStore.dragState = DRAG_STATE.SORTING;
                const { element: fieldElement, index, centerY } = getFieldElement(element);
                if (fieldElement) {
                        dndStore.dropIndex = getSortIndex(coords.clientY, centerY, dndStore.dragIndex, index);
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
                dndStore.dragIndex = elementIndex;
                form.activeElement = field;
                ghost = new GhostElement(element, event, { field: field, component: Component, mode: 'sort' });
        }

        /**
 * Handles drag movement
 */
        function move(event: TouchEvent | MouseEvent) {
                if (!ghost) return;
                event.preventDefault();
                updateDropZone(event);
        }

        /**
 * Handles the drop operation
 */
        function drop(_: TouchEvent | MouseEvent) {
                if (!ghost) return;
                if (dndStore.dragState === DRAG_STATE.SORTING && dndStore.dropIndex !== null) {
                        const to = dndStore.dropIndex > dndStore.dragIndex ? dndStore.dropIndex - 1 : dndStore.dropIndex;
                        sortField(dndStore.dragIndex, to);
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

export function sort(elementIndex: number, field: any, Component: any): Attachment {
        return (sortElement: HTMLElement) => sortAttachment(sortElement, elementIndex, field, Component);
}
