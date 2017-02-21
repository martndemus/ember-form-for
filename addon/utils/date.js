const { abs, ceil } = Math;

export const pad = (number, amount = 2) => {
  let padding = (new Array(amount)).join('0');
  return `${padding}${number}`.slice(-amount);
};

export const toMonthString = (date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;

export const toWeekString = (date) => {
  date = new Date(+date);
  date.setHours(0, 0, 0);
  date.setDate(date.getDate() + 4 - (date.getDay() || 7));

  let weekNumber = ceil((((date - new Date(date.getFullYear(), 0, 1)) / 8.64e7) + 1) / 7);

  return `${date.getFullYear()}-W${weekNumber}`;
};

export const fromWeekString = (string) => {
  let [year, weekNr] = string.match(/^(\d{4})-W(\d{1,2})$/).slice(1);
  let jan1OfYear = new Date(Number(year), 0, 1);
  let jan4OfYear = new Date(Number(year), 0, 4);
  let correction = (jan4OfYear.getDay() || 7) + 4;

  let offsetFrom1Jan = (Number(weekNr) * 7 + 1 - correction) * 8.64e7;
  let result = new Date(+jan1OfYear + offsetFrom1Jan);

  result.setHours(0, 0, 0);

  return result;
};

export const toDateString = (date) =>
   `${toMonthString(date)}-${pad(date.getDate())}`;

export const toTimeString = (date) =>
  `${pad(date.getHours())}:${pad(date.getMinutes())}`;

export const toDatetimeLocalString = (date) =>
  `${toDateString(date)}T${toTimeString(date)}`;

export const formatTimeZoneOffset = (offset) => {
  if (offset === 0) {
    offset = 'Z';
  } else {
    let hours   = abs(offset) / 60;
    let minutes = abs(offset) % 60;
    let sign    = offset > 0 ? '-' : '+';
    offset = `${sign}${pad(hours)}:${pad(minutes)}`;
  }

  return offset;
};
