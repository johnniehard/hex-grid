<script lang="ts">
	import { extendHex, defineGrid, Point } from "honeycomb-grid";

	import Svg from "./Svg.svelte";

	import Hexagon from "./Hexagon.svelte";

	const r = 10;

	const width = 1200;
	const height = 900;

	const Hex = extendHex({
		size: r,
		orientation: "flat",
		alive: false,
	});

	const W = width / Hex(0, 0).width();
	const H = (height - 100) / Hex(0, 0).height();

	const Grid = defineGrid(Hex);
	let grid = Grid.rectangle({ width: W, height: H });

	const gridWidth = grid.pointWidth();
	const gridHeight = grid.pointHeight();

	let neighbors = [];

	grid = grid.map((hex) => {
		hex.alive = Math.random() > 0.9;
		return hex;
	});

	const neighborThreshold = 2;

	function step(){
		grid = grid.map((hex) => {
			const neighbors = grid.neighborsOf(hex).filter(f => f)
			const aliveNeighbors = neighbors.filter(n => n.alive)
			if(aliveNeighbors.length === neighborThreshold){
				hex.alive = true
			}

			if(aliveNeighbors.length < neighborThreshold || aliveNeighbors.length > neighborThreshold){
				hex.alive = false
			}
			return hex
		})
	}

	step()
</script>

<main>
	<Svg {width} {height}>
		{#each grid.map( (hex) => ({ hex, point: hex.toPoint() }) ) as { hex, point }}
			<Hexagon
				active={hex.alive}
				{r}
				x={point.x + width / 2 - gridWidth / 2}
				y={point.y + height / 2 - gridHeight / 2}
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
