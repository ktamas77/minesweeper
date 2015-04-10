initGameBoard = (boardSize, maxMines) ->
  gameBoard = {}

  gameBoard.resetBoard = (boardSize) ->
    @gameStatus = 'new'
    @maxMines = 0
    @totalVisited = 0
    @size = boardSize
    @totalCells = boardSize * boardSize
    @rows = []
    y = 0
    while y < @size
      gameBoardRow = {}
      gameBoardRow.cells = []
      x = 0
      while x < @size
        cell = 
          visited: 0
          mine: 0
          mineNum: 0
          cellX: x
          cellY: y
          cellStyle: 'default'
          markVisited: ->
            @visited = 1
            @cellStyle = 'visited'
            gameBoard.totalVisited++
            if gameBoard.totalVisited == gameBoard.totalCells - gameBoard.maxMines
              gameBoard.gameStatus = 'won'
            return
          visit: ->
            if gameBoard.gameStatus == 'new'
              @visited = 1
              if @mine == 0
                @markVisited()
                if @mineNum == 0
                  gameBoard.unCover @cellX, @cellY
              else
                @cellStyle = 'mine'
                gameBoard.gameStatus = 'lost'
            return
        gameBoardRow.cells.push cell
        x++
      @rows.push gameBoardRow
      y++
    return

  gameBoard.getCell = (x, y) ->
    @rows[y].cells[x]

  gameBoard.addMines = (maxMines) ->
    if maxMines > @totalCells
      maxMines = totalCells
    @maxMines = maxMines
    minesAdded = 0
    while minesAdded < @maxMines
      x = Math.round(Math.random() * (@size - 1))
      y = Math.round(Math.random() * (@size - 1))
      cell = @getCell(x, y)
      if cell.mine == 0
        cell.mine = 1
        minesAdded++
    return

  gameBoard.countSurroundingMines = (startX, startY) ->
    mineNum = 0
    x = -1
    while x < 2
      y = -1
      while y < 2
        xPos = startX + x
        yPos = startY + y
        if xPos >= 0 and yPos >= 0 and xPos < @size and yPos < @size
          cell = @getCell(xPos, yPos)
          mineNum += cell.mine
        y++
      x++
    mineNum

  gameBoard.unCover = (startX, startY) ->
    x = -1
    while x < 2
      y = -1
      while y < 2
        xPos = startX + x
        yPos = startY + y
        if xPos >= 0 and yPos >= 0 and xPos < @size and yPos < @size
          cell = @getCell(xPos, yPos)
          if cell.visited == 0
            cell.markVisited()
            if cell.mineNum == 0
              @unCover xPos, yPos
        y++
      x++
    return

  gameBoard.addNumbers = ->
    x = 0
    while x < @size
      y = 0
      while y < @size
        cell = @getCell(x, y)
        if cell.mine == 0
          cell.mineNum = @countSurroundingMines(x, y)
        y++
      x++
    return

  gameBoard.restart = ->
    maxMines = @maxMines
    gameBoard.resetBoard @size
    gameBoard.addMines maxMines
    gameBoard.addNumbers()
    return

  gameBoard.resetBoard boardSize
  gameBoard.addMines maxMines
  gameBoard.addNumbers()
  gameBoard

do ->
  mineSweeperApp = angular.module('mineSweeperApp', [])
  mineSweeperApp.controller 'GameboardController', [
    '$scope'
    ($scope) ->
      $scope.gameBoard = initGameBoard(boardSize, maxMines)
      return
  ]
  return
