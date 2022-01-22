<script lang="ts">
	import { onMount } from "svelte";
	import Gallery from "./Gallery.svelte";
	import Life from "./Life.svelte";
	import { getQueryString, setQueryString } from "./querystring";

	// TODO: Mark currently selected gallery seed

	// TODO: Nicer buttons

	// TODO: Plot total population

	const SHOW_GALLERY_ITEM = true;

	const r = 10;

	let play = false;
	let interval: ReturnType<typeof setInterval> | null = null;
	let generations = 0;

	let life: Life;

	let seed;

	onMount(() => {
		const qs = getQueryString();

		if (qs.seed && Array.isArray(qs.seed)) {
			seed = (qs.seed as any[]).filter(
				(x) => !isNaN(parseInt(x))
			) as number[];
		}

		if (seed && seed.length > 0) {
			clear(false);
		} else {
			clear();
		}
	});

	$: showGrid = generations === 0;

	$: if (play) {
		interval = setInterval(step, 200);
	} else if (interval !== null) {
		clearInterval(interval);
		interval = null;
	}

	$: if (seed) {
		setQueryString({ seed });
	}

	function step() {
		life.step();
		generations += 1;
	}

	function togglePlay() {
		play = !play;
	}

	function pause() {
		play = false;
	}

	function clear(clearSeed = true) {
		generations = 0;
		life.clear();
		seed = clearSeed ? [] : seed;
	}

	function reset() {
		clear(false);
		life.setSeed(seed);
		pause();
	}

	function handleCellClick(i: number, alive: boolean) {
		if (!play) {
			if (alive) {
				seed = [...seed, i];
			} else {
				seed = seed.filter((s) => s !== i);
			}
		}
	}
</script>

<main>
	<Life
		bind:this={life}
		{r}
		{showGrid}
		clickable
		onCellClick={handleCellClick}
		{seed}
	/>
	<button
		disabled={seed?.length === 0}
		on:click={() => {
			clear();
			pause();
		}}>clear</button
	>
	<button disabled={seed?.length === 0} on:click={reset}>reset</button>
	<button disabled={seed?.length === 0} on:click={togglePlay}>
		{play ? "pause" : "play"}
	</button>
	<button disabled={play || seed?.length === 0} on:click={step}>step</button>
	{#if SHOW_GALLERY_ITEM}
		<Gallery
			itemClicked={(_seed) => {
				seed = _seed;
				reset();
			}}
			{r}
		/>
	{/if}
</main>

<style>
	:global(body) {
		background: rgb(11, 4, 37);
		height: 100%;

		display: grid;
		place-items: center;
	}
</style>
