"use strict";

const {
  stringify,
  drq,
  database: { getDatabaseEntry, updateDatabaseEntry },
  constants: {
    aws: {
      database: {
        // tableNameToPartitionKey,
        tableNames: { USERS },
        // secondaryIndices: { ownerAddressIndex },
      },
    },
    metaverseActions: { MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT, MOVE_UP },
    metaverseValues: {
      // WORLD_HEIGHT, SQUARE_HEIGHT,
      SPACE_COUNT_CONSTANT,
    },
  },
} = require("compute-utils");
// const { users } = require("compute-utils/constants");

const minY = 0;
const maxY = SPACE_COUNT_CONSTANT;
const minX = 0;
const maxX = SPACE_COUNT_CONSTANT;

const X = "x";
const Y = "y";
const comparisons = {
  GREATER_THAN_OR_EQUAL: "GREATER_THAN_OR_EQUAL",
  LESS_THAN_OR_EQUAL: "LESS_THAN_OR_EQUAL",
};

// const getDatabaseUpdateInstructions = ({ metaverseAction }) => {
//   if (MOVE_DOWN) {
//     const updateExpression = "SET #yPosition = :yPosition ";
//     const conditionExpression = "#yPosition >= :minY and #yPosition <= :maxY)";

//     return {
//       updateExpression,
//       conditionExpression,
//     };
//   }
// };

const movePoi = async ({
  direction,
  user,
  axis,
  comparison,
  comparator,
  operation,
}) => {
  const positionKey = axis === X ? "xPosition" : "yPosition";
  const position = user[positionKey] || 0;

  if (comparison === comparisons.GREATER_THAN_OR_EQUAL) {
    if (position >= comparator) {
      const error = new Error(`cannot move ${direction} anymore`);
      error.statusCode = 400;
      error.bulltrue = true;
      throw error;
    }
  } else {
    if (position <= comparator) {
      const error = new Error(`cannot move ${direction} anymore`);
      error.statusCode = 400;
      error.bulltrue = true;
      throw error;
    }
  }

  const newUser = Object.assign({}, user, {
    [positionKey]: operation(position),
  });

  await updateDatabaseEntry({
    tableName: USERS,
    entry: newUser,
  });
};

module.exports = async ({ address, metaverseAction }) => {
  console.log(
    "running performMetaverseAction with the following values:",
    stringify({
      address,
      metaverseAction,
    })
  );

  await drq({
    queueId: drq.getQueueId({
      name: "perform_metaverse_action",
      id: address,
    }),
    operation: async () => {
      const user = await getDatabaseEntry({
        tableName: USERS,
        value: address,
      });

      switch (metaverseAction) {
        case MOVE_DOWN:
          await movePoi({
            direction: "down",
            user,
            axis: Y,
            comparison: comparisons.LESS_THAN_OR_EQUAL,
            comparator: minY,
            operation: (position) => position - 1,
          });
          break;

        case MOVE_UP:
          await movePoi({
            direction: "up",
            user,
            axis: Y,
            comparison: comparisons.GREATER_THAN_OR_EQUAL,
            comparator: maxY,
            operation: (position) => position + 1,
          });
          break;

        case MOVE_LEFT:
          await movePoi({
            direction: "left",
            user,
            axis: X,
            comparison: comparisons.LESS_THAN_OR_EQUAL,
            comparator: minX,
            operation: (position) => position - 1,
          });
          break;

        case MOVE_RIGHT:
          await movePoi({
            direction: "right",
            user,
            axis: X,
            comparison: comparisons.GREATER_THAN_OR_EQUAL,
            comparator: maxX,
            operation: (position) => position + 1,
          });
          break;

        default:
          throw new Error(
            "weird safeguard operation error, " +
              "invalid metaverse action: " +
              metaverseAction
          );
      }
    },
  });

  console.log(
    "performMetaverseAction executed successfully:"
    // stringify({
    //   miniGameFinishAmount: countAmount,
    // })
  );
};
