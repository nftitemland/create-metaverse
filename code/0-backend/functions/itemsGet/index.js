"use strict";

const { slimeData } = require("./itemData");

const version = "megamonkey2";

console.log("Lamb Lamb version:", version);

exports.handler = async (event) => {
  console.log(event);

  const body = slimeData[event.pathParameters.uuid] || slimeData[0];

  const response = {
    statusCode: 200,
    body: JSON.stringify(body),
  };
  return response;
};
