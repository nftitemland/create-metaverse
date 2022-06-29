"use strict";

const printStep = (n, letter) => {
  let coolGuy = "\n\n~~~~~(っ^‿^)っ";
  let otherSide = " ~~~~~";
  let stepName = String(n);

  if (letter) {
    coolGuy = "\n===(>*-*)>";
    otherSide = ":";
    stepName += `-${letter}`;
  }

  console.log(`${coolGuy}Step ${stepName}${otherSide}`);
};

const STAGING_LC = "staging";
const PRODUCTION_LC = "production";

const createDynamoDbTableStory = ({
  stageSuffixLC,
  partitionKey,
  gsiData = [],
}) => {
  console.log(`DYNAMO DB TABLE`);
  console.log(`nftitemland-users-${stageSuffixLC}`);
  console.log(`Partition Key: ${partitionKey}`);

  for (const gsiDatum of gsiData) {
    console.log(`GSI`);
    console.log(`GSI: Name: secondaryPartitionKey-secondarySortKey-index`);
    console.log(`GSI: Partition Key: secondaryPartitionKey (String)`);
    console.log(`GSI: Sort Key: secondarySortKey (Number)`);
    console.log(`GSI`);
    console.log(`GSI: Name: userId-index`);
    console.log(`GSI: Partition Key: userId (String)`);
  }
};

module.exports = ({ isProductionMode, stageName }) => {
  printStep(1);
  console.log("Create an AWS account or use your existing account");

  printStep(2);
  printStep(2, "a");
  const modeLC = isProductionMode ? PRODUCTION_LC : STAGING_LC;
  let stageSuffixLC = `${modeLC}`;
  if (stageName) {
    stageSuffixLC += `-${stageName}`;
  }
  console.log("Set up AWS Resources");
  console.log(`Create an SNS Topic nftitemland-data-${stageSuffixLC}`);
  console.log(
    "Subscribe to this SNS to get realtime data/error notifications " +
      "once your metaverse is set up."
  );

  printStep(2, "b");
  console.log(`Create the following DynamoDB tables`);
  console.log(`DYNAMO DB TABLE`);
  console.log(`nftitemland-users-${stageSuffixLC}`);
  console.log(`Partition Key: partitionKey`);
  console.log(`GSI`);
  console.log(`GSI: Name: secondaryPartitionKey-secondarySortKey-index`);
  console.log(`GSI: Partition Key: secondaryPartitionKey (String)`);
  console.log(`GSI: Sort Key: secondarySortKey (Number)`);
  console.log(`GSI`);
  console.log(`GSI: Name: userId-index`);
  console.log(`GSI: Partition Key: userId (String)`);
  console.log(`DYNAMO DB TABLE`);
  console.log(`nftitemland-assets-${stageSuffixLC}`);
  console.log(`Partition Key: partitionKey (string)`);
  console.log(`GSI`);
  console.log(`GSI: Name: ownerAddress-index`);
  console.log(`GSI: Partition Key: ownerAddress (String)`);
  console.log(`DYNAMO DB TABLE`);
  console.log(`nftitemland-login-tokens-${stageSuffixLC}`);
  console.log(`DYNAMO DB TABLE`);
  console.log(`nftitemland-queue-${stageSuffixLC}`);
  console.log(`DYNAMO DB TABLE`);
  console.log(`nftitemland-transactions-${stageSuffixLC}`);
  console.log(`DYNAMO DB TABLE`);
  console.log(`nftitemland-metadata-${stageSuffixLC}`);
};
