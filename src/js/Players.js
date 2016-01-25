'use strict';

import $ 		from 'jquery';


var Players = function(){
	this.players = ["Connor", "Josh", "Micah", "JP"];
	this.currentPlayer = 0;
	this.beginTurn();
}

Players.prototype.beginTurn = function(){
	$(".turn-player h2").html(this.players[this.currentPlayer]);
}

export default Players;