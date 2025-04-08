var C;
(function (C) {
    C.DESKTOP_BREAKPOINT = 1024;
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
    C.DEBUG = false;
})(C || (C = {}));
var D;
(function (D) {
    function debugLog(message) {
        if (C.DEBUG) {
            console.log(message);
        }
    }
    D.debugLog = debugLog;
})(D || (D = {}));
var E;
(function (E) {
    var body = document.body;
    var noJs = document.querySelector('#no-js');
    var loading = document.querySelector('#loading');
    var bgContainer = document.querySelector('#bg-container');
    var gameContainer = document.querySelector('#game-container');
    var leftBox = document.querySelector('#left-box');
    var playerBox = document.querySelector('#player-box');
    var playerTilePreview = document.querySelector('#player-tile-preview');
    var trainingBox = document.querySelector('#training-box');
    var newsBox = document.querySelector('#news-box');
    var wisdomBox = document.querySelector('#wisdom-box');
    var classesBox = document.querySelector('#classes-box');
    var skillsBox = document.querySelector('#skills-box');
    var shopBox = document.querySelector('#shop-box');
    var settingsBox = document.querySelector('#settings-box');
    var closeSettingsButton = document.querySelector('#close-settings-button');
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
    var settingsPane = document.querySelector('#settings-pane');
    var storageMethodSelect = document.querySelector('#storage-method');
    var disableDrawingToggle = document.querySelector('#disable-drawing-toggle');
    var seasonalThemesToggle = document.querySelector('#seasonal-themes-toggle');
    var backgroundToggle = document.querySelector('#background-toggle');
    var backgroundBlurOptionBox = document.querySelector('#background-blur-option-box');
    var backgroundBlurSlider = document.querySelector('#background-blur-slider');
    var lightModeRadio = document.querySelector('#light-mode-radio');
    var darkModeRadio = document.querySelector('#dark-mode-radio');
    if (!body)
        throw new Error('body not found');
    if (!noJs)
        throw new Error('Element #no-js not found');
    if (!loading)
        throw new Error('Element #loading not found');
    if (!bgContainer)
        throw new Error('Element #bg-container not found');
    if (!gameContainer)
        throw new Error('Element #game-container not found');
    if (!leftBox)
        throw new Error('Element #left-box not found');
    if (!playerBox)
        throw new Error('Element #player-box not found');
    if (!playerTilePreview)
        throw new Error('Element #player-tile-preview not found');
    if (!trainingBox)
        throw new Error('Element #training-box not found');
    if (!newsBox)
        throw new Error('Element #news-box not found');
    if (!wisdomBox)
        throw new Error('Element #wisdom-box not found');
    if (!classesBox)
        throw new Error('Element #classes-box not found');
    if (!skillsBox)
        throw new Error('Element #skills-box not found');
    if (!shopBox)
        throw new Error('Element #shop-box not found');
    if (!settingsBox)
        throw new Error('Element #settings-box not found');
    if (!closeSettingsButton)
        throw new Error('Element #close-settings-button not found');
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
    if (!settingsPane)
        throw new Error('Element #settings-pane not found');
    if (!storageMethodSelect)
        throw new Error('Element #storage-method not found');
    if (!disableDrawingToggle)
        throw new Error('Element #disable-drawing-toggle not found');
    if (!seasonalThemesToggle)
        throw new Error('Element #seasonal-themes-toggle not found');
    if (!backgroundToggle)
        throw new Error('Element #background-toggle not found');
    if (!backgroundBlurOptionBox)
        throw new Error('Element #background-blur-option-box not found');
    if (!backgroundBlurSlider)
        throw new Error('Element #background-blur-slider not found');
    if (!lightModeRadio)
        throw new Error('Element #light-mode-radio not found');
    if (!darkModeRadio)
        throw new Error('Element #dark-mode-radio not found');
    function getBody() {
        return body;
    }
    E.getBody = getBody;
    function getNoJs() {
        return noJs;
    }
    E.getNoJs = getNoJs;
    function getLoading() {
        return loading;
    }
    E.getLoading = getLoading;
    function getBgContainer() {
        return bgContainer;
    }
    E.getBgContainer = getBgContainer;
    function getGameContainer() {
        return gameContainer;
    }
    E.getGameContainer = getGameContainer;
    function getLeftBox() {
        return leftBox;
    }
    E.getLeftBox = getLeftBox;
    function getPlayerBox() {
        return playerBox;
    }
    E.getPlayerBox = getPlayerBox;
    function getPlayerTilePreview() {
        return playerTilePreview;
    }
    E.getPlayerTilePreview = getPlayerTilePreview;
    function getTrainingBox() {
        return trainingBox;
    }
    E.getTrainingBox = getTrainingBox;
    function getNewsBox() {
        return newsBox;
    }
    E.getNewsBox = getNewsBox;
    function getWisdomBox() {
        return wisdomBox;
    }
    E.getWisdomBox = getWisdomBox;
    function getClassesBox() {
        return classesBox;
    }
    E.getClassesBox = getClassesBox;
    function getSkillsBox() {
        return skillsBox;
    }
    E.getSkillsBox = getSkillsBox;
    function getShopBox() {
        return shopBox;
    }
    E.getShopBox = getShopBox;
    function getSettingsBox() {
        return settingsBox;
    }
    E.getSettingsBox = getSettingsBox;
    function getCloseSettingsButton() {
        return closeSettingsButton;
    }
    E.getCloseSettingsButton = getCloseSettingsButton;
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
    function getSettingsPane() {
        return settingsPane;
    }
    E.getSettingsPane = getSettingsPane;
    function getStorageMethodSelect() {
        return storageMethodSelect;
    }
    E.getStorageMethodSelect = getStorageMethodSelect;
    function getDisableDrawingToggle() {
        return disableDrawingToggle;
    }
    E.getDisableDrawingToggle = getDisableDrawingToggle;
    function getSeasonalThemesToggle() {
        return seasonalThemesToggle;
    }
    E.getSeasonalThemesToggle = getSeasonalThemesToggle;
    function getBackgroundToggle() {
        return backgroundToggle;
    }
    E.getBackgroundToggle = getBackgroundToggle;
    function getBackgroundBlurOptionBox() {
        return backgroundBlurOptionBox;
    }
    E.getBackgroundBlurOptionBox = getBackgroundBlurOptionBox;
    function getBackgroundBlurSlider() {
        return backgroundBlurSlider;
    }
    E.getBackgroundBlurSlider = getBackgroundBlurSlider;
    function getLightModeRadio() {
        return lightModeRadio;
    }
    E.getLightModeRadio = getLightModeRadio;
    function getDarkModeRadio() {
        return darkModeRadio;
    }
    E.getDarkModeRadio = getDarkModeRadio;
})(E || (E = {}));
var FileIO;
(function (FileIO) {
    function download(filename, text) {
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        pom.setAttribute('download', filename);
        var event = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        });
        pom.dispatchEvent(event);
    }
    FileIO.download = download;
    function downloadConfiguration(fullGrid) {
        var configurationString = Grid.exportP1Grid();
        download('grid' + C.FILE_EXTENSION, configurationString); // ToDo: Derive file name from configuration name
    }
    FileIO.downloadConfiguration = downloadConfiguration;
    function importGrid(content, mode, fullGrid) {
        D.debugLog('importGrid starts');
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
            D.debugLog('mode is 0 (P1)');
            D.debugLog('checking condtions');
            if (grid.length === C.PLACEMENT_GRID_ROWS && grid[0].length === C.PLACEMENT_GRID_COLS) {
                D.debugLog('conditions passed');
                for (var row = 0; row < C.PLACEMENT_GRID_ROWS; row++) {
                    for (var col = 0; col < C.PLACEMENT_GRID_COLS; col++) {
                        fullGrid[row + 1][col + 1] = grid[row][col];
                    }
                }
                D.debugLog('iterated over grid');
            }
        }
        else if (mode === 1) {
            D.debugLog('mode is 1 (P2)');
            D.debugLog('translating grid');
            var p2Grid = Grid.translateP1GridToP2Grid(grid);
            D.debugLog('grid translated');
            D.debugLog('checking condtions');
            if (p2Grid.length === C.PLACEMENT_GRID_ROWS && p2Grid[0].length === C.PLACEMENT_GRID_COLS) {
                D.debugLog('conditions passed');
                for (var row = 0; row < C.PLACEMENT_GRID_ROWS; row++) {
                    for (var col = 0; col < C.PLACEMENT_GRID_COLS; col++) {
                        fullGrid[row + 1][C.PLACEMENT_GRID_COLS + col + 2] = p2Grid[row][col];
                    }
                }
                D.debugLog('iterated over grid');
            }
        }
        D.debugLog('importGrid ends');
    }
    FileIO.importGrid = importGrid;
    function importFile(event, mode, fullGrid) {
        D.debugLog('importFile for P' + (mode + 1) + ' starts');
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
        D.debugLog('basic checks passed');
        var _loop_1 = function (i) {
            var reader = new FileReader();
            var file = files[i];
            reader.onload = function (e) {
                var _a;
                D.debugLog('reader.onload starts');
                var content = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
                D.debugLog('content: ' + content);
                D.debugLog('fullGrid before import:');
                if (C.DEBUG) {
                    Grid.logGrid(fullGrid);
                }
                importGrid(content, mode, fullGrid);
                D.debugLog('fullGrid after import:');
                if (C.DEBUG) {
                    Grid.logGrid(fullGrid);
                }
                if (mode === 0) {
                    R.drawP1Grid();
                }
                else {
                    R.drawP2Preview();
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
var Grid;
(function (Grid) {
    var fullGrid = buildFullGrid();
    function getFullGrid() {
        return fullGrid;
    }
    Grid.getFullGrid = getFullGrid;
    function exportP1Grid() {
        var configurationName = 'configuration'; // ToDo: Show dialog to user and let him enter a custom configuration name
        var gridString = '';
        gridString += 'v:' + C.SAVE_FILE_VERSION;
        gridString += ';';
        gridString += configurationName;
        gridString += ';';
        gridString += 'cols:' + C.PLACEMENT_GRID_COLS + ',rows:' + C.PLACEMENT_GRID_ROWS;
        gridString += ';';
        for (var row = 1; row <= C.PLACEMENT_GRID_ROWS; row++) {
            for (var col = 1; col <= C.PLACEMENT_GRID_COLS; col++) {
                gridString += '' + fullGrid[row][col];
            }
            if (row != C.PLACEMENT_GRID_ROWS) {
                gridString += ',';
            }
        }
        return gridString;
    }
    Grid.exportP1Grid = exportP1Grid;
    function translateP1GridToP2Grid(p1Grid) {
        var p2Grid = [];
        for (var row = 0; row < C.PLACEMENT_GRID_ROWS; row++) {
            p2Grid[row] = [];
            for (var col = 0; col < C.PLACEMENT_GRID_COLS; col++) {
                if (p1Grid[row][C.PLACEMENT_GRID_COLS - col - 1] === 2)
                    p2Grid[row][col] = 3;
                else
                    p2Grid[row][col] = 0;
            }
        }
        return p2Grid;
    }
    Grid.translateP1GridToP2Grid = translateP1GridToP2Grid;
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
    function buildFullGrids() {
        var grids = [];
        for (var loopCount = 0; loopCount < C.LOOP_CHECK_GENERATIONS; loopCount++) {
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
        R.drawP1Grid();
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
        R.drawP2Preview();
    }
    Grid.generateRandomP2Grid = generateRandomP2Grid;
    function clearGrid() {
        for (var row = 1; row <= C.PLACEMENT_GRID_ROWS; row++) {
            for (var col = 1; col <= C.PLACEMENT_GRID_COLS; col++) {
                fullGrid[row][col] = 0;
            }
        }
        R.drawP1Grid();
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
        var p2Grid = translateP1GridToP2Grid(p1Grid);
        for (var row = 0; row < C.PLACEMENT_GRID_ROWS; row++) {
            for (var col = 0; col < C.PLACEMENT_GRID_COLS; col++) {
                fullGrid[row + 1][C.PLACEMENT_GRID_COLS + col + 2] = p2Grid[row][col];
            }
        }
        R.drawP2Preview();
    }
    Grid.mirrorP1Grid = mirrorP1Grid;
    function mirrorP1GridHandler() {
        mirrorP1Grid();
    }
    Grid.mirrorP1GridHandler = mirrorP1GridHandler;
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
    function gridEquals(grid1, grid2) {
        for (var row = 0; row < C.FULL_GRID_ROWS; row++) {
            for (var col = 0; col < C.FULL_GRID_COLS; col++) {
                if (grid1[row][col] != grid2[row][col])
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
    function gameHasEnded(lastGenGrids) {
        if (!getP1IsAlive() || !getP2IsAlive()) {
            return true;
        }
        for (var genCount = 0; genCount < C.LOOP_CHECK_GENERATIONS; genCount++) {
            if (gridEquals(fullGrid, lastGenGrids[genCount])) {
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
    Grid.getAliveNeighbors = getAliveNeighbors;
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
    Grid.getP1Neighbors = getP1Neighbors;
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
    Grid.getP2Neighbors = getP2Neighbors;
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
        if (!fromGrid || !toGrid || !fromGrid[0] || !toGrid[0] || fromGrid.length != toGrid.length || fromGrid[0].length != toGrid[0].length) {
            throw new Error('fromGrid and toGrid must bo initialized and have the same dimensions');
        }
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
var Interaction;
(function (Interaction) {
    var canvas = E.getCanvas();
    function setupEventListeners() {
        // build the canvas handler functions
        Placement.setupHandlers(Grid.getFullGrid());
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
        E.getContinueButton().removeEventListener('click', Match.continueGame);
        E.getNewGameButton().removeEventListener('click', Match.newGamePlacement);
        // add new event listeners
        // mouse placement
        canvas.addEventListener('mousedown', Placement.canvasMouseDownHandler);
        canvas.addEventListener('mousemove', Placement.canvasMouseMoveHandler);
        canvas.addEventListener('mouseup', Placement.endDrag);
        if (!Settings.getContinueDragWhenMouseLeavesCanvas()) {
            canvas.addEventListener('mouseleave', Placement.endDrag);
        }
        E.getBody().addEventListener('mouseup', Placement.endDrag);
        document.addEventListener('mouseout', Placement.mouseOutWhilePlacingHandler);
        // touch placement
        canvas.addEventListener('touchstart', Placement.canvasTouchStartHandler);
        canvas.addEventListener('touchmove', Placement.canvasTouchMoveHandler);
        canvas.addEventListener('touchend', Placement.canvasTouchEndHandler);
        canvas.addEventListener('touchcancel', Placement.canvasTouchEndHandler);
        // buttons
        E.getGenerateP1GridButton().addEventListener('click', Grid.generateRandomP1Grid);
        E.getGenerateP2GridButton().addEventListener('click', Grid.generateRandomP2Grid);
        E.getExportButton().addEventListener('click', exportGridHandler);
        E.getContinueButton().addEventListener('click', Match.continueGame);
        E.getNewGameButton().addEventListener('click', Match.newGamePlacement);
        E.getImportP1GridButton().addEventListener('change', importP1GridHandler);
        E.getClearButton().addEventListener('click', Grid.clearGrid);
        E.getImportP2GridButton().addEventListener('change', importP2GridHandler);
        E.getPlayButton().addEventListener('click', Match.startRound);
        E.getDialogOkButton().addEventListener('click', R.dialogOkHandler);
        E.getMirrorP1GridButton().addEventListener('click', Grid.mirrorP1GridHandler);
        E.getSettingsBox().addEventListener('click', R.showSettingsPane);
        E.getCloseSettingsButton().addEventListener('click', R.hideSettingsPane);
        // settings-pane listeners
        E.getStorageMethodSelect().addEventListener('change', function (event) {
            var select = event.target;
            Settings.setStorageType(select.value);
        });
        E.getDisableDrawingToggle().addEventListener('change', function (event) {
            var checkbox = event.target;
            Settings.setContinueDragWhenMouseLeavesCanvas(!checkbox.checked);
        });
        E.getSeasonalThemesToggle().addEventListener('change', function (event) {
            var checkbox = event.target;
            Settings.setHideSeasonalThemes(checkbox.checked);
        });
        E.getBackgroundToggle().addEventListener('change', function (event) {
            var checkbox = event.target;
            Settings.setShowBackgroundImage(checkbox.checked);
        });
        E.getBackgroundBlurSlider().addEventListener('input', function (event) {
            var slider = event.target;
            Settings.setBackgroundBlur(Number(slider.value));
        });
        E.getLightModeRadio().addEventListener('change', function (event) {
            if (event.target.checked) {
                Settings.setColorMode(Settings.ColorMode.Light);
            }
        });
        E.getDarkModeRadio().addEventListener('change', function (event) {
            if (event.target.checked) {
                Settings.setColorMode(Settings.ColorMode.Dark);
            }
        });
    }
    Interaction.setupEventListeners = setupEventListeners;
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
        canvas.removeEventListener('mousedown', Placement.canvasMouseDownHandler);
        canvas.removeEventListener('mousemove', Placement.canvasMouseMoveHandler);
        canvas.removeEventListener('mouseup', Placement.endDrag);
        canvas.removeEventListener('mouseleave', Placement.endDrag);
        E.getBody().removeEventListener('mouseup', Placement.endDrag);
        document.removeEventListener('mouseout', Placement.mouseOutWhilePlacingHandler);
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
        E.getPlayButton().removeEventListener('click', Match.startRound);
        E.getDialogOkButton().removeEventListener('click', R.dialogOkHandler);
        E.getMirrorP1GridButton().removeEventListener('click', Grid.mirrorP1GridHandler);
        E.getSettingsBox().removeEventListener('click', R.showSettingsPane);
        E.getCloseSettingsButton().removeEventListener('click', R.hideSettingsPane);
    }
    Interaction.unregisterMainMenuEventListeners = unregisterMainMenuEventListeners;
    function exportGridHandler() {
        FileIO.downloadConfiguration(Grid.getFullGrid());
    }
    function importP1GridHandler(event) {
        FileIO.importFile(event, 0, Grid.getFullGrid());
    }
    function importP2GridHandler(event) {
        FileIO.importFile(event, 1, Grid.getFullGrid());
    }
})(Interaction || (Interaction = {}));
var Match;
(function (Match) {
    var leftBox = E.getLeftBox();
    var buttonPanelRight = E.getButtonPanelRight();
    var continueButton = E.getContinueButton();
    var newGameButton = E.getNewGameButton();
    var lastGenGrids = Grid.buildFullGrids();
    var initialGrid = Grid.buildFullGrid();
    var nextGenGrid = Grid.buildFullGrid();
    var sleepTime = C.INITIAL_SLEEP_TIME;
    var endlessRun = true;
    var gameHasEndedManually = false;
    function sleepWithRedraw(milliseconds, callback, generation) {
        var start = Date.now();
        function checkTime() {
            var current = Date.now();
            if (current - start < milliseconds) {
                R.drawFullGrid(Grid.getFullGrid());
                if (generation != undefined) {
                    Subtext.setSubtext('Generation ' + generation + '/' + C.MAX_GENERATIONS + ' (speed: ' + R.getSpeed() + 'x)');
                }
                requestAnimationFrame(checkTime);
            }
            else {
                callback();
            }
        }
        checkTime();
    }
    function _continueGame() {
        if (gameHasEndedManually) {
            endlessRun = false;
            return;
        }
        sleepWithRedraw(sleepTime, function () {
            if (!gameHasEndedManually) {
                advanceGeneration(Grid.getFullGrid(), nextGenGrid);
                R.drawFullGrid(Grid.getFullGrid());
            }
            if (endlessRun && !gameHasEndedManually) {
                _continueGame();
            }
        }, undefined);
    }
    function continueGame() {
        endlessRun = true;
        R.setDisplay(E.getContinueButton(), 'none');
        _continueGame();
    }
    Match.continueGame = continueGame;
    function newGamePlacement() {
        gameHasEndedManually = true;
        endlessRun = false;
        setTimeout(function () {
            R.setDisplay(E.getContinueButton(), 'none');
            R.setDisplay(E.getNewGameButton(), 'none');
            for (var row = 0; row < C.FULL_GRID_ROWS; row++) {
                for (var col = 0; col < C.FULL_GRID_COLS; col++) {
                    Grid.getFullGrid()[row][col] = initialGrid[row][col];
                    nextGenGrid[row][col] = 0;
                }
            }
            for (var i = 0; i < C.LOOP_CHECK_GENERATIONS; i++) {
                lastGenGrids[i] = Grid.buildFullGrid();
            }
            if (window.innerWidth < C.DESKTOP_BREAKPOINT) {
                R.setDisplay(leftBox, 'grid');
            }
            else {
                R.setDisplay(leftBox, 'flex');
            }
            R.setDisplay(buttonPanelRight, 'flex');
            R.setCanvasSize('placement');
            R.clearCanvas();
            R.setSpeed(1);
            sleepTime = C.INITIAL_SLEEP_TIME;
            Subtext.setSubtext("Sirius GG's Conway's Game of Life PVP");
            R.drawP1Grid();
            R.drawP2Preview();
            Interaction.setupEventListeners();
        }, sleepTime * 1.1);
    }
    Match.newGamePlacement = newGamePlacement;
    function startRound() {
        if (!Grid.getP1IsAlive()) {
            R.showWarningDialog("P1 has an empty grid. Cannot start.");
            return;
        }
        if (!Grid.getP2IsAlive()) {
            R.showWarningDialog("P2 has an empty grid. Cannot start.");
            return;
        }
        Interaction.unregisterMainMenuEventListeners();
        gameHasEndedManually = false;
        Grid.gridCopy(Grid.getFullGrid(), initialGrid);
        R.setDisplay(leftBox, 'none');
        R.setDisplay(buttonPanelRight, 'none');
        R.setCanvasSize('full');
        R.drawFullGrid(Grid.getFullGrid());
        window.scrollTo(0, 0);
        var generations = 0;
        function advanceAndCheck() {
            if (generations < C.MAX_GENERATIONS && !Grid.gameHasEnded(lastGenGrids)) {
                R.updateSpeed(generations);
                sleepTime = C.INITIAL_SLEEP_TIME / R.getSpeed();
                sleepWithRedraw(sleepTime, function () {
                    advanceGeneration(Grid.getFullGrid(), nextGenGrid);
                    R.drawFullGrid(Grid.getFullGrid());
                    generations++;
                    if (Grid.gameHasEnded(lastGenGrids) || generations >= C.MAX_GENERATIONS) {
                        Subtext.showResultInSubtext(Grid.getFullGrid(), generations, lastGenGrids);
                        R.setDisplay(continueButton, 'block');
                        R.setDisplay(newGameButton, 'block');
                        return;
                    }
                    advanceAndCheck();
                }, generations);
            }
            else {
                if (generations >= C.MAX_GENERATIONS && !Grid.gameHasEnded(lastGenGrids)) {
                    Subtext.showResultInSubtext(Grid.getFullGrid(), C.MAX_GENERATIONS, lastGenGrids);
                    R.setDisplay(continueButton, 'block');
                    R.setDisplay(newGameButton, 'block');
                }
            }
        }
        advanceAndCheck();
    }
    Match.startRound = startRound;
    function advanceGeneration(grid, nextGenGrid) {
        for (var row = 0; row < grid.length; row++) {
            for (var col = 0; col < grid[row].length; col++) {
                var neighbors = Grid.getAliveNeighbors(row, col, grid);
                if (grid[row][col] != 0 && neighbors < 2)
                    nextGenGrid[row][col] = 0;
                if (grid[row][col] != 0 && (neighbors === 2 || neighbors === 3))
                    nextGenGrid[row][col] = grid[row][col];
                if (grid[row][col] != 0 && neighbors > 3)
                    nextGenGrid[row][col] = 0;
                if (grid[row][col] == 0 && neighbors === 3) {
                    if (Grid.getP1Neighbors(row, col, grid) > Grid.getP2Neighbors(row, col, grid)) {
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
    Match.advanceGeneration = advanceGeneration;
})(Match || (Match = {}));
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
        Placement.canvasMouseMoveHandler = function (event) { return dragHandler(event, fullGrid); };
        Placement.canvasTouchStartHandler = function (event) { return startTouchDrag(event, fullGrid); };
        Placement.canvasTouchMoveHandler = function (event) { return touchDragHandler(event, fullGrid); };
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
    function dragHandler(event, fullGrid) {
        if (!isDragging)
            return;
        var _a = getP1CellFromEvent(event), row = _a.row, col = _a.col;
        if (row === -1 || col === -1)
            return;
        if (dragState === 2 && fullGrid[row][col] === 0) {
            fullGrid[row][col] = 2;
            R.drawP1Grid();
        }
        if (dragState === 0 && fullGrid[row][col] === 2) {
            fullGrid[row][col] = 0;
            R.drawP1Grid();
        }
    }
    Placement.dragHandler = dragHandler;
    function touchDragHandler(event, fullGrid) {
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
                R.drawP1Grid();
            }
            if (dragState === 0 && fullGrid[row][col] === 2) {
                fullGrid[row][col] = 0;
                R.drawP1Grid();
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
        var placementGridCellSize = Math.min(window.innerWidth, window.innerHeight) / (C.PLACEMENT_GRID_ROWS + 2);
        var col = Math.floor(x / placementGridCellSize);
        var row = Math.floor(y / placementGridCellSize);
        if (col >= 0 && col < C.PLACEMENT_GRID_COLS && row >= 0 && row < C.PLACEMENT_GRID_ROWS) {
            return { row: row + 1, col: col + 1 };
        }
        return { row: -1, col: -1 };
    }
    function toggleCell(row, col, fullGrid) {
        fullGrid[row][col] = fullGrid[row][col] === 0 ? 2 : 0;
        R.drawP1Grid();
    }
    function mouseOutWhilePlacingHandler(event) {
        if (!event.relatedTarget || event.relatedTarget === document.documentElement) {
            Placement.endDrag();
        }
    }
    Placement.mouseOutWhilePlacingHandler = mouseOutWhilePlacingHandler;
})(Placement || (Placement = {}));
var R;
(function (R) {
    var canvas = E.getCanvas();
    var ctx = canvas.getContext('2d');
    if (!ctx)
        throw new Error("canvas.getContext('2d)' is null");
    var previewCanvas = E.getPreviewCanvas();
    var pctx = previewCanvas.getContext('2d');
    if (!pctx)
        throw new Error("previewCanvas.getContext('2d)' is null");
    var warningDialog = E.getWarningDialog();
    var dialogMessage = E.getDialogMessage();
    var settingsPane = E.getSettingsPane();
    var speed = 1;
    function calcFullGridCellSize() {
        if (window.innerWidth >= C.DESKTOP_BREAKPOINT) {
            D.debugLog('Desktop detected');
            return Math.min(window.innerWidth, window.innerHeight) / (C.FULL_GRID_ROWS + 2);
        }
        else {
            D.debugLog('Mobile detected');
            return Math.min(window.innerWidth, window.innerHeight) / (Math.max(C.FULL_GRID_ROWS, C.FULL_GRID_COLS) + 2);
        }
    }
    R.calcFullGridCellSize = calcFullGridCellSize;
    var fullGridCellSize = calcFullGridCellSize();
    function setSpeed(newSpeed) {
        speed = newSpeed;
    }
    R.setSpeed = setSpeed;
    function getSpeed() {
        return speed;
    }
    R.getSpeed = getSpeed;
    function setDisplay(element, displayValue) {
        if (!element)
            return;
        element.style.display = displayValue;
    }
    R.setDisplay = setDisplay;
    function initializeCanvasForPlacement() {
        var placementGridCellSize = Math.min(window.innerWidth, window.innerHeight) / (C.PLACEMENT_GRID_ROWS + 2);
        canvas.width = (C.PLACEMENT_GRID_COLS * Math.min(window.innerWidth, window.innerHeight) / (C.PLACEMENT_GRID_ROWS + 2)) + 1;
        canvas.height = (C.PLACEMENT_GRID_ROWS * Math.min(window.innerWidth, window.innerHeight) / (C.PLACEMENT_GRID_ROWS + 2)) + 1;
        canvas.width = (C.PLACEMENT_GRID_COLS * placementGridCellSize) + 1;
        canvas.height = (C.PLACEMENT_GRID_ROWS * placementGridCellSize) + 1;
        previewCanvas.width = C.PREVIEW_CANVAS_SIZE;
        previewCanvas.height = C.PREVIEW_CANVAS_SIZE;
    }
    R.initializeCanvasForPlacement = initializeCanvasForPlacement;
    function drawP1Grid() {
        var fullGrid = Grid.getFullGrid();
        var placementGridCellSize = Math.min(window.innerWidth, window.innerHeight) / (C.PLACEMENT_GRID_ROWS + 2);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (var row = 1; row <= C.PLACEMENT_GRID_ROWS; row++) {
            for (var col = 1; col <= C.PLACEMENT_GRID_COLS; col++) {
                var x = (col - 1) * placementGridCellSize;
                var y = (row - 1) * placementGridCellSize;
                ctx.strokeStyle = '#CCCCCC';
                ctx.strokeRect(x, y, placementGridCellSize, placementGridCellSize);
                if (fullGrid[row][col] === 1) {
                    ctx.fillStyle = '#000000';
                    ctx.fillRect(x, y, placementGridCellSize, placementGridCellSize);
                }
                if (fullGrid[row][col] === 2) {
                    ctx.fillStyle = '#0000FF';
                    ctx.fillRect(x, y, placementGridCellSize, placementGridCellSize);
                }
                if (fullGrid[row][col] === 3) {
                    ctx.fillStyle = '#FF0000';
                    ctx.fillRect(x, y, placementGridCellSize, placementGridCellSize);
                }
            }
        }
    }
    R.drawP1Grid = drawP1Grid;
    function drawP2Preview() {
        var fullGrid = Grid.getFullGrid();
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
                var value = fullGrid[row + 1][C.PLACEMENT_GRID_COLS + col + 2];
                if (value === 3) {
                    pctx.fillStyle = '#FF0000';
                    pctx.fillRect(x, y, previewCellSize, previewCellSize);
                }
            }
        }
    }
    R.drawP2Preview = drawP2Preview;
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
    R.drawFullGrid = drawFullGrid;
    function showWarningDialog(message) {
        dialogMessage.innerHTML = message;
        warningDialog.style.display = 'flex';
    }
    R.showWarningDialog = showWarningDialog;
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
    R.updateSpeed = updateSpeed;
    function dialogOkHandler() {
        setDisplay(warningDialog, 'none');
    }
    R.dialogOkHandler = dialogOkHandler;
    function setCanvasSize(mode) {
        if (!mode)
            throw new Error('mode is falsy: ' + mode);
        var placementGridCellSize = Math.min(window.innerWidth, window.innerHeight) / (C.PLACEMENT_GRID_ROWS + 2);
        if (mode === 'placement') {
            canvas.width = (C.PLACEMENT_GRID_COLS * placementGridCellSize) + 1;
            canvas.height = (C.PLACEMENT_GRID_ROWS * placementGridCellSize) + 1;
        }
        else if (mode === 'full') {
            var fullGridCellSize_1 = calcFullGridCellSize();
            canvas.width = (C.FULL_GRID_COLS * fullGridCellSize_1) + 1;
            canvas.height = (C.FULL_GRID_ROWS * fullGridCellSize_1) + 1;
        }
        else {
            throw new Error('Unknown mode: ' + mode);
        }
    }
    R.setCanvasSize = setCanvasSize;
    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    R.clearCanvas = clearCanvas;
    function showSettingsPane() {
        settingsPane.style.display = 'flex';
    }
    R.showSettingsPane = showSettingsPane;
    function hideSettingsPane() {
        settingsPane.style.display = 'none';
    }
    R.hideSettingsPane = hideSettingsPane;
})(R || (R = {}));
var Settings;
(function (Settings) {
    // Storage type enum
    var StorageType;
    (function (StorageType) {
        StorageType["Cookie"] = "cookie";
        StorageType["LocalStorage"] = "localStorage";
    })(StorageType = Settings.StorageType || (Settings.StorageType = {}));
    // Color mode enum
    var ColorMode;
    (function (ColorMode) {
        ColorMode["Light"] = "light";
        ColorMode["Dark"] = "dark";
    })(ColorMode = Settings.ColorMode || (Settings.ColorMode = {}));
    var storageType = loadStorageTypePreference();
    var continueDragWhenMouseLeavesCanvas = loadContinueDragWhenMouseLeavesCanvasPreference();
    var hideSeasonalThemes = loadHideSeasonalThemesPreference();
    var showBackgroundImage = loadShowBackgroundImagePreference();
    var backgroundBlur = loadBackgroundBlurPreference();
    var colorMode = loadColorModePreference();
    function synchronizeSettingsUI() {
        E.getStorageMethodSelect().value = getStorageType();
        E.getDisableDrawingToggle().checked = !getContinueDragWhenMouseLeavesCanvas();
        E.getSeasonalThemesToggle().checked = getHideSeasonalThemes();
        E.getBackgroundToggle().checked = getShowBackgroundImage();
        E.getBackgroundBlurSlider().value = getBackgroundBlur().toString();
        if (getColorMode() === ColorMode.Dark) {
            E.getDarkModeRadio().checked = true;
        }
        else {
            E.getLightModeRadio().checked = true;
        }
    }
    Settings.synchronizeSettingsUI = synchronizeSettingsUI;
    function enforceAllSettings() {
        if (!hideSeasonalThemes) {
            Themes.loadTemporaryIncrementalStylesheet('auto');
        }
        if (showBackgroundImage) {
            E.getBgContainer().style.backgroundImage = 'url("./graphics/bg.png")';
            E.getBackgroundBlurOptionBox().style.display = 'block';
        }
        else {
            E.getBgContainer().style.backgroundImage = 'none';
            E.getBackgroundBlurOptionBox().style.display = 'none';
        }
        E.getBgContainer().style.filter = 'blur(' + backgroundBlur + 'px)';
    }
    Settings.enforceAllSettings = enforceAllSettings;
    // Public getter for the drag option
    function getContinueDragWhenMouseLeavesCanvas() {
        return continueDragWhenMouseLeavesCanvas;
    }
    Settings.getContinueDragWhenMouseLeavesCanvas = getContinueDragWhenMouseLeavesCanvas;
    // Public setter for the drag option
    function setContinueDragWhenMouseLeavesCanvas(continueDrag) {
        continueDragWhenMouseLeavesCanvas = continueDrag;
        saveContinueDragOption(continueDrag);
    }
    Settings.setContinueDragWhenMouseLeavesCanvas = setContinueDragWhenMouseLeavesCanvas;
    // Public getter for the storage type
    function getStorageType() {
        return storageType;
    }
    Settings.getStorageType = getStorageType;
    // Public setter for the storage type
    function setStorageType(type) {
        // Save the current option with the new storage type
        storageType = type;
        saveStorageTypePreference(type);
        // Re-save current values with the new storage type
        saveContinueDragOption(continueDragWhenMouseLeavesCanvas);
        saveHideSeasonalThemesPreference(hideSeasonalThemes);
        saveShowBackgroundImagePreference(showBackgroundImage);
        saveBackgroundBlurPreference(backgroundBlur);
        saveColorModePreference(colorMode);
    }
    Settings.setStorageType = setStorageType;
    // Public getter for hideSeasonalThemes
    function getHideSeasonalThemes() {
        return hideSeasonalThemes;
    }
    Settings.getHideSeasonalThemes = getHideSeasonalThemes;
    // Public setter for hideSeasonalThemes
    function setHideSeasonalThemes(hide) {
        hideSeasonalThemes = hide;
        if (hideSeasonalThemes) {
            Themes.removeAllIncrementalStylesheets();
        }
        else {
            Themes.loadTemporaryIncrementalStylesheet('auto');
        }
        saveHideSeasonalThemesPreference(hideSeasonalThemes);
    }
    Settings.setHideSeasonalThemes = setHideSeasonalThemes;
    // Public getter for showBackgroundImage
    function getShowBackgroundImage() {
        return showBackgroundImage;
    }
    Settings.getShowBackgroundImage = getShowBackgroundImage;
    // Public setter for showBackgroundImage
    function setShowBackgroundImage(show) {
        showBackgroundImage = show;
        if (showBackgroundImage) {
            E.getBgContainer().style.backgroundImage = 'url("./graphics/bg.png")';
            E.getBackgroundBlurOptionBox().style.display = 'block';
        }
        else {
            E.getBgContainer().style.backgroundImage = 'none';
            E.getBackgroundBlurOptionBox().style.display = 'none';
        }
        saveShowBackgroundImagePreference(showBackgroundImage);
    }
    Settings.setShowBackgroundImage = setShowBackgroundImage;
    // Public getter for backgroundBlur
    function getBackgroundBlur() {
        return backgroundBlur;
    }
    Settings.getBackgroundBlur = getBackgroundBlur;
    // Public setter for backgroundBlur
    function setBackgroundBlur(blur) {
        backgroundBlur = blur;
        E.getBgContainer().style.filter = 'blur(' + backgroundBlur + 'px)';
        saveBackgroundBlurPreference(backgroundBlur);
    }
    Settings.setBackgroundBlur = setBackgroundBlur;
    // Public getter for colorMode
    function getColorMode() {
        return colorMode;
    }
    Settings.getColorMode = getColorMode;
    // Public setter for colorMode
    function setColorMode(mode) {
        colorMode = mode;
        saveColorModePreference(mode);
    }
    Settings.setColorMode = setColorMode;
    // Storage type preference is always saved in localStorage for persistence
    function loadStorageTypePreference() {
        var savedType = localStorage.getItem('storageType');
        return savedType === StorageType.Cookie ? StorageType.Cookie : StorageType.LocalStorage; // Default to LocalStorage
    }
    function saveStorageTypePreference(type) {
        localStorage.setItem('storageType', type);
    }
    function parseBoolean(value, defaultValue) {
        if (value === null)
            return defaultValue;
        return value === 'true';
    }
    function parseNumber(value, defaultValue) {
        if (value === null) {
            return defaultValue;
        }
        var parsed = Number(value);
        return isNaN(parsed) ? defaultValue : parsed;
    }
    function loadContinueDragWhenMouseLeavesCanvasPreference() {
        var value = storageType === StorageType.Cookie
            ? loadFromCookie('continueDragWhenMouseLeavesCanvas')
            : loadFromLocalStorage('continueDragWhenMouseLeavesCanvas');
        return parseBoolean(value, true); // Default to true
    }
    function loadHideSeasonalThemesPreference() {
        var value = storageType === StorageType.Cookie
            ? loadFromCookie('hideSeasonalThemes')
            : loadFromLocalStorage('hideSeasonalThemes');
        return parseBoolean(value, false); // Default to false
    }
    function loadShowBackgroundImagePreference() {
        var value = storageType === StorageType.Cookie
            ? loadFromCookie('showBackgroundImage')
            : loadFromLocalStorage('showBackgroundImage');
        return parseBoolean(value, true); // Default to true
    }
    function loadBackgroundBlurPreference() {
        var value = storageType === StorageType.Cookie
            ? loadFromCookie('backgroundBlur')
            : loadFromLocalStorage('backgroundBlur');
        return parseNumber(value, 2); // Default to 2
    }
    function loadColorModePreference() {
        var value = storageType === StorageType.Cookie
            ? loadFromCookie('colorMode')
            : loadFromLocalStorage('colorMode');
        return value === ColorMode.Dark ? ColorMode.Dark : ColorMode.Light; // Default to Light
    }
    function saveContinueDragOption(value) {
        var stringValue = String(value);
        if (storageType === StorageType.Cookie) {
            saveToCookie('continueDragWhenMouseLeavesCanvas', stringValue);
        }
        else {
            saveToLocalStorage('continueDragWhenMouseLeavesCanvas', stringValue);
        }
    }
    function saveHideSeasonalThemesPreference(value) {
        var stringValue = String(value);
        if (storageType === StorageType.Cookie) {
            saveToCookie('hideSeasonalThemes', stringValue);
        }
        else {
            saveToLocalStorage('hideSeasonalThemes', stringValue);
        }
    }
    function saveShowBackgroundImagePreference(value) {
        var stringValue = String(value);
        if (storageType === StorageType.Cookie) {
            saveToCookie('showBackgroundImage', stringValue);
        }
        else {
            saveToLocalStorage('showBackgroundImage', stringValue);
        }
    }
    function saveBackgroundBlurPreference(value) {
        var stringValue = String(value);
        if (storageType === StorageType.Cookie) {
            saveToCookie('backgroundBlur', stringValue);
        }
        else {
            saveToLocalStorage('backgroundBlur', stringValue);
        }
    }
    function saveColorModePreference(value) {
        if (storageType === StorageType.Cookie) {
            saveToCookie('colorMode', value);
        }
        else {
            saveToLocalStorage('colorMode', value);
        }
    }
    // Helper function to load from cookie
    function loadFromCookie(key) {
        var cookies = document.cookie.split('; ');
        for (var _i = 0, cookies_1 = cookies; _i < cookies_1.length; _i++) {
            var cookie = cookies_1[_i];
            var _a = cookie.split('='), cookieKey = _a[0], cookieValue = _a[1];
            if (cookieKey === key) {
                return decodeURIComponent(cookieValue);
            }
        }
        return null;
    }
    // Helper function to save to cookie
    function saveToCookie(key, value) {
        var encodedValue = encodeURIComponent(value);
        document.cookie = "".concat(key, "=").concat(encodedValue, "; path=/; max-age=2147483647");
    }
    // Helper function to load from localStorage
    function loadFromLocalStorage(key) {
        return localStorage.getItem(key);
    }
    // Helper function to save to localStorage
    function saveToLocalStorage(key, value) {
        localStorage.setItem(key, value);
    }
})(Settings || (Settings = {}));
var Subtext;
(function (Subtext) {
    var subtext = E.getSubtext();
    function setSubtext(message) {
        subtext.innerHTML = message;
    }
    Subtext.setSubtext = setSubtext;
    function showResultInSubtext(fullGrid, generations, lastGenGrids) {
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
    Subtext.showResultInSubtext = showResultInSubtext;
})(Subtext || (Subtext = {}));
var Themes;
(function (Themes) {
    /**
     * Loads an incremental stylesheet into the document.
     * This function creates a new <link> element, sets its attributes to link to the provided stylesheet path and appends it to the document head.
     * If the path is 'auto', it will load a seasonal stylesheet based on the current date or none if it isn't time for any special season.
     *
     * @param {string} stylesheetPath - The path to the stylesheet to be loaded. If 'auto', a seasonal stylesheet will be loaded.
     * @returns {void}
     */
    function loadTemporaryIncrementalStylesheet(stylesheetPath) {
        var sheetLink = document.createElement('link');
        sheetLink.rel = 'stylesheet';
        sheetLink.type = 'text/css';
        if (stylesheetPath === 'auto') {
            if (seasonIsEaster()) {
                D.debugLog('Season is easter.');
                sheetLink.href = 'css/easter.css';
            }
            else if (seasonIsHalloween()) {
                D.debugLog('Season is halloween.');
                sheetLink.href = 'css/halloween.css';
            }
            else if (seasonIsChristmas()) {
                D.debugLog('Season is christmas.');
                sheetLink.href = 'css/christmas.css';
            }
            else if (seasonIsNewYear()) {
                D.debugLog('Season is new year.');
                sheetLink.href = 'css/new-year.css';
            }
            else {
                D.debugLog('No theme found for current season. Using default theme only.');
                return;
            }
        }
        else {
            sheetLink.href = stylesheetPath;
        }
        document.head.appendChild(sheetLink);
    }
    Themes.loadTemporaryIncrementalStylesheet = loadTemporaryIncrementalStylesheet;
    function removeAllIncrementalStylesheets() {
        var incrementalStylesheets = [
            'css/easter.css',
            'css/halloween.css',
            'css/christmas.css',
            'css/new-year.css'
        ];
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        links.forEach(function (link) {
            var _a;
            var href = link.href;
            var isIncremental = incrementalStylesheets.some(function (stylesheet) {
                var index = href.lastIndexOf(stylesheet);
                return index !== -1 && index === href.length - stylesheet.length;
            });
            if (isIncremental) {
                (_a = link.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(link);
            }
        });
    }
    Themes.removeAllIncrementalStylesheets = removeAllIncrementalStylesheets;
    function seasonIsEaster() {
        var now = new Date();
        var year = now.getFullYear();
        // Computus algorithm to calculate Easter Sunday
        var a = year % 19;
        var b = Math.floor(year / 100);
        var c = year % 100;
        var d = Math.floor(b / 4);
        var e = b % 4;
        var f = Math.floor((b + 8) / 25);
        var g = Math.floor((b - f + 1) / 3);
        var h = (19 * a + b - d - g + 15) % 30;
        var i = Math.floor(c / 4);
        var k = c % 4;
        var l = (32 + 2 * e + 2 * i - h - k) % 7;
        var m = Math.floor((a + 11 * h + 22 * l) / 451);
        var month = Math.floor((h + l - 7 * m + 114) / 31) - 1; // 0-based month
        var day = ((h + l - 7 * m + 114) % 31) + 1;
        // Easter season: 4 days before and 2 days after Easter Sunday
        var easterStart = new Date(year, month, day - 4);
        var easterEnd = new Date(year, month, day + 2);
        return now >= easterStart && now <= easterEnd;
    }
    function seasonIsHalloween() {
        var now = new Date();
        var month = now.getMonth();
        var day = now.getDate();
        return month === 9 && day >= 29 || month === 10 && day <= 2;
    }
    function seasonIsChristmas() {
        var now = new Date();
        var month = now.getMonth();
        var day = now.getDate();
        return month === 11 && day >= 22 || month === 11 && day <= 27;
    }
    function seasonIsNewYear() {
        var now = new Date();
        var month = now.getMonth();
        var day = now.getDate();
        return (month === 11 && day >= 29) || (month === 0 && day <= 2);
    }
    function isSpecialSeason() {
        return seasonIsEaster() || seasonIsHalloween() || seasonIsChristmas() || seasonIsNewYear();
    }
    Themes.isSpecialSeason = isSpecialSeason;
})(Themes || (Themes = {}));
/// <reference path="./constants.ts" />
/// <reference path="./debug.ts" />
/// <reference path="./elements.ts" />
/// <reference path="./file-io.ts" />
/// <reference path="./grid.ts" />
/// <reference path="./interaction.ts" />
/// <reference path="./match.ts" />
/// <reference path="./placement.ts" />
/// <reference path="./renderer.ts" />
/// <reference path="./settings.ts" />
/// <reference path="./subtext.ts" />
/// <reference path="./themes.ts" />
// Sirius GG's "Conway's Game of Life" PVP
// A 2-player Game of Life Esports implementation
// Fetch elements
var noJs = E.getNoJs(); // The "This game requires Javascript" message
var loading = E.getLoading(); // The loading screen
var gameContainer = E.getGameContainer(); // The main game container
// Hide the "This game requires Javascript" message and show the loading screen
R.setDisplay(noJs, 'none');
R.setDisplay(loading, 'flex');
// Make the settings UI match the saved values and apply the settings
Settings.synchronizeSettingsUI();
Settings.enforceAllSettings();
// Initialize the placement canvas
R.initializeCanvasForPlacement();
// Draw the P1 and P2 grids
R.drawP1Grid();
R.drawP2Preview();
// Make elements interactive
Interaction.setupEventListeners();
// Hide the loading screen and make the game container visible
R.setDisplay(loading, 'none');
R.setDisplay(gameContainer, 'flex');
