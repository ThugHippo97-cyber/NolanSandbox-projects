let grid;
    let cellSize = 5;
    let area = 5;
    let cols;
    let rows;

    function setup() {
      createCanvas(1000, 1000);
      frameRate(30);
      cols = width / cellSize;
      rows = height / cellSize;
      grid = createGrid(rows, cols);
    }

    function draw() {
      background(0);
      simulateLife();
      updateGrid();
    }

    function mousePressed() {
      let plottedMatrix = new Array(area).fill(0).map(() => new Array(area).fill(0));

      for (let i = 0; i < plottedMatrix.length; i++) {
        for (let j = 0; j < plottedMatrix[i].length; j++) {
          plottedMatrix[i][j] = int(random(2));
        }
      }

      let row = floor(mouseX / cellSize);
      let col = floor(mouseY / cellSize);
      let a = 0;
      let b = 0;

      for (let i = row; i < row + area; i++) {
        for (let j = col; j < col + area; j++) {
          grid[i][j] = plottedMatrix[a][b];
          b++;
        }
        a++;
        b = 0;
      }
    }

    function updateGrid() {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          stroke(255);
          if (grid[i][j] == 1) {
            fill(255);
            let x = i * cellSize;
            let y = j * cellSize;
            rect(x, y, cellSize, cellSize);
          }
        }
      }
    }

    function simulateLife() {
      let newGrid = createGrid(rows, cols);

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          let curr = grid[i][j];

          if (curr == 1) {
            let neighborCount = countNeighbors(i, j);
            if (neighborCount < 2 || neighborCount > 3) {
              newGrid[i][j] = 0;
            } else {
              newGrid[i][j] = 1;
            }
          } else {
            if (countNeighbors(i, j) == 3) {
              newGrid[i][j] = 1;
            }
          }
        }
      }
      grid = newGrid;
    }

    function countNeighbors(r, c) {
      let count = 0;
      for (let cr = -1; cr <= 1; cr++) {
        for (let cc = -1; cc <= 1; cc++) {
          if (cr == 0 && cc == 0) continue;
          let nr = r + cr;
          let nc = c + cc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {
            count++;
          }
        }
      }
      return count;
    }

    function createGrid(rows, cols) {
      let newGrid = [];
      for (let i = 0; i < rows; i++) {
        newGrid[i] = [];
        for (let j = 0; j < cols; j++) {
          newGrid[i][j] = 0;
        }
      }
      return newGrid;
    }