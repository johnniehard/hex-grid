type Coords = Array<[number, number]>;

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

export function hexWidth(r: number) {
    return 2 * r;
}

export function hexHeight(r: number) {
    return Math.sqrt(3) * r;
}

type Point = {x: number, y: number};

export function hexGrid(W: number, H: number, r: number): Point[]{
	const w = hexWidth(r);
	const h = hexHeight(r);

	const xDist = w * (3 / 4);
	const yDist = h / 2;

    const coords: Point[] = []

    for(let y = 0; y < H; y++){
        for(let x = 0; x < W; x++){
            coords.push({
                x: xDist * x,
                y: x % 2 === 0 ? y * h : y * h + yDist,
            })
        }
    }

    return coords
}