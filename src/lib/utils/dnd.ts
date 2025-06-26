import type { DragEvent, EventHost, FieldElementInfo, GhostElementInfo, DropPosition } from '$lib/types';

/**
 * Creates a visual ghost element that follows the cursor during drag operations.
 * The ghost is a styled clone of the original element with reduced opacity.
 * 
 * @param element - The original element to clone for the ghost
 * @param event - The drag event containing initial position data
 * @returns Object containing the ghost element and initial offset values
 */
export function createGhost(element: HTMLElement, event: DragEvent): GhostElementInfo {
          const coords = getEventHost(event);
          const rect = element.getBoundingClientRect();

          // Calculate initial offset from element's top-left corner to cursor position
          const x = coords.clientX - rect.left;
          const y = coords.clientY - rect.top;

          // Create a visual clone of the dragged element
          const ghost = element.cloneNode(true) as HTMLElement;
          Object.assign(ghost.style, {
                    position: 'fixed',
                    zIndex: '9000',
                    pointerEvents: 'none', // Prevent ghost from interfering with drop detection
                    opacity: '0.7',
                    width: `${element.clientWidth}px`,
                    height: `${element.clientHeight}px`,
                    left: `${coords.clientX - x}px`,
                    top: `${coords.clientY - y}px`,
          });

          document.body.appendChild(ghost);
          return {
                    element: ghost,
                    x,
                    y
          };
}

/**
 * Extracts the appropriate event coordinates (Touch or MouseEvent) from a drag event.
 * Handles the complexity of touch events which may have multiple touch points.
 * 
 * @param event - Touch or mouse event
 * @returns The primary touch point or mouse event for position calculations
 */
export function getEventHost(event: DragEvent): EventHost {
          // Mouse events are straightforward
          if (event instanceof MouseEvent) return event;

          if (event instanceof TouchEvent) {
                    // Priority order: changedTouches (for touchend), targetTouches, touches
                    return event.changedTouches?.length ? event.changedTouches[0] :
                              event.targetTouches?.length ? event.targetTouches[0] :
                                        event.touches?.length ? event.touches[0] : null;
          }

          // Fallback (should not happen in normal usage)
          return event as EventHost;
}

/**
 * Finds the HTML element currently under the cursor/touch point.
 * Uses document.elementFromPoint for accurate hit detection.
 * 
 * @param event - Touch or mouse event containing position data
 * @returns The topmost element at the event coordinates, or null if none
 */
export function getElementUnder(event: DragEvent): HTMLElement | null {
          const coords = getEventHost(event);
          if (!coords) return null;
          return document.elementFromPoint(coords.clientX, coords.clientY) as HTMLElement | null;
}

/**
 * Finds the closest form field element and extracts its metadata.
 * Looks for elements with the 'data-form-element' attribute.
 * 
 * @param element - Starting element to search from
 * @returns Object containing the field element, its index, and bounding rectangle
 */
export function getFieldElement(element: HTMLElement): FieldElementInfo {
          const field = element.closest('[data-form-element]') as HTMLElement | null;
          if (!field) {
                    return { 
                              element: null, 
                              index: 0, 
                              rect: null 
                    };
          }

          const indexAttr = field.getAttribute('data-form-element');
          const index = indexAttr ? Number(indexAttr) : 0;

          return {
                    element: field,
                    index,
                    rect: field.getBoundingClientRect()
          };
}

/**
 * Determines if an element is within a valid drop zone.
 * Checks if the element or any of its ancestors has the dropzone ID.
 * 
 * @param element - Element to check
 * @returns True if the element is within a drop zone
 */
export function isDropZone(element: HTMLElement | null): boolean {
          if (!element) return false;
          const zone = element.closest('#dropzone');
          return zone?.id === 'dropzone';
}

/**
 * Calculates the final insertion index based on drop position and target index.
 * 'before' uses the target index, 'after' increments it by 1.
 * 
 * @param position - Whether to drop before or after the target element
 * @param index - The index of the target element
 * @returns The calculated insertion index for the new element
 */
export function getDropIndex(position: DropPosition | null, index: number): number {
          return position === 'before' ? index : index + 1;
}