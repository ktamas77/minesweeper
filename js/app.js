// --- build empty game table
function initGameBoard(boardSize) {
    var gameBoard = {};
    gameBoard.size = boardSize;
    gameBoard.rows = [];
    for (var y =0; y < boardSize; y++) {
        var gameBoardRow = {}
        gameBoardRow.cells = [];
        for (var x = 0; x < boardSize; x++) {
            var cell = {};
            cell.visited = 0;
            gameBoardRow.cells.push(cell);
        }
        gameBoard.rows.push(gameBoardRow);
    }
    return gameBoard;
}

(function() {
    var mineSweeperApp = angular.module('mineSweeperApp', []);

    mineSweeperApp.controller('GameboardController', ['$scope', function ($scope) {
        $scope.gameBoard = initGameBoard(10);
    }]);

})();