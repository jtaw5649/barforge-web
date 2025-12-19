export function getDisplayName(
	formValue: string | null | undefined,
	profileValue: string | null | undefined,
	githubName: string | null | undefined,
	fallback: string
): string {
	const trimmedForm = formValue?.trim() || '';
	if (trimmedForm) return trimmedForm;
	if (profileValue) return profileValue;
	if (githubName) return githubName;
	return fallback;
}

export function getProfileUsername(
	profileUsername: string | null | undefined,
	sessionLogin: string | null | undefined
): string {
	if (profileUsername) return profileUsername;
	if (sessionLogin) return sessionLogin;
	return '';
}
