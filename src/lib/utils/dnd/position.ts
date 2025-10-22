import { ACTIVE_ZONE } from "$lib/utils/enums";

export function closestZone(element: HTMLElement | null): ACTIVE_ZONE | null {
	if (!element) return null;
	const dropZone = element.closest('#dropzone');
	if (dropZone?.id === 'dropzone') return ACTIVE_ZONE.DROPZONE;
	const dragZone = element.closest('#dragzone');
	if (dragZone?.id === 'dragzone') return ACTIVE_ZONE.DRAGZONE;
	return null;
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
