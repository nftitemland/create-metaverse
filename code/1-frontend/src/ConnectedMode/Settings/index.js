import React, { useState } from "react";
import "./Settings.css";
//import axios from "axios";
// import { dialogModes } from "../../constants";
import LowerMoreInfoSection from "../../LowerMoreInfoSection";
import FlamingoMinter2 from "../../ExpansiveComponents/FlamingoMinter2";
// import {
//   dialogModes,
//   //  API_BASE_URL
// } from "../../constants";
//import restart from "../../utils/restart";
// import { getNTokenData } from "../../utils/nToken";
// import { ReactComponent as HighlightPoi } from "../../HighlightPoi.svg";
import { ReactComponent as HighlightPoi } from "./Slime8Export2.svg";
import Logout from "./Logout";
import { NULL_ADDRESS, NULL_USER_ID } from "../../constants";
import MidFashionStyleBar from "../../MidFashionStyleBar";
// import MintPoiPoi from "../MintPoiPoi";

// import MediaBar from "./MediaBar";

const coolModes = {
  FAQ: "FAQ",
};

const PoiChillSection = ({ windowWidth, updateDialogMode }) => {
  const isMobileMode = windowWidth < 750;

  const { cnPoiChillSectionMeta, cnLeftOuterMeta } = isMobileMode
    ? {
        cnPoiChillSectionMeta: "PoiChillSectionMeta Mobile",
        cnLeftOuterMeta: "LeftOuterMeta Mobile",
      }
    : {
        cnPoiChillSectionMeta: "PoiChillSectionMeta",
        cnLeftOuterMeta: "LeftOuterMeta",
      };

  return (
    <div className={cnPoiChillSectionMeta}>
      <div className={cnLeftOuterMeta}>
        <div
          className={"TwoMeta"}
          style={{
            minHeight: 200,
          }}
        >
          <HighlightPoi className={"TwoMetaPoi"} />
        </div>
        <div
          style={{
            width: 26,
            height: 1,
          }}
        />
        <div className={"OneMeta"}>
          <div className={"OneMetaText"}>{"NFT Item Land"}</div>
        </div>
      </div>
      {/* <div id="CrypDollsDoll" className={"RightOuterMeta"}>
        <img
          alt="NFT Item CrypDolls doll"
          className={"NftItemDoll"}
          src="https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/nftitemdoll.jpeg"
          // src="https://deelay.me/2000/https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/nftitemdoll.jpeg"
          onClick={() => {
            // console.log("xxx");
            updateDialogMode(dialogModes.IMAGE);
          }}
        />
        <div className={"NftItemDollLabelMeta"}>
          <div className={"NftItemDollLabel"}>
            {"nftitem.net doll by CrypDolls"}
          </div>
        </div>
      </div> */}
    </div>
  );
};

const CoolSection = ({ coolSectionMode, windowWidth, updateDialogMode }) => {
  let coolSection;

  switch (coolSectionMode) {
    case coolModes.FAQ:
      coolSection = (
        <LowerMoreInfoSection windowWidth={windowWidth} modalMode2={true} />
      ); //safeguard
      break;

    default: //safeguard
      coolSection = (
        <PoiChillSection
          windowWidth={windowWidth}
          updateDialogMode={updateDialogMode}
        />
      );
      break;
  }

  return <div className={"CoolSection"}>{coolSection}</div>;
};

