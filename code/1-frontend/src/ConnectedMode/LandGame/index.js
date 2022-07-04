import React, { useState } from "react";
import { NULL_USER_ID } from "../../constants";
import Core from "./Core";

// import axios from "axios";
// import { API_BASE_URL } from "../../constants";
// import { getNTokenData } from "../../utils/nToken";
// import refreshUserData from "../../api/refreshUserData";
// import Messages from "../Messages";
// import PoiLand from "./PoiLand";
// import MiniMap2 from "../../ExpansiveComponents/MiniMap2";
// import { NULL_USER_ID } from "../../constants";
// import LandClaim from "./LandClaim";
// import AirdropClaimSection from "../../ExpansiveComponents/AirdropClaimSection";
// import { ReactComponent as MiniPoi } from "./MiniPoi.svg";

/*

  // gameData = {

  //   'i-j': {
  //     type,
  //     userId,
  //     data: {
  //     }
  //   }
  // }


  gameData = {
    townHallIdToData: {
      1: {
        userId,
      }
    }
  }



gameData, setGameData;

*/

const sampleGameData = {
  townHallIdToData: {
    1: {
      userId: NULL_USER_ID,
      // userId: "2222",
    },

    3: {
      userId: "2222",
    },
  },
};

const LandGame = ({ windowWidth, windowHeight, userData }) => {
  const isMobileMode = windowWidth < 800;

  const [currentlySelected, setCurrentlySelected] = useState(null);
  // const [gameData, setGameData] = useState(null);
  const [gameData, setGameData] = useState(sampleGameData);

  return (
    <div
      style={{
        // width: 200,
        width: "100%",
        // width: "100%",
        backgroundColor: "black",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          // width: "100%",
          width: "100%",
          margin: 5,

          // width: 150,
          // height: 150,
          backgroundColor: "black",

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Core
          windowWidth={windowWidth}
          windowHeight={windowHeight}
          mobileMode={isMobileMode}
          currentlySelected={currentlySelected}
          setCurrentlySelected={setCurrentlySelected}
          gameData={gameData}
          setGameData={setGameData}
          userData={userData}
        />
      </div>
    </div>
  );
};

export default LandGame;
