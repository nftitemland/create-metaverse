// import React, { useEffect, useState } from "react";
// import MiniMap from "../../../ExpansiveComponents/MiniMap";
// import Legend from "../../../ExpansiveComponents/MiniMap/Legend";
// import MetaMaskBox from "./MetaMaskBox";
// import refreshUserData from "../../api/refreshUserData";
// import { getNTokenData } from "../../utils/nToken";
// import updateLand from "./updateLand";
// import CoolButtonSection from "./CoolButtonSection";
// import { dialogModes } from "../../../constants";

import LandTokenDataDisplay from "./LandTokenDataDisplay";

const LandTokenDisplay = ({
  userDataLandClaim,
  isFirstLoading,
  firstLoadError,
}) => {
  // const [hasStartedFirstDataGet, setHasStartedFirstDataGet] = useState(false);

  // useEffect(() => {
  //   if (!hasStartedFirstDataGet) {
  //     setHasStartedFirstDataGet(true);
  //   }
  // }, [hasStartedFirstDataGet]);
  // console.log(`

  //     2: ${JSON.stringify(
  //       {
  //         userDataLandClaim,
  //       },
  //       null,
  //       4
  //     )}

  // `);
  if (!userDataLandClaim || !userDataLandClaim?.userLandData) {
    userDataLandClaim = {};
    // return null;
  }

  const landData = userDataLandClaim.userLandData || {};
  const metaverseLandData = userDataLandClaim.metaverseLandData || {};

  return (
    <>
      <div
        style={{
          width: "100%",
          //   height: 60,
          // backgroundColor: "#212746",
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
            fontSize: 20,
            color: "white",
            textAlign: "center",
            fontFamily: `"Amaranth", sans-serif`,
            // marginLeft: 5,
            marginTop: 7,
            marginBottom: 4,
          }}
        >
          {"Land Tokens [Results Snapshot]"}
        </div>
      </div>
      {isFirstLoading ? (
        <div
          style={{
            backgroundColor: "#212746",
            // backgroundColor: "teal",
            // width: "100%",
            width: "100%",
            // width: 300,
            height: 300,
            // height: 60,

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 25,
              color: "white",
              textAlign: "center",
              fontFamily: `"Amaranth", sans-serif`,
              // marginLeft: 5,
              width: "100%",
              // marginTop: 7,
              // marginBottom: 4,
            }}
          >
            {firstLoadError ? (
              <div
                style={{
                  // backgroundColor: "teal",
                  backgroundColor: "blue",
                  // width: "100%",
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    // backgroundColor: "teal",
                    backgroundColor: "blue",
                    // width: "100%",
                    width: "100%",
                    height: 300,
                    // height: 60,

                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "90%",
                      fontSize: 18,
                      color: "white",
                      textAlign: "center",
                      fontFamily: `"Amaranth", sans-serif`,
                      // marginLeft: 5,
                      // marginTop: 7,
                      // marginBottom: 4,
                    }}
                  >
                    {"Error in loading land token data"}
                  </div>

                  <div
                    style={{
                      backgroundColor: "black",
                      // width: "100%",
                      // width: "100%",
                      width: 200,
                      height: 60,
                      marginTop: 20,
                      // height: 60,

                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      userSelect: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    <div
                      style={{
                        width: "90%",
                        fontSize: 20,
                        color: "white",
                        textAlign: "center",
                        fontFamily: `"Tajawal", sans-serif`,
                        // marginLeft: 5,
                        // marginTop: 7,
                        // marginBottom: 4,
                      }}
                    >
                      {"Retry"}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              "Loading"
            )}
          </div>
        </div>
      ) : (
        <div
          style={{
            // backgroundColor: "yellow",
            // width: "100%",
            width: "100%",
            // maxWidth: 700,
            height: 400,

            // maxHeight: 500,
            // maxHeight: 300,
            overflowY: "scroll",

            // margin: "auto",
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center",
          }}
        >
          <div
            style={{
              // backgroundColor: "yellow",
              // width: "100%",
              width: "100%",
              // maxWidth: 700,

              // maxHeight: 500,
              // maxHeight: 300,
              // overflowY: "scroll",

              // display: "flex",
              // flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <LandTokenDataDisplay
              landData={landData}
              metaverseLandData={metaverseLandData}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default LandTokenDisplay;
