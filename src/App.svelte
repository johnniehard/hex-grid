<script lang="ts">
	import Svg from "./Svg.svelte";
	import Hexagon from "./Hexagon.svelte";
	import { gridSetup, OurGrid } from "./hexagon";
	import clone from "just-clone";
	import queryString from "query-string";

	// TODO: Layout isolated component
	// Make a component Life that takes grid parameters like radius and seed,
	// and exposes functions like clear, togglePlay etc.
	// This way we can more easily do things like show thumbnails of seeds,
	// play multiple grids at once, or show a none-interactive grid that cycles between
	// playing different seeds (at different speeds).

	// TODO: Use requestAnimationframe to avoid rendering while not the active tab

	const r = 10;
	const birthRule = [2];
	const survivalRule = [2, 4];

	let grid = gridSetup(r);
	let play = false;
	let interval: ReturnType<typeof setInterval> | null = null;
	let generations = 0;

	const width = grid.pointWidth();
	const height = grid.pointHeight();

	let seed = [];

	const qs = queryString.parse(location.search, {
		parseNumbers: true,
		arrayFormat: "bracket-separator",
		arrayFormatSeparator: ",",
	});

	if (qs.seed && Array.isArray(qs.seed)) {
		seed = (qs.seed as any[]).filter(
			(x) => !isNaN(parseInt(x))
		) as number[];
		play = true;
	}

	if (seed.length > 0) {
		clear(false);
		setSeed(seed);
	} else {
		clear();
	}

	$: showGrid = generations === 0

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

	function life(inputGrid: OurGrid, birth: number[], survival: number[]) {
		const prevGrid = clone(inputGrid);
		const newGrid = inputGrid.map((hex, i) => {
			const prevHex = prevGrid[i];
			const neighbors = prevHex.neighbors.map((n) => prevGrid[n]);
			const aliveNeighbors = neighbors.filter((n) => n.alive);
			const alive = prevHex.alive;

			if (!alive) {
				if (birth.includes(aliveNeighbors.length)) {
					hex.alive = true;
					return hex;
				}
			}

			if (survival.includes(aliveNeighbors.length)) {
				return hex;
			} else {
				hex.alive = false;
				return hex;
			}
		});

		return newGrid;
	}

	function step() {
		grid = life(grid, birthRule, survivalRule);
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
		grid = gridSetup(r);
		seed = clearSeed ? [] : seed;
	}

	// TODO: Make this a pure function (grid) => grid, and move it to hexagon.ts
	function setSeed(seed: number[]) {
		grid = grid.map((hex, i) => {
			hex.alive = seed.includes(i);
			return hex;
		});
	}

	function reset() {
		clear(false);
		setSeed(seed);
		pause();
	}
</script>

<main>
	<Svg {width} {height}>
		{#each grid.map( (hex) => ({ hex, point: hex.toPoint() }) ) as { hex, point }, i}
			<Hexagon
				active={hex.alive}
				showOutline={showGrid}
				on:click={() => {
					hex.alive = !hex.alive;
					if (!play) {
						if (hex.alive) {
							seed = [...seed, i];
						} else {
							seed = seed.filter((s) => s !== i);
						}
					}
				}}
				{r}
				x={point.x + width / 2}
				y={point.y + height / 2}
			/>
		{/each}
	</Svg>
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
