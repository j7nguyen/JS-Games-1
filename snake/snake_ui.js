(function(root) {
  var SnakeGame = root.SnakeGame = (root.SnakeGame || {});
  var View = SnakeGame.View = function(el) {
    var $el = el;
  }

  View.prototype.start = function() {
    this.board = new SnakeGame.Board();
    var view = this;
    $(document).keydown(function (key) {
      view.handleKeyEvent(key);
    });
    this.intervalId = setInterval(function(){
      view.step();
    },100);
  }

  View.prototype.handleKeyEvent = function(key) {

    this.board.snake.turn(View.keys[parseInt(key.which,10)]);
    console.log(this.board.snake.dir);
  }

  View.keys = {'38':'N', '37':'W', '40':'S', '39':'E'};

  View.prototype.step = function() {
    this.board.snake.move();
    var new_seg = this.board.snake.segments.slice(-1)[0];
    var x = new_seg.x;
    var y = new_seg.y;
    if (x >=25 || x < 0 || y >= 25 || y < 0) {
      alert("You lose!");
      $(document).off();
      clearInterval(this.intervalId);
    } else {
      var boardStuff = this.board.render();
      $('.game').replaceWith(boardStuff);
    }
  }

  View.prototype.render = function() {

  }

})(this);