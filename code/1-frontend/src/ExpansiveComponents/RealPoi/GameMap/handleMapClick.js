// import React from "react";
// import DirectionControls from "./DirectionControls";
// import DirectionControlsTemp from "./DirectionControlsTemp";
// import BackgroundMap from "../BackgroundMap";

import {
  // MAP_WIDTH,
  // CHARACTER_UNIT_WIDTH,
  MAP_WIDTH,
  MAP_HEIGHT,
  // TOTAL_MAP_WIDTH,
  // MAX_HYPER_WORLD_X,
  // MIN_HYPER_WORLD_X,
  // MIN_HYPER_WORLD_HEIGHT,
  // MAX_HYPER_WORLD_HEIGHT,
  // MAP_HEIGHT_1,
} from "../local";

import { dialogModes } from "../../../constants";

/*
    width: 131,
    height: 125.56,
    marginLeft: 137,
*/

const specialZoneActionData = [
  {
    xMin: MAP_WIDTH - 131,
    xMax: MAP_WIDTH,
    yMin: MAP_HEIGHT - 128,
    yMax: MAP_HEIGHT,
    specialAction: ({ updateDialogMode }) => {
      updateDialogMode(dialogModes.REALPOI_NEWS);

      return {
        preventDefault: true,
      };
    },
  },
];

const handleClick = ({
  x,
  y,
  rawX,
  rawY,
  stateWebsocket,
  userId,
  updateDialogMode,
  crdX,
  crdY,
}) => {
  if (!stateWebsocket) {
    return;
  }

  // const isHyperWorldX = x >= MIN_HYPER_WORLD_X && x <= MAX_HYPER_WORLD_X;
  // if (!isHyperWorldX) {
  //   if (x < 0) {
  //     x = 0;
  //   } else if (x > TOTAL_MAP_WIDTH) {
  //     x = TOTAL_MAP_WIDTH;
  //   }
  // }

  // const isHyperWorldY =
  //   y >= MIN_HYPER_WORLD_HEIGHT && y <= MAX_HYPER_WORLD_HEIGHT;
  // if (!isHyperWorldY) {
  //   if (y < 0) {
  //     y = 0;
  //   } else if (y > MAP_HEIGHT_1) {
  //     y = MAP_HEIGHT_1;
  //   }
  // }

  // if (y > MAP_HEIGHT) {
  //   y = MAP_HEIGHT;
  // } else if (y < 0) {
  //   y = 0;
  // }

  // console.log(`

  //     MEGA LOG: ${JSON.stringify(
  //       {
  //         x,
  //         y,
  //       },
  //       null,
  //       4
  //     )}

  // `);

  if (1 + 1 === 3) {
    for (const actionData of specialZoneActionData) {
      if (
        actionData.xMin <= rawX &&
        actionData.xMax >= rawX &&
        actionData.yMin <= rawY &&
        actionData.yMax >= rawY
      ) {
        const { preventDefault } = actionData.specialAction({
          updateDialogMode,
        }) || {
          preventDefault: false,
        };

        if (preventDefault) {
          return;
        }
      }
    }
  }

  const message = `${userId}|MOVE|${x}@${y}@${crdX}@${crdY}`;

  try {
    stateWebsocket.send(message);
  } catch (err) {
    console.log("error in sending action:", err);
  }
};

export default handleClick;
