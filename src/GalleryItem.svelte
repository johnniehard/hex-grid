<script lang="ts">
    import Life from "./Life.svelte";

    export let seed: number[];
    export let r: number;
</script>

<div class="gallery item" on:click>
    <Life {r} showGrid={false} {seed} />
</div>

<style>
    .gallery.item {
        width: 100px;
        border: 1px solid rgba(253, 34, 154, 0.4);
        border-radius: 5px;
        cursor: pointer;
    }
</style>
