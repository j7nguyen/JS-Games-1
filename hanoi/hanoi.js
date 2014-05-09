(function (root) {
  var Hanoi = root.Hanoi = (root.Hanoi || {});

  // var readline = require('readline');
  // var READER = readline.createInterface({
  //   input: process.stdin,
  //   output: process.stdout
  // });

  var Game = Hanoi.Game = function () {
    this.towers = [[3, 2, 1], [], []];
  };

  Game.prototype.turn = function () {

  }

  Game.prototype.isWon = function () {
    // move all the discs to the last tower
    return (this.towers[2].length == 3) || (this.towers[1].length == 3);
  };

  Game.prototype.isValidMove = function (startTowerIdx, endTowerIdx) {
    var startTower = this.towers[startTowerIdx];
    var endTower = this.towers[endTowerIdx];

    if (startTower.length === 0) {
      return false;
    } else if (endTower.length == 0) {
      return true;
    } else {
      var topStartDisc = startTower[startTower.length - 1];
      var topEndDisc = endTower[endTower.length - 1];
      return topStartDisc < topEndDisc;
    }
  };

  Game.prototype.move = function (startTowerIdx, endTowerIdx) {
    if (this.isValidMove(startTowerIdx, endTowerIdx)) {
      this.towers[endTowerIdx].push(this.towers[startTowerIdx].pop());
      return true;
    } else {
      return false;
    }
  };

  var TowersUI = Hanoi.TowersUI = function () {
    this.game = new Game();
    this.render();
    this.currentClick = undefined;
  };

  TowersUI.prototype.buildDivs = function () {
      var divString = '<div class="game">';
      for (var i = 0; i < 3; i++) {
        divString += '<div class="tower" id="' + i + '">';
        for (var j = 2; j >= 0; j--) {
          divString += '<div class="disc" id="' + i + '-' + j + '"></div>';
        }
        divString += '</div>';
      }
      divString += '</div>';
      return divString;
    }

  TowersUI.prototype.render = function () {
    console.log(root.$('div.game'));
    root.$(".game").replaceWith(this.buildDivs());

    //here's where we toggle div classes
    this.game.towers.forEach(function (tower, t_idx) {
      if (tower.length) {
        tower.forEach(function (disc, d_idx) {
          root.$('#' + t_idx + '-' + d_idx).toggleClass('disc' + disc)
        });
      }
    });
  };

  TowersUI.prototype.installHandlers = function () {
    // root.$()
    var currentGame = this;
    $('.game').on('click','.tower',function(event) {
      if (currentGame.currentClick === undefined) {
        currentGame.currentClick = $(event.currentTarget).attr('id');
        $(event.currentTarget).toggleClass('highlighted');
      } else {
        var moved = currentGame.game.move(currentGame.currentClick,
          $(event.currentTarget).attr('id'));
        if (!moved) {alert('Invalid move!');};
        currentGame.render();
        currentGame.currentClick = undefined;
        if (currentGame.game.isWon()) {
          alert('You win!');
        } else {
          currentGame.installHandlers();
        }
      }
    });
  };

  // Game.prototype.run = function () {
  //   var game = this;
  //
  //   READER.question("Enter a starting tower: ",function (start) {
  //     var startTowerIdx = parseInt(start);
  //     READER.question("Enter an ending tower: ", function (end) {
  //       var endTowerIdx = parseInt(end);
  //       game.takeTurn(startTowerIdx,endTowerIdx);
  //     });
  //   });
  // };
  //
  // Game.prototype.takeTurn = function (start,end){
  //   var game = this;
  //
  //   if (game.move(start,end)) {
  //     console.log(game.towers);
  //   } else {
  //     console.log("Invalid move!")
  //   }
  //
  //   if (game.isWon()) {
  //     console.log("You win!");
  //     READER.close();
  //   } else {
  //     game.run();
  //   }
  // }
})(this);

// this.Hanoi.Game is a constructor function, so we instantiate a new object, then run it.

// var Game = new this.Hanoi.Game();
// Game.run();
