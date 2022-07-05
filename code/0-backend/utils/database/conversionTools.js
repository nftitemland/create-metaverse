"use strict";

const { AWS } = require("../aws");

const getJavascriptObjectFromDynamoDbObject = ({ dynamoDbObject }) =>
  AWS.DynamoDB.Converter.unmarshall(dynamoDbObject);

module.exports = {
  getJavascriptObjectFromDynamoDbObject,
};
