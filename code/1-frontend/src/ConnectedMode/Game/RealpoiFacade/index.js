import React, { useState, useEffect } from "react";
import RealPoi from "../../../ExpansiveComponents/RealPoi";
import initConnectAsGuest from "./initConnectAsGuest";
// import MessagesMain from "./MessagesMain";
// import "./PreMessages.css";

const CoverPhoto = ({ connectErrorData, isTooManyUsersError }) => {
  let mainElement;

  if (isTooManyUsersError) {
    mainElement = (
      <img
        alt={"Realtime multiplayer splashscreen with many squirrels."}
        src="https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/game_start_screen_too_many_users_1.png"
        style={{
          width: 320,
          marginBottom: 15,
        }}
      ></img>
    );
  } else if (connectErrorData) {
    mainElement = (
      <img
        alt={
          "Realtime multiplayer connection error splashscreen with a squirrel in a construction outfit."
        }
        src="https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/game_start_screen_connection_error_1.png"
        style={{
          width: 320,
          marginBottom: 15,
        }}
      ></img>
    );
  } else {
    mainElement = (
      <img
        alt={
          "Realtime multiplayer splashscreen with two squirrels and a nighttime background."
        }
        src="https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/game_start_screen_1.png"
        style={{
          width: 320,
          marginBottom: 15,
        }}
      ></img>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {mainElement}
    </div>
  );
};

const getButtonTextMessage = ({ connectErrorData, isTooManyUsersError }) => {
  if (isTooManyUsersError) {
    return "Too many users currently in Metaverse - Retry";
  } else if (connectErrorData) {
    return "Error in Connecting - Retry";
  }
  return `Joining Metaverse as Guest`;
};

function RealpoiFacade({
  updateStatus,
  address,
  userData,
  setIsLoading,
  isLoading,
  windowWidth,
  updateDialogMode,
}) {
  const [grecaptchaToken, setGrecaptchaToken] = useState(null);
  const [hasFirstLoaded, setHasFirstLoaded] = useState(false);
  const [connectErrorData, setConnectErrorData] = useState("");

  const isTooManyUsersError = connectErrorData.includes("too many");

  useEffect(() => {
    if (!hasFirstLoaded) {
      setHasFirstLoaded(true);

      new Promise(async (resolve) => {
        setIsLoading(true);

        try {
          await initConnectAsGuest({
            setGrecaptchaToken,
            updateStatus,
          });
        } catch (err) {
          console.log("connection error:", err);

          setConnectErrorData(err.message);
        }

        setIsLoading(false);

        resolve();
      });
    }
  }, [hasFirstLoaded, setIsLoading, updateStatus]);

  if (grecaptchaToken) {
    return (
      <div
        style={{
          // width: "100%",
          // backgroundColor: "blue",
          color: "white",
          minHeight: 200,
          minWidth: 200,
          width: "100%",
          overflow: "scroll",
          // overflow: "scroll",
          // marginBottom: 40,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          wordBreak: "break-all",
        }}
      >
        <RealPoi
          updateStatus={updateStatus}
          address={address}
          userData={userData}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          windowWidth={windowWidth}
          updateDialogMode={updateDialogMode}
          grecaptchaToken={grecaptchaToken}
        />
      </div>
    );
  }

  return (
    <div
      style={{
        // width: "100%",
        // backgroundColor: "blue",
        marginTop: 30,
        // height: 200,
        // width: 200,
        // marginBottom: 40,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={async () => {
        if (!connectErrorData) {
          return;
        }

        setIsLoading(true);

        try {
          await initConnectAsGuest({
            setGrecaptchaToken,
            updateStatus,
          });
        } catch (err) {
          console.log("connection error:", err);

          setConnectErrorData(err.message);
        }

        setIsLoading(false);
      }}
    >
      <CoverPhoto
        connectErrorData={connectErrorData}
        isTooManyUsersError={isTooManyUsersError}
      />
      <button
        style={{
          width: 320,
          height: 100,
          fontFamily: `"Amaranth", sans-serif`,
          fontSize: 25,
          backgroundColor: "darkblue",
          color: "white",
          borderRadius: 5,
        }}
      >
        {getButtonTextMessage({
          connectErrorData,
          isTooManyUsersError,
        })}
      </button>
    </div>
  );
}

export default RealpoiFacade;
