import React from "react"; //  useEffect, useState
// import { enchantments } from "../../../../constants";

// import getWsLoginTokenDataIfValid from "../../utils/getWsLoginTokenDataIfValid";
// import { NULL_ADDRESS, NULL_USER_ID, API_BASE_URL } from "../../constants";
// import { getNTokenData } from "../../utils/nToken";
// import axios from "axios";
// import { MAP_WIDTH } from "./local";
// import delay from "../../utils/delay";

// const WIDTH = 250;
// const EXPAND_BUTTON_HEIGHT = 33;

//
/*
  Get Left Button, Get Right Button, Get Select 
*/

// const triangleWidth = 40;
// const triangleWidth2 = 30;

const SelectEnchantmentButton = ({
  currentOptionName,
  stateWebsocket,
  userId,
  nameKey = "CHARACTER",
  selfPoiData,
  enchantmentRequirementLevel,
  selfLvl,
  isAllowed,
}) => {
  // currentOptionDatum.name/image

  // const enchantmentRequirementLevel =
  //   typeof enchantments.character?.[currentOptionName]?.requiredLevel ===
  //   "number"
  //     ? enchantments.character[currentOptionName].requiredLevel
  //     : 100;

  // console.log(`

  //     MEGA LOG: ${JSON.stringify(
  //       {
  //         selfPoiData,
  //         enchantmentRequirementLevel,
  //       },
  //       null,
  //       4
  //     )}

  // `);
  // const selfLvl = selfPoiData.lvl || 100;

  // const isAllowed = selfLvl <= enchantmentRequirementLevel;

  const isAlreadySelected = selfPoiData.characterName === currentOptionName;

  // const isAllowed = selfPoiData

  return (
    <button
      style={{
        // marginLeft
        // width: 50,
        // height: 50,
        // height: "100%",
        // backgroundColor: "pink",
        backgroundColor: isAlreadySelected
          ? "green"
          : isAllowed
          ? "rgb(7, 11, 34)"
          : "grey",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        width: 90,
        height: 40,
        color: "white",
        userSelect: "none",

        // borderStyle: "solid",
        // borderWidth: `${triangleWidth2}px ${triangleWidth}px ${triangleWidth2}px 0`,
        // borderColor: "transparent #007bff transparent transparent",
      }}
      onClick={() => {
        if (!isAllowed || isAlreadySelected) {
          return;
        }

        const message = `${userId}|ENCHANT|${nameKey}@${currentOptionName}`;

        // console.log("DE LEFTY LEFT!! MESA MESA JAR JAR BINKSSS", message);

        //  `USERID|MESSAGE|CHARACTER@BOI`;

        // console.log(`

        //     MEGA LOG: ${JSON.stringify(
        //       {
        //         s: !!stateWebsocket,
        //       },
        //       null,
        //       4
        //     )}

        // `);

        stateWebsocket.send(message);
      }}
    >
      Select
    </button>
  );
};

export default SelectEnchantmentButton;
