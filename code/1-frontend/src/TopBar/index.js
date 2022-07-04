// import React, { Suspense } from "react";
import "./TopBar.css";
// import { useState } from "react";
// import init from "./init";
// import mintSlime from "./MintPoiPoiSection/mintSlime";
import LeftSection from "./LeftSection";
import RightSection from "./RightSection";

function TopBar({
  windowWidth,
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
}) {
  const desktopMode = windowWidth > 832;

  const { cnTopBar } = desktopMode
    ? {
        cnTopBar: "TopBar",
      }
    : {
        cnTopBar: "TopBar Mobile",
      };

  return (
    <div
      className={cnTopBar}
      style={{
        // height: 20,
        height: "unset",
      }}
    >
      <LeftSection desktopMode={desktopMode} />
      {
        <RightSection
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
          desktopMode={desktopMode}
        />
      }
    </div>
  );
}

export default TopBar;
