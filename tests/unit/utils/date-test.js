import {
  pad,
  toMonthString,
  toWeekString,
  fromWeekString,
  toDateString,
  toTimeString,
  toDatetimeLocalString,
  formatTimeZoneOffset
} from 'ember-form-for/utils/date';

import { module, test } from 'qunit';

module('Unit | Utility | date-to-string#pad');

test('It pads numbers lower then 10', (assert) => {
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((n) => assert.equal(pad(n), `0${n}`));
});

test('It doesn\'t pad numbers greater or equal then 10', (assert) => {
  assert.equal(pad(10), '10');
});

test('Pad with multiple zeroes', (assert) => {
  assert.equal(pad(10, 3), '010');
});

module('Unit | Utility | date-to-string#toMonthString');

test('It stringifies to month', (assert) => {
  assert.equal(toMonthString(new Date(2015, 9)), '2015-10');
});

module('Unit | Utility | date-to-string#toWeekString');

test('It stringifies to week', (assert) => {
  assert.equal(toWeekString(new Date(2016, 1, 16)), '2016-W7');
});

module('Unit | Utility | date-to-string#fromWeekString');
test('It transforms from string to date #1', (assert) => {
  assert.equal(+fromWeekString('2011-W1'), +new Date(2011, 0, 3, 0));
  assert.equal(+fromWeekString('2012-W1'), +new Date(2012, 0, 2, 0));
  assert.equal(+fromWeekString('2013-W1'), +new Date(2012, 11, 31, 0));
  assert.equal(+fromWeekString('2014-W1'), +new Date(2013, 11, 30, 0));
  assert.equal(+fromWeekString('2015-W1'), +new Date(2014, 11, 29, 0));
  assert.equal(+fromWeekString('2016-W1'), +new Date(2016, 0, 4, 0));
  assert.equal(+fromWeekString('2017-W1'), +new Date(2017, 0, 2, 0));
  assert.equal(+fromWeekString('2018-W1'), +new Date(2018, 0, 1, 0));
});

module('Unit | Utility | date-to-string#toDateString');

test('It stringifies to date', (assert) => {
  assert.equal(toDateString(new Date(2015, 9, 21)), '2015-10-21');
});

module('Unit | Utility | date-to-string#toTimeString');

test('It stringifies to time', (assert) => {
  assert.equal(toTimeString(new Date(2015, 9, 21, 16, 9)), '16:09');
});

module('Unit | Utility | date-to-string#toDatetimeLocalString');

test('It stringifies to datetime-local format', (assert) => {
  assert.equal(toDatetimeLocalString(new Date(2015, 9, 21, 16, 9)), '2015-10-21T16:09');
});

module('Unit | Utility | date-to-string#formatTimeZoneOffset');

test('Produces \'Z\' if 0', (assert) => {
  assert.equal(formatTimeZoneOffset(0), 'Z');
});

test('Produces \'+01:00\' if -60', (assert) => {
  assert.equal(formatTimeZoneOffset(-60), '+01:00');
});
test('Produces \'-01:00\' if 60', (assert) => {
  assert.equal(formatTimeZoneOffset(60), '-01:00');
});
