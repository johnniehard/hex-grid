<script lang="ts">
	import { onMount } from "svelte";
	import Gallery from "./Gallery.svelte";
	import Life from "./Life.svelte";
	import { getQueryString, setQueryString } from "./querystring";
	import SpacerVertical from "./SpacerVertical.svelte";

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
	<h1>Hex-Life</h1>
	<p>Game of Life, with hex cells. Click in the grid to place some cells, then click play and watch life unfold. Or try one of the examples from the gallery.</p>
	<SpacerVertical size="medium" />

	<Life
		bind:this={life}
		{r}
		{showGrid}
		clickable
		onCellClick={handleCellClick}
		{seed}
	/>
	<SpacerVertical size="small" />

	<div>
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
		<button disabled={play || seed?.length === 0} on:click={step}
			>step</button
		>
	</div>
	<SpacerVertical size="medium" />
	<div>
		<h2>Gallery</h2>
		<Gallery
			itemClicked={(_seed) => {
				seed = _seed;
				reset();
			}}
			{r}
		/>
	</div>
</main>

<style>
	main {
		margin: 0 auto;
		width: 700px;
		max-width: 100%;
		display: flex;
		flex-direction: column;
	}
</style>