function Settings({
  userData,
  resetStateLogin,
  setMenuIsOpen,
  windowWidth,
  updateDialogMode,
  address,
  isLoading,
  setIsLoading,
  isConnected,
  provider,
  setStatus,
  permaNoMint,
  setAddress,
  setProvider,
  setPermaNoMint,
  metaMaskAddress,
  setIsConnected,
  setMetaMaskAddress,
  setUserData,
  setPage,
  windowHeight,
  aboutInfoCurrentInfoPage,
  setAboutInfoCurrentInfoPage,
  setImageDialog,
  updateStatus,
  aboutInfoGameAssetsPage,
  setAboutInfoGameAssetsPage,
  aboutInfoGameAssetsLandMintAmount,
  setAboutInfoGameAssetsLandMintAmount,
  aboutInfoGameAssetsPoiMintAmount,
  setAboutInfoGameAssetsPoiMintAmount,
  mintSectionSelectedPoiPoiType,
  setMintSectionSelectedPoiPoiType,
  aboutInfoGameAssetsCharacterMintAmount,
  setAboutInfoGameAssetsCharacterMintAmount,
  discountCode,
  setDiscountCode,
  existingDiscountCodeData,
  setExistingDiscountCodeData,
}) {
  const [
    coolSectionMode,
    // setCoolSectionMode
  ] = useState("FAQ");

  // const logoutButtonIsDisabled = isLoading;

  // const nTokenDataExists = !!getNTokenData();

  const notLoggedInMode = userData.userId === NULL_USER_ID;

  return (
    <div className="SettingsMeta">
      {/* <div className={"PreUpperMeta"}>
        <MintPoiPoi
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setMenuIsOpen={setMenuIsOpen}
          address={address}
          updateDialogMode={updateDialogMode}
          isConnected={isConnected}
          provider={provider}
          setStatus={setStatus}
          permaNoMint={permaNoMint}
          updateStatus={setStatus}
          setAddress={setAddress}
          setIsConnected={setIsConnected}
          setProvider={setProvider}
          setPermaNoMint={setPermaNoMint}
          metaMaskAddress={metaMaskAddress}
          setMetaMaskAddress={setMetaMaskAddress}
          mode2={true}
        />
      </div> */}

      <div
        style={{
          width: "100%",
          maxWidth: 700,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "#070b22",
          marginTop: 12,
          marginBottom: 22,
        }}
      >
        <div
          style={{
            width: 5,
            height: 32 + (notLoggedInMode ? 0 : 10),
          }}
        />
        {notLoggedInMode && (
          <>
            <MidFashionStyleBar
              // connectButtonBorderRadius={6}
              resetStateLogin={resetStateLogin}
              isPixieMint={false}
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
              smallMode={true}
            />
            <div
              style={{
                width: 5,
                height: 5,
              }}
            />
          </>
        )}
        {/* <FlamingoMinter
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          isConnected={isConnected}
          provider={provider}
          address={metaMaskAddress}
          setStatus={setStatus}
          updateDialogMode={updateDialogMode}
          aboutInfoCurrentInfoPage={aboutInfoCurrentInfoPage}
          setAboutInfoCurrentInfoPage={setAboutInfoCurrentInfoPage}
          setImageDialog={setImageDialog}
          // status={status}
          updateStatus={setStatus}
          // setStatus={setStatus}
          // address={address}
          setAddress={setMetaMaskAddress}
          setIsConnected={setIsConnected}
          // provider={provider}
          setProvider={setProvider}
          permaNoMint={permaNoMint}
          setPermaNoMint={setPermaNoMint}
          setMetaMaskAddress={setMetaMaskAddress}
          setUserData={setUserData}
          setPage={setPage}
          windowWidth={windowWidth}
          windowHeight={windowHeight}
          noMetaMaskOptions={true}
        />
        <div
          style={{
            width: 5,
            height: 42,
          }}
        /> */}
      </div>

      <FlamingoMinter2
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        isConnected={isConnected}
        provider={provider}
        address={address}
        setStatus={updateStatus}
        // status={status}
        updateStatus={updateStatus}
        // setStatus={setStatus}
        // address={address}
        updateDialogMode={updateDialogMode}
        setImageDialog={setImageDialog}
        setAddress={setAddress}
        setIsConnected={setIsConnected}
        aboutInfoCurrentInfoPage={aboutInfoCurrentInfoPage}
        setAboutInfoCurrentInfoPage={setAboutInfoCurrentInfoPage}
        aboutInfoGameAssetsPage={aboutInfoGameAssetsPage}
        setAboutInfoGameAssetsPage={setAboutInfoGameAssetsPage}
        aboutInfoGameAssetsLandMintAmount={aboutInfoGameAssetsLandMintAmount}
        setAboutInfoGameAssetsLandMintAmount={
          setAboutInfoGameAssetsLandMintAmount
        }
        aboutInfoGameAssetsPoiMintAmount={aboutInfoGameAssetsPoiMintAmount}
        setAboutInfoGameAssetsPoiMintAmount={
          setAboutInfoGameAssetsPoiMintAmount
        }
        mintSectionSelectedPoiPoiType={mintSectionSelectedPoiPoiType}
        setMintSectionSelectedPoiPoiType={setMintSectionSelectedPoiPoiType}
        aboutInfoGameAssetsCharacterMintAmount={
          aboutInfoGameAssetsCharacterMintAmount
        }
        setAboutInfoGameAssetsCharacterMintAmount={
          setAboutInfoGameAssetsCharacterMintAmount
        }
        // provider={provider}
        noMetaMaskOptions={true}
        setProvider={setProvider}
        permaNoMint={permaNoMint}
        setPermaNoMint={setPermaNoMint}
        setMetaMaskAddress={setMetaMaskAddress}
        setUserData={setUserData}
        setPage={setPage}
        windowWidth={windowWidth}
        windowHeight={windowHeight}
        doubleAltFlamingo={true}
        discountCode={discountCode}
        setDiscountCode={setDiscountCode}
        existingDiscountCodeData={existingDiscountCodeData}
        setExistingDiscountCodeData={setExistingDiscountCodeData}
      />
      <div
        style={{
          width: 5,
          height: 42,
        }}
      />

      <div className="Settings">
        {/* <div className={"FAQButtonMeta"}>
          <div
            className={
              coolSectionMode === coolModes.FAQ
                ? "FAQButton Pressed"
                : "FAQButton"
            }
            onClick={() => {
              if (1 === 1.0) {
                return;
              }
              setMenuIsOpen(false);
              if (coolSectionMode === coolModes.FAQ) {
                setCoolSectionMode(null);
              } else {
                setCoolSectionMode(coolModes.FAQ);
              }
            }}
          >
            <div className="FAQButtonText">{"F.A.Q."}</div>
          </div>
        </div> */}

        <CoolSection
          coolSectionMode={coolSectionMode}
          windowWidth={windowWidth}
          updateDialogMode={updateDialogMode}
        />

        {address && address !== NULL_ADDRESS && (
          <Logout
            address={address}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        )}

        {/* <div className={"LogoutMeta"}>
              <div
                className={
                  logoutButtonIsDisabled
                    ? "LogoutButton Disabled"
                    : "LogoutButton"
                }
                onClick={async () => {
                  try {
                    setIsLoading(true);
                    const nTokenData = getNTokenData();

                    if (!nTokenData) {
                      restart();
                      return;
                    }

                    await axios({
                      method: "post",
                      url: `${API_BASE_URL}/expansive-world/logout`,
                      headers: {
                        "nftitem-address": address,
                        "nftitem-ntoken": nTokenData.nToken,
                      },
                    });

                    restart();

                    // setIsLoading(false);

                    // TODO: update snackbar
                  } catch (err) {
                    console.log("error in signout:", err);
                    setIsLoading(false);
                    // TODO: update snackbar
                  }
                }}
              >
                <div className={"Label"}>
                  {nTokenDataExists ? "Logout" : "Disconnect"}
                </div>
              </div>
            </div> */}
      </div>
    </div>
  );
}

export default Settings;
