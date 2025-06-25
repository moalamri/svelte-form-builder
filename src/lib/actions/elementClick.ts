import type { Action } from 'svelte/action';

export const elementClick: Action<HTMLElement, () => void> = (node, callback) => {
          const handleClick = (event: MouseEvent) => {
                    if (node.contains(event.target as Node)) {
                              callback();
                    }
          };

          document.addEventListener('click', handleClick, true);

          return {
                    destroy() {
                              document.removeEventListener('click', handleClick, true);
                    }
          };
}
