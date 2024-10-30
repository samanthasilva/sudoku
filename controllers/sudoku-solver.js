class SudokuSolver {
  constructor() {
    this.isValid = this.isValid.bind(this);
    this.solve = this.solve.bind(this);
    this.rowToNum = this.rowToNum.bind(this);
  }

  validate(puzzle) {
    // Verificação de tamanho e caracteres válidos
    const re = /^[\d.]+$/;
    if (puzzle.length !== 81) {
      return [false, { error: "Expected puzzle to be 81 characters long" }];
    }
    if (!re.test(puzzle)) {
      return [false, { error: "Invalid characters in puzzle" }];
    }

    const puzzleGrid = [];
    for (let i = 0; i < 9; i++) {
      puzzleGrid.push(puzzle.slice(i * 9, i * 9 + 9).split(""));
    }

    return [true, puzzleGrid];
  }

  rowToNum(row) {
    // Conversão de letras
    const rows = "ABCDEFGHI";
    return rows.indexOf(row.toUpperCase());
  }

  checkRow(puzzle, r, col, value) {
    // Validação de valores
    const rowIndex = this.rowToNum(r);
    col = col - 1;
    let result = true;
    puzzle[rowIndex].forEach((itm) => {
      if (value == itm) result = "row";
    });
    if (puzzle[rowIndex][col] == value) result = true;
    return result;
  }

  checkCol(puzzle, r, col, value) {
    r = this.rowToNum(r);
    col = col - 1;
    let result = true;
    puzzle.forEach((itm) => {
      if (value == itm[col]) result = "column";
    });
    if (puzzle[r][col] == value) result = true;
    return result;
  }

  checkReg(puzzle, r, col, value) {
    r = this.rowToNum(r);
    col = col - 1;
    let result = true;
    for (let i = 0; i < 9; i++) {
      const m = 3 * Math.floor(r / 3) + Math.floor(i / 3);
      const n = 3 * Math.floor(col / 3) + (i % 3);
      if (value == puzzle[m][n]) result = "region";
    }
    if (puzzle[r][col] == value) result = true;
    return result;
  }

  isValid(puzzle, r, col, value) {
    for (let i = 0; i < 9; i++) {
      const m = 3 * Math.floor(r / 3) + Math.floor(i / 3);
      const n = 3 * Math.floor(col / 3) + (i % 3);
      if (puzzle[r][i] == value || puzzle[i][col] == value || puzzle[m][n] == value) {
        return false;
      }
    }
    return true;
  }

  solve(puzzle) {
    // Solução de resolução do Sudoku
    for (let r = 0; r < 9; r++) {
      for (let col = 0; col < 9; col++) {
        if (puzzle[r][col] == ".") {
          for (let value = 1; value <= 9; value++) {
            if (this.isValid(puzzle, r, col, value)) {
              puzzle[r][col] = value;
              if (this.solve(puzzle)) {
                return puzzle.flat().join("");
              } else {
                puzzle[r][col] = ".";
              }
            }
          }
          return false;
        }
      }
    }
    return true;
  }
}

module.exports = SudokuSolver;