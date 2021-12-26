<script lang="ts">
	import Hexagon from "./Hexagon.svelte";
</script>

<main>
	<Hexagon />
	<Hexagon width={50} height={50} />
</main>

<style>
	:global(body) {
		background: rgb(11, 4, 37);
		height: 100%;

		display: grid;
		place-items: center;
	}
</style>
