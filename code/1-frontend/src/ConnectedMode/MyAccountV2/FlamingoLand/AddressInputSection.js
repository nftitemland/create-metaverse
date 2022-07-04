import React from "react";
//{ useEffect, useState }

// import MiniMap from "../../../ExpansiveComponents/MiniMap";
// import MetaMaskBox from "./MetaMaskBox";
// import refreshUserData from "../../../api/refreshUserData";
// import { getNTokenData } from "../../../utils/nToken";
// import updateLand from "./updateLand";
// import CoolButtonSection from "./CoolButtonSection";
// import { dialogModes } from "../../../constants";

// import TitleSection from "../../../ExpansiveComponents/TitleSection";

const CONTENT_ELEMENT_WIDTH = 300;
// const REDEEM_TIME = 1640448000000; //11am dec 25 2021

const AddressInputSection = ({ polygonAddress, setPolygonAddress }) => {
  return (
    <div
      style={{
        width: CONTENT_ELEMENT_WIDTH,
        // height: 75,
        // backgroundColor: "blue",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          //   height: 60,
          backgroundColor: "black",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          // marginLeft: 14,
          // marginBottom: 6,
        }}
      >
        <div
          style={{
            fontSize: 16,
            color: "white",
            textAlign: "center",
            fontFamily: `"Amaranth", sans-serif`,
            marginLeft: 5,
            marginTop: 7,
            marginBottom: 4,
          }}
        >
          {"Polygon (MATIC) Address"}
        </div>
      </div>
      <div
        style={{
          width: "100%",
          height: 75,
          backgroundColor: "yellow",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <input
          onChange={(event) => {
            const newText = event.target.value;

            if (newText.length > 500) {
              return;
            }

            setPolygonAddress(newText);
          }}
          style={{
            width: "90%",
            height: 60,
            backgroundColor: "unset",
            borderStyle: "unset",

            // color: "white",
            textAlign: "left",
            // fontFamily: `"Amaranth", sans-serif`,
            fontFamily: `"Tajawal", sans-serif`,
            fontSize: 16,
            color: "black",
          }}
          value={polygonAddress}
        />
      </div>
    </div>
  );
};

export default AddressInputSection;
