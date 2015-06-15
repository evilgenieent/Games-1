
var Board = function(){
  this.board = createBoard();

};

function createBoard()
{
  var places = [];
  for (var i = 0; i < 7; i++)
    places[i] = [];

  // Make table empty
  for (var i = 0; i < 7; i++)
  {
    for (var j = 0; j < 6; j++)
    {
      places[i][j] = new Place();
    }
  }


  return places;
}

Board.prototype.getPlace = function(x, y)
{
  return this.board[x][y];
}

Board.prototype.getLastFreePlace = function(column)
{
  for (var i = this.board[column].length - 1; i >= 0; i--)
  {

    if (this.board[column][i].isEmpty() == true)
      return i;
  }

  return -1;
}

Board.prototype.checkIfSomeoneWon = function()
{
  for (var i = 0; i < 7; i++)
    for (var j = 0; j < 6; j++)
      if (!this.board[i][j].isEmpty())
      {
        var fourFound = false;

        if (!fourFound && i < 4)
          fourFound = this.checkHorizontalVictory(i, j);

        if (!fourFound && j < 3)
          fourFound = this.checkVerticalVictory(i, j);

        if (!fourFound && i < 4 && j < 3)
          fourFound = this.checkDiagonalVictory(i, j);

        if (fourFound)
        {
          return this.board[i][j].getContent();
          alert("asdga");
        }

      }

  return "none";
}

Board.prototype.checkHorizontalVictory= function(i, j)
{
  return (this.board[i][j].getContent() == this.board[i + 1][j].getContent() && 
          this.board[i + 1][j].getContent() == this.board[i + 2][j].getContent() &&
          this.board[i + 2][j].getContent() == this.board[i + 3][j].getContent());
}

Board.prototype.checkVerticalVictory= function(i, j)
{
  return (this.board[i][j].getContent() == this.board[i][j + 1].getContent() && 
          this.board[i][j + 1].getContent() == this.board[i][j + 2].getContent() &&
          this.board[i][j + 2].getContent() == this.board[i][j + 3].getContent());
}

Board.prototype.checkDiagonalVictory= function(i, j)
{
  return (this.board[i][j].getContent() == this.board[i + 1][j + 1].getContent() && 
          this.board[i + 1][j + 1].getContent() == this.board[i + 2][j + 2].getContent() &&
          this.board[i + 2][j + 2].getContent() == this.board[i + 3][j + 3].getContent());
}