export type FormStore = {
	fields: any[];
	values: Record<string, any>;
	valid: boolean;
	updator(fieldName: string, v: any): void;
	activeElement: any;
};

function createFormStore(): FormStore {
	let form = $state({
		fields: [],
		values: {},
		valid: false
	});
	let activeElement = $state();

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
		},
		get activeElement() {
			return activeElement;
		},
		set activeElement(v: any) {
			activeElement = v;
		}
	};
}

export default createFormStore();