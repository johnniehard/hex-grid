<script lang="ts">
    export let width: number;
    export let height: number;
</script>

<svg
    width={`${width}px`}
    height={`${height}px`}
    viewBox={`0 0 ${width} ${height}`}
>
    <slot />
</svg>

<style>
    svg {
        display: block;
        /* border: 1px solid white; */
        max-width: 100%;
        height: auto;
    }
</style>