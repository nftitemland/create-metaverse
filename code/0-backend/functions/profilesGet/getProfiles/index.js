"use strict";

const {
  stringify,
  database: { searchDatabase },
  constants: {
    aws: {
      database: {
        // tableNameToPartitionKey,
        // tableNameToSortKey,
        tableNames: { USERS },
        secondaryIndices: { secondaryPartitionKeySecondarySortKeyIndex },
      },
    },
    users: {
      visibilities: { PUBLIC },
      attributeVisibilities: {
        ADDRESS,
        ART_POINTS,
        METAVERSE_PRESENT,
        USERNAME,
      },
    },
  },
  // sendData,
} = require("compute-utils");

const SEARCH_LIMIT = 30;

module.exports = async ({ address, mode }) => {
  console.log(
    "running getProfiles " +
      "with the following values: " +
      stringify({
        address,
        mode,
      })
  );

  const searchResults = await searchDatabase({
    searchParams: {
      TableName: USERS,
      IndexName: secondaryPartitionKeySecondarySortKeyIndex,
      Limit: SEARCH_LIMIT,
      ScanIndexForward: false,
      KeyConditionExpression: `#secondaryPartitionKey = :secondaryPartitionKey`,
      ExpressionAttributeNames: {
        "#secondaryPartitionKey": "secondaryPartitionKey",
      },
      ExpressionAttributeValues: {
        ":secondaryPartitionKey": PUBLIC,
      },
      // ExclusiveStartKey: paginationValueToUse || undefined,
    },
  });

  if (mode) {
    //   const profiles =  searchResults.  [];
    const profiles = searchResults.ultimateResults
      .map((user) => {
        // const profile = {
        //   username: user.username,
        //   xPosition: undefined,
        //   yPosition: undefined,
        // };

        if (
          user.partitionKey !== address &&
          user?.visibilities?.[METAVERSE_PRESENT]
        ) {
          return {
            username: user.username,
            xPosition: user.xPosition,
            yPosition: user.yPosition,
          };
        }

        return null;
      })
      .filter((result) => !!result);

    const results = {
      profiles,
    };

    console.log(
      "getProfiles executed successfully, " +
        `obtained ${profiles.length} profiles`
    );

    return results;
  }

  //   const profiles =  searchResults.  [];
  const profiles = searchResults.ultimateResults.map((user) => {
    const profile = {
      username: undefined,
      address: undefined,
      artPoints: undefined,
    };

    if (user?.visibilities) {
      if (user.visibilities[USERNAME]) {
        profile.username = user.username;
      }
      if (user.visibilities[ADDRESS]) {
        profile.address = user.partitionKey;
      }
      if (user.visibilities[ART_POINTS]) {
        profile.artPoints = user.secondarySortKey;
      }
    }

    // if (!profile.username || profile.address || profile.artPoints) {
    //   return {
    //     username: "Anon",
    //     address: undefined,
    //     artPoints: undefined,
    //   };
    // }

    return profile;
  });
  // .filter((profile) => {
  // return profile.username || profile.address || profile.artPoints;
  // });

  const results = {
    profiles,
  };

  console.log(
    "getProfiles executed successfully, " +
      `obtained ${profiles.length} profiles`
  );

  return results;
};
