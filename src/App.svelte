<script lang="ts">
	import { extendHex, defineGrid } from "honeycomb-grid";

	import Svg from "./Svg.svelte";

	import Hexagon from "./Hexagon.svelte";
	import { hexHeight, hexWidth } from "./hexagon";

	const r = 10;

	const width = 1100;
	const height = 900;

	const padding = 400;
	const W = (width - padding) / r;
	const H = (height - padding) / r;

	const gridWidth = hexWidth(r) * W * (3 / 4);
	const gridHeight = hexHeight(r) * H;

	// const grid = hexGrid(W, H, r);
	const Hex = extendHex({
		size: r, // default: 1
		orientation: "flat", // default: 'pointy'
	});
	const Grid = defineGrid(Hex);
	const grid = Grid.rectangle({ width: W, height: H });
	console.log(grid)
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
