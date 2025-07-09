import type { Component } from "svelte";

export type DragEvent = TouchEvent | MouseEvent;

export type EventHost = Touch | MouseEvent;

export type FieldElementInfo = {
	element: HTMLElement | null;
	index: number;
	centerY: number;
};

export type GhostElementInfo = {
	element: HTMLElement;
	x: number;
	y: number;
};

export type FieldElement = {
	Component: Component;
	field: any;
};

export type GhostElementOptions = {
	field: any;
	component?: any;
	mode: 'insert' | 'sort';
};

export type DraggableElementOptions = {
	type: string;
};

export type SortableElementOptions = {
	elementIndex: number;
	field: any;
	Component: Component;
};