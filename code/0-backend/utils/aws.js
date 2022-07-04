"use strict";

const { IS_LAMBDA } = process.env;

const AWS = IS_LAMBDA
  ? require("aws-sdk")
  : require("../coreMinter/test/node_modules/aws-sdk");

if (!IS_LAMBDA) {
  const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION } = process.env;
  AWS.config.update({
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
    region: AWS_REGION,
  });
}

module.exports = Object.freeze({
  AWS,
  database: new AWS.DynamoDB.DocumentClient(),
  sns: new AWS.SNS(),
});
