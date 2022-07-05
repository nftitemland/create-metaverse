import React from "react";
import { dialogModes } from "../../../constants";
import "./World.css";
// import axios from "axios";
// import { getNTokenData } from "../../utils/nToken";
// import refreshUserData from "../../api/refreshUserData";
// import Navigator from "../Navigator";
// import BasePoi from "./BasePoi";
// import Messages from "../Messages";
// import { ReactComponent as MiniPoi } from "./MiniPoi.svg";
// const WORLD_HEIGHT = 312;
// const SQUARE_HEIGHT = 26;
// const SPACE_COUNT = WORLD_HEIGHT / SQUARE_HEIGHT - 1;

const StartButton = ({ updateDialogMode }) => {
  return (
    <div
      style={{
        width: 60,
        height: 60,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        // backgroundColor: "green",
      }}
      onClick={() => {
        updateDialogMode(dialogModes.PROFILE_SETTINGS);
      }}
    >
      <div
        style={{
          width: 40,
          // height: 23,
          height: 18,
          borderRadius: "20%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#212746",
          color: "white",
          fontFamily: `"Amaranth", sans-serif`,
          fontSize: 16,
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        {/* {"start"} */}
        {"+"}
      </div>
    </div>
  );
};

export default StartButton;
