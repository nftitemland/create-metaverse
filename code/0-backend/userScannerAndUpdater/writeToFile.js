"use strict";

const fs = require("fs");

const reportsRootPath = `${__dirname}/dist_reports`;

const writeToFile = (...args) => {
  const date = new Date();

  const dateString = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}.txt`;

  const reportsPath = `${reportsRootPath}/${dateString}`;

  const stream = fs.createWriteStream(reportsPath, {
    flags: "a",
  });

  stream.write(`${args.join(" ")}\n`);

  stream.end();
};

module.exports = writeToFile;
// TODO: if used elsewhere use getWriteToFile (reportsRootPath) => (...) =>
