import type { Attachment } from 'svelte/attachments';

function sortAttachment(sortBy: HTMLElement, elementIndex: number, fieldId: string) {

        // Cleanup function
        return () => {

        };
}

export function sort(elementIndex: number, fieldId: string): Attachment {
        return (sortElement: HTMLElement) => sortAttachment(sortElement, elementIndex, fieldId);
}
