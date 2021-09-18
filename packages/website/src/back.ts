export function back(location: string) {
	const parts = location.split('/');
	if (parts.length === 2) {
		return '/';
	}
	return parts.slice(0, -1).join('/');
}
