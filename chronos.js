/*
* chronos.js
*
* Created by happyCoda on 20.10.2015.
* Copyright (c) 2015 happyCoda. All rights reserved.
*/

define(function () {
	var Chronos = {};

	Chronos.getCurrentTime = function getCurrentTime() {
		var currentTime = new Date();
		return currentTime;
	};

	Chronos.getNextGameTime = function getNextGameTime(timeString) {

		if (!this.nextGameTime) {
			this.nextGameTime = new Date(timeString);
		}

		return this.nextGameTime;
	};

	Chronos.getDiff = function getDiff() {
		var diff;

		diff = (this.getNextGameTime().getTime() - this.getCurrentTime().getTime()) / 1000;

		return diff;
	};

	Chronos.composeString = function composeString() {

		var diff, 
		hours,
		hoursRemains,
		minutes,
		minutesRemains,
		seconds,
		secondsRemains;

		diff = this.getDiff();

		hours = diff / 3600;
		hoursRemains = hours - Math.floor(hours);
		hours = Math.floor(hours);
		minutes = hoursRemains * 60;
		minutesRemains = minutes - Math.floor(minutes);
		minutes = Math.floor(minutes);
		seconds = minutesRemains * 60;
		secondsRemains = seconds - Math.floor(seconds);
		seconds = Math.floor(seconds);

		this.composedString = hours + ':' + minutes + ':' + seconds;

		return this.composedString;
	};

	Chronos.getComposedString = function getComposedString() {
		return this.composeString();
	};

	Chronos.composedToArray = function composedToArray() {
		if (this.composedString) {
			this.composedArray = this.composedString.split(':');
		} else {
			this.composedArray = this.getComposedString().split(':');
		}

		return this.composedArray;
	};

	Chronos.start = function start(timeString) {
		this.getNextGameTime(timeString);

		return this.getComposedString();
	};

	return Chronos;
});