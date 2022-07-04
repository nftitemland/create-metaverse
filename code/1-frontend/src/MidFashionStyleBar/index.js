// import React, { Suspense } from "react";
import "./MidFashionStyleBar.css";
// import init from "./init";
// import login from "../ConnectedMode/MyAccountV2/login";
import ConnectButton from "./ConnectButton";
import restart from "../utils/restart";
import { dialogModes } from "../constants";
import LoginButton from "./LoginButton";

// import { useState } from "react";

function MidFashionStyleBar({
  // status,
  // setStatus,
  resetStateLogin,
  updateStatus,
  // address,
  setAddress,
  isLoading,
  setIsLoading,
  isConnected,
  setIsConnected,
  // provider,
  setProvider,
  permaNoMint,
  setPermaNoMint,
  setMetaMaskAddress,

  updateDialogMode,

  provider,
  address,
  setUserData,
  setPage,

  isPixieMint = true,
  doubleAltFlamingo = false,
  tripleAltFlamingo = false,

  smallMode = false,
  connectButtonBorderRadius = 0,
}) {
  return (
    <div className="MidFashionStyleBar">
      {isPixieMint && !tripleAltFlamingo && (
        <div
          style={{
            width: "100%",
            height: 100,
            backgroundColor: "rgb(18, 34, 158)",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            fontFamily: `"Amaranth", sans-serif`,
            color: "white",
            fontSize: 32,
          }}
        >
          <div
            style={{
              // width: "100%",
              height: 100,
              // backgroundColor: "rgb(18, 34, 158)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: `"Amaranth", sans-serif`,
              color: "white",
              fontSize: 32,
            }}
          >
            {"Pixie Jars Mint"}
          </div>

          <div
            style={{
              // width: "100%",
              // height: 100,
              width: 100,
              backgroundColor: "green",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              fontFamily: `"Amaranth", sans-serif`,
              color: "white",
              fontSize: 16,
            }}
          >
            <div
              style={{
                // width: "100%",
                // height: 100,
                width: 100,
                backgroundColor: "green",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                // fontFamily: `"Amaranth", sans-serif`,
                cursor: "pointer",
                // fontSize: 16,
              }}
              onClick={() => {
                updateDialogMode(dialogModes.PIXIE_JARS_MINT_DATA);
              }}
            >
              <div
                style={{
                  width: "100%",
                  marginTop: 10,
                  marginBottom: 10,
                  // marginTop: 30,
                  // marginBottom: 25,

                  // height: 100,
                  // width: 100,
                  // backgroundColor: "green",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  fontFamily: `"Amaranth", sans-serif`,
                  color: "white",
                  fontSize: 16,
                }}
              >
                {"Info"}
              </div>
            </div>
          </div>
        </div>
      )}
      {!isConnected ? (
        <div
          style={{
            width: "100%",
            // marginTop: 10,
            // marginBottom: 10,
            marginTop: 30,
            marginBottom: 25,

            // height: 100,
            // width: 100,
            // backgroundColor: "green",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            // fontFamily: `"Amaranth", sans-serif`,
            // color: "white",
            // fontSize: 16,
          }}
        >
          <ConnectButton
            smallMode={smallMode}
            borderRadius={connectButtonBorderRadius}
            // setStatus={setStatus}
            // address={address}
            // provider={provider}

            // loginButtonMode={!userData}

            // provider={provider}
            // address={address}
            // setUserData={setUserData}
            // setPage={setPage}

            permaNoMint={permaNoMint}
            isLoading={isLoading}
            isConnected={isConnected}
            updateStatus={updateStatus}
            setAddress={setAddress}
            setIsLoading={setIsLoading}
            setIsConnected={setIsConnected}
            setProvider={setProvider}
            setPermaNoMint={setPermaNoMint}
            setMetaMaskAddress={setMetaMaskAddress}
          />
        </div>
      ) : (
        <div
          className="ConnectToMetaMaskButtonMeta"
          style={{
            // width: "90%",
            // backgroundColor: "rgb(8, 10, 34)",
            justifyContent: address
              ? doubleAltFlamingo || tripleAltFlamingo
                ? "center"
                : "flex-start"
              : "center",
          }}
        >
          {!doubleAltFlamingo && !tripleAltFlamingo && false && (
            <div
              style={{
                width: "77px",
                height: 70,

                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "90%",
                  height: "100%",
                  backgroundColor: isLoading ? "rgb(1 5 32)" : "rgb(7, 11, 34)",
                  // backgroundColor: isLoading ? "rgb(1 5 32)" : "pink",
                  // height: 60,
                  borderRadius: 5,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                  // marginLeft: "50%",
                }}
                onClick={() => {
                  if (!isLoading) {
                    restart();
                    return;
                  }
                }}
              >
                <div
                  style={{
                    width: "90%",
                    textAlign: "center",
                    fontFamily: `"Amaranth", sans-serif`,
                    fontSize: 13,
                    color: "white",
                    marginTop: 5,
                    marginBottom: 5,
                    userSelect: "none",
                  }}
                >
                  {"Disconnect MetaMask"}
                </div>
              </div>
            </div>
          )}
          {!isPixieMint && (
            <LoginButton
              smallMode={smallMode}
              permaNoMint={permaNoMint}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              provider={provider}
              address={address}
              setUserData={setUserData}
              setPage={setPage}
              updateStatus={updateStatus}
              resetStateLogin={resetStateLogin}
            />
          )}
        </div>
      )}
      {/* <div className="BottomTriangleMeta">
        <div className="LeftBottomTriangle" />
        <div className="RightBottomTriangle" />
      </div> */}
    </div>
  );
}

export default MidFashionStyleBar;
