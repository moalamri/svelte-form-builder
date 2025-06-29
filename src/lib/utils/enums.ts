export enum SPLITTER_IDS {
	ELEMENTS = 'elements',
	FORM = 'form',
	EDITOR = 'editor',
	TRIGGER_ELEMENTS_TO_FORM = 'elements:form',
	TRIGGER_FORM_TO_EDITOR = 'form:editor'
}

export enum SORTABLEJS {
	// Drag and drop shared group name
	GROUPNAME = 'formgroup'
}

export enum ELEMENT_TYPES {
	// Element types
	FORMFIELDS = 'formfields',
	UI = 'ui',
	CONTAINERS = 'containers'
}

export enum SETTING_FIELDS {
	// Setting fields
	TEXT = 'text',
	NUMBER = 'number',
	TEXTAREA = 'textarea',
	ARRAY = 'array',
	CODE = 'code',
	CHECKBOX = 'checkbox',
	SLIDER = 'slider',
	COLOR = 'color',
	DATE = 'date'
}

export enum DRAG_STATE {
	IDLE,
	DRAGGING,
	INSERTING,
	SORTING
}

export enum INSERT_MODE {
	NONE,
	NEW,
	INSIDE,
	LAST
}