// --- build empty game table
function initGameBoard() {
    var boardSize = 10;
    var gameBoard = {};
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
        $scope.gameBoard = initGameBoard();
    }]);

})();