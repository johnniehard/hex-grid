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
        /* transition: fill 0.15s ease; */
    }

    path:hover {
        fill: rgb(253, 34, 154);
        transition: none;
    }

    .active {
        fill: rgb(253, 34, 154);
        transition: none;
        /* transition: fill .15s ease; */
    }
</style>
