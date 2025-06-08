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
