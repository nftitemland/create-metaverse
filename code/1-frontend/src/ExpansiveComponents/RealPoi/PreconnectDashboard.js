import React, { useEffect } from "react"; //  useEffect, useState

// import getWsLoginTokenDataIfValid from "../../utils/getWsLoginTokenDataIfValid";
import {
  //NULL_ADDRESS,
  NULL_USER_ID,
  API_BASE_URL,
} from "../../constants";
import { getNTokenData } from "../../utils/nToken";
import axios from "axios";
import BackgroundMap from "./BackgroundMap";
import { MAP_WIDTH } from "./local";
// import InfiniteScroll from "react-infinite-scroll-component";
// import StakingRewardMessage from "./MessagesElements/StakingRewardMessage";
// import { getFirstDayOfWeek, pageNumberToTime } from "./local";
// import delay from "../../utils/delay";

const getRealtimeLoginToken = async ({
  buttonIsDisabled,
  address,
  userId,
  updateStatus,
  setIsLoading,
  setWebsocketLoginToken,
  setErrorMode,
}) => {
  if (buttonIsDisabled) {
    return;
  }

  if (
    //address === NULL_ADDRESS ||
    userId === NULL_USER_ID
  ) {
    updateStatus("Login Required");
    return;
  }

  try {
    const nTokenData = getNTokenData();
    const response = await axios({
      method: "POST",
      url: `${API_BASE_URL}/expansive-world/user-data`,
      headers: {
        "nftitem-address": address,
        "nftitem-ntoken": nTokenData?.nToken,
      },
      data: {
        loginParty: true,
      },
    });

    if (response?.data?.loginPartyToken) {
      setWebsocketLoginToken(response.data.loginPartyToken);
    } else {
      throw new Error("invalid party login response");
    }

    setIsLoading(false);
  } catch (err) {
    console.log("error in connecting to party", err);

    const errorMessage =
      err?.response?.data?.message ||
      err?.message ||
      "Error in connecting to party";

    updateStatus(errorMessage);

    setErrorMode(errorMessage);

    setIsLoading(false);
  }
};

const PreconnectDashboard = ({
  updateStatus,
  address,
  userId,
  setIsLoading,
  isLoading,
  setWebsocketLoginToken,
  windowWidth,
  setErrorMode,
}) => {
  const buttonIsDisabled = isLoading;

  useEffect(() => {
    new Promise(async (resolve) => {
      await getRealtimeLoginToken({
        buttonIsDisabled,
        address,
        userId,
        updateStatus,
        setIsLoading,
        setWebsocketLoginToken,
        setErrorMode,
      });
    });
  }, [
    buttonIsDisabled,
    address,
    userId,
    updateStatus,
    setIsLoading,
    setWebsocketLoginToken,
    setErrorMode,
  ]);

  return (
    <div
      style={{
        marginTop: 50,
        width: windowWidth > MAP_WIDTH ? undefined : "100%",
        // height: 300,
        // backgroundColor: "pink",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BackgroundMap black={true} />

      <button
        style={{
          // marginTop: 50,
          position: "relative",
          top: -120,
          width: 150,
          height: 75,

          borderRadius: 20,

          // marginBottom: 50,
          backgroundColor: buttonIsDisabled ? "grey" : "blue",
          color: "white",

          fontFamily: `"Amaranth", sans-serif`,
          // paddingTop: 5,
          fontSize: 20,
          // display: "flex",
          // flexDirection: "column",
          // justifyContent: "column",
          // alignItems: "center",
        }}
        onClick={async () => {
          if (1 + 1 === 1 + 0 + 1) {
            return;
          }

          getRealtimeLoginToken({
            buttonIsDisabled,
            address,
            userId,
            updateStatus,
            setIsLoading,
            setWebsocketLoginToken,
            setErrorMode,
          });
        }}
      >
        {"Land Party"}
      </button>
    </div>
  );
};

export default PreconnectDashboard;
