/*
 * chronos.js
 *
 * Created by happyCoda on 20.10.2015.
 * Copyright (c) 2015 happyCoda. All rights reserved.
 */

'use strict';

/**
* A module for creating timers.
* @exports Chronos
*/
function Chronos() {};

/**
* @method get
* Factory method that returns any other property of Chronos
*
* @param {String} prop any string
* @returns {*} this[prop] any property value or undefined
*/
Chronos.prototype.get = function get(prop) {
  // TODO: make this method to return only string, array or object represents calculated time
  return this[prop];
};

/**
* @method getCurrentTime
* Gets current time
*
* @returns {Object} currentTime current time represented as a Date object
*/
Chronos.prototype.getCurrentTime = function getCurrentTime() {

  var currentTime = new Date();

  return currentTime;

};

/**
* @method getFutureTime
* Gets future time for backwards count
*
* @returns {Object} this.futureTime future time represented as a Date object
*/
Chronos.prototype.getFutureTime = function getFutureTime() {

  if (this.duration) {

    this.futureTime = new Date((new Date()).getTime() + this.duration);

  } else if (this.timeString) {

    this.futureTime = new Date(this.timeString);

  } else {

    throw new Error('There must be a duration or timeString specified!');

  }

  return this.futureTime;
};

/**
* @method getPastTime
* Gets past time for forward count
*
* @returns {Object} this.pastTime past time represented as a Date object
*/
Chronos.prototype.getPastTime = function getPastTime() {
  var currentDateString;

  currentDateString = this.getCurrentTime().toDateString();

  this.pastTime = new Date(currentDateString + ' 00:00');

  return this.pastTime;
};

/**
* @method getDiff
* Calculates a difference between current and target time
*
* @param {Number} time1 timestamp from current or future time
* @param {Number} time2 timestamp from past or current time
* @returns {Number} diff difference between current and target timestamps
*/
Chronos.prototype.getDiff = function getDiff(time1, time2) {

  var diff;

  diff = time1 - time2;

  return diff;

};

/**
* @method calculateUnits
* Calculates time units which are – hrs, mins and secs
*
* @param {Number} timestampDiff between futureTime and currentTime timestamps
* @returns {Object} this.unitObj an object with hours, minutes and seconds for timestampDiff
*/
Chronos.prototype.calculateUnits = function calculateUnits(timestampDiff) {

  var hoursRaw,
    hoursRemains,
    minutesRaw,
    minutesRemains,
    secondsRaw;

  this.unitObj = {};

  hoursRaw = timestampDiff / 1000 / 3600;

  this.unitObj.hours = Math.floor(hoursRaw);

  hoursRemains = hoursRaw - this.unitObj.hours;

  minutesRaw = hoursRemains * 60;

  this.unitObj.minutes = Math.floor(minutesRaw);

  minutesRemains = minutesRaw - this.unitObj.minutes;

  secondsRaw = minutesRemains * 60;

  this.unitObj.seconds = Math.floor(secondsRaw);

  return this.unitObj;

};

/**
* @method adjustUnits
* Converts time units to human readable format
*
* @returns {Object} this the this object for chaining
*/
Chronos.prototype.adjustUnits = function adjustUnits() {

  var props, unitObj;

  props = Object.keys(this.unitObj);

  unitObj = this.unitObj;

  props.forEach(function (prop) {

    unitObj[prop] = (unitObj[prop]).toString();

    if (unitObj[prop].length < 2) {
      unitObj[prop] = '0' + unitObj[prop];
    }
  });

  return this;

};

/**
* @method composeString
* Converts unit object into string
*
* @returns {String} this.composedString a converted string
*/
Chronos.prototype.composeString = function composeString() {

  this.composedString = this.unitObj.hours + ':' + this.unitObj.minutes + ':' + this.unitObj.seconds;

  return this.composedString;

};

/**
* @method composedToArray
* Converts composed string to an array
*
* @param {String} composedString
* @returns {Array} this.composedArray a converted array
*/
Chronos.prototype.composedToArray = function composedToArray(composedString) {

  if (this.composedString) {
    this.composedArray = this.composedString.split(':');
  } else {
    this.composedArray = this.composeString().split(':');
  }

  return this.composedArray;

};

/**
* @method controller
* Manage Chronos logic
*
* @returns {Object} this Chronos object for chaining
*/
Chronos.prototype.controller = function controller(callback, name) {

  var diff, time1, time2;

  time1 = this.getCurrentTime().getTime();

  if (this.direction === 'forward') {

    time2 = this.getPastTime().getTime();

  } else {

    time2 = time1;

    time1 = this.getFutureTime().getTime();

  }

  diff = this.getDiff(time1, time2);

  if (diff <= 1000) {

    diff = 0;

    if (this.interval) {

      this.stop();
    }

  }

  this.calculateUnits(diff);

  this.adjustUnits();

  if (callback) {

    callback(this);

  }

  if (name && diff !== 0) {

    this.interval = setInterval(this[name].bind(this, callback), 1000);

  }

  return this;

};

/**
* @method start
* Module entry point
*
* @param {Object} params object with initial settings
* @returns {Object} this Chronos object for chaining
*/
Chronos.prototype.start = function start(params) {

  this.direction = params.direction;

  if (params.timeString) {

    this.timeString = params.timeString;

  } else if (params.duration) {

    this.duration = this.duration;

  }

  this.controller(params.callback, 'controller');

  return this;

};

/**
* @method stop
* Stops chronos
*
* @returns {Object} this Chronos object for chaining
*/
Chronos.prototype.stop = function stop() {

  clearInterval(this.interval);

  return this;
};

if (typeof define === 'function' && define.amd) {

  define(function () {
    return Chronos;
  });

}
