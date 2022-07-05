"use strict";

module.exports = ({ rawMessages }) => {
  const formattedMessagesData = [];

  for (const rawMessage of rawMessages) {
    formattedMessagesData.push(JSON.parse(rawMessage));
  }

  return formattedMessagesData;
};
