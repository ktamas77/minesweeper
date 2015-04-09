// --- build empty game table ---
function initGameBoard(boardSize, maxMines) {

    var gameBoard = {}
    
    gameBoard.resetBoard = function(boardSize) {
        this.size = boardSize;
        this.rows = [];
        for (var y = 0; y < boardSize; y++) {
            var gameBoardRow = {}
            gameBoardRow.cells = [];
            for (var x = 0; x < boardSize; x++) {
                var cell = {
                    visited: 0,
                    mine: 0,
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

    gameBoard.resetBoard(boardSize);
    gameBoard.addMines(maxMines);

    return gameBoard;
}

// --- main ---
(function() {
    var mineSweeperApp = angular.module('mineSweeperApp', []);

    mineSweeperApp.controller('GameboardController', ['$scope', function ($scope) {
        $scope.gameBoard = initGameBoard(10, 10);
    }]);

})();