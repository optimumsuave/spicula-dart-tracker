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
		var addBtn = $("<button class='btn-round'><i class='fa fa-plus'></i></button>");
		addBtn.appendTo($(".player-list"));
		var addName = $("<input class='add-name' autocomplete='off' placeholder='Player' />");
		addName.appendTo($(".player-list"));
		addName.focus();
		var playerList = [];
		
		addBtn.click(function(){
			var li = $("<li><span>"+addName.val()+"</span></li>");
			playerList.push(addName.val());
			addName.val("");
			var del = $("<button class='btn-remove'><i class='fa fa-close'></i></button>");
			del.click(function(){
				playerList.pop();
				$(this).parent().remove();
			});
			del.appendTo(li);
			li.appendTo(nameList);
			addName.focus();
		});
		$("<hr/>").appendTo($(".player-list"));

		var startBtn = $("<button class='begin'>BEGIN</button>");
		startBtn.appendTo($(".player-list"));
		startBtn.click(function(){
			$(".splash").hide();
			$(".board-buttons").fadeIn();
			$(".darts").fadeIn();
			$(".scoring").fadeIn();
			$("#app").css("display", "block");
			var myPlayers = new Players(playerList);

			var myBoard = new Board(myPlayers);
		});
	});

});