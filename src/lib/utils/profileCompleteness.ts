export type ProfileCompletenessState = 'incomplete' | 'partial' | 'complete';

export interface ProfileData {
	display_name: string | null;
	bio: string | null;
	website_url: string | null;
	avatar_url: string | null;
}

export interface ProfileCompletenessResult {
	percentage: number;
	filledCount: number;
	totalCount: number;
	missingFields: (keyof ProfileData)[];
	suggestions: string[];
	state: ProfileCompletenessState;
}

type FieldConfig = {
	key: keyof ProfileData;
	suggestion: string;
};

const PROFILE_FIELDS: FieldConfig[] = [
	{ key: 'display_name', suggestion: 'Add a display name to personalize your profile' },
	{ key: 'bio', suggestion: 'Write a bio to tell others about yourself' },
	{ key: 'website_url', suggestion: 'Add a website link to share your work' },
	{ key: 'avatar_url', suggestion: 'Add an avatar to make your profile recognizable' }
];

function isFieldComplete(value: string | null): boolean {
	return value !== null && value.trim().length > 0;
}

function calculateState(percentage: number): ProfileCompletenessState {
	if (percentage === 0) return 'incomplete';
	if (percentage === 100) return 'complete';
	return 'partial';
}

export function calculateProfileCompleteness(profile: ProfileData): ProfileCompletenessResult {
	const missingFields: (keyof ProfileData)[] = [];
	const suggestions: string[] = [];
	let filledCount = 0;

	for (const field of PROFILE_FIELDS) {
		if (isFieldComplete(profile[field.key])) {
			filledCount++;
		} else {
			missingFields.push(field.key);
			suggestions.push(field.suggestion);
		}
	}

	const totalCount = PROFILE_FIELDS.length;
	const percentage = Math.round((filledCount / totalCount) * 100);

	return {
		percentage,
		filledCount,
		totalCount,
		missingFields,
		suggestions,
		state: calculateState(percentage)
	};
}
