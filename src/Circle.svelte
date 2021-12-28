<script lang="ts">
    export let x: number;
    export let y: number;
    export let r: number;

    export let active: boolean = false;
</script>

<circle cx={x} cy={y} {r} on:click on:mouseenter class={active ? "active" : ""} />

<style>
    circle {
        fill: rgba(0, 0, 0, 0);
        /* transition: fill 0.5s ease; */
    }

    circle:hover {
        fill: rgb(253, 34, 154);
        transition: none;
    }

    .active {
        fill: rgb(253, 34, 154);
        transition: none;
        /* transition: fill .15s ease; */
    }
</style>
