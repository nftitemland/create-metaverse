import React from "react";
// import DirectionControls from "./DirectionControls";
// import DirectionControlsTemp from "./DirectionControlsTemp";
// import BackgroundMap from "../BackgroundMap";
// import {
//   MAP_WIDTH,
//   // CHARACTER_UNIT_WIDTH,
//   // TOTAL_MAP_WIDTH,
//   // MAP_HEIGHT,
//   // MAX_HYPER_WORLD_X,
//   // MIN_HYPER_WORLD_X,
//   MAP_HEIGHT,
//   // MIN_HYPER_WORLD_HEIGHT,
//   // MAX_HYPER_WORLD_HEIGHT,
//   // MAP_HEIGHT_1,
// } from "../local";

// import MessageDashboard from "../MessageDashboard";
// import handleMapClick from "./handleMapClick";
// import EnchantmentSection from "../EnchantmentSection";

// const getXOffset = (userMapLevel) => {
//   if (userMapLevel === 2) {
//     return MIN_HYPER_WORLD_X;
//   } else if (userMapLevel === 1) {
//     return MAP_WIDTH;
//   }

//   return 0;
// };

const GameCharacter = ({
  x = 0,
  y = 0,
  // a,
  // userId,
  // index,
  // userMapLevel,
  isSelfRealPoi,
  characterData,
  s = 1,
}) => {
  // const yOffset = 0;

  const x1 = x * s;
  const y1 = y * s;

  // const cData = enchantments.character.filter() [character];

  if (characterData.isInTub) {
    return null;
  }

  return (
    <div
      id={isSelfRealPoi ? "SelfRealPoi" : undefined}
      className={"GameCharacter"}
      style={{
        position: "absolute",
        // left: x * CHARACTER_UNIT_WIDTH,
        left: x1,
        top: y1,
        // top: -400,
        // width: "100%",
        // width: CHARACTER_UNIT_WIDTH,
        // height: CHARACTER_UNIT_WIDTH,
        // height: 300,
        // backgroundColor: "pink",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img
        className={"GameCharacterImage"}
        alt="Game Character"
        src={characterData.src}
        style={{ width: characterData.width * s }}
      ></img>
    </div>
  );
};

export default GameCharacter;
