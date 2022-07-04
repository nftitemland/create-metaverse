// import React, { useState, useEffect } from "react";
// import BackgroundMap from "../BackgroundMap";
// import { MAP_WIDTH, MAP_HEIGHT } from "../local";

// import "./GameCharacter.css";
// import MessageDashboard from "../MessageDashboard";
// import handleMapClick from "./handleMapClick";
// import EnchantmentSection from "../EnchantmentSection";
// import getGameCharacters from "./getGameCharacters";
// import MapFederalResources from "./MapFederalResources";

const usaTestModifications = ({ selfPoiCoordData, crdX, crdY }) => {
  // console.log(`

  //     MEGA LOG: ${JSON.stringify(
  //       {
  //         crdX,
  //         crdY,
  //       },
  //       null,
  //       4
  //     )}

  // `);

  if (crdX === "0" && crdY === "0") {
    selfPoiCoordData.componentData = [
      {
        name: "DOOR",
        // x: 725,
        // y: 0,

        x: 500,
        y: 0,
        to: {
          x: 50,
          y: 50,
          crdX: -1,
          crdY: 0,
        },
      },
    ];
  } else if (crdX === "-1" && crdY === "0") {
    selfPoiCoordData.w = 1660;
    selfPoiCoordData.h = 700;
    selfPoiCoordData.componentData = [
      {
        name: "DOOR",
        x: 0,
        y: 0,
        to: {
          x: 0,
          y: 300,
          crdX: 0,
          crdY: 0,
        },
      },
    ];
  }
};

export default usaTestModifications;
