# chronos
> A JavaScript timer with simple and convenient API

## Installation
Library can be installed via [Bower](http://bower.io/) package manager:

```shell
bower i chronosjs
```

An `npm` package also available:

```shell
$ npm install chronos-js
```

Or you can clone a git repo:

```shell
git clone https://github.com/happyCoda/chronos.git
```

### Getting started
Just as simple as is.

```js
Chronos.start({
  direction: 'forward',
  callback: function (chr) {
    console.log(chr.composeString());
  }
});
```

### Usage

Chronos.js is written as an `AMD` module, so it's intended to use with loaders like Require.js, Almond, etc. However, library can be used directly in browser, since it exposes global wrapper – `ChronosWrapper`.


### API

#### start

Library entry point. Here all the gears and sprocket starts running.

```js
Chronos.start(params);
```

Start method expects to get a `params` argument which has to be a configurations object. There can be three properties – `direction, callback [, timeString]`. The first one, `direction` decides whether Chronos will be a regular timer, or time will flow backwards. `callback` specifies a function callback which will be invoked every second with Chronos passed as an argument. And the last prop is a `timeString` which represents some time in the future, where Chronos will be count time to (e.g.: how much time left until the New Year).

#### stop

Chronos last stop.

```js
Chronos.stop();
```

This method does exactly as it says. If you need to stop Chronos for time counting, just call `stop`.

#### composeString

Assembles current time value into a string.

```js
Chronos.composeString();
```

#### composedToArray

Converts composed string into a usable array of time units (hours, mins, secs).

```js
Chronos.composedToArray(composedString);
```

### Examples

#### Create timer and write time to the page

In this example, we start Chronos with `forward` option and update changed time every second:

```js
var clockDisplay = document.querySelector('.clock-display');

Chronos.start({
  direction: 'forward',
  callback: function (chr) {
    clockDisplay.textContent = chr.composeString();
  }
});
```

#### Counting time backwards

Creating a reverse timer:

```js
var $timeLeft = $('.time-left'),
timeString = new Date(Date.now() + 60 * 60 * 1000);

Chronos.start({
  direction: 'backward',
  timeString: timeString
  callback: function (chr) {
    timeLeft.text(chr.composeString());
  }
});
```

## Release History
* 2016-02-06   v0.5.4   Switched from singleton to constructor. Now multiple Chronos instances allowed.
* 2016-02-06   v0.4.4   Added support for timer duration in milliseconds.
* 2016-02-06   v0.4.3   AMD support refactor.
* 2016-02-05   v0.4.2   Case when backwards time is past fix.
* 2016-02-05   v0.4.1   Chronos time runner added.
* 2016-02-04   v0.3.0   Forward counting logic added.
* 2016-02-04   v0.2.3   Docs and bower integration.
* 2016-02-04   v0.2.2   adjustUnits method bug fixed.
* 2016-02-04   v0.2.1   Code refactor.
* 2016-02-04   v0.2.0   composedToArray method added & copyrights.
* 2016-02-04   v0.1.0   First official release. Tests and main logic.
