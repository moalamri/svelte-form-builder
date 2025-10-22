export type FormStore = {
	fields: any[];
	values: Record<string, any>;
	activeElement: any;
	history: {
		canUndo: boolean;
		canRedo: boolean;
		undo(): void;
		redo(): void;
	};
	addField(field: any, index: number): void;
	removeField(fieldId: string): void;
	handleValueChange(fieldName: string, v: any): void;
	handleSettingChange(fieldId: string, value: any, section: string, property: string, index?: number): void;
};

function createFormStore(): FormStore {
	let form = $state({
		fields: [],
		values: {},
		valid: false
	});
	let activeElement: any = $state();
	let history = $state<any[]>([]);
	let historyIndex = $state(-1);
	const canUndo = $derived(historyIndex >= 0);
	const canRedo = $derived(historyIndex < history.length - 1);

	function undo() {
		if (canUndo) {
			historyIndex -= 1;
			form.fields = history[historyIndex] || [];
		}
	}

	function redo() {
		if (canRedo) {
			historyIndex += 1;
			form.fields = history[historyIndex];
		}
	}

	function handleValueChange(fieldName: string, value: any) {
		form.values[fieldName] = value;
	}

	function handleSettingChange(fieldId: string, value: any, section: string, property: string, index?: number) {
		const field = form.fields.find((f) => f.id === fieldId);
		if (!field) {
			activeElement = null;
			return;
		}
		if (index !== undefined) {
			activeElement.settings[section][index][property] = value;
			field.settings[section][index][property] = value;
		} else {
			activeElement.settings[section][property] = value;
			field.settings[section][property] = value;
		}
		updateHistory();
	}

	function updateHistory() {
		// Trim future history if we are not at the end
		if (historyIndex < history.length - 1) {
			history = history.slice(0, historyIndex + 1);
		}
		// Add a snapshot of the current fields to history
		history.push($state.snapshot(form.fields));
		historyIndex = history.length - 1;
	}

	// Insert the new field at the specified index
	function addField(newField: any, index: number) {
		// Set the newly added field as the active element
		form.fields.splice(index, 0, newField);
		activeElement = form.fields[index];
		updateHistory();
	}

	function removeField(fieldId: string) {
		activeElement = null;
		form.fields = form.fields.filter((f) => f.id !== fieldId);
		updateHistory();
	}

	return {
		get fields() {
			return form.fields;
		},
		set fields(v: any[]) {
			form.fields = v;
		},
		get values() {
			return form.values;
		},
		get activeElement() {
			return activeElement;
		},
		set activeElement(v: any) {
			activeElement = v;
		},
		get history() {
			return {
				get canUndo() {
					return canUndo;
				},
				get canRedo() {
					return canRedo;
				},
				undo,
				redo
			};
		},
		addField,
		removeField,
		handleValueChange,
		handleSettingChange
	};
}

export default createFormStore();
