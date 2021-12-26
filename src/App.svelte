<script lang="ts">
	import { extendHex, defineGrid } from "honeycomb-grid";

	import Svg from "./Svg.svelte";

	import Hexagon from "./Hexagon.svelte";

	const r = 10;

	const width = 1100;
	const height = 900;

	const W = width / (r * 2);
	const H = height / (r * 2);

	const Hex = extendHex({
		size: r,
		orientation: "flat",
	});
	const Grid = defineGrid(Hex);
	const grid = Grid.rectangle({ width: W, height: H });

	const gridWidth = grid.pointWidth()
	const gridHeight = grid.pointHeight()
</script>

<main>
	<Svg {width} {height}>
		{#each grid.map(hex => hex.toPoint()) as cell}
			<Hexagon
				{r}
				x={cell.x + width / 2 - gridWidth / 2}
				y={cell.y + height / 2 - gridHeight / 2}
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
