"use strict";

const createDynamoDbTableStory = ({
  tableName,
  stageSuffixLC,
  partitionKey,
  partitionKeyType,
  sortKey,
  sortKeyType,
  gsiData = [],
}) => {
  console.log(`DYNAMO DB TABLE`);
  console.log(`TableName: nftitemland-${tableName}-${stageSuffixLC}`);
  console.log(`Partition Key: ${partitionKey} (${partitionKeyType})`);

  if (sortKey) {
    console.log(`Sort Key: ${sortKey} (${sortKeyType})`);
  }

  for (const gsiDatum of gsiData) {
    console.log(`GSI`);
    console.log(`GSI: Name: ${gsiDatum.name}`);
    console.log(
      `GSI: Partition Key: ${gsiDatum.partitionKey} (${gsiDatum.partitionKeyType})`
    );
    if (gsiDatum.sortKey) {
      console.log(
        `GSI: Sort Key: ${gsiDatum.sortKey} (${gsiDatum.sortKeyType})`
      );
    }
  }
};

module.exports = createDynamoDbTableStory;
