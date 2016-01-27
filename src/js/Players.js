'use strict';

import $ 				from 'jquery';
import {isEven} 		from 'Utility';

var Players = function(players){
	this.players = players;
	this.scores = [];
	this.turnScores = [];
	this.tempScores = [];
	this.gameType = 0;
	this.gameTypes = [501, 301, 201];
	this.players.forEach(function(){
		this.scores.push(this.gameTypes[this.gameType]);
		this.tempScores.push(this.gameTypes[this.gameType]);
		this.turnScores.push(0);
	}.bind(this));
	this.currentPlayer = 0;
	this.nextTurn();
}

Players.prototype.beginTurn = function(){
	this.render();
}

Players.prototype.nextTurn = function(){
	//advance and reset turn score
	this.scores[this.currentPlayer] = this.tempScores[this.currentPlayer];
	this.turnScores[this.currentPlayer] = 0;
	this.render();
}

Players.prototype.finishTurn = function(){
	this.scores[this.currentPlayer] = this.tempScores[this.currentPlayer];
	this.currentPlayer++;
	if(this.currentPlayer == this.players.length) {
		this.currentPlayer = 0;
	}
	this.nextTurn();
}

Players.prototype.score = function(score){
	var newScore = this.tempScores[this.currentPlayer]-score;
	if(newScore == 0) {
		// this.gameOver();
	} else if(newScore < 0) {

	} else if(newScore > 0) {
		this.turnScores[this.currentPlayer] += score;
		this.tempScores[this.currentPlayer] = newScore;
	}
	this.render();
}

Players.prototype.unScore = function(score){
	this.turnScores[this.currentPlayer] -=score;
	this.tempScores[this.currentPlayer] += score;
	this.render();
}

Players.prototype.gameOver = function(){

}

Players.prototype.subtractScore = function(score){
	if(this.turnScores[this.currentPlayer] > score) {
		this.turnScores[this.currentPlayer] -= score;
	} else {
		this.turnScores[this.currentPlayer] = 0;
	}
}

Players.prototype.render = function(){
	var output  = "<div class='players-inner'>";
	var currentPlayer = this.currentPlayer;

	var tempScores = this.tempScores;
	var indexed = this.players.map(function(p, i){return {player: p, score: tempScores[i], index: i}});
	var sorted = indexed.sort(function(a,b){return a.score-b.score});
	var currentPlayerPlacing = 0;
	sorted.forEach(function(s, i){
		if(s.index == currentPlayer){
			currentPlayerPlacing = i;
		}
	});

	output+= "<div class='player active'>";
	output+= "<div class='turn-player score-box-2'><h2>"+this.players[currentPlayer]+"</h2></div>";
	output+= "<div class='turn-score score-box-1'><h2>"+this.turnScores[currentPlayer]+"</h2></div>";
	output+= "<div class='total-score score-box-1'><h2><b>"+(currentPlayerPlacing+1)+"</b>"+this.tempScores[currentPlayer]+"</h2></div>";
	output+= "</div>";

	var sortedWithoutCurrent = indexed.sort(function(a,b){return a.score-b.score});
	
	
	sortedWithoutCurrent.forEach(function(s, i){
		if(s.index != currentPlayer){
			output+= "<div class='player'>";
			output+= "<div class='turn-player score-box-2'><h2>"+s.player+"</b></h2></div>";
			output+= "<div class='turn-score score-box-1'><h2>"+this.turnScores[s.index]+"</h2></div>";
			output+= "<div class='total-score score-box-1'><h2><b>"+(i+1)+"</b>"+this.tempScores[s.index]+"</h2></div>";
			output+= "</div>";
		}
	}.bind(this));
	output+= "</div><div class='clearfix'></div>";
	$(".players").html(output);
}


export default Players;