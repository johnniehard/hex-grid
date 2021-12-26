<script lang="ts">
	import Svg from "./Svg.svelte";

	import Hexagon from "./Hexagon.svelte";
	import { hexGrid, hexHeight, hexWidth } from "./hexagon";

	const r = 60;

	const width = 800;
	const height = 800;

	const padding = 400;
	const W = (width - padding) / r;
	const H = (height - padding) / r;

	const gridWidth = hexWidth(r) * W * (3/4);
	const gridHeight = hexHeight(r) * H;


	const grid = hexGrid(W, H, r);
</script>

<main>
	<Svg {width} {height}>
		<!-- Udda ska ha y offset yDist
		<Hexagon x={300} y={300} {r} />
		<Hexagon x={300 + xDist} y={300 + yDist} {r} />
		<Hexagon x={300 + xDist * 2} y={300} {r} /> -->

		{#each grid as cell}
			<Hexagon
				{r}
				x={cell.x + width / 2 - gridWidth / 2 }
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
