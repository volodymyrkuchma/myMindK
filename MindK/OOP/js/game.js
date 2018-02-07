function  Game () {
    var track1;
    var track2;
    var player1;
    var player2;

    this.getTrack1 = function() {
        return track1;
    };
    this.getTrack2 = function() {
        return track2;
    };
    this.setTrack1 = function (track) {
        track1 = track;
    };
    this.setTrack2 = function (track) {
        track2 = track;
    };
}

Game.CEIL_WIDTH = 55;

// GAME INITIALISATION
Game.prototype.init = function () {
    // new odjects in player1 & player2
    this.player1 = new Zaec();
    this.player2 = new Volk();

    // draw pictures of players in tracks
    track1.innerHTML += '<div class="player ' + this.player1.getImage() + '" style="left: ' + this.player1.getLeft() + 'px;"></div>';
    track2.innerHTML += '<div class="player ' + this.player2.getImage() + '" style="left: ' + this.player2.getLeft() + 'px;"></div>';
};

// RUN
Game.prototype.run = function () {
    //clear barrier pic
    if (track1.querySelector(".barrier") != null) {
        track1.removeChild(track1.childNodes[1]);
    }

    // new barrier
    var b1 = new Barrier();
    b1.init();
    // draw barrier pic
    track1.innerHTML += '<div class="barrier ' + b1.getImage() + '" style="left: '+ (this.player1.getLeft() + Game.CEIL_WIDTH*2) +'px;"></div>';

    // set player's left position in depending on conditions
    this.player1.setLeft(this.player1.getLeft() + Game.CEIL_WIDTH * this.player1.getSpeed() + Game.CEIL_WIDTH * b1.getAffect());

    // draw player's move
    track1.firstChild.style.left = this.player1.getLeft() + 'px';


    // THE SAME STUFF FOR SECOND PLAYER
    if (track2.querySelector(".barrier") != null) {
        track2.removeChild(track2.childNodes[1]);
    }

    var b2 = new Barrier();
    b2.init();

    track2.innerHTML += '<div class="barrier ' + b2.getImage() + '" style="left: '+ (this.player2.getLeft() + Game.CEIL_WIDTH*2) +'px;"></div>';

    this.player2.setLeft(this.player2.getLeft() + Game.CEIL_WIDTH * this.player2.getSpeed() + Game.CEIL_WIDTH * b2.getAffect());

    track2.firstChild.style.left = this.player2.getLeft() + 'px';

    // Volk win
    if (this.player2.getLeft() >= this.player1.getLeft()) {
        document.getElementById("winner").classList.add(this.player2.getImage());
        document.getElementById("game-over").classList.toggle("hidden");
    }
    // Zaec win
    if (this.player1.getLeft() >= 20 * Game.CEIL_WIDTH) {
        document.getElementById("winner").classList.add(this.player1.getImage());
        document.getElementById("game-over").classList.toggle("hidden");
    }
};

Game.prototype.restart = function () {
    location.reload();
};

window.onload = function(e) {

    var game = new Game();

    game.setTrack1(document.getElementById('track1'));
    game.setTrack2(document.getElementById('track2'));

    game.init();

    document.getElementById('go').addEventListener("click", function () {
        game.run();
    });

    document.getElementById('restart').addEventListener("click", function () {
        game.restart();
    });
};

