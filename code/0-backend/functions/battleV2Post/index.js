"use strict";

const {
  lambda: { getFormattedApiEvent, getResponse, handleError },
  stringify,
  constants: { httpHeaderKeys },
  authorizeUser,
} = require("compute-utils");

const battle = require("./battle");

const version = "megamonkey1";
console.log("Lamb Lamb version:", version);

const getValidatedValues = require("./getValidatedValues");

exports.handler = async (event) => {
  console.log(event);

  try {
    console.log("running Lambda /expansive-world/battle-v2 POST");

    const formattedEvent = getFormattedApiEvent({
      rawEvent: event,
      shouldGetBodyFromEvent: true,
    });

    const rawNToken = formattedEvent.headers[httpHeaderKeys.NFTITEM__NTOKEN];
    const rawAddress = formattedEvent.headers[httpHeaderKeys.NFTITEM__ADDRESS];
    const rawEnemyUserId = formattedEvent.body.enemyUserId;

    const { address, nToken, enemyUserId } = getValidatedValues({
      rawAddress,
      rawNToken,
      rawEnemyUserId,
    });

    await authorizeUser({
      address,
      nToken,
    });

    const results = await battle({
      address,
      enemyUserId,
    });

    const responseData = Object.assign(
      {
        poiPassTechnical: "ppt_3d24lkeadaalweiwqg38469",
      },
      results
    );

    console.log(
      "the Lambda /expansive-world/battle-v2 POST - " +
        "function executed successfully: " +
        stringify({ responseData })
    );

    return getResponse({
      body: responseData,
    });
  } catch (err) {
    console.log(
      `error in Lambda /expansive-world/battle-v2 POST function: ${err}`
    );

    return handleError(err);
  }
};
