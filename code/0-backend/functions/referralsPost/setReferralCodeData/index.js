"use strict";

const {
  stringify,
  // addTransactionAndUpdateUser,
  database: { classicalUpdateDatabaseEntry },
  constants: {
    aws: {
      database: {
        tableNames: { USERS },
        tableNameToPartitionKey,
      },
    },
  },
  getUserData,
  user: {
    getUserByUserId,
    //getReferralData
  },
} = require("compute-utils");

const SPECIAL_REFERRALS = {
  FINK: "FINK",
  MEDIUM: "MEDIUM",
  CRYPDOLLS: "CRYPDOLLS",
  PROMO: "PROMO",
  SPECIAL: "SPECIAL",
  IMAGIKA: "IMAGIKA",
  KILLER: "KILLER",
  JIMMY: "JIMMY",
};

module.exports = async ({ address, referralCode }) => {
  console.log(
    "🧚‍♀️running setReferralCodeData with the following values:",
    stringify({ address, referralCode })
  );

  const upperCaseReferralCode = referralCode.toUpperCase();

  let discountPercentage;

  if (!SPECIAL_REFERRALS[upperCaseReferralCode]) {
    const userOfReferrer = await getUserByUserId({
      userId: referralCode,
    });

    if (!userOfReferrer) {
      const error = new Error("invalid referral code provided");
      error.statusCode = 400;
      error.bulltrue = true;
      throw error;
    }

    if (userOfReferrer.partitionKey === address) {
      const error = new Error("cannot refer self");
      error.statusCode = 400;
      error.bulltrue = true;
      throw error;
    }

    // const referralData = await getReferralData({
    //   address: userOfReferrer.partitionKey,
    // });

    discountPercentage = 15;
  } else {
    referralCode = upperCaseReferralCode;
    console.log(`referralCode set to ${upperCaseReferralCode}`);

    // discountPercentage = 50;

    if (
      [SPECIAL_REFERRALS.MEDIUM, SPECIAL_REFERRALS.CRYPDOLLS].includes(
        upperCaseReferralCode
      )
    ) {
      discountPercentage = 55;
    } else {
      discountPercentage = 60;
    }

    //  else if (
    //   [
    //     SPECIAL_REFERRALS.FINK,
    //     SPECIAL_REFERRALS.PROMO,
    //     SPECIAL_REFERRALS.SPECIAL,
    //     SPECIAL_REFERRALS.IMAGIKA,
    //     SPECIAL_REFERRALS.KILLER,
    //   ].includes(upperCaseReferralCode)
    // ) {

    // } else {
    //   discountPercentage = 15;
    // }

    // if (upperCaseReferralCode === SPECIAL_REFERRALS.MEDIUM) {
    //   discountPercentage = 55;
    // } else if () {
    //   discountPercentage = 55;
    // } else if (upperCaseReferralCode === SPECIAL_REFERRALS.PROMO) {
    //   discountPercentage = 60;
    // } else if (upperCaseReferralCode === SPECIAL_REFERRALS.SPECIAL) {
    //   discountPercentage = 60;
    // } else if (upperCaseReferralCode === SPECIAL_REFERRALS.IMAGIKA) {
    //   discountPercentage = 60;
    // } else {
    //   discountPercentage = 60;
    // }
  }

  await getUserData({ address });

  const referralCodeData = {
    referralCode,
    discountPercentage,
  };

  const updateExpression = "SET #referralCodeData = :referralCodeData";

  const expressionAttributeNames = {
    "#referralCodeData": "referralCodeData",
  };

  const expressionAttributeValues = {
    ":referralCodeData": referralCodeData,
  };

  await classicalUpdateDatabaseEntry({
    tableName: USERS,
    key: tableNameToPartitionKey[USERS],
    value: address,
    updateExpression,
    expressionAttributeNames,
    expressionAttributeValues,
    // doNotErrorOnConditionalFail: true,
  });

  // const responseValues = Object.assign({}, referralCodeData);
  const responseValues = {};

  console.log(
    "🧚‍♀️setReferralCodeData executed successfully, " +
      "returning values: " +
      stringify(Object.keys(responseValues))
  );

  return responseValues;
};
