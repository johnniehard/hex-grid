<script lang="ts">
	import { extendHex, defineGrid, Point } from "honeycomb-grid";

	import Svg from "./Svg.svelte";

	import Hexagon from "./Hexagon.svelte";

	import { neighbors } from "./neighbors";

	const r = 10;

	const width = 1200;
	const height = 900;

	const Hex = extendHex({
		size: r,
		orientation: "flat",
		alive: false,
		neighbors: [] as number[],
	});

	const W = width / Hex(0, 0).width();
	const H = (height - 100) / Hex(0, 0).height();

	const Grid = defineGrid(Hex);
	// let grid = Grid.rectangle({ width: W, height: H });
	let grid = Grid.hexagon({ radius: 20 });

	const gridWidth = grid.pointWidth();
	const gridHeight = grid.pointHeight();

	grid = grid.map((hex, i) => {
		hex.alive = Math.random() > 0.95;
		hex.neighbors = neighbors[i];
		return hex;
	});

	// const n = grid.map((hex) => {
	// 	return grid
	// 		.neighborsOf(hex)
	// 		.filter((f) => f)
	// 		.map((hex) => grid.indexOf(hex));
	// });

	// console.log(n);

	function clone<T>(x: T): T {
		return JSON.parse(JSON.stringify(x)) as T;
	}

	function step() {
		const prevGrid = clone(grid);
		grid = grid.map((hex, i) => {
			const prevHex = prevGrid[i];
			const neighbors = prevHex.neighbors.map((n) => prevGrid[n]);
			const aliveNeighbors = neighbors.filter((n) => n.alive);
			const alive = prevHex.alive;

			if (!alive) {
				if ([2].includes(aliveNeighbors.length)) {
					hex.alive = true;
					return hex;
				}
			}

			if ([2, 4].includes(aliveNeighbors.length)) {
				return hex;
			} else {
				hex.alive = false;
				return hex;
			}
		});

	}

	setInterval(step, 400)
</script>

<main>
	<Svg {width} {height}>
		{#each grid.map( (hex) => ({ hex, point: hex.toPoint() }) ) as { hex, point }}
			<Hexagon
				active={hex.alive}
				on:click={() => hex.alive = true}
				{r}
				x={point.x + width / 2}
				y={point.y + height / 2}
			/>
		{/each}
	</Svg>
	<button on:click={() => step()}>step</button>
</main>

<style>
	:global(body) {
		background: rgb(11, 4, 37);
		height: 100%;

		display: grid;
		place-items: center;
	}
</style>
