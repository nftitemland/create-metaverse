import React from "react";
// import axios from "axios";
// import { API_BASE_URL } from "../../constants";
// import { getNTokenData } from "../../utils/nToken";
// import refreshUserData from "../../api/refreshUserData";
// import Messages from "../Messages";
import PoiLand from "./PoiLand";
import MiniMap2 from "../../ExpansiveComponents/MiniMap2";
// import Articles from "../../ExpansiveComponents/Articles";
// import LandGame from "../LandGame";
import { NULL_USER_ID } from "../../constants";
import RealPoi from "../../ExpansiveComponents/RealPoi";

// import LandClaim from "./LandClaim";
// import AirdropClaimSection from "../../ExpansiveComponents/AirdropClaimSection";
// import { ReactComponent as MiniPoi } from "./MiniPoi.svg";

const WrappedMiniMap2 = ({
  userDataLandClaim,
  windowWidth,
  windowHeight,
  selectedLandData,
  setSelectedLandData,
  updateDialogMode,
  setNftPreviewDialogData,

  userData,
  address,
  isLoading,
  setIsLoading,
  updateStatus,
  setUserDataLandClaim,
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "#070b22",
        // backgroundColor: windowWidth < 1000 ? "#070b22" : undefined,
        backgroundColor: "black",
        marginTop: 10,
        marginBottom: 42,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: windowWidth < 1000 ? "#070b22" : undefined,
          marginTop: 42,
        }}
      >
        <div
          style={{
            textAlign: "center",
            fontFamily: `"Amaranth", sans-serif`,
            // fontFamily: `"Tajawal", sans-serif`,
            fontSize: 26,
            color: "white",
          }}
        >
          {"NFT Item Land"}
        </div>

        <div
          style={{
            textAlign: "center",
            fontFamily: `"Tajawal", sans-serif`,
            // fontFamily: `"Tajawal", sans-serif`,
            fontSize: 18,
            color: "white",
          }}
        >
          {"Metaverse Map"}
        </div>
      </div>
      <div
        style={{
          width: 5,
          height: 32,
        }}
      />
      <MiniMap2
        userDataLandClaim={userDataLandClaim}
        windowWidth={windowWidth}
        windowHeight={windowHeight}
        selectedLandData={selectedLandData}
        setSelectedLandData={setSelectedLandData}
        updateDialogMode={updateDialogMode}
        setNftPreviewDialogData={setNftPreviewDialogData}
        // height={620}
      />
      {/* <AirdropClaimSection
        userData={userData}
        address={address}
        userDataLandClaim={userDataLandClaim}
        setUserDataLandClaim={setUserDataLandClaim}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        updateStatus={updateStatus}
      /> */}
      <div
        style={{
          width: 5,
          height: 16,
        }}
      />
    </div>
  );
};

const World = ({
  address,
  isLoading,
  setIsLoading,
  userData,
  setUserData,
  updateDialogMode,

  updateStatus,
  setUserDataLandClaim,

  userDataLandClaim,
  windowWidth,
  windowHeight,
  selectedLandData,
  setSelectedLandData,
  dialogMode,

  setNftPreviewDialogData,
}) => {
  if (!userData) {
    return <></>;
  }

  return (
    <>
      {userData?.userId !== NULL_USER_ID && (
        <RealPoi
          // userData={userData}
          updateStatus={updateStatus}
          address={address}
          userData={userData}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          windowWidth={windowWidth}
          updateDialogMode={updateDialogMode}
        />
      )}
      {/* {true && (
        <LandGame
          userData={userData}
          windowHeight={windowHeight}
          windowWidth={windowWidth}
        />
      )} */}
      {userData?.userId === NULL_USER_ID && (
        <>
          <WrappedMiniMap2
            userData={userData}
            address={address}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            updateStatus={updateStatus}
            setUserDataLandClaim={setUserDataLandClaim}
            userDataLandClaim={userDataLandClaim}
            windowWidth={windowWidth}
            windowHeight={windowHeight}
            selectedLandData={selectedLandData}
            setSelectedLandData={setSelectedLandData}
            updateDialogMode={updateDialogMode}
            setNftPreviewDialogData={setNftPreviewDialogData}
          />

          {/* <LandClaim
        address={address}
        userData={userData}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        updateStatus={updateStatus}
        setUserData={setUserData}
      /> */}
          {/* <div
        style={{
          width: 5,
          height: 75,
        }}
      /> */}
          <div
            style={{
              width: 5,
              height: 32,
            }}
          />

          {userData && userData?.userId !== NULL_USER_ID && (
            <>
              <PoiLand
                address={address}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                userData={userData}
                setUserData={setUserData}
                updateDialogMode={updateDialogMode}
              />
              <div
                style={{
                  width: 5,
                  height: 52,
                }}
              />
            </>
          )}

          {/* <Messages
        address={address}
        userData={userData}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setPage={() => {}}
        dialogMode={dialogMode}
      /> */}
        </>
      )}
    </>
  );
};

export default World;
