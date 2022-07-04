"use strict";

const version = "megamonkey2";
// const axios = require("axios");

console.log("Lamb Lamb version:", version);
const SWORD_URL = `https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/sword_1.png`;

exports.handler = async (event) => {
  console.log(event);

  const id = Number(event.pathParameters.uuid.split(".")[0]) || 0;

  if (id > 7000 || id < 1) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        statusCode: 500,
        message: "Invalid Flamin ID provided",
      }),
    };
  }

  const url = SWORD_URL;

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      description: "Basic item",
      external_url: url,
      image: url,
      name: `Basic Item ${id}`,
      attributes: [
        {
          trait_type: "Type",
          value: "Basic Item",
        },
        // {
        //   trait_type: "Area",
        //   value: UPPER_POI,
        // },
      ],
    }),
  };
  return response;
};
