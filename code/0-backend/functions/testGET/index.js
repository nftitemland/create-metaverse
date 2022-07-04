"use strict";

const version = "megamonkey1";
console.log("Lamb Lamb version:", version);

const uuid = require("uuid");
const realRequest = require("./realRequest");

exports.handler = async (event) => {
  console.log(event);

  await realRequest({
    connectionId: event.connectionId,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({
      hello: "world",
      uuid: uuid.v4(),
    }),
  };
};
