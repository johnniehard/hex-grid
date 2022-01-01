<script lang="ts">
    import { gridSetup, OurGrid } from "./hexagon";
    import clone from "just-clone";

    import Svg from "./Svg.svelte";
    import Hexagon from "./Hexagon.svelte";

    export let r = 10;
    export let birthRule = [2];
    export let survivalRule = [2, 4];
    export let showGrid = false;
    export let onCellClick: (i: number, alive: boolean) => void = null;
    export let clickable = false;
    export let seed: number[];

    let grid = gridSetup(r);

    const width = grid.pointWidth();
    const height = grid.pointHeight();

    $: if (seed) {
        setSeed(seed);
    }

    export function step() {
        grid = life(grid, birthRule, survivalRule);
    }

    export function clear() {
        grid = gridSetup(r);
    }

    // TODO: Make this a pure function (grid) => grid, and move it to hexagon.ts
    export function setSeed(seed: number[]) {
        grid = grid.map((hex, i) => {
            hex.alive = seed.includes(i);
            return hex;
        });
    }

    function life(inputGrid: OurGrid, birth: number[], survival: number[]) {
        const prevGrid = clone(inputGrid);
        const newGrid = inputGrid.map((hex, i) => {
            const prevHex = prevGrid[i];
            const neighbors = prevHex.neighbors.map((n) => prevGrid[n]);
            const aliveNeighbors = neighbors.filter((n) => n.alive);
            const alive = prevHex.alive;

            if (!alive) {
                if (birth.includes(aliveNeighbors.length)) {
                    hex.alive = true;
                    return hex;
                }
            }

            if (survival.includes(aliveNeighbors.length)) {
                return hex;
            } else {
                hex.alive = false;
                return hex;
            }
        });

        return newGrid;
    }
</script>

<Svg {width} {height}>
    {#each grid.map( (hex) => ({ hex, point: hex.toPoint() }) ) as { hex, point }, i}
        <Hexagon
            active={hex.alive}
            showOutline={showGrid}
            on:click={() => {
                if (!onCellClick || !clickable) return;
                hex.alive = !hex.alive;
                onCellClick && onCellClick(i, hex.alive);
            }}
            {r}
            x={point.x + width / 2}
            y={point.y + height / 2}
        />
    {/each}
</Svg>
