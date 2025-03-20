var C;
(function (C) {
    C.FRAME_WIDTH = window.innerWidth;
    C.FRAME_HEIGHT = window.innerHeight;
    C.DESKTOP_BREAKPOINT = 1024;
    C.PLACEMENT_GRID_COLS = 15;
    C.PLACEMENT_GRID_ROWS = 15;
    C.PLACEMENT_GRID_CELL_SIZE = Math.min(C.FRAME_WIDTH, C.FRAME_HEIGHT) / (C.PLACEMENT_GRID_ROWS + 2);
    C.FULL_GRID_COLS = (2 * C.PLACEMENT_GRID_COLS) + 3;
    C.FULL_GRID_ROWS = C.PLACEMENT_GRID_ROWS + 2;
    C.MAX_GENERATIONS = 2500;
    C.LOOP_CHECK_GENERATIONS = 30;
    C.INITIAL_SLEEP_TIME = 400;
    C.FILE_EXTENSION = '.gol';
    C.GAME_VERSION = 'v0.1.0';
    C.SAVE_FILE_VERSION = '1.0.0'; // not allowed to ever contain a ";" in it for save file reasons.
    C.PREVIEW_CANVAS_SIZE = 200;
    C.DEBUG = false;
})(C || (C = {}));
var E;
(function (E) {
    var noJs = document.querySelector('#no-js');
    var loading = document.querySelector('#loading');
    var gameContainer = document.querySelector('#game-container');
    var leftBox = document.querySelector('#left-box');
    var gameAndSubtext = document.querySelector('#game-and-subtext');
    var canvas = document.querySelector('#game-canvas');
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
    var continueButton = document.querySelector('#continue-button');
    var newGameButton = document.querySelector('#new-game-button');
    var warningDialog = document.querySelector('#warning-dialog');
    var dialogMessage = document.querySelector('#dialog-message');
    var dialogOkButton = document.querySelector('#dialog-ok-button');
    if (!noJs)
        throw new Error('Element #no-js not found');
    if (!loading)
        throw new Error('Element #loading not found');
    if (!gameContainer)
        throw new Error('Element #game-container not found');
    if (!leftBox)
        throw new Error('Element #left-box not found');
    if (!gameAndSubtext)
        throw new Error('Element #game-and-subtext not found');
    if (!canvas)
        throw new Error('Element #game-canvas not found');
    if (!subtext)
        throw new Error('Element #subtext not found');
    if (!buttonPanelRight)
        throw new Error('Element #button-panel-right not found');
    if (!clearButton)
        throw new Error('Element #clear-button not found');
    if (!generateP1GridButton)
        throw new Error('Element #random-p1-grid-button not found');
    if (!exportButton)
        throw new Error('Element #export-button not found');
    if (!importP1GridButton)
        throw new Error('Element #import-p1-button not found');
    if (!generateP2GridButton)
        throw new Error('Element #random-p2-grid-button not found');
    if (!importP2GridButton)
        throw new Error('Element #import-p2-button not found');
    if (!mirrorP1GridButton)
        throw new Error('Element #mirror-p1-button not found');
    if (!playButton)
        throw new Error('Element #play-button not found');
    if (!previewCanvas)
        throw new Error('Element #p2-preview-canvas not found');
    if (!continueButton)
        throw new Error('Element #continue-button not found');
    if (!newGameButton)
        throw new Error('Element #new-game-button not found');
    if (!warningDialog)
        throw new Error('Element #warning-dialog not found');
    if (!dialogMessage)
        throw new Error('Element #dialog-message not found');
    if (!dialogOkButton)
        throw new Error('Element #dialog-ok-button not found');
    function getNoJs() {
        return noJs;
    }
    E.getNoJs = getNoJs;
    function getLoading() {
        return loading;
    }
    E.getLoading = getLoading;
    function getGameContainer() {
        return gameContainer;
    }
    E.getGameContainer = getGameContainer;
    function getLeftBox() {
        return leftBox;
    }
    E.getLeftBox = getLeftBox;
    function getGameAndSubtext() {
        return gameAndSubtext;
    }
    E.getGameAndSubtext = getGameAndSubtext;
    function getCanvas() {
        return canvas;
    }
    E.getCanvas = getCanvas;
    function getSubtext() {
        return subtext;
    }
    E.getSubtext = getSubtext;
    function getButtonPanelRight() {
        return buttonPanelRight;
    }
    E.getButtonPanelRight = getButtonPanelRight;
    function getClearButton() {
        return clearButton;
    }
    E.getClearButton = getClearButton;
    function getGenerateP1GridButton() {
        return generateP1GridButton;
    }
    E.getGenerateP1GridButton = getGenerateP1GridButton;
    function getExportButton() {
        return exportButton;
    }
    E.getExportButton = getExportButton;
    function getImportP1GridButton() {
        return importP1GridButton;
    }
    E.getImportP1GridButton = getImportP1GridButton;
    function getGenerateP2GridButton() {
        return generateP2GridButton;
    }
    E.getGenerateP2GridButton = getGenerateP2GridButton;
    function getImportP2GridButton() {
        return importP2GridButton;
    }
    E.getImportP2GridButton = getImportP2GridButton;
    function getMirrorP1GridButton() {
        return mirrorP1GridButton;
    }
    E.getMirrorP1GridButton = getMirrorP1GridButton;
    function getPlayButton() {
        return playButton;
    }
    E.getPlayButton = getPlayButton;
    function getPreviewCanvas() {
        return previewCanvas;
    }
    E.getPreviewCanvas = getPreviewCanvas;
    function getContinueButton() {
        return continueButton;
    }
    E.getContinueButton = getContinueButton;
    function getNewGameButton() {
        return newGameButton;
    }
    E.getNewGameButton = getNewGameButton;
    function getWarningDialog() {
        return warningDialog;
    }
    E.getWarningDialog = getWarningDialog;
    function getDialogMessage() {
        return dialogMessage;
    }
    E.getDialogMessage = getDialogMessage;
    function getDialogOkButton() {
        return dialogOkButton;
    }
    E.getDialogOkButton = getDialogOkButton;
})(E || (E = {}));
var Placement;
(function (Placement) {
    var isDragging = false;
    var dragState = -1;
    var lastTouchPosition = null;
    Placement.canvasMouseDownHandler = null;
    Placement.canvasMouseMoveHandler = null;
    Placement.canvasTouchStartHandler = null;
    Placement.canvasTouchMoveHandler = null;
    Placement.canvasTouchEndHandler = null;
    function setupHandlers(fullGrid) {
        Placement.canvasMouseDownHandler = function (event) { return startDrag(event, fullGrid); };
        Placement.canvasMouseMoveHandler = function (event) { return dragHandler(event, fullGrid, canvas, ctx); };
        Placement.canvasTouchStartHandler = function (event) { return startTouchDrag(event, fullGrid); };
        Placement.canvasTouchMoveHandler = function (event) { return touchDragHandler(event, fullGrid, canvas, ctx); };
        Placement.canvasTouchEndHandler = function () { return endDrag(); };
    }
    Placement.setupHandlers = setupHandlers;
    function startDrag(event, fullGrid) {
        var _a = getP1CellFromEvent(event), row = _a.row, col = _a.col;
        if (row === -1 || col === -1)
            return;
        isDragging = true;
        dragState = fullGrid[row][col] === 0 ? 2 : 0;
        toggleCell(row, col, fullGrid);
    }
    Placement.startDrag = startDrag;
    function startTouchDrag(event, fullGrid) {
        event.preventDefault(); // Prevent scrolling while drawing
        if (event.touches.length !== 1)
            return;
        var touch = event.touches[0];
        var _a = getP1CellFromTouch(touch), row = _a.row, col = _a.col;
        if (row === -1 || col === -1)
            return;
        isDragging = true;
        dragState = fullGrid[row][col] === 0 ? 2 : 0;
        lastTouchPosition = { row: row, col: col };
        toggleCell(row, col, fullGrid);
    }
    Placement.startTouchDrag = startTouchDrag;
    function dragHandler(event, fullGrid, canvas, ctx) {
        if (!isDragging)
            return;
        var _a = getP1CellFromEvent(event), row = _a.row, col = _a.col;
        if (row === -1 || col === -1)
            return;
        if (dragState === 2 && fullGrid[row][col] === 0) {
            fullGrid[row][col] = 2;
            Renderer.drawP1Grid(fullGrid);
        }
        if (dragState === 0 && fullGrid[row][col] === 2) {
            fullGrid[row][col] = 0;
            Renderer.drawP1Grid(fullGrid);
        }
    }
    Placement.dragHandler = dragHandler;
    function touchDragHandler(event, fullGrid, canvas, ctx) {
        event.preventDefault(); // Prevent scrolling while drawing
        if (!isDragging || event.touches.length !== 1)
            return;
        var touch = event.touches[0];
        var _a = getP1CellFromTouch(touch), row = _a.row, col = _a.col;
        if (row === -1 || col === -1)
            return;
        // Only update if we've moved to a new cell
        if (lastTouchPosition && (lastTouchPosition.row !== row || lastTouchPosition.col !== col)) {
            if (dragState === 2 && fullGrid[row][col] === 0) {
                fullGrid[row][col] = 2;
                Renderer.drawP1Grid(fullGrid);
            }
            if (dragState === 0 && fullGrid[row][col] === 2) {
                fullGrid[row][col] = 0;
                Renderer.drawP1Grid(fullGrid);
            }
            lastTouchPosition = { row: row, col: col };
        }
    }
    Placement.touchDragHandler = touchDragHandler;
    function endDrag() {
        isDragging = false;
        dragState = -1;
        lastTouchPosition = null;
    }
    Placement.endDrag = endDrag;
    function getP1CellFromEvent(event) {
        var rect = E.getCanvas().getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
        return calculateP1Cell(x, y);
    }
    function getP1CellFromTouch(touch) {
        var rect = E.getCanvas().getBoundingClientRect();
        var x = touch.clientX - rect.left;
        var y = touch.clientY - rect.top;
        return calculateP1Cell(x, y);
    }
    function calculateP1Cell(x, y) {
        var col = Math.floor(x / C.PLACEMENT_GRID_CELL_SIZE);
        var row = Math.floor(y / C.PLACEMENT_GRID_CELL_SIZE);
        if (col >= 0 && col < C.PLACEMENT_GRID_COLS && row >= 0 && row < C.PLACEMENT_GRID_ROWS) {
            return { row: row + 1, col: col + 1 };
        }
        return { row: -1, col: -1 };
    }
    function toggleCell(row, col, fullGrid) {
        fullGrid[row][col] = fullGrid[row][col] === 0 ? 2 : 0;
        Renderer.drawP1Grid(fullGrid);
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
        Renderer.drawP1Grid(fullGrid);
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
        Renderer.drawP2Preview(fullGrid);
    }
    Grid.generateRandomP2Grid = generateRandomP2Grid;
    function clearGrid() {
        for (var row = 1; row <= C.PLACEMENT_GRID_ROWS; row++) {
            for (var col = 1; col <= C.PLACEMENT_GRID_COLS; col++) {
                fullGrid[row][col] = 0;
            }
        }
        Renderer.drawP1Grid(fullGrid);
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
        Renderer.drawP2Preview(fullGrid);
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
        debugLog('importGrid starts');
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
            debugLog('mode is 0 (P1)');
            debugLog('checking condtions');
            if (grid.length === C.PLACEMENT_GRID_ROWS && grid[0].length === C.PLACEMENT_GRID_COLS) {
                debugLog('conditions passed');
                for (var row = 0; row < C.PLACEMENT_GRID_ROWS; row++) {
                    for (var col = 0; col < C.PLACEMENT_GRID_COLS; col++) {
                        fullGrid[row + 1][col + 1] = grid[row][col];
                    }
                }
                debugLog('iterated over grid');
            }
        }
        else if (mode === 1) {
            debugLog('mode is 1 (P2)');
            debugLog('translating grid');
            var p2Grid = Grid.translateP1GridToP2Grid(grid);
            debugLog('grid translated');
            debugLog('checking condtions');
            if (p2Grid.length === C.PLACEMENT_GRID_ROWS && p2Grid[0].length === C.PLACEMENT_GRID_COLS) {
                debugLog('conditions passed');
                for (var row = 0; row < C.PLACEMENT_GRID_ROWS; row++) {
                    for (var col = 0; col < C.PLACEMENT_GRID_COLS; col++) {
                        fullGrid[row + 1][C.PLACEMENT_GRID_COLS + col + 2] = p2Grid[row][col];
                    }
                }
                debugLog('iterated over grid');
            }
        }
        debugLog('importGrid ends');
    }
    FileIO.importGrid = importGrid;
    function importFile(event, mode, fullGrid) {
        debugLog('importFile for P' + (mode + 1) + ' starts');
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
        debugLog('basic checks passed');
        var _loop_1 = function (i) {
            var reader = new FileReader();
            var file = files[i];
            reader.onload = function (e) {
                var _a;
                debugLog('reader.onload starts');
                var content = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                debugLog('content: ' + content);
                debugLog('fullGrid before import:');
                if (C.DEBUG) {
                    Grid.logGrid(fullGrid);
                }
                importGrid(content, mode, fullGrid);
                debugLog('fullGrid after import:');
                if (C.DEBUG) {
                    Grid.logGrid(fullGrid);
                }
                if (mode === 0) {
                    Renderer.drawP1Grid(fullGrid);
                }
                else {
                    Renderer.drawP2Preview(fullGrid);
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
    function debugLog(message) {
        if (C.DEBUG) {
            console.log(message);
        }
    }
})(FileIO || (FileIO = {}));
var Renderer;
(function (Renderer) {
    var canvas = E.getCanvas();
    var previewCanvas = E.getPreviewCanvas();
    var ctx = canvas.getContext('2d');
    var pctx = previewCanvas.getContext('2d');
    var warningDialog = E.getWarningDialog();
    var dialogMessage = E.getDialogMessage();
    var speed = 1;
    function calcFullGridCellSize() {
        if (C.FRAME_WIDTH >= C.DESKTOP_BREAKPOINT) {
            debugLog('Desktop detected');
            return Math.min(C.FRAME_WIDTH, C.FRAME_HEIGHT) / (C.FULL_GRID_ROWS + 2);
        }
        else {
            debugLog('Mobile detected');
            return Math.min(C.FRAME_WIDTH, C.FRAME_HEIGHT) / (Math.max(C.FULL_GRID_ROWS, C.FULL_GRID_COLS) + 2);
        }
    }
    Renderer.calcFullGridCellSize = calcFullGridCellSize;
    var fullGridCellSize = calcFullGridCellSize();
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
    function initializeCanvasForPlacement() {
        canvas.width = placementGridWidth;
        canvas.height = placementGridHeight;
        previewCanvas.width = C.PREVIEW_CANVAS_SIZE;
        previewCanvas.height = C.PREVIEW_CANVAS_SIZE;
    }
    Renderer.initializeCanvasForPlacement = initializeCanvasForPlacement;
    function drawP1Grid(fullGrid) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (var row = 1; row <= C.PLACEMENT_GRID_ROWS; row++) {
            for (var col = 1; col <= C.PLACEMENT_GRID_COLS; col++) {
                var x = (col - 1) * C.PLACEMENT_GRID_CELL_SIZE;
                var y = (row - 1) * C.PLACEMENT_GRID_CELL_SIZE;
                ctx.strokeStyle = '#CCCCCC';
                ctx.strokeRect(x, y, C.PLACEMENT_GRID_CELL_SIZE, C.PLACEMENT_GRID_CELL_SIZE);
                if (fullGrid[row][col] === 1) {
                    ctx.fillStyle = '#000000';
                    ctx.fillRect(x, y, C.PLACEMENT_GRID_CELL_SIZE, C.PLACEMENT_GRID_CELL_SIZE);
                }
                if (fullGrid[row][col] === 2) {
                    ctx.fillStyle = '#0000FF';
                    ctx.fillRect(x, y, C.PLACEMENT_GRID_CELL_SIZE, C.PLACEMENT_GRID_CELL_SIZE);
                }
                if (fullGrid[row][col] === 3) {
                    ctx.fillStyle = '#FF0000';
                    ctx.fillRect(x, y, C.PLACEMENT_GRID_CELL_SIZE, C.PLACEMENT_GRID_CELL_SIZE);
                }
            }
        }
    }
    Renderer.drawP1Grid = drawP1Grid;
    function drawP2Preview(fullGrid) {
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
    function drawFullGrid(fullGrid) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (var row = 0; row < C.FULL_GRID_ROWS; row++) {
            for (var col = 0; col < C.FULL_GRID_COLS; col++) {
                var x = col * fullGridCellSize;
                var y = row * fullGridCellSize;
                ctx.strokeStyle = '#CCCCCC';
                ctx.strokeRect(x, y, fullGridCellSize, fullGridCellSize);
                if (fullGrid[row][col] === 1) {
                    ctx.fillStyle = '#000000';
                    ctx.fillRect(x, y, fullGridCellSize, fullGridCellSize);
                }
                if (fullGrid[row][col] === 2) {
                    ctx.fillStyle = '#0000FF';
                    ctx.fillRect(x, y, fullGridCellSize, fullGridCellSize);
                }
                if (fullGrid[row][col] === 3) {
                    ctx.fillStyle = '#FF0000';
                    ctx.fillRect(x, y, fullGridCellSize, fullGridCellSize);
                }
            }
        }
    }
    Renderer.drawFullGrid = drawFullGrid;
    function showWarningDialog(message) {
        dialogMessage.innerHTML = message;
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
    function dialogOkHandler() {
        setDisplay(warningDialog, 'none');
    }
    Renderer.dialogOkHandler = dialogOkHandler;
    function debugLog(message) {
        if (C.DEBUG) {
            console.log(message);
        }
    }
})(Renderer || (Renderer = {}));
/// <reference path="./grid.ts" />
/// <reference path="./render.ts" />
/// <reference path="./placement.ts" />
/// <reference path="./io.ts" />
/// <reference path="./constants.ts" />
// Sirius GG's "Conway's Game of Life" PVP
// A 2-player Game of Life Esports implementation
var fullGrid = Grid.buildFullGrid();
var initialGrid = Grid.buildFullGrid();
var lastGenGrids = Grid.buildFullGrids(C.LOOP_CHECK_GENERATIONS);
var nextGenGrid = Grid.buildFullGrid();
var placementGridWidth = (C.PLACEMENT_GRID_COLS * C.PLACEMENT_GRID_CELL_SIZE) + 1;
var placementGridHeight = (C.PLACEMENT_GRID_ROWS * C.PLACEMENT_GRID_CELL_SIZE) + 1;
var sleepTime = C.INITIAL_SLEEP_TIME;
var endlessRun = true;
var gameHasEndedManually = false;
var optionContinueDragWhenMouseLeavesCanvas = true;
var canvas = E.getCanvas();
var previewCanvas = E.getPreviewCanvas();
var ctx = canvas.getContext('2d');
var pctx = previewCanvas.getContext('2d');
var subtext = E.getSubtext();
var leftBox = E.getLeftBox();
var buttonPanelRight = E.getButtonPanelRight();
var warningDialog = E.getWarningDialog();
var dialogMessage = E.getDialogMessage();
var continueButton = E.getContinueButton();
var newGameButton = E.getNewGameButton();
function sleepWithRedraw(milliseconds, callback, generation) {
    var start = Date.now();
    function checkTime() {
        var current = Date.now();
        if (current - start < milliseconds) {
            Renderer.drawFullGrid(fullGrid);
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
            Renderer.drawFullGrid(fullGrid);
        }
        if (endlessRun && !gameHasEndedManually) {
            _continueGame();
        }
    }, undefined);
}
function continueGame() {
    endlessRun = true;
    Renderer.setDisplay(E.getContinueButton(), 'none');
    _continueGame();
}
function newGamePlacement() {
    gameHasEndedManually = true;
    endlessRun = false;
    setTimeout(function () {
        Renderer.setDisplay(E.getContinueButton(), 'none');
        Renderer.setDisplay(E.getNewGameButton(), 'none');
        for (var row = 0; row < C.FULL_GRID_ROWS; row++) {
            for (var col = 0; col < C.FULL_GRID_COLS; col++) {
                fullGrid[row][col] = initialGrid[row][col];
                nextGenGrid[row][col] = 0;
            }
        }
        for (var i = 0; i < C.LOOP_CHECK_GENERATIONS; i++) {
            lastGenGrids[i] = Grid.buildFullGrid();
        }
        if (C.FRAME_WIDTH < C.DESKTOP_BREAKPOINT) {
            Renderer.setDisplay(leftBox, 'grid');
        }
        else {
            Renderer.setDisplay(leftBox, 'flex');
        }
        Renderer.setDisplay(buttonPanelRight, 'flex');
        canvas.width = placementGridWidth;
        canvas.height = placementGridHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        Renderer.setSpeed(1);
        sleepTime = C.INITIAL_SLEEP_TIME;
        subtext.innerHTML = "Sirius GG's Conway's Game of Life PVP";
        Renderer.drawP1Grid(fullGrid);
        Renderer.drawP2Preview(fullGrid);
        setupEventListeners();
    }, sleepTime * 1.1);
}
function startRound() {
    if (!Grid.getP1IsAlive()) {
        Renderer.showWarningDialog("P1 has an empty grid. Cannot start.");
        return;
    }
    if (!Grid.getP2IsAlive()) {
        Renderer.showWarningDialog("P2 has an empty grid. Cannot start.");
        return;
    }
    unregisterMainMenuEventListeners();
    gameHasEndedManually = false;
    Grid.gridCopy(fullGrid, initialGrid);
    Renderer.setDisplay(leftBox, 'none');
    Renderer.setDisplay(buttonPanelRight, 'none');
    var fullGridCellSize = Renderer.calcFullGridCellSize();
    var fullGridWidth = (C.FULL_GRID_COLS * fullGridCellSize) + 1;
    var fullGridHeight = (C.FULL_GRID_ROWS * fullGridCellSize) + 1;
    canvas.width = fullGridWidth;
    canvas.height = fullGridHeight;
    Renderer.drawFullGrid(fullGrid);
    window.scrollTo(0, 0);
    var generations = 0;
    function advanceAndCheck() {
        if (generations < C.MAX_GENERATIONS && !Grid.gameHasEnded()) {
            Renderer.updateSpeed(generations);
            sleepTime = C.INITIAL_SLEEP_TIME / Renderer.getSpeed();
            sleepWithRedraw(sleepTime, function () {
                Grid.advanceGeneration(fullGrid, nextGenGrid);
                Renderer.drawFullGrid(fullGrid);
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
function exportGridHandler() {
    FileIO.exportGrid(fullGrid, C.SAVE_FILE_VERSION, C.FILE_EXTENSION);
}
function importP1GridHandler(event) {
    FileIO.importFile(event, 0, fullGrid);
}
function importP2GridHandler(event) {
    FileIO.importFile(event, 1, fullGrid);
}
function setupEventListeners() {
    // build the canvas handler functions
    Placement.setupHandlers(fullGrid);
    // validate functions from other namespaces exist
    if (!Placement.canvasMouseDownHandler)
        return;
    if (!Placement.canvasMouseMoveHandler)
        return;
    if (!Placement.canvasTouchStartHandler)
        return;
    if (!Placement.canvasTouchMoveHandler)
        return;
    if (!Placement.canvasTouchEndHandler)
        return;
    // unregister all existing event listeners
    unregisterMainMenuEventListeners();
    E.getContinueButton().removeEventListener('click', continueGame);
    E.getNewGameButton().removeEventListener('click', newGamePlacement);
    // add new event listeners
    // mouse placement
    canvas.addEventListener('mousedown', Placement.canvasMouseDownHandler);
    canvas.addEventListener('mousemove', Placement.canvasMouseMoveHandler);
    canvas.addEventListener('mouseup', Placement.endDrag);
    if (!optionContinueDragWhenMouseLeavesCanvas) {
        canvas.addEventListener('mouseleave', Placement.endDrag);
    }
    // touch placement
    canvas.addEventListener('touchstart', Placement.canvasTouchStartHandler);
    canvas.addEventListener('touchmove', Placement.canvasTouchMoveHandler);
    canvas.addEventListener('touchend', Placement.canvasTouchEndHandler);
    canvas.addEventListener('touchcancel', Placement.canvasTouchEndHandler);
    // buttons
    E.getGenerateP1GridButton().addEventListener('click', Grid.generateRandomP1Grid);
    E.getGenerateP2GridButton().addEventListener('click', Grid.generateRandomP2Grid);
    E.getExportButton().addEventListener('click', exportGridHandler);
    E.getContinueButton().addEventListener('click', continueGame);
    E.getNewGameButton().addEventListener('click', newGamePlacement);
    E.getImportP1GridButton().addEventListener('change', importP1GridHandler);
    E.getClearButton().addEventListener('click', Grid.clearGrid);
    E.getImportP2GridButton().addEventListener('change', importP2GridHandler);
    E.getPlayButton().addEventListener('click', startRound);
    E.getDialogOkButton().addEventListener('click', Renderer.dialogOkHandler);
    E.getMirrorP1GridButton().addEventListener('click', Grid.mirrorP1Grid);
}
function unregisterMainMenuEventListeners() {
    // validate functions from other namespaces exist
    if (!Placement.canvasMouseDownHandler)
        return;
    if (!Placement.canvasMouseMoveHandler)
        return;
    if (!Placement.canvasTouchStartHandler)
        return;
    if (!Placement.canvasTouchMoveHandler)
        return;
    if (!Placement.canvasTouchEndHandler)
        return;
    if (!Placement.canvasTouchEndHandler)
        return;
    canvas.removeEventListener('mousedown', Placement.canvasMouseDownHandler);
    canvas.removeEventListener('mousemove', Placement.canvasMouseMoveHandler);
    canvas.removeEventListener('mouseup', Placement.endDrag);
    canvas.removeEventListener('mouseleave', Placement.endDrag);
    canvas.removeEventListener('touchstart', Placement.canvasTouchStartHandler);
    canvas.removeEventListener('touchmove', Placement.canvasTouchMoveHandler);
    canvas.removeEventListener('touchend', Placement.canvasTouchEndHandler);
    canvas.removeEventListener('touchcancel', Placement.canvasTouchEndHandler);
    E.getGenerateP1GridButton().removeEventListener('click', Grid.generateRandomP1Grid);
    E.getGenerateP2GridButton().removeEventListener('click', Grid.generateRandomP2Grid);
    E.getExportButton().removeEventListener('click', exportGridHandler);
    E.getImportP1GridButton().removeEventListener('change', importP1GridHandler);
    E.getClearButton().removeEventListener('click', Grid.clearGrid);
    E.getImportP2GridButton().removeEventListener('change', importP2GridHandler);
    E.getPlayButton().removeEventListener('click', startRound);
    E.getDialogOkButton().removeEventListener('click', Renderer.dialogOkHandler);
    E.getMirrorP1GridButton().removeEventListener('click', Grid.mirrorP1Grid);
}
function debugLog(message) {
    if (C.DEBUG) {
        console.log(message);
    }
}
Renderer.setDisplay(E.getNoJs(), 'none');
Renderer.setDisplay(E.getLoading(), 'flex');
Renderer.initializeCanvasForPlacement();
Renderer.drawP1Grid(fullGrid);
Renderer.drawP2Preview(fullGrid);
setupEventListeners();
Renderer.setDisplay(E.getLoading(), 'none');
Renderer.setDisplay(E.getGameContainer(), 'flex');
