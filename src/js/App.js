'use strict';

import $ 		from 'jquery';
import Board 	from 'Board';
import Players 	from 'Players';

$(document).ready(function(){
	$("nav i, .fa-close-label").click(function(){
		$("nav").toggleClass("open");
	});

	$(".new-game").on("touchstart click", function(){
		$(".splash svg, .new-game").hide();
		$(".splash .player-list").fadeIn();
		$(".player-list").append("<ul></ul>");
		$(".player-list").append("<input autocomplete='off' placeholder='Player 1' /> ");
		$(".player-list").append("<button><i class='fa fa-add'></i></button>");
	});

	myPlayers = new Players();
});