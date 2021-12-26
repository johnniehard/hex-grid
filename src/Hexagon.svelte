<script lang="ts">
    export let x: number;
    export let y: number;
    export let r: number;

    type Coords = Array<[number, number]>;

    function hexagon(x: number, y: number, r: number): Coords {
        const coords: Coords = [];

        for (let a = 0; a < 6; a += (Math.PI * 2) / 6) {
            coords.push([x + Math.cos(a) * r, y + Math.sin(a) * r]);
        }

        return coords;
    }

    function coordsToPath(coords: Coords, closed = true): string {
        let path = "";

        coords.forEach((c, i) => {
            if (i === 0) {
                path += `M ${c[0]} ${c[1]} `;
            }

            path += `L ${c[0]} ${c[1]} `;
        });

        if (closed) {
            path += `L ${coords[0][0]} ${coords[0][1]} `;
        }

        return path;
    }

    const hex = hexagon(x, y, r);
    const path = coordsToPath(hex);

</script>

<path d={path} />

<style>
    path {
        fill: rgb(204, 17, 120);
        stroke: white;
        stroke-width: 2px;
        transition: fill 0.3s ease;
    }

    path:hover {
        fill: rgb(248, 132, 196);
    }
</style>
