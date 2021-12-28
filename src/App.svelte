<script lang="ts">
	import Svg from "./Svg.svelte";
	import Hexagon from "./Hexagon.svelte";
	import { neighbors } from "./neighbors_20";
	import { gridSetup, OurGrid } from "./hexagon";
	import clone from "just-clone";

	const r = 10;
	const width = 1000;
	const height = 1000;
	const b = [2];
	const s = [2, 4];

	let grid: OurGrid;
	let play = false;
	let interval: ReturnType<typeof setInterval> | null = null;

	clear()

	$: if (play) {
		interval = setInterval(step, 200);
	} else if (interval !== null) {
		clearInterval(interval);
		interval = null;
	}

	function life(inputGrid: OurGrid, b: number[], s: number[]) {
		const prevGrid = clone(inputGrid);
		const newGrid = inputGrid.map((hex, i) => {
			const prevHex = prevGrid[i];
			const neighbors = prevHex.neighbors.map((n) => prevGrid[n]);
			const aliveNeighbors = neighbors.filter((n) => n.alive);
			const alive = prevHex.alive;

			if (!alive) {
				if (b.includes(aliveNeighbors.length)) {
					hex.alive = true;
					return hex;
				}
			}

			if (s.includes(aliveNeighbors.length)) {
				return hex;
			} else {
				hex.alive = false;
				return hex;
			}
		});

		return newGrid;
	}

	function step() {
		grid = life(grid, b, s);
	}

	function togglePlay() {
		play = !play;
	}

	function clear() {
		grid = gridSetup(r, 20);
		grid = grid.map((hex, i) => {
			hex.neighbors = neighbors[i];
			return hex;
		});
	}
</script>

<main>
	<Svg {width} {height}>
		{#each grid.map( (hex) => ({ hex, point: hex.toPoint() }) ) as { hex, point }}
			<Hexagon
				active={hex.alive}
				showOutline={!play}
				on:click={() => (hex.alive = !hex.alive)}
				{r}
				x={point.x + width / 2}
				y={point.y + height / 2}
			/>
		{/each}
	</Svg>
	<button on:click={togglePlay}>{play ? "stop" : "play"}</button>
	<button on:click={clear}>clear</button>
</main>

<style>
	:global(body) {
		background: rgb(11, 4, 37);
		height: 100%;

		display: grid;
		place-items: center;
	}
</style>
