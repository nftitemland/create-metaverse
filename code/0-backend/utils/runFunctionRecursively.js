"use strict";

const delay = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

module.exports = ({ mainFunction, retryTimeInSeconds = 10 }) =>
  new Promise((resolve, reject) => {
    const retryTime = retryTimeInSeconds * 1000;

    const runFunctionRecursion = async () => {
      try {
        await mainFunction();
      } catch (err) {
        return reject(err);
      }

      console.log(
        "runFunctionRecursively, executing again in " +
          `${retryTimeInSeconds} seconds`
      );

      await delay(retryTime);

      runFunctionRecursion();
    };

    runFunctionRecursion();
  });
