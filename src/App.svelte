<script lang="ts">
	import Svg from "./Svg.svelte";
	import Hexagon from "./Hexagon.svelte";
	import { neighbors } from "./neighbors_20";
	import { gridSetup, OurGrid } from "./hexagon";
	import clone from "just-clone";

	const r = 10;
	const width = 1000;
	const height = 1000;

	let grid = gridSetup(r, 20);

	grid = grid.map((hex, i) => {
		hex.alive = Math.random() > 0.95;
		hex.neighbors = neighbors[i];
		return hex;
	});

	function life(inputGrid: OurGrid) {
		const prevGrid = clone(inputGrid);
		const newGrid = inputGrid.map((hex, i) => {
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

		return newGrid;
	}

	function step() {
		grid = life(grid);
	}

	setInterval(step, 100);
</script>

<main>
	<Svg {width} {height}>
		{#each grid.map( (hex) => ({ hex, point: hex.toPoint() }) ) as { hex, point }}
			<Hexagon
				active={hex.alive}
				on:click={() => (hex.alive = true)}
				{r}
				x={point.x + width / 2}
				y={point.y + height / 2}
			/>
		{/each}
	</Svg>
	<!-- <button on:click={() => step()}>step</button> -->
</main>

<style>
	:global(body) {
		background: rgb(11, 4, 37);
		height: 100%;

		display: grid;
		place-items: center;
	}
</style>
