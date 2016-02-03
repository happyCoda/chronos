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

		return hours + ':' + minutes + ':' + seconds;
	};

	Chronos.start = function start(timeString) {
		this.getNextGameTime(timeString);

		return this.composeString();
	};

	return Chronos;
});