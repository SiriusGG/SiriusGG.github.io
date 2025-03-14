var C;
(function (C) {
    C.FRAME_WIDTH = window.innerWidth;
    C.FRAME_HEIGHT = window.innerHeight;
    C.PLACEMENT_GRID_COLS = 15;
    C.PLACEMENT_GRID_ROWS = 15;
    C.FULL_GRID_COLS = (2 * C.PLACEMENT_GRID_COLS) + 3;
    C.FULL_GRID_ROWS = C.PLACEMENT_GRID_ROWS + 2;
    C.MAX_GENERATIONS = 2500;
    C.LOOP_CHECK_GENERATIONS = 30;
    C.INITIAL_SLEEP_TIME = 400;
    C.FILE_EXTENSION = '.gol';
    C.GAME_VERSION = 'v0.1.0';
    C.SAVE_FILE_VERSION = '1.0.0'; // not allowed to ever contain a ";" in it for save file reasons.
    C.PREVIEW_CANVAS_SIZE = 200;
})(C || (C = {}));
var Placement;
(function (Placement) {
    var isDragging = false;
    var dragState = -1;
    Placement.canvasMouseDownHandler = null;
    Placement.canvasMouseMoveHandler = null;
    function setupHandlers(fullGrid, canvas, ctx, cellSize) {
        Placement.canvasMouseDownHandler = function (event) { return startDrag(event, fullGrid); };
        Placement.canvasMouseMoveHandler = function (event) { return dragHandler(event, fullGrid, canvas, ctx, cellSize); };
    }
    Placement.setupHandlers = setupHandlers;
    function startDrag(event, fullGrid) {
        var _a = getP1CellFromEvent(event), row = _a.row, col = _a.col;
        if (row === -1 || col === -1)
            return;
        isDragging = true;
        dragState = fullGrid[row][col] === 0 ? 2 : 0;
        toggleCell(row, col);
    }
    Placement.startDrag = startDrag;
    function dragHandler(event, fullGrid, canvas, ctx, cellSize) {
        if (!isDragging)
            return;
        var _a = getP1CellFromEvent(event), row = _a.row, col = _a.col;
        if (row === -1 || col === -1)
            return;
        if (dragState === 2 && fullGrid[row][col] === 0) {
            fullGrid[row][col] = 2;
            Renderer.drawP1Grid(canvas, ctx, fullGrid, cellSize);
        }
        if (dragState === 0 && fullGrid[row][col] === 2) {
            fullGrid[row][col] = 0;
            Renderer.drawP1Grid(canvas, ctx, fullGrid, cellSize);
        }
    }
    Placement.dragHandler = dragHandler;
    function endDrag() {
        isDragging = false;
        dragState = -1;
    }
    Placement.endDrag = endDrag;
    function getP1CellFromEvent(event) {
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        var col = Math.floor(x / cellSize);
        var row = Math.floor(y / cellSize);
        if (col >= 0 && col < C.PLACEMENT_GRID_COLS && row >= 0 && row < C.PLACEMENT_GRID_ROWS) {
            return { row: row + 1, col: col + 1 };
        }
        return { row: -1, col: -1 };
    }
    function toggleCell(row, col) {
        fullGrid[row][col] = fullGrid[row][col] === 0 ? 2 : 0;
        Renderer.drawP1Grid(canvas, ctx, fullGrid, cellSize);
    }
})(Placement || (Placement = {}));
var Grid;
(function (Grid) {
    function translateP1GridToP2Grid(grid) {
        var p2Grid = [];
        for (var row = 0; row < C.PLACEMENT_GRID_ROWS; row++) {
            p2Grid[row] = [];
            for (var col = 0; col < C.PLACEMENT_GRID_COLS; col++) {
                if (grid[row][C.PLACEMENT_GRID_COLS - col - 1] === 2)
                    p2Grid[row][col] = 3;
                else
                    p2Grid[row][col] = 0;
            }
        }
        return p2Grid;
    }
    Grid.translateP1GridToP2Grid = translateP1GridToP2Grid;
    function isStableConfiguration(fullGrid, lastGenGrids) {
        return !gridIsEmpty(fullGrid) && !gridIsEmpty(lastGenGrids[0]) && gridEquals(fullGrid, lastGenGrids[0]);
    }
    Grid.isStableConfiguration = isStableConfiguration;
    function buildFullGrid() {
        var fullGrid = [];
        for (var row = 0; row < C.FULL_GRID_ROWS; row++) {
            fullGrid[row] = [];
            for (var col = 0; col < C.FULL_GRID_COLS; col++) {
                fullGrid[row][col] = 0;
            }
        }
        return fullGrid;
    }
    Grid.buildFullGrid = buildFullGrid;
    function buildFullGrids(amount) {
        var grids = [];
        for (var loopCount = 0; loopCount < amount; loopCount++) {
            grids.push(buildFullGrid());
        }
        return grids;
    }
    Grid.buildFullGrids = buildFullGrids;
    function generateRandomP1Grid() {
        var chance = 50;
        var randomValue = 0;
        for (var row = 1; row <= C.PLACEMENT_GRID_ROWS; row++) {
            for (var col = 1; col <= C.PLACEMENT_GRID_COLS; col++) {
                randomValue = Math.floor(Math.random() * 100) + 1;
                if (randomValue >= chance) {
                    fullGrid[row][col] = 2;
                }
                else {
                    fullGrid[row][col] = 0;
                }
            }
        }
        Renderer.drawP1Grid(canvas, ctx, fullGrid, cellSize);
    }
    Grid.generateRandomP1Grid = generateRandomP1Grid;
    function generateRandomP2Grid() {
        var chance = 50;
        var randomValue = 0;
        for (var row = 0; row < C.PLACEMENT_GRID_ROWS; row++) {
            for (var col = 0; col < C.PLACEMENT_GRID_COLS; col++) {
                randomValue = Math.floor(Math.random() * 100) + 1;
                if (randomValue >= chance) {
                    fullGrid[row + 1][C.PLACEMENT_GRID_COLS + col + 2] = 3;
                }
                else {
                    fullGrid[row + 1][C.PLACEMENT_GRID_COLS + col + 2] = 0;
                }
            }
        }
        Renderer.drawP2Preview(previewCanvas, pctx, fullGrid);
    }
    Grid.generateRandomP2Grid = generateRandomP2Grid;
    function clearGrid() {
        for (var row = 1; row <= C.PLACEMENT_GRID_ROWS; row++) {
            for (var col = 1; col <= C.PLACEMENT_GRID_COLS; col++) {
                fullGrid[row][col] = 0;
            }
        }
        Renderer.drawP1Grid(canvas, ctx, fullGrid, cellSize);
    }
    Grid.clearGrid = clearGrid;
    function mirrorP1Grid() {
        var p1Grid = [];
        for (var row = 0; row < C.PLACEMENT_GRID_ROWS; row++) {
            p1Grid[row] = [];
            for (var col = 0; col < C.PLACEMENT_GRID_COLS; col++) {
                p1Grid[row][col] = fullGrid[row + 1][col + 1];
            }
        }
        var p2Grid = Grid.translateP1GridToP2Grid(p1Grid);
        for (var row = 0; row < C.PLACEMENT_GRID_ROWS; row++) {
            for (var col = 0; col < C.PLACEMENT_GRID_COLS; col++) {
                fullGrid[row + 1][C.PLACEMENT_GRID_COLS + col + 2] = p2Grid[row][col];
            }
        }
        Renderer.drawP2Preview(previewCanvas, pctx, fullGrid);
    }
    Grid.mirrorP1Grid = mirrorP1Grid;
    function getP1IsAlive() {
        var p1Alive = false;
        for (var row = 0; row < C.FULL_GRID_ROWS; row++) {
            for (var col = 0; col < C.FULL_GRID_COLS; col++) {
                if (fullGrid[row][col] === 2)
                    p1Alive = true;
            }
        }
        return p1Alive;
    }
    Grid.getP1IsAlive = getP1IsAlive;
    function getP2IsAlive() {
        var p2Alive = false;
        for (var row = 0; row < C.FULL_GRID_ROWS; row++) {
            for (var col = 0; col < C.FULL_GRID_COLS; col++) {
                if (fullGrid[row][col] === 3)
                    p2Alive = true;
            }
        }
        return p2Alive;
    }
    Grid.getP2IsAlive = getP2IsAlive;
    function gridEquals(currentGrid, pastGrid) {
        for (var row = 0; row < C.FULL_GRID_ROWS; row++) {
            for (var col = 0; col < C.FULL_GRID_COLS; col++) {
                if (currentGrid[row][col] != pastGrid[row][col])
                    return false;
            }
        }
        return true;
    }
    Grid.gridEquals = gridEquals;
    function gridIsEmpty(grid) {
        for (var row = 0; row < C.FULL_GRID_ROWS; row++) {
            for (var col = 0; col < C.FULL_GRID_COLS; col++) {
                if (grid[row][col] != 0)
                    return false;
            }
        }
        return true;
    }
    Grid.gridIsEmpty = gridIsEmpty;
    function countAliveP1() {
        var counter = 0;
        for (var row = 0; row < C.FULL_GRID_ROWS; row++) {
            for (var col = 0; col < C.FULL_GRID_COLS; col++) {
                if (fullGrid[row][col] === 2) {
                    counter++;
                }
            }
        }
        return counter;
    }
    Grid.countAliveP1 = countAliveP1;
    function countAliveP2() {
        var counter = 0;
        for (var row = 0; row < C.FULL_GRID_ROWS; row++) {
            for (var col = 0; col < C.FULL_GRID_COLS; col++) {
                if (fullGrid[row][col] === 3) {
                    counter++;
                }
            }
        }
        return counter;
    }
    Grid.countAliveP2 = countAliveP2;
    function gameHasEnded() {
        if (!Grid.getP1IsAlive() || !Grid.getP2IsAlive()) {
            return true;
        }
        for (var genCount = 0; genCount < C.LOOP_CHECK_GENERATIONS; genCount++) {
            if (Grid.gridEquals(fullGrid, lastGenGrids[genCount])) {
                return true;
            }
        }
        return false;
    }
    Grid.gameHasEnded = gameHasEnded;
    function getAliveNeighbors(row, col, grid) {
        var counter = 0;
        if (grid[translateRow(row - 1)][translateCol(col - 1)] != 0)
            counter++;
        if (grid[translateRow(row - 1)][translateCol(col)] != 0)
            counter++;
        if (grid[translateRow(row - 1)][translateCol(col + 1)] != 0)
            counter++;
        if (grid[translateRow(row)][translateCol(col - 1)] != 0)
            counter++;
        if (grid[translateRow(row)][translateCol(col + 1)] != 0)
            counter++;
        if (grid[translateRow(row + 1)][translateCol(col - 1)] != 0)
            counter++;
        if (grid[translateRow(row + 1)][translateCol(col)] != 0)
            counter++;
        if (grid[translateRow(row + 1)][translateCol(col + 1)] != 0)
            counter++;
        return counter;
    }
    function getP1Neighbors(row, col, grid) {
        var counter = 0;
        if (grid[translateRow(row - 1)][translateCol(col - 1)] === 2)
            counter++;
        if (grid[translateRow(row - 1)][translateCol(col)] === 2)
            counter++;
        if (grid[translateRow(row - 1)][translateCol(col + 1)] === 2)
            counter++;
        if (grid[translateRow(row)][translateCol(col - 1)] === 2)
            counter++;
        if (grid[translateRow(row)][translateCol(col + 1)] === 2)
            counter++;
        if (grid[translateRow(row + 1)][translateCol(col - 1)] === 2)
            counter++;
        if (grid[translateRow(row + 1)][translateCol(col)] === 2)
            counter++;
        if (grid[translateRow(row + 1)][translateCol(col + 1)] === 2)
            counter++;
        return counter;
    }
    function getP2Neighbors(row, col, grid) {
        var counter = 0;
        if (grid[translateRow(row - 1)][translateCol(col - 1)] === 3)
            counter++;
        if (grid[translateRow(row - 1)][translateCol(col)] === 3)
            counter++;
        if (grid[translateRow(row - 1)][translateCol(col + 1)] === 3)
            counter++;
        if (grid[translateRow(row)][translateCol(col - 1)] === 3)
            counter++;
        if (grid[translateRow(row)][translateCol(col + 1)] === 3)
            counter++;
        if (grid[translateRow(row + 1)][translateCol(col - 1)] === 3)
            counter++;
        if (grid[translateRow(row + 1)][translateCol(col)] === 3)
            counter++;
        if (grid[translateRow(row + 1)][translateCol(col + 1)] === 3)
            counter++;
        return counter;
    }
    function advanceGeneration(grid, nextGenGrid) {
        for (var row = 0; row < grid.length; row++) {
            for (var col = 0; col < grid[row].length; col++) {
                var neighbors = getAliveNeighbors(row, col, grid);
                if (grid[row][col] != 0 && neighbors < 2)
                    nextGenGrid[row][col] = 0;
                if (grid[row][col] != 0 && (neighbors === 2 || neighbors === 3))
                    nextGenGrid[row][col] = grid[row][col];
                if (grid[row][col] != 0 && neighbors > 3)
                    nextGenGrid[row][col] = 0;
                if (grid[row][col] == 0 && neighbors === 3) {
                    if (getP1Neighbors(row, col, grid) > getP2Neighbors(row, col, grid)) {
                        nextGenGrid[row][col] = 2;
                    }
                    else {
                        nextGenGrid[row][col] = 3;
                    }
                }
            }
        }
        var currentGridCopy = Grid.buildFullGrid();
        for (var row = 0; row < grid.length; row++) {
            for (var col = 0; col < grid[row].length; col++) {
                currentGridCopy[row][col] = grid[row][col];
            }
        }
        for (var i = C.LOOP_CHECK_GENERATIONS - 1; i > 0; i--) {
            lastGenGrids[i] = lastGenGrids[i - 1];
        }
        lastGenGrids[0] = currentGridCopy;
        for (var row = 0; row < grid.length; row++) {
            for (var col = 0; col < grid[row].length; col++) {
                grid[row][col] = nextGenGrid[row][col];
                nextGenGrid[row][col] = 0;
            }
        }
    }
    Grid.advanceGeneration = advanceGeneration;
    function translateRow(x) {
        if (x < 0) {
            return x += C.FULL_GRID_ROWS;
        }
        if (x >= C.FULL_GRID_ROWS) {
            return x % C.FULL_GRID_ROWS;
        }
        return x;
    }
    function translateCol(y) {
        if (y < 0) {
            return y += C.FULL_GRID_COLS;
        }
        if (y >= C.FULL_GRID_COLS) {
            return y % C.FULL_GRID_COLS;
        }
        return y;
    }
    function gridCopy(fromGrid, toGrid) {
        if (!fromGrid || !toGrid || !fromGrid[0] || !toGrid[0] || fromGrid.length != toGrid.length || fromGrid[0].length != toGrid[0].length)
            throw new Error('fromGrid and toGrid must bo initialized and have the same dimensions');
        for (var row = 0; row < C.FULL_GRID_ROWS; row++) {
            for (var col = 0; col < C.FULL_GRID_COLS; col++) {
                toGrid[row][col] = fromGrid[row][col];
            }
        }
    }
    Grid.gridCopy = gridCopy;
    function logGrid(fullGrid) {
        for (var row = 0; row < C.FULL_GRID_ROWS; row++) {
            var rowString = '';
            for (var col = 0; col < C.FULL_GRID_COLS; col++) {
                rowString += fullGrid[row][col];
            }
            console.log(rowString);
        }
    }
    Grid.logGrid = logGrid;
})(Grid || (Grid = {}));
var FileIO;
(function (FileIO) {
    function download(filename, text) {
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        pom.setAttribute('download', filename);
        if (document.createEvent) {
            var event_1 = document.createEvent('MouseEvents');
            event_1.initEvent('click', true, true);
            pom.dispatchEvent(event_1);
        }
        else {
            pom.click();
        }
    }
    FileIO.download = download;
    function exportGrid(fullGrid, SAVE_FILE_VERSION, FILE_EXTENSION) {
        var configurationName = 'configuration'; // ToDo: Show dialog to user and let him enter a custom configuration name
        var gridString = 'v:' + SAVE_FILE_VERSION + ';' + configurationName + ';cols:' + C.PLACEMENT_GRID_COLS + ',rows:' + C.PLACEMENT_GRID_ROWS + ';';
        for (var row = 1; row <= C.PLACEMENT_GRID_ROWS; row++) {
            for (var col = 1; col <= C.PLACEMENT_GRID_COLS; col++) {
                gridString += '' + fullGrid[row][col];
            }
            if (row != C.PLACEMENT_GRID_ROWS) {
                gridString += ',';
            }
        }
        download('grid' + FILE_EXTENSION, gridString); // ToDo: Derive file name from configuration name
    }
    FileIO.exportGrid = exportGrid;
    function importGrid(content, mode, fullGrid) {
        console.log('importGrid starts');
        // ToDo: Validate and use the other information in a meaningful way
        var parts = content.split(';');
        if (parts.length < 4) {
            throw new Error('Invalid input format: missing data section');
        }
        var rows = parts[3].split(',');
        var grid = [];
        for (var i = 0; i < rows.length; i++) {
            var row = rows[i];
            var rowArray = [];
            for (var j = 0; j < row.length; j++) {
                var current = parseInt(row[j], 10);
                rowArray.push(current);
            }
            grid.push(rowArray);
        }
        if (mode === 0) {
            console.log('mode is 0 (P1)');
            console.log('checking condtions');
            if (grid.length === C.PLACEMENT_GRID_ROWS && grid[0].length === C.PLACEMENT_GRID_COLS) {
                console.log('conditions passed');
                for (var row = 0; row < C.PLACEMENT_GRID_ROWS; row++) {
                    for (var col = 0; col < C.PLACEMENT_GRID_COLS; col++) {
                        fullGrid[row + 1][col + 1] = grid[row][col];
                    }
                }
                console.log('iterated over grid');
            }
        }
        else if (mode === 1) {
            console.log('mode is 1 (P2)');
            console.log('translating grid');
            var p2Grid = Grid.translateP1GridToP2Grid(grid);
            console.log('grid translated');
            console.log('checking condtions');
            if (p2Grid.length === C.PLACEMENT_GRID_ROWS && p2Grid[0].length === C.PLACEMENT_GRID_COLS) {
                console.log('conditions passed');
                for (var row = 0; row < C.PLACEMENT_GRID_ROWS; row++) {
                    for (var col = 0; col < C.PLACEMENT_GRID_COLS; col++) {
                        fullGrid[row + 1][C.PLACEMENT_GRID_COLS + col + 2] = p2Grid[row][col];
                    }
                }
                console.log('iterated over grid');
            }
        }
        console.log('importGrid ends');
    }
    FileIO.importGrid = importGrid;
    function importFile(event, mode, fullGrid) {
        console.log('importFile for P' + (mode + 1) + ' starts');
        if (!event)
            return;
        if (!event.target)
            return;
        var target = event.target;
        if (!target)
            return;
        var files = target.files;
        if (!files)
            return;
        console.log('basic checks passed');
        var _loop_1 = function (i) {
            var reader = new FileReader();
            var file = files[i];
            reader.onload = function (e) {
                var _a;
                console.log('reader.onload starts');
                var content = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                console.log('content: ' + content);
                console.log('fullGrid before import:');
                Grid.logGrid(fullGrid);
                importGrid(content, mode, fullGrid);
                console.log('fullGrid after import:');
                Grid.logGrid(fullGrid);
                if (mode === 1) {
                    Renderer.drawP2Preview(previewCanvas, pctx, fullGrid);
                }
                else {
                    Renderer.drawP1Grid(canvas, ctx, fullGrid, cellSize);
                }
            };
            reader.onerror = function (e) {
                console.error("Error reading file: ".concat(file.name), e);
            };
            reader.readAsText(file);
        };
        for (var i = 0; i < files.length; i++) {
            _loop_1(i);
        }
    }
    FileIO.importFile = importFile;
})(FileIO || (FileIO = {}));
var Renderer;
(function (Renderer) {
    var speed = 1;
    function setSpeed(newSpeed) {
        speed = newSpeed;
    }
    Renderer.setSpeed = setSpeed;
    function getSpeed() {
        return speed;
    }
    Renderer.getSpeed = getSpeed;
    function setDisplay(element, displayValue) {
        if (!element)
            return;
        element.style.display = displayValue;
    }
    Renderer.setDisplay = setDisplay;
    function initializeCanvasForPlacement(canvas, previewCanvas) {
        if (!canvas)
            return;
        canvas.width = placementGridWidth;
        canvas.height = placementGridHeight;
        if (!previewCanvas)
            return;
        previewCanvas.width = C.PREVIEW_CANVAS_SIZE;
        previewCanvas.height = C.PREVIEW_CANVAS_SIZE;
    }
    Renderer.initializeCanvasForPlacement = initializeCanvasForPlacement;
    function drawP1Grid(canvas, ctx, fullGrid, cellSize) {
        if (!canvas)
            return;
        if (!ctx)
            return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (var row = 1; row <= C.PLACEMENT_GRID_ROWS; row++) {
            for (var col = 1; col <= C.PLACEMENT_GRID_COLS; col++) {
                var x = (col - 1) * cellSize;
                var y = (row - 1) * cellSize;
                ctx.strokeStyle = '#CCCCCC';
                ctx.strokeRect(x, y, cellSize, cellSize);
                if (fullGrid[row][col] === 1) {
                    ctx.fillStyle = '#000000';
                    ctx.fillRect(x, y, cellSize, cellSize);
                }
                if (fullGrid[row][col] === 2) {
                    ctx.fillStyle = '#0000FF';
                    ctx.fillRect(x, y, cellSize, cellSize);
                }
                if (fullGrid[row][col] === 3) {
                    ctx.fillStyle = '#FF0000';
                    ctx.fillRect(x, y, cellSize, cellSize);
                }
            }
        }
    }
    Renderer.drawP1Grid = drawP1Grid;
    function drawP2Preview(previewCanvas, pctx, fullGrid) {
        if (!previewCanvas)
            return;
        if (!pctx)
            return;
        pctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
        pctx.fillStyle = '#FFFFFF';
        pctx.fillRect(0, 0, previewCanvas.width, previewCanvas.height);
        var previewCellSize = previewCanvas.width / C.PLACEMENT_GRID_COLS;
        for (var row = 0; row < C.PLACEMENT_GRID_ROWS; row++) {
            for (var col = 0; col < C.PLACEMENT_GRID_COLS; col++) {
                var x = col * previewCellSize;
                var y = row * previewCellSize;
                pctx.strokeStyle = '#CCCCCC';
                pctx.strokeRect(x, y, previewCellSize, previewCellSize);
                var fullGridValue = fullGrid[row + 1][C.PLACEMENT_GRID_COLS + col + 2];
                if (fullGridValue === 3) {
                    pctx.fillStyle = '#FF0000';
                    pctx.fillRect(x, y, previewCellSize, previewCellSize);
                }
            }
        }
    }
    Renderer.drawP2Preview = drawP2Preview;
    function drawFullGrid(canvas, ctx, fullGrid, cellSize) {
        if (!canvas)
            return;
        if (!ctx)
            return;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (var row = 0; row < C.FULL_GRID_ROWS; row++) {
            for (var col = 0; col < C.FULL_GRID_COLS; col++) {
                var x = col * cellSize;
                var y = row * cellSize;
                ctx.strokeStyle = '#CCCCCC';
                ctx.strokeRect(x, y, cellSize, cellSize);
                if (fullGrid[row][col] === 1) {
                    ctx.fillStyle = '#000000';
                    ctx.fillRect(x, y, cellSize, cellSize);
                }
                if (fullGrid[row][col] === 2) {
                    ctx.fillStyle = '#0000FF';
                    ctx.fillRect(x, y, cellSize, cellSize);
                }
                if (fullGrid[row][col] === 3) {
                    ctx.fillStyle = '#FF0000';
                    ctx.fillRect(x, y, cellSize, cellSize);
                }
            }
        }
    }
    Renderer.drawFullGrid = drawFullGrid;
    function showWarningDialog(warningDialog, dialogMessage, message) {
        if (!warningDialog || !dialogMessage)
            return;
        dialogMessage.textContent = message;
        warningDialog.style.display = 'flex';
    }
    Renderer.showWarningDialog = showWarningDialog;
    function updateSpeed(generation) {
        if (generation === 5) {
            speed = 2;
        }
        else if (generation === 25) {
            speed = 4;
        }
        else if (generation === 100) {
            speed = 8;
        }
        else if (generation === 300) {
            speed = 16;
        }
        else if (generation === 600) {
            speed = 32;
        }
        else if (generation === 1200) {
            speed = 64;
        }
        else if (generation === 1800) {
            speed = 128;
        }
    }
    Renderer.updateSpeed = updateSpeed;
})(Renderer || (Renderer = {}));
// Sirius GG's "Conway's Game of Life" PVP
// A 2-player Game of Life Esports implementation
var noJs = document.querySelector('#no-js');
var loading = document.querySelector('#loading');
var gameContainer = document.querySelector('#game-container');
var leftBox = document.querySelector('#left-box');
var wisdomBoxContent = document.querySelector('#wisdom-box-content');
var gameAndSubtext = document.querySelector('#game-and-subtext');
var canvas = document.querySelector('#game-canvas');
var ctx = canvas.getContext('2d');
var subtext = document.querySelector('#subtext');
var buttonPanelRight = document.querySelector('#button-panel-right');
var clearButton = document.querySelector('#clear-button');
var generateP1GridButton = document.querySelector('#random-p1-grid-button');
var exportButton = document.querySelector('#export-button');
var importP1GridButton = document.querySelector('#import-p1-button');
var generateP2GridButton = document.querySelector('#random-p2-grid-button');
var importP2GridButton = document.querySelector('#import-p2-button');
var mirrorP1GridButton = document.querySelector('#mirror-p1-button');
var playButton = document.querySelector('#play-button');
var previewCanvas = document.querySelector('#p2-preview-canvas');
var pctx = previewCanvas.getContext('2d');
var continueButton = document.querySelector('#continue-button');
var newGameButton = document.querySelector('#new-game-button');
var warningDialog = document.querySelector('#warning-dialog');
var dialogMessage = document.querySelector('#dialog-message');
var dialogOkButton = document.querySelector('#dialog-ok-button');
var fullGrid = Grid.buildFullGrid();
var initialGrid = Grid.buildFullGrid();
var lastGenGrids = Grid.buildFullGrids(C.LOOP_CHECK_GENERATIONS);
var nextGenGrid = Grid.buildFullGrid();
var cellSize = Math.min(C.FRAME_WIDTH, C.FRAME_HEIGHT) / (C.PLACEMENT_GRID_ROWS + 2);
var placementGridWidth = (C.PLACEMENT_GRID_COLS * cellSize) + 1;
var placementGridHeight = (C.PLACEMENT_GRID_ROWS * cellSize) + 1;
var sleepTime = C.INITIAL_SLEEP_TIME;
var endlessRun = true;
var gameHasEndedManually = false;
function showGame() {
    Renderer.drawP1Grid(canvas, ctx, fullGrid, cellSize);
    Renderer.drawP2Preview(previewCanvas, pctx, fullGrid);
    Renderer.setDisplay(loading, 'none');
    Renderer.setDisplay(gameContainer, 'flex');
}
function sleepWithRedraw(milliseconds, callback, generation) {
    if (!subtext)
        return;
    var start = Date.now();
    function checkTime() {
        var current = Date.now();
        if (current - start < milliseconds) {
            Renderer.drawFullGrid(canvas, ctx, fullGrid, cellSize);
            if (generation != undefined) {
                subtext.innerHTML = 'Generation ' + generation + '/' + C.MAX_GENERATIONS + ' (speed: ' + Renderer.getSpeed() + 'x)';
            }
            requestAnimationFrame(checkTime);
        }
        else {
            callback();
        }
    }
    checkTime();
}
function showResultInSubtext(generations) {
    if (!subtext)
        return;
    var p1IsAlive = Grid.getP1IsAlive();
    var p2IsAlive = Grid.getP2IsAlive();
    var p1AliveAmount = Grid.countAliveP1();
    var p2AliveAmount = Grid.countAliveP2();
    var isStable = !Grid.gridIsEmpty(fullGrid) && !Grid.gridIsEmpty(lastGenGrids[0]) && Grid.gridEquals(fullGrid, lastGenGrids[0]);
    if (p1IsAlive && p2IsAlive && generations === C.MAX_GENERATIONS) {
        if (p1AliveAmount === p2AliveAmount) {
            subtext.innerHTML = 'Both players survived for ' + C.MAX_GENERATIONS + ' generations and have ' + p1AliveAmount + ' living cells. Draw.';
        }
        else if (p1AliveAmount > p2AliveAmount) {
            subtext.innerHTML = 'Both players survived for ' + C.MAX_GENERATIONS + ' generations. P1 wins with ' + p1AliveAmount + ' to ' + p2AliveAmount + ' living cells.';
        }
        else {
            subtext.innerHTML = 'Both players survived for ' + C.MAX_GENERATIONS + ' generations. P2 wins with ' + p2AliveAmount + ' to ' + p1AliveAmount + ' living cells.';
        }
        return;
    }
    var generationsString = '';
    if (generations === 1) {
        generationsString = 'only 1 generation';
    }
    else {
        generationsString = generations + ' generations';
    }
    if (p1IsAlive && !p2IsAlive) {
        subtext.innerHTML = 'P1 won after ' + generationsString + " by killing all of P2's cells.";
        return;
    }
    if (!p1IsAlive && p2IsAlive) {
        subtext.innerHTML = 'P2 won after ' + generationsString + " by killing all of P1's cells.";
        return;
    }
    if (!p1IsAlive && !p2IsAlive) {
        subtext.innerHTML = 'Both players died at the same time after ' + generationsString + '. Draw.';
        return;
    }
    if (isStable) {
        if (p1AliveAmount === p2AliveAmount) {
            subtext.innerHTML = 'Stable configuration detected after ' + generationsString + ' and both players have ' + p1AliveAmount + ' living cells. Draw.';
        }
        else if (p1AliveAmount > p2AliveAmount) {
            subtext.innerHTML = 'Stable configuration detected after ' + generationsString + '. P1 wins with ' + p1AliveAmount + ' to ' + p2AliveAmount + ' living cells.';
        }
        else {
            subtext.innerHTML = 'Stable configuration detected after ' + generationsString + '. P2 wins with ' + p2AliveAmount + ' to ' + p1AliveAmount + ' living cells.';
        }
    }
    else {
        if (p1AliveAmount === p2AliveAmount) {
            subtext.innerHTML = 'Loop detected after ' + generationsString + ' and both players have ' + p1AliveAmount + ' living cells. Draw.';
        }
        else if (p1AliveAmount > p2AliveAmount) {
            subtext.innerHTML = 'Loop detected after ' + generationsString + '. P1 wins with ' + p1AliveAmount + ' to ' + p2AliveAmount + ' living cells.';
        }
        else {
            subtext.innerHTML = 'Loop detected after ' + generationsString + '. P2 wins with ' + p2AliveAmount + ' to ' + p1AliveAmount + ' living cells.';
        }
    }
}
function _continueGame() {
    if (gameHasEndedManually) {
        endlessRun = false;
        return;
    }
    sleepWithRedraw(sleepTime, function () {
        if (!gameHasEndedManually) {
            Grid.advanceGeneration(fullGrid, nextGenGrid);
            Renderer.drawFullGrid(canvas, ctx, fullGrid, cellSize);
        }
        if (endlessRun && !gameHasEndedManually) {
            _continueGame();
        }
    }, undefined);
}
function continueGame() {
    endlessRun = true;
    Renderer.setDisplay(continueButton, 'none');
    _continueGame();
}
function newGame() {
    gameHasEndedManually = true;
    endlessRun = false;
    setTimeout(function () {
        Renderer.setDisplay(continueButton, 'none');
        Renderer.setDisplay(newGameButton, 'none');
        for (var row = 0; row < C.FULL_GRID_ROWS; row++) {
            for (var col = 0; col < C.FULL_GRID_COLS; col++) {
                fullGrid[row][col] = initialGrid[row][col];
                nextGenGrid[row][col] = 0;
            }
        }
        for (var i = 0; i < C.LOOP_CHECK_GENERATIONS; i++) {
            lastGenGrids[i] = Grid.buildFullGrid();
        }
        Renderer.setDisplay(leftBox, 'flex');
        Renderer.setDisplay(buttonPanelRight, 'flex');
        cellSize = Math.min(C.FRAME_WIDTH, C.FRAME_HEIGHT) / (C.PLACEMENT_GRID_ROWS + 2);
        if (canvas) {
            canvas.width = placementGridWidth;
            canvas.height = placementGridHeight;
            if (ctx) {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        }
        Renderer.setSpeed(1);
        sleepTime = C.INITIAL_SLEEP_TIME;
        if (subtext) {
            subtext.innerHTML = "Sirius GG's Conway's Game of Life PVP";
        }
        Renderer.drawP1Grid(canvas, ctx, fullGrid, cellSize);
        Renderer.drawP2Preview(previewCanvas, pctx, fullGrid);
        setupEventListeners();
    }, sleepTime * 1.1);
}
function startRound() {
    if (!Grid.getP1IsAlive()) {
        Renderer.showWarningDialog(warningDialog, dialogMessage, "P1 has an empty grid. Cannot start.");
        return;
    }
    if (!Grid.getP2IsAlive()) {
        Renderer.showWarningDialog(warningDialog, dialogMessage, "P2 has an empty grid. Cannot start.");
        return;
    }
    unregisterEventListeners();
    gameHasEndedManually = false;
    Grid.gridCopy(fullGrid, initialGrid);
    Renderer.setDisplay(leftBox, 'none');
    Renderer.setDisplay(buttonPanelRight, 'none');
    cellSize = Math.min(C.FRAME_WIDTH, C.FRAME_HEIGHT) / (C.FULL_GRID_ROWS + 2);
    var fullGridWidth = (C.FULL_GRID_COLS * cellSize) + 1;
    var fullGridHeight = (C.FULL_GRID_ROWS * cellSize) + 1;
    if (!canvas)
        return;
    canvas.width = fullGridWidth;
    canvas.height = fullGridHeight;
    Renderer.drawFullGrid(canvas, ctx, fullGrid, cellSize);
    var generations = 0;
    function advanceAndCheck() {
        if (generations < C.MAX_GENERATIONS && !Grid.gameHasEnded()) {
            Renderer.updateSpeed(generations);
            sleepTime = C.INITIAL_SLEEP_TIME / Renderer.getSpeed();
            sleepWithRedraw(sleepTime, function () {
                Grid.advanceGeneration(fullGrid, nextGenGrid);
                Renderer.drawFullGrid(canvas, ctx, fullGrid, cellSize);
                generations++;
                if (Grid.gameHasEnded() || generations >= C.MAX_GENERATIONS) {
                    showResultInSubtext(generations);
                    Renderer.setDisplay(continueButton, 'block');
                    Renderer.setDisplay(newGameButton, 'block');
                    return;
                }
                advanceAndCheck();
            }, generations);
        }
        else {
            if (generations >= C.MAX_GENERATIONS && !Grid.gameHasEnded()) {
                showResultInSubtext(C.MAX_GENERATIONS);
                Renderer.setDisplay(continueButton, 'block');
                Renderer.setDisplay(newGameButton, 'block');
            }
        }
    }
    advanceAndCheck();
}
function setupEventListeners() {
    if (!canvas)
        return;
    unregisterEventListeners();
    Placement.setupHandlers(fullGrid, canvas, ctx, cellSize);
    // @ts-ignore
    canvas.addEventListener('mousedown', Placement.canvasMouseDownHandler);
    // @ts-ignore
    canvas.addEventListener('mousemove', Placement.canvasMouseMoveHandler);
    canvas.addEventListener('mouseup', Placement.endDrag);
    canvas.addEventListener('mouseleave', Placement.endDrag);
    if (!generateP1GridButton)
        return;
    generateP1GridButton.addEventListener('click', Grid.generateRandomP1Grid);
    if (!generateP2GridButton)
        return;
    generateP2GridButton.addEventListener('click', Grid.generateRandomP2Grid);
    if (!exportButton)
        return;
    exportButton.addEventListener('click', function () { return FileIO.exportGrid(fullGrid, C.SAVE_FILE_VERSION, C.FILE_EXTENSION); });
    if (!continueButton)
        return;
    continueButton.addEventListener('click', continueGame);
    if (!newGameButton)
        return;
    newGameButton.addEventListener('click', newGame);
    if (!importP1GridButton)
        return;
    importP1GridButton.addEventListener('change', function (event) { return FileIO.importFile(event, 0, fullGrid); });
    if (!clearButton)
        return;
    clearButton.addEventListener('click', Grid.clearGrid);
    if (!importP2GridButton)
        return;
    importP2GridButton.addEventListener('change', function (event) { return FileIO.importFile(event, 1, fullGrid); });
    if (!playButton)
        return;
    playButton.addEventListener('click', startRound);
    if (!dialogOkButton)
        return;
    dialogOkButton.addEventListener('click', function () { return Renderer.setDisplay(warningDialog, 'none'); });
    if (!mirrorP1GridButton)
        return;
    mirrorP1GridButton.addEventListener('click', Grid.mirrorP1Grid);
}
function unregisterEventListeners() {
    if (!canvas)
        return;
    if (Placement.canvasMouseDownHandler) {
        canvas.removeEventListener('mousedown', Placement.canvasMouseDownHandler);
    }
    if (Placement.canvasMouseMoveHandler) {
        canvas.removeEventListener('mousemove', Placement.canvasMouseMoveHandler);
    }
    canvas.removeEventListener('mouseup', Placement.endDrag);
    canvas.removeEventListener('mouseleave', Placement.endDrag);
}
Renderer.setDisplay(noJs, 'none');
Renderer.setDisplay(loading, 'flex');
Renderer.initializeCanvasForPlacement(canvas, previewCanvas);
showGame();
setupEventListeners();
