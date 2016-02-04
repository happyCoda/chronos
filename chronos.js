/*
 * chronos.js
 *
 * Created by happyCoda on 20.10.2015.
 * Copyright (c) 2015 happyCoda. All rights reserved.
 */

define(function () {
    'use strict';

    var Chronos = {};

    Chronos.get = function get(prop) {
        return this[prop];
    };

    Chronos.getCurrentTime = function getCurrentTime() {

        var currentTime = new Date();

        return currentTime;

    };

    Chronos.getFutureTime = function getFutureTime() {

        if (!this.futureTime) {
            this.futureTime = new Date(this.timeString);
        }

        return this.futureTime;
    };

    Chronos.getDiff = function getDiff() {

        var diff;

        diff = (this.getFutureTime().getTime() - this.getCurrentTime().getTime());

        return diff;

    };

    Chronos.calculateUnits = function calculateUnits(timestamp) {

        var hoursRaw,
            hoursRemains,
            minutesRaw,
            minutesRemains,
            secondsRaw;

        this.unitObj = {};

        hoursRaw = timestamp / 1000 / 3600;

        this.unitObj.hours = Math.floor(hoursRaw);

        hoursRemains = hoursRaw - this.unitObj.hours;

        minutesRaw = hoursRemains * 60;

        this.unitObj.minutes = Math.floor(minutesRaw);

        minutesRemains = minutesRaw - this.unitObj.minutes;

        secondsRaw = minutesRemains * 60;

        this.unitObj.seconds = Math.floor(secondsRaw);

        return this.unitObj;

    };

    Chronos.adjustUnits = function adjustUnits() {

        var props, unitObj;

        props = Object.keys(this.unitObj);

        unitObj = this.unitObj;

        props.forEach(function (prop) {

            unitObj[prop] = (unitObj[prop]).toString();

            if (unitObj[prop].length < 2) {
                unitObj[prop] = '0' + unitObj[prop];
            }
        });

    };

    Chronos.composeString = function composeString() {

        this.composedString = this.unitObj.hours + ':' + this.unitObj.minutes + ':' + this.unitObj.seconds;

        return this.composedString;

    };

    Chronos.composedToArray = function composedToArray(composedString) {

        if (this.composedString) {
            this.composedArray = this.composedString.split(':');
        } else {
            this.composedArray = this.composeString().split(':');
        }

        return this.composedArray;

    };

    Chronos.controller = function controller() {
        var diff;

        diff = this.getDiff();

        this.calculateUnits(diff);

        this.adjustUnits();

        return this;
    };

    Chronos.start = function start(timeString) {
        this.timeString = timeString;

        this.controller();

        return this;

    };

    return Chronos;
});