import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { dialogModes } from "../../../constants";
// import { getNTokenData } from "../../utils/nToken";
// import refreshUserData from "../../api/refreshUserData";
import Navigator from "./Navigator";
import BasePoi from "./BasePoi";
import StartButton from "./StartButton";
import loadPois from "./loadPois";

// import Messages from "../Messages";
import "./World.css";
// import { ReactComponent as MiniPoi } from "./MiniPoi.svg";

const WORLD_HEIGHT = 312;
const SQUARE_HEIGHT = 26;

const colorWheelOfFortune = [
  "orange",
  "red",
  "blue",
  "teal",
  "purple",
  "yellow",
  "brown",
  "black",
  "#FF33FF",
  "#99CCFF",
  "#66FF99",
  "#33FFFF",
  "#000099",
  "#FFCC00",
  "#993399",
  "#6699FF",
  "#99CC99",
  "#330066",
  "#339999",
  "#00CCCC",
];
// const SPACE_COUNT = WORLD_HEIGHT / SQUARE_HEIGHT - 1;

const Poi = ({ xPosition, yPosition, zIndex, index }) => {
  return (
    <div
      key="Poi1"
      style={{
        zIndex: zIndex,
        position: "absolute",
        top: WORLD_HEIGHT - (yPosition + 1) * SQUARE_HEIGHT,
        left: xPosition * SQUARE_HEIGHT,
        width: SQUARE_HEIGHT,
        height: SQUARE_HEIGHT,
        // backgroundColor: "blue",
      }}
    >
      <BasePoi color={colorWheelOfFortune[index] || "green"} />
    </div>
  );
};

const PoiLand = ({
  address,
  isLoading,
  setIsLoading,
  userData,
  setUserData,
  updateDialogMode,
  // initialLoadHasStarted,
  // setInitialLoadHasStarted
}) => {
  const [initialLoadHasStarted, setInitialLoadHasStarted] = useState(false);
  const [loadedProfilesData, setLoadedProfilesData] = useState([
    // { username: "Poid1b4ba4", xPosition: 7, yPosition: 4 },
  ]);
  // "profiles":[{"username":"Poid1b4ba4","xPosition":7,"yPosition":4}]
  useEffect(() => {
    if (!initialLoadHasStarted) {
      setInitialLoadHasStarted(true);
      new Promise(async (resolve, reject) => {
        await loadPois({
          address,
          setLoadedProfilesData,
        });

        resolve();
      });
    }

    const intervalNumber = setInterval(async () => {
      // console.log("LOADING");
      await loadPois({
        address,
        setLoadedProfilesData,
      });
    }, 5000);

    return () => {
      clearInterval(intervalNumber);
    };
  }, [initialLoadHasStarted, address]);

  const { xPosition = 0, yPosition = 0 } = userData;

  const pois = [
    <Poi key={"poi1"} xPosition={xPosition} yPosition={yPosition} index={69} />,
    // <Poi key={"poi2"} xPosition={2} yPosition={2} color={"red"} zIndex={6} />,
  ];

  for (let i = 0; i < loadedProfilesData.length; i++) {
    const datum = loadedProfilesData[i];

    pois.push(
      <Poi
        key={datum.username + "i"}
        xPosition={datum.xPosition}
        yPosition={datum.yPosition}
        index={i}
      />
    );
  }

  return (
    <div className={"WorldMeta"}>
      <div
        style={{
          width: WORLD_HEIGHT,
          height: 40,
          // backgroundColor: "rgb(53, 58, 83)",
          backgroundColor: "#070b22",
          // marginTop: 55,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              // width: "100%",
              textAlign: "left",
              marginLeft: 10,
              fontFamily: `"Amaranth", sans-serif`,
              color: "white",
            }}
          >
            {"GamePoi Metaverse"}
          </div>
        </div>
      </div>

      <div className={"World"}>
        <div
          style={{
            width: WORLD_HEIGHT,
            height: WORLD_HEIGHT,
            backgroundColor: "black",
            position: "relative",
          }}
        >
          {pois}
        </div>
      </div>

      <div
        style={{
          // width: "100%",
          width: 312,
          backgroundColor: "#070b22",
          // backgroundColor: "#353a53",
          // paddingRight: 10,

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "94%",
            // width: 312,
            // backgroundColor: "#353a53",
            // paddingRight: 10,

            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <StartButton updateDialogMode={updateDialogMode} />
          {/* <div style={{ width: 2, height: 2 }}></div> */}
          <Navigator
            address={address}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            userData={userData}
            setUserData={setUserData}
          />
        </div>
      </div>
    </div>
  );
};

export default PoiLand;
