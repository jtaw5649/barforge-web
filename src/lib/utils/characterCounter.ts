export type CharacterCounterState = 'normal' | 'warning' | 'error';

export interface CharacterCounterResult {
	current: number;
	max: number;
	remaining: number;
	percentage: number;
	state: CharacterCounterState;
	display: string;
}

const WARNING_THRESHOLD = 0.8;

export function getCharacterCounterState(current: number, max: number): CharacterCounterResult {
	if (max === 0) {
		return {
			current,
			max,
			remaining: 0,
			percentage: 0,
			state: 'normal',
			display: `${current}/${max}`
		};
	}

	const remaining = max - current;
	const percentage = (current / max) * 100;

	let state: CharacterCounterState = 'normal';
	if (current >= max) {
		state = 'error';
	} else if (percentage >= WARNING_THRESHOLD * 100) {
		state = 'warning';
	}

	return {
		current,
		max,
		remaining,
		percentage,
		state,
		display: `${current}/${max}`
	};
}
