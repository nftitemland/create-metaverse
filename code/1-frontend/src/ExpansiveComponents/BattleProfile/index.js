import React, { useState } from "react"; //  useState, useEffect
import loadTransactions from "../../api/loadTransactions";

import doBattle from "../../utils/doBattle";
// import { getPoiPoiImageUrl } from "../../utils/getImageUrls";
import { nftImages, NULL_ADDRESS, NULL_USER_ID } from "../../constants";
// import { ReactComponent as BattleIconF } from "./BattleIcon.svg";
// import { ReactComponent as ProfileIcon } from "./ProfileIcon.svg";
// import { ReactComponent as ProfileIconBlue } from "./ProfileIconBlue.svg";
// import { ReactComponent as HeartIcon } from "./HeartIcon.svg";
// import { ReactComponent as RedHeartIcon } from "./RedHeartIcon.svg";
// import { ReactComponent as GreyHeartIcon } from "./GreyHeartIcon.svg";
// import { ReactComponent as BattleIconGrey } from "./BattleIconGrey.svg";
import { getImageUrl } from "../../utils/getImageUrl";
import getRoundedNumber from "../../utils/getRoundedNumber";

// import "./Profile.css";
// import { API_BASE_URL } from "../../constants";
// import delay from "../../utils/delay";
// import { getNTokenData } from "../../utils/nToken";
// import axios from "axios";

// import { ReactComponent as DiscordButtonAlt } from "./DiscordButtonAlt.svg";
// import { ReactComponent as OpenSeaButtonAlt } from "./OpenSeaButtonAlt.svg";
// import { ReactComponent as TwitterButtonAlt } from "./TwitterButtonAlt.svg";

const HeartIconComponent = ({ color = "red" }) => {
  return (
    <img
      alt="Date"
      style={{
        width: "100%",
      }}
      src={`https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/sword_${color}_1.png`}
    ></img>
  );
};

const ProfileIcon = ({ color = "green" }) => {
  return (
    <img
      alt="Date"
      style={{
        width: "100%",
      }}
      src={`https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/profile_icon_${color}_2.png`}
    ></img>
  );
};

const dimUnitHeight = 60;

// const minDimUnit = 260;
const minDimUnit = 280;

const HeartIconMeta = ({ isUserProfile, isLoading, hasRecentlyBattled }) => {
  // console.log(`

  //     MEGA LOG: ${JSON.stringify(
  //       {
  //         timeRemainingInMinutesBeforeNextBattle,
  //       },
  //       null,
  //       4
  //     )}

  // `);

  if (hasRecentlyBattled) {
    return (
      <img
        alt="Hourglass"
        style={{
          width: "100%",
        }}
        src={`https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/hourglass_1.png`}
      ></img>
    );
  }

  if (isUserProfile) {
    return <HeartIconComponent color="blue" />;
  } else if (isLoading) {
    return <HeartIconComponent color="grey" />;
  }

  return <HeartIconComponent />;
};

const getHeartCursor = ({ isLoading, isUserProfile, hasRecentlyBattled }) => {
  if (isLoading || isUserProfile || hasRecentlyBattled) {
    return "unset";
  }

  return "pointer";
};

