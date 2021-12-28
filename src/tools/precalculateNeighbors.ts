import { gridSetup } from '../hexagon'

const grid = gridSetup(1, 20)

const n = grid.map((hex) => {
    return grid
        .neighborsOf(hex)
        .filter((f) => f)
        .map((hex) => grid.indexOf(hex));
});

console.log(`export const neighbors =`, JSON.stringify(n))