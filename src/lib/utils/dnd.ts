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
          const fieldElement = el.closest('[data-dform-element]') as HTMLElement;
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