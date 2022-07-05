"use strict";

const { itemData, getDefaultGurr } = require("./itemData");

const version = "megamonkey2";

console.log("Lamb Lamb version:", version);

exports.handler = async (event) => {
  console.log(event);

  const id = Number(event.pathParameters.uuid) || 0;

  if (id > 50) {
    return {
      statusCode: 200,
      body: JSON.stringify(getDefaultGurr(id)),
    };
  }

  const body = itemData[id] || itemData[0];

  const response = {
    statusCode: 200,
    body: JSON.stringify(body),
  };
  return response;
};
