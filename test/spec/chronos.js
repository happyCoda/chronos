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

			chr = Chronos.start('10/21/15 12:30')

			timeArr = chr.composedToArray();

			it('must return correct minute units', function () {

				expect(parseInt(timeArr[1], 10)).toBeLessThan(60);
				
			});

			it('must return correct second units', function () {

				chr.adjustUnits();

				expect(parseInt(timeArr[2], 10)).toBeLessThan(60);
				
			});
		});
	});

});