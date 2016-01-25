'use strict';

import $ 		from 'jquery';
import Board 	from 'Board';
import Players 	from 'Players';

$(document).ready(function(){
	$("nav i, .fa-close-label").click(function(){
		$("nav").toggleClass("open");
	});
	// myPlayers = new Players();
	var myBoard = new Board();
});