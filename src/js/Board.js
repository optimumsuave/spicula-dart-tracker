'use strict';
import $ 						from 'jquery';
import {makeSVG, isEven} 		from 'Utility';

var SCORE_ARRAY = [6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5, 20, 1, 18, 4, 13];

var Board = function(){
	this.$svg = $("#app");
	this.touchList = [];
	this.turnScore = 0;
	this.totalScore = 0;
	this.$trashBtn = $(".board-trash-dart");
	this.$trashBtn.click(this.trashDart.bind(this));
	$(".turn-score h2").html(this.turnScore);
	$(".total-score h2").html(this.totalScore);
	this.dartCount = 3;
	this.board = this.createBoard();
	this.createNumbers((this.$svg.width()/2)-10);
	this.$allSelectable = $("svg path, .bullseye-inner, .bullseye-outer");
	this.$allSelectable.hide();
	this.$allSelectable.each(function(i, d){
		setTimeout(function(){
			$(d).fadeIn(100);
		}, i*10);
	});
}

Board.prototype.trashDart = function(){
	if(this.dartCount < 3){
		var pts = $(".hit").last().attr("data-score");
		console.log(pts);
		this.turnScore-=parseInt(pts);
		this.totalScore-=parseInt(pts);
		$(".hit").last().remove();
		$(".slice.active").last().removeClass("active");
		this.dartCount++;
		this.render();
	}
}

Board.prototype.createNumbers = function(r){
	var cx = this.$svg.width()/2;
	var cy = this.$svg.height()/2;
	for(var i=0;i<20;i++){
		var a = ((i * 18)) * (Math.PI/180);
		var x = cx + r * Math.cos(a);
		var y = cy + r * Math.sin(a);
		var text = makeSVG('text', {x: x, y: y, dy: 5, style: 'font-family: Arial;font-size: 12px', fill: 'white', 'text-anchor': 'middle'});
		text.innerHTML = SCORE_ARRAY[i];
		this.$svg.append(text);
	}
}

Board.prototype.throwDart = function(e){
	e.preventDefault();
	var px = 0;
	var py = 0;
	if(typeof e.originalEvent.touches !== "undefined") {
		px = e.originalEvent.touches[0].clientX;
		py = e.originalEvent.touches[0].clientY;
	} else {
		px = e.pageX;
		py = e.pageY;
	}
	if($(e.target).hasClass("active")){
		// this.dartCount++;
		// $(e.target).removeClass("active");
		// this.turnScore -= parseInt($(e.target).attr('data-score'));
		// this.totalScore -= parseInt($(e.target).attr('data-score'));
	} else {
		
	}
	if(this.dartCount) {
		var w = ($(window).width()-this.$svg.width())/2;
		var h = 60;
		var hit = makeSVG('circle', {
			class:'hit', 
			'data-score': parseInt($(e.target).attr('data-score')), 
			cx: px-w,
			cy: py-h,
			r: 5,
			fill: 'none',
			'stroke-width': 4,
			stroke: '#ffb200'
		});
		this.$svg.append(hit);
		this.turnScore += parseInt($(e.target).attr('data-score'));
		this.totalScore += parseInt($(e.target).attr('data-score'));
		$(e.target).addClass("active");
		this.dartCount--;
	}
	
	$(".turn-score h2").html(this.turnScore);
	$(".total-score h2").html(this.totalScore);

	this.render();
	// this.totalScore += parseInt();
}

Board.prototype.render = function(){
	$(".turn-score h2").html(this.turnScore);
	$(".total-score h2").html(this.totalScore);

	if(this.dartCount < 3){
		$(".board-trash-dart").fadeIn();
	} else {
		$(".board-trash-dart").fadeOut();
	}
	if(this.dartCount == 0){
		$(".board-next-turn").fadeIn();
	} else {
		$(".board-next-turn").fadeOut();
	}


	$(".dart").removeClass("active");
	for(var i=4;i>this.dartCount;i--){
		$(".dart").eq(i-1).addClass("active");		
	}
}

Board.prototype.createSlice = function(r, color1, color2, multiplier){
	var cx = this.$svg.width()/2;
	var cy = this.$svg.height()/2;
	for(var i=0;i<20;i++){
		var theta = (i * 18);
		var a = (theta-9) * (Math.PI/180);
		var x = cx + r * Math.cos(a);
		var y = cy + r * Math.sin(a);

		var theta2 = ((i+1) * 18);
		var a2 = (theta2-9) * (Math.PI/180);
		var x2 = cx + r * Math.cos(a2);
		var y2 = cy + r * Math.sin(a2);

		var path = "M"+cx+" "+cy+" L"+Math.round(x)+" "+Math.round(y)+" "+Math.round(x2)+" "+Math.round(y2)+" Z";

		var slice = makeSVG('path', {class:'slice', 'data-score': multiplier*SCORE_ARRAY[i], d: path, fill: (isEven(i) ? color1 : color2)});
		// $(slice).on("click tap", function(){
		// 	$(this).addClass("active");
		// });
		var touchList = this.touchList;
		var dartCount = this.dartCount;
		$(slice).on("click touchstart", this.throwDart.bind(this));		
		// $(slice).on("mouseover touchstart", function(e){
			// $(this).addClass("hover");
			// $(this).addClass("hover");
		// });
		// $(slice).on("mouseout", function(e){
			// $(this).removeClass("hover");
		// });
		
		// $(slice).on("touchend", function(e){
		// 	e.preventDefault();

		// 	// console.log(e);	
		// 	$(e.currentTarget).addClass("active");
		// 	console.log(e.originalEvent.changedTouches);
		// 	if(dartCount) {
		// 		touchList.push($(this));
		// 	}
		// });
		this.$svg.append(slice);
	}
}

Board.prototype.createBoard = function(){
	var cx = this.$svg.width()/2;
	var cy = this.$svg.height()/2;


	// var bg = makeSVG('rect', {x: 0, y: 0, width: this.$svg.width(), height: this.$svg.height(), fill: 'gray'});
	// this.$svg.append(bg);


	var circle = makeSVG('circle', {class:'missed', 'data-score': 0, cx: cx, cy: cy, r: cx, fill: 'black'});
	$(circle).on("click touchstart", this.throwDart.bind(this));
	this.$svg.append(circle);

	this.createSlice(cx-20, 'green', 'red', 2);
	this.createSlice(cx-40, 'black', 'white', 1);
	this.createSlice(cx-70, 'green', 'red', 3);
	this.createSlice(cx-90, 'black', 'white', 1);
		


	var outerBullsEye = makeSVG('circle', {class: 'bullseye-outer', 'data-score': 50, cx: cx, cy: cy, r: 30, fill: 'green'});
	$(outerBullsEye).on("click touchstart", this.throwDart.bind(this));
	this.$svg.append(outerBullsEye);

	var innerBullsEye = makeSVG('circle', {class:'bullseye-inner', 'data-score': 100, cx: cx, cy: cy, r: 12, fill: 'red'});
	$(innerBullsEye).on("click touchstart", this.throwDart.bind(this));
	this.$svg.append(innerBullsEye);
}

export default Board;