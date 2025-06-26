export function getEventHost(e: TouchEvent | MouseEvent) {
          // on touchend event, we have to use `e.changedTouches`
          if (e instanceof MouseEvent) return e;
          if (e instanceof TouchEvent) return e.changedTouches[0];
}

export function getElementUnder(e: TouchEvent | MouseEvent) {
          const touches = getEventHost(e) as Touch | MouseEvent;
          return document.elementFromPoint(touches.clientX, touches.clientY) as HTMLElement;
}

export function getDropZone(el: HTMLElement) {
          return el?.closest('#dropzone') as HTMLElement;
}

export function getFieldElement(el: HTMLElement): { element: HTMLElement | null, index: number, rect: DOMRect | null } {
          const fieldElement = el?.closest('[data-form-element]') as HTMLElement;
          return {
                    element: fieldElement,
                    index: Number(fieldElement?.getAttribute('data-form-element') || 0),
                    rect: fieldElement?.getBoundingClientRect()
          }
}

export function isDropZone(element: HTMLElement) {
          return element?.id === 'dropzone';
}