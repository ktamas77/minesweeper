// --- build empty game table ---
function initGameBoard(boardSize, maxMines) {

    var gameBoard = {}
    
    gameBoard.resetBoard = function(boardSize) {
        this.gameStatus = 'new';
        this.maxMines = 0;
        this.totalVisited = 0;
        this.size = boardSize;
        this.totalCells = boardSize * boardSize;
        this.rows = [];
        for (var y = 0; y < this.size; y++) {
            var gameBoardRow = {}
            gameBoardRow.cells = [];
            for (var x = 0; x < this.size; x++) {
                var cell = {
                    visited: 0,
                    mine: 0,
                    mineNum: 0,
                    cellX: x,
                    cellY: y,
                    cellStyle: 'default',
                    markVisited: function() {
                        this.visited = 1;
                        this.cellStyle = 'visited';
                        gameBoard.totalVisited++;
                        if (gameBoard.totalVisited == gameBoard.totalCells - gameBoard.maxMines) {
                            gameBoard.gameStatus = 'won';
                        }
                    },
                    visit: function() {
                        if (gameBoard.gameStatus == 'new') {
                            this.visited = 1;
                            if (this.mine == 0) {
                                this.markVisited();
                                if (this.mineNum == 0) {
                                    gameBoard.unCover(this.cellX, this.cellY);
                                }
                            } else {
                                this.cellStyle = 'mine';
                                gameBoard.gameStatus = 'lost';
                            }
                        }
                    }
                };
                gameBoardRow.cells.push(cell);
            }
            this.rows.push(gameBoardRow);
        }
    }
    
    gameBoard.getCell = function(x, y) {
        return this.rows[y].cells[x];
    };

    gameBoard.addMines = function(maxMines) {
        if (maxMines > this.totalCells) {
            maxMines = totalCells;
        }
        this.maxMines = maxMines;
        var minesAdded = 0;
        while (minesAdded < this.maxMines) {
            x = Math.round(Math.random() * (this.size - 1));
            y = Math.round(Math.random() * (this.size - 1));
            cell = this.getCell(x, y);
            if (cell.mine == 0) {
                cell.mine = 1;
                minesAdded++;
            }
        }
    }

    gameBoard.countSurroundingMines = function(startX, startY) {
        mineNum = 0;
        for (var x = -1; x < 2; x++) {
            for (var y = -1; y < 2; y++) {
                xPos = startX + x;
                yPos = startY + y;
                if ((xPos >= 0) && (yPos >= 0) && (xPos < this.size) && (yPos < this.size)) {
                    cell = this.getCell(xPos, yPos);
                    mineNum += cell.mine;
                }
            }
        }
        return mineNum;
    }

    gameBoard.unCover = function(startX, startY) {
        for (var x = -1; x < 2; x++) {
            for (var y = -1; y < 2; y++) {
                xPos = startX + x;
                yPos = startY + y;
                if ((xPos >= 0) && (yPos >= 0) && (xPos < this.size) && (yPos < this.size)) {
                    cell = this.getCell(xPos, yPos);
                    if (cell.visited == 0) {
                        cell.markVisited();
                        if (cell.mineNum == 0) {
                            this.unCover(xPos, yPos);
                        }
                    }
                }
            }
        }        
    }

    gameBoard.addNumbers = function() {
        for (var x = 0; x < this.size; x++) {
            for (var y = 0; y < this.size; y++) {
                cell = this.getCell(x, y);
                if (cell.mine == 0) {
                    cell.mineNum = this.countSurroundingMines(x, y);
                }
            }
        }        
    }

    gameBoard.restart = function() {
        maxMines = this.maxMines;
        gameBoard.resetBoard(this.size);
        gameBoard.addMines(maxMines);
        gameBoard.addNumbers();        
    }

    gameBoard.resetBoard(boardSize);
    gameBoard.addMines(maxMines);
    gameBoard.addNumbers();

    return gameBoard;
}

// --- main ---
(function() {
    var mineSweeperApp = angular.module('mineSweeperApp', []);

    mineSweeperApp.controller('GameboardController', ['$scope', function ($scope) {
        $scope.gameBoard = initGameBoard(boardSize, maxMines);
    }]);

})();