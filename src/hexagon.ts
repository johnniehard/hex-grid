import { defineGrid, extendHex } from "honeycomb-grid";

type Coords = Array<[number, number]>;

export const ourHex = (r: number) => extendHex({
    size: r,
    orientation: "flat",
    alive: false,
    neighbors: [] as number[],
});


export function gridSetup(hexRadius: number, gridRadius: number) {
    const Hex = ourHex(hexRadius);
    const Grid = defineGrid(Hex);
    return Grid.hexagon({ radius: gridRadius });
}

export function hexagonCoords(x: number, y: number, r: number): Coords {
    const coords: Coords = [];

    for (let a = 0; a < 6; a += (Math.PI * 2) / 6) {
        coords.push([x + Math.cos(a) * r, y + Math.sin(a) * r]);
    }

    return coords;
}

export function coordsToPath(coords: Coords, closed = true): string {
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

type Point = { x: number, y: number };
