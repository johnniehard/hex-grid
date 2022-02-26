<script lang="ts">
    type SpacerSizes = "small" | "medium" | "large";
    export let size: SpacerSizes;

    let pxSize = '20px';

    $: {
        switch(size){
            case 'small': {
                pxSize = '15px';
                break;
            }
            case 'medium': {
                pxSize = '30px';
                break;
            }
            case 'large': {
                pxSize = '60px';
                break;
            }
        }
    }
</script>

<div class="spacer" style="--size: {pxSize}" />

<style>
    .spacer {
        min-height: var(--size);
    }
</style>
