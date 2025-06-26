export function createGhostElement(element: HTMLElement, event: TouchEvent | MouseEvent) {
          const touches = getEventHost(event) as Touch | MouseEvent;
          const rect = element.getBoundingClientRect();
          // Store the initial mouse offset from the element's top-left corner
          const initX = touches.clientX - rect.left;
          const initY = touches.clientY - rect.top;
          // create a clone element to simulate ghost element
          const ghostElement = element.cloneNode(true) as HTMLElement;
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
          return {
                    element: ghostElement,
                    x: initX,
                    y: initY
          };
}

export function getEventHost(e: TouchEvent | MouseEvent) {
          // on touchend event, we have to use `e.changedTouches`
          if (e instanceof MouseEvent) return e;
          if (e instanceof TouchEvent) return e.changedTouches[0];
}

export function getElementUnder(e: TouchEvent | MouseEvent) {
          const touches = getEventHost(e) as Touch | MouseEvent;
          return document.elementFromPoint(touches.clientX, touches.clientY) as HTMLElement;
}

export function getFieldElement(el: HTMLElement): { element: HTMLElement | null, index: number, rect: DOMRect | null } {
          const fieldElement = el.closest('[data-form-element]') as HTMLElement;
          if (!fieldElement) {
                    return { element: null, index: 0, rect: null };
          }
          return {
                    element: fieldElement,
                    index: Number(fieldElement.getAttribute('data-form-element')),
                    rect: fieldElement.getBoundingClientRect()
          }
}

export function getIsDropZone(element: HTMLElement) {
          return element.closest('#dropzone')?.id === 'dropzone';
}

export function getDropIndex(position: string, index: number) {
          return position === 'before' ? index : index + 1;
}