const BattleProfile = ({
  windowWidth,
  mainUserAddress,
  mainUserId,

  // artPoints,
  address,
  username,
  userId,
  character,
  updateStatus,

  hp,
  // characterLevel,

  isLoading,
  setIsLoading,
  setUserData,

  transactionIdToTransaction,
  setTransactionIdToTransaction,
  setTransactionIdToTransactionPag,

  nextPlayTime,

  flipImage = false,

  setRecentlyBattled,
}) => {
  const [isFullDataDisplayMode, setIsFullDataDisplayMode] = useState(false);
  // const secondLifeSectionElements = [];

  const isUserProfile = mainUserId === userId;

  const windowWidthCalculationNumber = windowWidth * 0.87;

  const profileDim = windowWidthCalculationNumber;

  const thereIsNoUserData = !(username || address);

  const hasRecentlyBattled =
    typeof nextPlayTime === "number" && !Number.isNaN(nextPlayTime);

  return (
    <div
      style={{
        // width: "100%",
        minWidth: minDimUnit,
        // height: 450,
        // backgroundColor: "violet",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",

        /* margin-top: 20px; */
        /* margin-bottom: 20px; */
      }}
    >
      <div
        style={{
          width: profileDim,
          minWidth: minDimUnit,
          maxWidth: 400,
          height: profileDim + dimUnitHeight,
          minHeight: minDimUnit + dimUnitHeight,
          maxHeight: 400 + dimUnitHeight,

          position: "relative",
          margin: 0,

          // display: "flex",
          // flexDirection: "column",
          // justifyContent: "flex-start",
          // alignItems: "center",
        }}
      >
        {
          <div
            style={{
              width: "100%",
              position: "absolute",
              top: 0,
              userSelect: "none",
              MozWindowDragging: "no-drag",
            }}
          >
            <img
              alt={"Battle Character"}
              className={flipImage ? "img-horizontal-flip" : undefined}
              style={{
                width: "100%",
                height: "100%",
                backgroundColor: "black",
                position: "relative",
                border: "none",
                borderWidth: 0,
                userSelect: "none",
                MozWindowDragging: "no-drag",
              }}
              src={
                character
                  ? getImageUrl({
                      type: character.type,
                      id: character.id,
                    })
                  : nftImages.DEFAULT_POI
                // : // : nftImages.DEFAULT_POI
                //   getImageUrl({
                //     type: "POIPOI",
                //     id: 30,
                //   })
              }
            ></img>
          </div>
        }
        <div
          style={{
            // width: 4 * dimUnitHeight,
            width: "100%",
            // height: isFullDataDisplayMode ? 4 * dimUnitHeight : dimUnitHeight,
            // backgroundColor: "rgb(8, 10, 34)",
            backgroundColor: "black",
            // borderBottom: "solid",
            // borderColor: "rgb(77, 83, 110)",
            // backgroundColor: "rgb(7, 11, 34)",
            position: "absolute",
            bottom: 0,
            right: 0,
            zIndex: 1,
          }}
        >
          {isFullDataDisplayMode && (
            <>
              {username && (
                <div
                  style={{
                    width: "100%",
                    // height: 3 * dimUnitHeight,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "90%",
                      height: dimUnitHeight / 1.5,
                      // height: dimUnitHeight,
                      // backgroundColor: "blue",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      fontFamily: '"Amaranth", sans-serif',
                      color: "white",
                      fontSize: 20,
                    }}
                  >
                    {username}
                  </div>
                </div>
              )}
              {address && (
                <div
                  style={{
                    width: "100%",
                    // height: 3 * dimUnitHeight,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "90%",
                      // height: dimUnitHeight / (3 / 4),
                      height: dimUnitHeight / 1.5,
                      // backgroundColor: "blue",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      fontFamily: '"Tajawal", sans-serif',
                      color: "white",
                      wordBreak: "break-all",

                      fontSize: 14,
                    }}
                  >
                    {address}
                  </div>
                </div>
              )}
            </>
          )}

          <div
            style={{
              width: "100%",
              height: "100%",
              // backgroundColor:  "blue",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div
              style={{
                width: 2 * dimUnitHeight,
                height: dimUnitHeight,
                // backgroundColor: "red",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                // cursor: thereIsNoUserData ? "unset" : "pointer",
              }}
            >
              <div
                style={{
                  width: dimUnitHeight,
                  height: dimUnitHeight,
                  // backgroundColor: "red",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: thereIsNoUserData ? "unset" : "pointer",
                }}
                onClick={() => {
                  setIsFullDataDisplayMode(!isFullDataDisplayMode);
                }}
              >
                {thereIsNoUserData ? (
                  <ProfileIcon color="blue" />
                ) : (
                  <ProfileIcon />
                )}
              </div>
              <div
                style={{
                  // borderRadius: 50,
                  width: dimUnitHeight,
                  height: dimUnitHeight,
                  backgroundColor: isUserProfile
                    ? "teal"
                    : isLoading
                    ? "darkgrey"
                    : "black",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: getHeartCursor({
                    isLoading,
                    isUserProfile,
                    hasRecentlyBattled,
                  }),
                  // isLoading
                  //   ? "unset"
                  //   : isUserProfile
                  //   ? "unset"
                  //   : "pointer",

                  userSelect: "none",
                }}
                onClick={async () => {
                  if (isLoading || isUserProfile) {
                    return;
                  }

                  if (
                    mainUserAddress === NULL_ADDRESS ||
                    mainUserId === NULL_USER_ID
                  ) {
                    updateStatus("Please Login to Battle!⚔️", 3);

                    return;
                  }

                  if (hasRecentlyBattled) {
                    const timeUntilNextPlayTime = nextPlayTime - Date.now();
                    if (timeUntilNextPlayTime > 0) {
                      const timeRemainingInMinutesBeforeNextBattle =
                        getRoundedNumber(
                          (nextPlayTime - Date.now()) / 60000,
                          0
                        );

                      if (timeRemainingInMinutesBeforeNextBattle === 0) {
                        const timeRemainingInSecondsBeforeNextBattle =
                          getRoundedNumber(
                            (nextPlayTime - Date.now()) / 1000,
                            0
                          );

                        updateStatus(
                          `Can battle again in ${timeRemainingInSecondsBeforeNextBattle}` +
                            " seconds.⏳"
                        );
                        return;
                      }

                      updateStatus(
                        `Can battle again in ${timeRemainingInMinutesBeforeNextBattle}` +
                          " minutes.⏳"
                      );
                      return;
                    }
                  }

                  setIsLoading(true);

                  try {
                    // await delay(1000);
                    await doBattle({
                      address: mainUserAddress,
                      setUserData,
                      enemyUserId: userId,
                      updateStatus,

                      setRecentlyBattled,

                      afterFunction: async () => {
                        const response = await loadTransactions({
                          address: mainUserAddress,
                        });

                        if (response.response) {
                          const rawTxs = response.response.data.transactions;

                          const txIdToTx = Object.assign(
                            {},
                            transactionIdToTransaction
                          );

                          for (const rawTx of rawTxs) {
                            txIdToTx[rawTx.id] = rawTx;
                          }

                          setTransactionIdToTransaction(txIdToTx);

                          if (response.response.data.pag) {
                            setTransactionIdToTransactionPag(
                              response.response.data.pag
                            );
                          }
                        }
                      },
                    });

                    setIsLoading(false);
                  } catch (err) {
                    console.log("error in battle:", err);

                    const errorMessage =
                      err?.response?.data?.message || err.message || "error";
                    updateStatus(errorMessage, 10);
                    setIsLoading(false);
                  }
                }}
              >
                <HeartIconMeta
                  isLoading={isLoading}
                  isUserProfile={isUserProfile}
                  hasRecentlyBattled={hasRecentlyBattled}
                />
              </div>
            </div>
            <div
              style={{
                width: "100%",
                height: dimUnitHeight,
                // backgroundColor: "rgb(7, 11, 34)",
                // backgroundColor: "darkblue",
                // backgroundColor: "rgb(7, 11, 34)",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  // color: "black",
                  fontFamily: '"Tajawal", sans-serif',
                  wordBreak: "break-all",
                  textAlign: "center",
                  // width: "95%",
                  marginTop: 6,
                  // marginRight: 15,
                  marginLeft: 15,
                  fontSize: 20,

                  color: "white",
                  userSelect: "none",
                }}
              >
                {Number(hp.toPrecision(4)).toString()}
                {/* {(0.123412345).toPrecision(5)} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleProfile;
