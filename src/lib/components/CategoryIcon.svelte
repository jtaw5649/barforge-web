<script lang="ts">
	import {
		AppWindow,
		BatteryCharging,
		Clock,
		CloudSun,
		Cpu,
		LayoutGrid,
		ListTodo,
		Monitor,
		PlayCircle,
		Puzzle,
		Settings,
		Timer,
		Volume2,
		Wifi
	} from 'lucide-svelte';

	type IconComponent = typeof AppWindow;

	const iconMap: Record<string, IconComponent> = {
		system: Settings,
		hardware: Cpu,
		network: Wifi,
		audio: Volume2,
		power: BatteryCharging,
		time: Clock,
		clock: Timer,
		workspace: LayoutGrid,
		window: AppWindow,
		tray: Monitor,
		weather: CloudSun,
		productivity: ListTodo,
		media: PlayCircle,
		custom: Puzzle
	};

	let {
		slug,
		size = 18,
		class: className = ''
	}: {
		slug: string;
		size?: number;
		class?: string;
	} = $props();

	const Icon = $derived(iconMap[slug] ?? Puzzle);
</script>

<Icon {size} class={className} aria-hidden="true" />
