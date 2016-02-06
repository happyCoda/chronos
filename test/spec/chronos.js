define([
	'../../chronos'
], function (Chronos) {
	'use strict';

	describe('Chronos test suite', function () {

		describe('Chronos should be able to get current time', function () {
			it('getCurrentTime method must return a valid timestamp', function () {

				expect(new Date(Chronos.getCurrentTime())).not.toEqual('Invalid Date');

			});
		});

		describe('Chronos should be able to calculate time that left', function () {
			var chr, timeArr;

			chr = Chronos.start({
				timeString: '02/06/16 12:56',
				callback: function (timer) {
					console.log('time left: ', timer.composeString());
				}
			});

			timeArr = chr.composedToArray();

			it('must return correct minute units', function () {

				expect(parseInt(timeArr[1], 10)).toBeLessThan(60);

			});

			it('must return correct second units', function () {

				chr.adjustUnits();

				expect(parseInt(timeArr[2], 10)).toBeLessThan(60);

			});
		});

		describe('Chronos should take duration in milliseconds', function () {

			it('should not throw an exception when duration parameter specified', function () {
				expect(function () {
					Chronos.start({
						timeString: Date.now() + 10000,
						callback: function (timer) {
							console.log('counting time left before dinner: ', timer.composeString());
						}
					});
				}).not.toThrow();
			});
		});

		// describe('Chronos should be able to act like a usual timer', function () {
		// 	var chr;
		//
		// 	chr = Chronos.start({
		// 		direction: 'forward',
		// 		callback: function (timer) {
		// 			console.log(timer.composeString());
		// 		}
		// 	});
		//
		// 	it('must return correct hours spent', function () {
		//
		// 		expect(chr.unitObj.hours).toBeLessThan(24);
		//
		// 	});
		// });
	});
});
