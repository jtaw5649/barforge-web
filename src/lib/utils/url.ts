export function encodeModuleUuid(value: string): string {
	return encodeURIComponent(value).replace(/%40/g, '@');
}

export function cleanRedirectUrl(url: string): string {
	return encodeURIComponent(url).replace(/%2F/g, '/');
}
