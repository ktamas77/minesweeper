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
                    x: x,
                    y: y,
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
                                    gameBoard.unCover(this);
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

    // Add Random Mines with O(n)
    gameBoard.addMines = function(maxMines) {
        if (maxMines > this.totalCells) {
            maxMines = totalCells;
        }
        this.maxMines = maxMines;
        randNums = [];
        for (i = 0; i < this.totalCells; i++) {
            randNums.push(i);
        }
        for (i = 0; i < maxMines; i++) {
            endPos = randNums.length - 1 - i;
            randPos = Math.floor(Math.random() * endPos);
            randNum = randNums[randPos];
            x = Math.floor(randNum / this.size);
            y = randNum % this.size;
            cell = this.getCell(x, y);
            cell.mine = 1;
        }
    }

    gameBoard.countSurroundingMines = function(startCell) {
        mineNum = 0;
        for (var x = -1; x < 2; x++) {
            for (var y = -1; y < 2; y++) {
                xPos = startCell.x + x;
                yPos = startCell.y + y;
                if ((xPos >= 0) && (yPos >= 0) && (xPos < this.size) && (yPos < this.size)) {
                    cell = this.getCell(xPos, yPos);
                    mineNum += cell.mine;
                }
            }
        }
        return mineNum;
    }

    gameBoard.unCover = function(startCell) {
        for (var x = -1; x < 2; x++) {
            for (var y = -1; y < 2; y++) {
                xPos = startCell.x + x;
                yPos = startCell.y + y;
                if ((xPos >= 0) && (yPos >= 0) && (xPos < this.size) && (yPos < this.size)) {
                    cell = this.getCell(xPos, yPos);
                    if (cell.visited == 0) {
                        cell.markVisited();
                        if (cell.mineNum == 0) {
                            this.unCover(cell);
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
                    cell.mineNum = this.countSurroundingMines(cell);
                }
            }
        }        
    }

    gameBoard.start = function(boardSize, maxMines) {
        this.resetBoard(boardSize);
        this.addMines(maxMines);
        this.addNumbers();        
    }

    gameBoard.restart = function() {
        this.start(this.size, this.maxMines);
    }

    gameBoard.start(boardSize, maxMines);

    return gameBoard;
}

// --- main ---
(function() {
    var mineSweeperApp = angular.module('mineSweeperApp', []);

    mineSweeperApp.controller('GameboardController', ['$scope', function ($scope) {
        $scope.gameBoard = initGameBoard(boardSize, maxMines);
    }]);

})();