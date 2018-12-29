// Declare a unique numbers possibles
const uniques = [1, 2, 3, 4, 5, 6, 7, 8, 9];

function sudokuSolver() {
    let template = [
        [5, 3, , , 7, , , ,],
        [6, , , 1, 9, 5, , ,],
        [, 9, 8, , , , , 6,],
        [8, , , , 6, , , , 3],
        [4, , , 8, , 3, , , 1],
        [7, , , , 2, , , , 6],
        [, 6, , , , , 2, 8,],
        [, , , 4, 1, 9, , , 5],
        [, , , , 8, , , 7, 9]
    ];

    // Section 1, Clean mistake values
    let rows = cleanRows(template);
    // Section 2, Generate array of columns
    let columns = generateColumns(rows);
    //Section 3, Map values (coordenate: value)
    /*let matrix = new Map();
    for (let i in rows) {
        for (let ii in rows[i]) {
            matrix.set((i + "" + ii), rows[i][ii]);
        }
    }*/
    //Section 4, Search possible matches
    for (let i = 0; i < 9; i++) {
        for (let ii = 0; ii < 9; ii++) {
            if (rows[i][ii] === 0) {
                let simplyPossibles = simplifyPossibles(possibles(rows[i]), possibles(columns[ii]), possibles(getGrid(i, ii, rows)));
                matrix.set((i+""+ii),(simplyPossibles.length > 1 ? simplyPossibles:simplyPossibles[0]));
            }
        }
    }
    console.log(matrix.entries());
}

function cleanRows(dataMatrix) {
    let matrix = [];
    for (let i = 0; i < 9; i++) {
        let newRow = [];
        for (let ii = 0; ii < 9; ii++) {
            newRow.push((isNaN(dataMatrix[i][ii]) ? 0 : dataMatrix[i][ii]));
        }
        matrix.push(newRow);
    }
    return matrix;
}

function generateColumns(dataMatrix) {
    let matrix = [];
    for (let i = 0; i < 9; i++) {
        let newColumn = [];
        for (let ii = 0; ii < 9; ii++) {
            newColumn.push(dataMatrix[ii][i]);
        }
        matrix.push(newColumn);
    }
    return matrix;
}

function getGrid(x, y, matrix) {
    const sectors = [
        [[0, 2], [0, 2]], [[0, 2], [3, 5]], [[0, 2], [6, 8]],
        [[3, 5], [0, 2]], [[3, 5], [3, 5]], [[3, 5], [6, 8]],
        [[6, 8], [0, 2]], [[6, 8], [3, 5]], [[6, 8], [6, 8]]
    ];
    let grid = [];
    for (let sector of sectors) {
        if ((x >= sector[0][0] && x <= sector[0][1]) &&
            (y >= sector[1][0] && y <= sector[1][1])) {
            for (let i = sector[0][0]; i <= sector[0][1]; i++) {
                for (let ii = sector[1][0]; ii <= sector[1][1]; ii++) {
                    grid.push(matrix[i][ii]);
                }
            }
        }
    }
    return grid;
}

function possibles(line) {
    let onlyValids = line.filter(value => value > 0);
    let possibles = uniques;
    for (let value of onlyValids) {
        possibles = possibles.filter(current => current !== value);
    }
    return possibles;
}

function simplifyPossibles(byRow, byColumn, byGrid) {
    const concatArrays = [byRow, byColumn, byGrid];
    let possibles = [];
    for (let number of uniques) {
        let status = [];
        for (let value of concatArrays) {
            status.push(value.some(inValue => inValue === number));
        }
        if (status[0] && status[1] && status[2]) {
            possibles.push(number);
        }
    }
    return possibles;
}
