// import React, { Suspense } from "react";
import init from "./init";
// import login from "../ConnectedMode/MyAccountV2/login";
// import restart from "../utils/restart";
// import { dialogModes } from "../constants";
// import { useState } from "react";

const height = 70;
const smallHeight = 50;
const smallMarginTopBottom = (height - smallHeight) / 2;

const ConnectButton = ({
  permaNoMint,
  isLoading,
  isConnected,
  updateStatus,
  setAddress,
  setIsLoading,
  setIsConnected,
  setProvider,
  setPermaNoMint,
  setMetaMaskAddress,
  mobileMode,
  smallMode = false,
  borderRadius = 0,
}) => {
  const disabled = permaNoMint || isLoading || isConnected;

  return (
    <div
      // className="ConnectToMetaMaskButtonMeta"
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        // marginTop: 30,
        // marginBottom: 25,
      }}
    >
      <div
        /*

.ConnectToMetaMaskButton.Disabled {
  background-color: #353a53;
  cursor: unset;
}
      */
        // disabled={}
        // className={
        //   disabled
        //     ? "ConnectToMetaMaskButton Disabled"
        //     : "ConnectToMetaMaskButton"
        // }
        style={{
          position: "relative",

          backgroundColor: disabled ? "#353a53" : "#12229e",
          cursor: disabled ? "unset" : "pointer",

          width: smallMode ? 200 : mobileMode ? 140 : 280,
          height: smallMode ? smallHeight : height,
          marginTop: smallMode ? smallMarginTopBottom : 0,
          marginBottom: smallMode ? smallMarginTopBottom : 0,

          borderRadius: smallMode ? 6 : borderRadius,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={async () => {
          if (disabled) {
            return;
          }
          try {
            const { failMessage } = await init({
              setStatus: updateStatus,
              setAddress,
              setIsLoading,
              setIsConnected,
              setProvider,
              setPermaNoMint,
              setMetaMaskAddress,
            });

            if (!!failMessage) {
              return updateStatus(failMessage);
            }
          } catch (err) {
            console.log("error in MetaMask initialization:", err.message);
            updateStatus("Failed setting up MetaMask");
          }
        }}
      >
        <div
          style={{
            fontFamily: `"Amaranth", sans-serif`,
            color: "white",
            textAlign: "center",
            fontSize: smallMode ? 18 : mobileMode ? 20 : 26,
            userSelect: "none",
          }}
        >
          {"Connect MetaMask"}
        </div>
      </div>
    </div>
  );
};

export default ConnectButton;

/*

.ConnectToMetaMaskButtonMeta {

  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 30px;
  margin-bottom: 25px;
}

.ConnectToMetaMaskButton {
  position: relative;

  background-color: #12229e;
  cursor: pointer;

  width: 280px;
  height: 60px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.ConnectToMetaMaskButton.Disabled {
  background-color: #353a53;
  cursor: unset;
}

.ConnectToMetaMaskButton .ConnectToMetaMaskButtonText {
  font-family: "Amaranth", sans-serif;
  color: white;
  text-align: center;
  font-size: 26px;
  user-select: none;
}
*/
