export function isOnDropZone(element: HTMLElement | null): boolean {
	if (!element) return false;
	const zone = element.closest('#dropzone');
	return zone?.id === 'dropzone';
}

export function getDropIndex(coordY: number, centerY: number, index: number): number {
	return coordY < centerY ? index : index + 1;
}

export function getSortIndex(coordY: number, centerY: number, oldIndex: number, newIndex: number): number | null {
	const dropIndex = coordY < centerY ? newIndex : newIndex + 1;
	if (dropIndex === oldIndex) return null;
	if (dropIndex - 1 !== oldIndex) return dropIndex;
	return null;
}
