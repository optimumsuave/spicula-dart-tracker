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
		var nameList = $("<ol></ol>");
		nameList.appendTo($(".player-list"));
		var addBtn = $("<button><i class='fa fa-plus'></i></button>");
		addBtn.appendTo($(".player-list"));
		var addName = $("<input class='add-name' autocomplete='off' placeholder='Player' />");
		addName.appendTo($(".player-list"));
		addName.focus();
		
		addBtn.click(function(){
			var li = $("<li><span>"+addName.val()+"</span></li>");
			addName.val("");
			var del = $("<button><i class='fa fa-close'></i></button>");
			del.appendTo(li);
			li.appendTo(nameList);
			addName.focus();
		});
	});

	myPlayers = new Players();
});