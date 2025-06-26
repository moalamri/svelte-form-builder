// DnD related types
export type DropPosition = 'before' | 'after';

export type DragEvent = TouchEvent | MouseEvent;

export type EventHost = Touch | MouseEvent;

export type FieldElementInfo = {
	element: HTMLElement | null;
	index: number;
	rect: DOMRect | null;
};

export type GhostElementInfo = {
	element: HTMLElement;
	x: number;
	y: number;
};

export type DraggableProps = {
	type: string;
};
