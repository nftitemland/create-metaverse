"use strict";

const stringify = require("../stringify");
const delay = require("../delay");

module.exports = async (dayDiff = 1, hour = 0) => {
  console.log(
    `running waitUntilNextDayTime with the following values ${stringify(
      dayDiff,
      hour
    )}}`
  );

  const date = new Date();
  const nextDay = date.getDate() + dayDiff;

  const nextDate = new Date(date.setDate(nextDay));

  const nextDateWithHour = new Date(
    nextDate.getFullYear(),
    nextDate.getMonth(),
    nextDate.getDate(),
    hour
  );

  const newDateWithHourTime = nextDateWithHour.getTime();

  const timeUntilNextDayTime = newDateWithHourTime - Date.now();

  console.log(
    `waitUntilNextDayTime, waiting until: ${stringify({
      time: nextDateWithHour.toLocaleString(),
      newDateWithHourTime,
      timeUntilNextDayTime,
    })}`
  );

  await delay(timeUntilNextDayTime);

  console.log(
    `waitUntilNextDayTime, waiting complete, ` +
      `it is time for the power of dragon 🐉: ${stringify({
        now: new Date().toLocaleString(),
      })}`
  );
};
