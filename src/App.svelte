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
	});

	const W = width / Hex(0, 0).width();
	const H = (height - 100) / Hex(0, 0).height();

	const Grid = defineGrid(Hex);
	const grid = Grid.rectangle({ width: W, height: H });

	const gridWidth = grid.pointWidth();
	const gridHeight = grid.pointHeight();

	let neighbors = [];
	$: stringNeighbors = neighbors.map(n => JSON.stringify(n));

</script>

<main>
	<Svg {width} {height}>
		{#each grid.map( (hex) => ({ hex, point: hex.toPoint() }) ) as { hex, point }}
			<Hexagon
				on:mouseenter={() => {
					neighbors = grid.neighborsOf(hex);
				}}
				active={stringNeighbors.includes(JSON.stringify(hex))}
				{r}
				x={point.x + width / 2 - gridWidth / 2}
				y={point.y + height / 2 - gridHeight / 2}
			/>
		{/each}
	</Svg>
</main>

<style>
	:global(body) {
		background: rgb(11, 4, 37);
		height: 100%;

		display: grid;
		place-items: center;
	}
</style>
