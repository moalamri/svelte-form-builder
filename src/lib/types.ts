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
	RenderComponent: Component;
	field: any;
};

export type GhostElementOptions = {
	field: any;
	component?: any;
};