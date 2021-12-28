<script lang="ts">
    import { coordsToPath, hexagonCoords } from "./hexagon";

    export let x: number;
    export let y: number;
    export let r: number;
    export let showOutline: boolean = false;
    export let active: boolean = false;

    const hex = hexagonCoords(x, y, r);
    const path = coordsToPath(hex);

    $: classed = `${showOutline && 'outline'} ${active && 'active'}`
</script>

<path d={path} on:click on:mouseenter class={classed} />

<style>
    path {
        fill: rgba(0, 0, 0, 0);
    }

    .outline {
        stroke:rgb(253, 34, 154);
        stroke-width: 2px;
        stroke-opacity: 0.2;
    }
    
    path:hover {
        fill: rgb(253, 34, 154);
    }
    
    .active {
        fill: rgb(253, 34, 154);
    }
</style>
