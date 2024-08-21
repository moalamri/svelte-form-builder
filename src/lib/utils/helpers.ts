export function cloner(source, processed = new Map()) {
	if (!source || typeof source !== 'object') {
		return source;
	}

	if (processed.has(source)) {
		return processed.get(source);
	}

	const set = (o, c) => processed.set(o, c);

	let cloned;
	if (source instanceof Date) {
		cloned = new Date(source.getTime());
		set(source, cloned);
	} else if (source instanceof RegExp) {
		cloned = new RegExp(source);
		set(source, cloned);
	} else if (source instanceof Set) {
		cloned = new Set();
		processed.set(source, cloned);
		for (const v of source) {
			cloned.add(cloner(v, processed));
		}
	} else if (source.nodeType && 'cloneNode' in source) {
		cloned = source.cloneNode(true);
		set(source, cloned);
	} else if (Array.isArray(source)) {
		cloned = new Array(source.length);
		set(source, cloned);
		for (let i = 0; i < source.length; i++) {
			cloned[i] = cloner(source[i], processed);
		}
	} else if (source instanceof Map) {
		cloned = new Map();
		set(source, cloned);
		for (const [k, v] of source.entries()) {
			cloned.set(k, cloner(v, processed));
		}
	} else if (source instanceof Object) {
		cloned = {};
		processed.set(source, cloned);
		for (const [k, v] of Object.entries(source)) {
			cloned[k] = cloner(v, processed);
		}
	} else {
		throw Error(`Failed to clone ${source}`);
	}

	return cloned;
}

export function getByElementTypes(elements, type) {
	return elements.filter((ele) => ele.category === type);
}

export function generateRandomId(): string {
	const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
	let randomId = '';
	for (let i = 0; i < 10; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		randomId += characters[randomIndex];
	}
	return randomId;
}

export function newFieldSequence(fields, newField) {
	const fieldsSeq = [0];
	fields
		.filter((f) => f.type === newField.type)
		.map((f) => {
			if (f.settings.properties.name.includes('-')) {
				const seq = f.settings.properties.name.split('-')[1];
				// Make sure seq is a number
				if (!isNaN(parseInt(seq))) {
					fieldsSeq.push(parseInt(seq));
				}
			}
		});
	const newFieldSeq = Math.max(...fieldsSeq) + 1;
	newField.id = `${newField.type}-${generateRandomId()}`;
	newField.settings.properties.name = `${newField.type}-${newFieldSeq}`;
	newField.settings.properties.label = `${newField.settings.properties.label} ${newFieldSeq.toString()}`;
	return newField;
}
