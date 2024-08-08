export type FormManager = {
	fields: any[];
	values: Record<string, any>;
	valid: boolean;
	updator(fieldName: string, v: any): void;
};

export default function createFormManager(): FormManager {
	let form = $state({
		fields: [],
		values: {},
		valid: false
	});

	function updateFieldValue(fieldName: string, value: any) {
		form.values[fieldName] = value;
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
		updator(fieldName: string, value: any) {
			updateFieldValue(fieldName, value);
		},
		get valid() {
			return form.valid;
		}
	};
}
