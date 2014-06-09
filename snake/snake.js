(function(root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});

  var Snake = SnakeGame.Snake = function () {
    this.dir = Snake.dirs['N'];
    this.segments = [];
    this.segments.push(new Coord(0,0));
  };

	var Apple - SnakeGame.Apple = function (board) {
		this.board = board;
	}
	
	Apple.prototype.replace = function() {
		var x = Math.floor(Math.random() * 25);
		var y = Math.floor(Math.random() * 25);
		
		this.position = new Coord(x,y);
	}

  Snake.prototype.move = function () {
    var new_seg = this.segments.slice(-1)[0].plus(this.dir);

    this.segments.push(new_seg);
    this.segments.shift();
  }

  Snake.prototype.turn = function (dirString) {
    this.dir = Snake.dirs[dirString];
  }

  Snake.dirs = {N: [0, 1], S: [0, -1], E: [1, 0], W: [-1, 0]}

  var Coord = SnakeGame.Coord = function (x, y) {
    this.x = x;
    this.y = y;
  };

  Coord.prototype.plus = function (dirMod) {
    var x = (this.x + dirMod[0]);
    var y = (this.y + dirMod[1]);
    return new Coord(x, y);
  };

  var Board = SnakeGame.Board = function () {
    this.snake = new Snake();
    this.board = [];
    for(var i = 0; i < 25; i++) {
      this.board[i] = new Array(25);
    }
  };

  Board.prototype.render = function () {
    var $bigDiv = $('<div class="game">');
    var divs = [];
    for(var i = 24; i>= 0; i--) {
      divs[i] = [];
      for(var j = 0; j < 25; j++) {
        // this.board[i][j] = '.';
        var $div = $('<div>');
        divs[i].push($div);
        $bigDiv.append($div);
      };
    };


    this.snake.segments.forEach(function (coord) {
      divs[coord.y][coord.x].toggleClass('snake');
      console.log(divs[coord.y][coord.x]);
    });
		
	

    // var boardString = "<pre>";
//     for (var i = 24; i >=0; i--) {
//       boardString+= board.board[i].join();
//       boardString+= "\n";
//     }
//     boardString += "</pre>";
    return $bigDiv;
    // return boardString;
  };

})(this);