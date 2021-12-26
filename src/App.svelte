<script lang="ts">
	import Svg from "./Svg.svelte";

	import Hexagon from "./Hexagon.svelte";

	const r = 60;
	const w = 2 * r;
	const h = Math.sqrt(3) * r;

	const xDist = w * (3 / 4);
	const yDist = h / 2;
</script>

<main>
	<Svg width={800} height={800}>
		<!-- Udda ska ha y offset yDist -->
		<Hexagon x={300} y={300} {r} />
		<Hexagon x={300 + xDist} y={300 + yDist} {r} />
		<Hexagon x={300 + xDist * 2} y={300} {r} />
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
