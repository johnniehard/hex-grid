<script lang="ts">
    import { coordsToPath, hexagonCoords } from "./hexagon";

    export let x: number;
    export let y: number;
    export let r: number;
    // export let onclick: () => void;
    export let active: boolean = false;

    const hex = hexagonCoords(x, y, r);
    const path = coordsToPath(hex);
</script>

<path d={path} on:click on:mouseenter class={active ? "active" : ""} />

<style>
    path {
        fill: rgba(0, 0, 0, 0);
        /* fill: rgb(204, 17, 120); */
        stroke: rgba(253, 34, 154, 0.2);
        /* stroke: none; */
        stroke-width: 2px;
        transition: fill 1s ease;
    }

    path:hover {
        fill: rgb(253, 34, 154);
        transition: none;
    }

    .active {
        fill: steelblue;
        transition: none;
    }
</style>
