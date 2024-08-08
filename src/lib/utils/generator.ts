export function generateRandomId(): string {
	const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
	let randomId = '';
	for (let i = 0; i < 10; i++) {
		const randomIndex = Math.floor(Math.random() * characters.length);
		randomId += characters[randomIndex];
	}
	return randomId;
}
