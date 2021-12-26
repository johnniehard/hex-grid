<script lang="ts">
    import { coordsToPath, hexagonCoords } from "./hexagon";

    export let x: number;
    export let y: number;
    export let r: number;

    const hex = hexagonCoords(x, y, r);
    const path = coordsToPath(hex);
</script>

<path d={path} />

<style>
    path {
        fill: rgb(204, 17, 120);
        stroke: rgb(253, 34, 154);
        stroke-width: 2px;
        transition: fill 1s ease;
    }

    path:hover {
        fill: rgb(253, 34, 154);
        transition: none;
    }
</style>
