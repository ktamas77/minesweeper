// --- build empty game table ---
function initGameBoard(boardSize, maxMines) {

    var gameBoard = {}
    
    gameBoard.resetBoard = function(boardSize) {
        this.size = boardSize;
        this.rows = [];
        for (var y = 0; y < this.size; y++) {
            var gameBoardRow = {}
            gameBoardRow.cells = [];
            for (var x = 0; x < this.size; x++) {
                var cell = {
                    visited: 0,
                    mine: 0,
                    mineNum: 0,
                    cellStyle: 'default',
                    visit: function() {
                        this.visited = 1;
                        if (this.mine == 0) {
                            this.cellStyle = 'visited';
                        } else {
                            this.cellStyle = 'mine';
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
        var minesAdded = 0;
        while (minesAdded < maxMines) {
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

    gameBoard.resetBoard(boardSize);
    gameBoard.addMines(maxMines);
    gameBoard.addNumbers();

    return gameBoard;
}

// --- main ---
(function() {
    var mineSweeperApp = angular.module('mineSweeperApp', []);

    mineSweeperApp.controller('GameboardController', ['$scope', function ($scope) {
        $scope.gameBoard = initGameBoard(10, 10);
    }]);

})();