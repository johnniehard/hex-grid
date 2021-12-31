<script lang="ts">
	import queryString from "query-string";
	import { onMount } from "svelte";
	import Life from "./Life.svelte";

	// TODO: Seed gallery
	// Thumbnails of seeds. Click to set main grid seed.
	// play multiple grids at once, or show a none-interactive grid that cycles between
	// playing different seeds (at different speeds).

	const r = 10;

	let play = false;
	let interval: ReturnType<typeof setInterval> | null = null;
	let generations = 0;

	let life: Life;

	let seed = [];

	onMount(() => {
		const qs = queryString.parse(location.search, {
			parseNumbers: true,
			arrayFormat: "bracket-separator",
			arrayFormatSeparator: ",",
		});

		if (qs.seed && Array.isArray(qs.seed)) {
			seed = (qs.seed as any[]).filter(
				(x) => !isNaN(parseInt(x))
			) as number[];
			play = seed.length > 0;
		}

		if (seed.length > 0) {
			clear(false);
			life.setSeed(seed);
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
		history.replaceState(
			null,
			null,
			"?" +
				queryString.stringify(
					{ seed },
					{
						arrayFormat: "bracket-separator",
						arrayFormatSeparator: ",",
					}
				)
		);
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
			life.clear()
			seed = clearSeed ? [] : seed;
	}

	function reset() {
		clear(false);
		life.setSeed(seed);
		pause();
	}
</script>

<main>
	<Life bind:this={life} {r} {showGrid} />
	<button
		on:click={() => {
			clear();
			pause();
		}}>clear</button
	>
	<button on:click={reset}>reset</button>
	<button on:click={togglePlay}>{play ? "pause" : "play"}</button>
	{#if !play}
		<button on:click={step}>step</button>
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
