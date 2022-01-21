<script lang="ts">
	import queryString from "query-string";
	import { onMount } from "svelte";
	import Life from "./Life.svelte";

	// TODO: Seed gallery
	// Thumbnails of seeds. Click to set main grid seed.
	// play multiple grids at once, or show a none-interactive grid that cycles between
	// playing different seeds (at different speeds).

	// TODO: Plot total population

	const SHOW_GALLERY_ITEM = false;

	const r = 10;

	let play = false;
	let interval: ReturnType<typeof setInterval> | null = null;
	let generations = 0;

	let life: Life;

	let seed;

	onMount(() => {
		// TODO: Break out qs get/set from the logic re what to do with the data
		const qs = queryString.parse(location.search, {
			parseNumbers: true,
			arrayFormat: "bracket-separator",
			arrayFormatSeparator: ",",
		});

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
	<button disabled={!play && seed?.length === 0} on:click={step}>step</button>
	{#if SHOW_GALLERY_ITEM}
		<div
			class="gallery item"
			on:click={() => {
				seed = [
					633, 750, 673, 712, 830, 558, 339, 369, 722, 1027, 396, 395,
					431,
				];
				reset();
			}}
		>
			<Life
				{r}
				showGrid={false}
				seed={[
					633, 750, 673, 712, 830, 558, 339, 369, 722, 1027, 396, 395,
					431,
				]}
			/>
		</div>
	{/if}
</main>

<style>
	:global(body) {
		background: rgb(11, 4, 37);
		height: 100%;

		display: grid;
		place-items: center;
	}

	.gallery.item {
		width: 100px;
		border: 1px solid rgba(253, 34, 154, 0.4);
		border-radius: 5px;
		cursor: pointer;
	}
</style>
