// import React, { Suspense } from "react";
// import MidFashionStyleBar from "../MidFashionStyleBar";
import ConnectButton from "../MidFashionStyleBar/ConnectButton";
import LoginButton from "../MidFashionStyleBar/LoginButton";
import DisconnectMetamaskButton from "../ExpansiveComponents/DisconnectMetamaskButton";

// import "./TopBar.css";
// import { ReactComponent as DiscordButton } from "./DiscordButtonV2.svg";
// import { ReactComponent as OpenSeaButton } from "./OpenSeaButtonV2.svg";
// import { ReactComponent as OpenSeaButton } from "./OpenSeaButtonV3.svg";
// import { ReactComponent as TwitterButton } from "./TwitterButtonV4.svg";
// import { useState } from "react"
// import init from "./init";
// import mintSlime from "./MintPoiPoiSection/mintSlime";

function RightSection({
  updateStatus,
  setAddress,
  isLoading,
  setIsLoading,
  isConnected,
  setIsConnected,
  updateDialogMode,
  setProvider,
  permaNoMint,
  setPermaNoMint,
  setMetaMaskAddress,
  provider,
  address,
  setUserData,
  setPage,
  desktopMode,
}) {
  // const notMiniMode = windowWidth > 400;

  return (
    <div
      style={{
        // width: 500,
        // height: 100,
        // backgroundColor: "green",
        display: "flex",
        flexDirection: "row",
      }}
    >
      {!isConnected ? (
        <ConnectButton
          // status={status}
          updateStatus={updateStatus}
          // setStatus={setStatus}
          // address={address}
          setAddress={setAddress}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          isConnected={isConnected}
          setIsConnected={setIsConnected}
          updateDialogMode={updateDialogMode}
          // provider={provider}
          setProvider={setProvider}
          permaNoMint={permaNoMint}
          setPermaNoMint={setPermaNoMint}
          setMetaMaskAddress={setMetaMaskAddress}
          // loginButtonMode={!userData}

          provider={provider}
          address={address}
          setUserData={setUserData}
          setPage={setPage}
          isPixieMint={false}
          // doubleAltFlamingo={doubleAltFlamingo}
          // tripleAltFlamingo={tripleAltFlamingo}
        />
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <DisconnectMetamaskButton isLoading={isLoading} />
          <div
            style={{
              width: 20,
              height: 15,
              // backgroundColor: "green",
            }}
          />
          <LoginButton
            permaNoMint={permaNoMint}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            provider={provider}
            address={address}
            setUserData={setUserData}
            setPage={setPage}
            updateStatus={updateStatus}
            isMobileMode={!desktopMode}
          />
        </div>
      )}
    </div>
  );
}

export default RightSection;
