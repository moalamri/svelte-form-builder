import { getEventHost, getElementUnder, getFieldElement, getIsDropZone, getDropIndex } from '$lib/utils/dnd';
import { dndStore } from '$lib/stores/dnd.svelte';
import { addField } from '$lib/utils/form';

export type DraggableProps = {
          type: string;
}

export function draggableElement(node: HTMLElement, props: DraggableProps) {
          const { type: elemType } = props;

          // Initialize initial position
          let initX = 0;
          let initY = 0;
          // Ghost element
          let ghostElement: HTMLElement | null = null;
          // Dragging element
          let draggingElement: HTMLElement | null = null;

          function createGhostElement(element: HTMLElement, event: TouchEvent | MouseEvent) {
                    const touches = getEventHost(event) as Touch | MouseEvent;
                    const rect = element.getBoundingClientRect();
                    // Store the initial mouse offset from the element's top-left corner
                    initX = touches.clientX - rect.left;
                    initY = touches.clientY - rect.top;
                    // create a clone element to simulate ghost element
                    ghostElement = element.cloneNode(true) as HTMLElement;
                    Object.assign(ghostElement.style, {
                              position: 'fixed',
                              zIndex: '9000',
                              pointerEvents: 'none',
                              opacity: '0.7',
                              width: `${element.clientWidth}px`,
                              height: `${element.clientHeight}px`,
                              left: `${touches.clientX - initX}px`,
                              top: `${touches.clientY - initY}px`,
                    });
                    document.body.appendChild(ghostElement);
          }

          function updateGhostElementPosition(event: TouchEvent | MouseEvent) {
                    const touches = getEventHost(event) as Touch | MouseEvent;
                    ghostElement.style.left = `${touches.clientX - initX}px`;
                    ghostElement.style.top = `${touches.clientY - initY}px`;
          }

          function destroyGhostElement() {
                    if (ghostElement) {
                              ghostElement.remove();
                              ghostElement = null;
                    }
          }

          function end() {
                    dndStore.clear();
                    destroyGhostElement();
                    draggingElement = null;
          }

          function handleStart(event: TouchEvent | MouseEvent) {
                    event.preventDefault();
                    dndStore.isDragging = true;
                    draggingElement = node;

                    // create the ghost element
                    createGhostElement(node, event);
          }

          function handleMove(event: TouchEvent | MouseEvent) {
                    if (!draggingElement) return;
                    event.preventDefault();
                    updateGhostElementPosition(event);
                    const elementUnder = getElementUnder(event);
                    if (getIsDropZone(elementUnder)) {
                              let { element, index, rect } = getFieldElement(elementUnder);
                              if (element) {
                                        const touches = getEventHost(event) as Touch | MouseEvent;
                                        dndStore.dropPosition = touches.clientY < rect.top + rect.height / 2 ? 'before' : 'after';
                                        dndStore.hoverIndex = index;
                              }
                    }
          }

          function handleEnd(event: TouchEvent | MouseEvent) {
                    if (!draggingElement) return;
                    const elementUnder = getElementUnder(event);
                    if (getIsDropZone(elementUnder)) {
                              let { element, index } = getFieldElement(elementUnder);
                              if (element) {
                                        index = getDropIndex(dndStore.dropPosition, index);
                              }
                              addField(elemType, index);
                    }
                    end();
          }

          // Add touch event listeners
          node.addEventListener('touchstart', handleStart);
          node.addEventListener('touchmove', handleMove);
          node.addEventListener('touchend', handleEnd);
          // Add mouse event listeners (only mousedown on the element)
          node.addEventListener('mousedown', handleStart);
          // Add mouse event listeners to document
          document.addEventListener('mousemove', handleMove);
          document.addEventListener('mouseup', handleEnd);

          return {
                    destroy() {
                              // touch
                              node.removeEventListener('touchstart', handleStart);
                              node.removeEventListener('touchmove', handleMove);
                              node.removeEventListener('touchend', handleEnd);
                              // mouse
                              node.removeEventListener('mousedown', handleStart);
                              // Document mouse
                              document.removeEventListener('mousemove', handleMove);
                              document.removeEventListener('mouseup', handleEnd);
                    }
          };
}
