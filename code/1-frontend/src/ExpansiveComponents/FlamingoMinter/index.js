import React, { useState } from "react"; //  useState, useEffect
// import { API_BASE_URL } from "../../constants";
// import delay from "../../utils/delay";
// import { getNTokenData } from "../../utils/nToken";
// import axios from "axios";
// import "./MintPoiPoi.css";
import mintFlamingo from "./mintFlamingo";
// import { dialogMzodes } from "../../constants";

import MidFashionStyleBar from "../../MidFashionStyleBar";
// import TitleSection from "../TitleSection";
import AboutInfo from "../AboutInfo";

// import { ReactComponent as DiscordButtonAlt } from "./DiscordButtonAlt.svg";
// import { ReactComponent as OpenSeaButtonAlt } from "./OpenSeaButtonAlt.svg";
// import { ReactComponent as TwitterButtonAlt } from "./TwitterButtonAlt.svg";

// const mintFlamingo = async () => {};

const AlternateMintButton = () => {
  return (
    <a
      href="https://etherscan.io/address/0xea508034fcc8eeff24bf43effe42621008359a2e"
      target={"_blank"}
      rel={"noreferrer"}
    >
      <div
        style={{
          backgroundColor: "rgb(7, 11, 34)",
          width: 160,
          height: 50,
          cursor: "pointer",
          // marginTop: 23,

          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            fontFamily: `"Amaranth", sans-serif`,
            userSelect: "none",
            textAlign: "center",
            color: "white",
            fontSize: 14,
            width: "90%",
          }}
        >
          {`Verified Smart Contract on Etherscan.io`}
        </div>
      </div>
    </a>
  );
};

const MintUltraFlaminButton = ({
  wantedFlamingoCount,
  setWantedFlamingoCount,
  buttonsDisabled,
  isConnected,
  isLoading,
  setIsLoading,
  provider,
  updateStatus,
  address,
}) => {
  return (
    <div
      style={{
        // order: mobileMode ? 6 : 2,
        // backgroundColor: "green",
        // width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <input
        style={{
          width: 100,
          backgroundColor: "black",
          color: "white",
          fontFamily: `"Tajawal", sans-serif`,

          marginTop: 10,
        }}
        type={"number"}
        value={wantedFlamingoCount}
        onChange={(e) => {
          // const valueAsNumber = Number(e.target.value);

          // if

          const stringValue = e.target.value.trim();

          if (stringValue.length > 5) {
            return;
          }

          setWantedFlamingoCount(stringValue);
        }}
      />
      <div
        style={
          false && (buttonsDisabled || !isConnected)
            ? {
                backgroundColor: "#070b22",
                width: 300,
                height: 90,
                // cursor: "pointer",
                marginTop: 7,

                borderRadius: 10,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }
            : {
                backgroundColor: "#12229e",
                width: 300,
                height: 90,
                cursor: "pointer",

                marginTop: 10,

                // borderRadius: 10,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }
        }
        disabled={isLoading || !isConnected}
        onClick={async () => {
          if (!isConnected) {
            updateStatus("Metamask connection is required", 2);
            return;
          }

          if (isLoading) {
            return;
          }

          const numberWantedFlamingoCount = Number(wantedFlamingoCount);

          // console.log(`

          //     MEGA LOG: ${JSON.stringify(
          //       {
          //         a: "aa",
          //         numberWantedFlamingoCount,
          //       },
          //       null,
          //       4
          //     )}

          // `);

          if (
            numberWantedFlamingoCount < 1 ||
            numberWantedFlamingoCount > 100
          ) {
            //   console.log(`

            //     MEGA LOG: ${JSON.stringify(
            //       {
            //         B: "bb",
            //       },
            //       null,
            //       4
            //     )}

            // `);

            return;
          }
          // setMenuIsOpen(false);
          await mintFlamingo({
            setIsLoading,
            provider,
            address,
            updateStatus,
            wantedFlamingoCount: numberWantedFlamingoCount,
            // mintPrice: "xxx",
          });
        }}
      >
        <div
          style={{
            fontFamily: `"Amaranth", sans-serif`,
            userSelect: "none",
            textAlign: "center",
            color: "white",
            fontSize: 20,
            width: "90%",
          }}
        >
          {`Mint ${wantedFlamingoCount} Pixie${
            wantedFlamingoCount > 1 ? "s" : ""
          } for ${Number((wantedFlamingoCount * 0.03).toFixed(2))} ETH`}
        </div>
      </div>
    </div>
  );
};

const FlamingoMinterCore = ({
  isConnected,
  buttonsDisabled,
  updateStatus,
  isLoading,
  setIsLoading,
  provider,
  address,
  windowWidth,
}) => {
  const [wantedFlamingoCount, setWantedFlamingoCount] = useState(1);
  const mobileMode = windowWidth < 700;

  if (true) {
    return (
      <div
        id={"FlamingoMinter"}
        style={{
          // marginTop: 55,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
          // backgroundColor: "green",
        }}
      >
        <div
          style={{
            // backgroundColor: "green",
            height: mobileMode ? 280 : undefined,
            width: "100%",
            marginTop: 15,
            marginBottom: 24,
            display: "flex",
            flexDirection: mobileMode ? "column" : "row",
            // flexDirection: mobileMode ? "column" : "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {mobileMode ? (
            <>
              <MintUltraFlaminButton
                wantedFlamingoCount={wantedFlamingoCount}
                setWantedFlamingoCount={setWantedFlamingoCount}
                buttonsDisabled={buttonsDisabled}
                isConnected={isConnected}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                provider={provider}
                updateStatus={updateStatus}
                address={address}
              />
              <AlternateMintButton />
            </>
          ) : (
            <>
              <AlternateMintButton />
              <MintUltraFlaminButton
                wantedFlamingoCount={wantedFlamingoCount}
                setWantedFlamingoCount={setWantedFlamingoCount}
                buttonsDisabled={buttonsDisabled}
                isConnected={isConnected}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                provider={provider}
                updateStatus={updateStatus}
                address={address}
              />
            </>
          )}
        </div>
      </div>
    );
  }
  return null;
};

const FlamingoInfo = ({
  windowWidth,
  windowHeight,
  updateDialogMode,
  setImageDialog,
}) => {
  const mobileMode = windowWidth < 700;

  return (
    <div
      style={{
        width: "90%",
        // height: 200,
        // backgroundColor: "green",

        display: "flex",
        flexDirection: mobileMode ? "column" : "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: 200,
          height: 200,
          // backgroundColor: "blue",

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
        onClick={() => {
          // updateDialogMode(dialogModes.IMAGE);

          setImageDialog(
            "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/pixies/489.png"
          );
        }}
      >
        <img
          alt="Pixie"
          style={{
            width: "100%",
            height: "100%",
            // transform: "scaleX(-1)",
          }}
          src={
            // "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/ultraflaminpixeltech/1.png"
            // "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/ultraflaminpixel/1.png"
            "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/pixies/489.png"
          }
        ></img>
      </div>
      {/* <div
        style={{
          // width: 20,
          // height: "100%",
          // backgroundColor: "beige",
          marginTop: mobileMode ? 40 : undefined,
          marginBottom: mobileMode ? 20 : undefined,

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderStyle: "solid",
            borderWidth: mobileMode ? "66px 33px 0px 33px" : "33px 0 33px 66px",
            borderColor: mobileMode
              ? "#12229e transparent transparent transparent"
              : "transparent transparent transparent #12229e",
          }}
        ></div>
      </div>
      <div
        style={{
          width: 200,
          height: 200,
          // backgroundColor: "blue",

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          alt="poipoi house"
          style={{
            width: "100%",
            height: "100%",
            // transform: "scaleX(-1)",
          }}
          src={
            "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/alt-images/poi-house-loop-optimized.gif"
          }
        ></img>
      </div> */}
    </div>
  );
};

function FlamingoMinter({
  isLoading,
  setIsLoading,
  isConnected,
  provider,
  address,

  updateStatus,
  // address,
  setAddress,
  setIsConnected,
  // provider,
  setProvider,
  permaNoMint,
  setPermaNoMint,
  setMetaMaskAddress,

  updateDialogMode,
  setImageDialog,

  aboutInfoCurrentInfoPage,
  setAboutInfoCurrentInfoPage,
  aboutInfoGameAssetsLandMintAmount,
  setAboutInfoGameAssetsLandMintAmount,
  aboutInfoGameAssetsPoiMintAmount,
  setAboutInfoGameAssetsPoiMintAmount,

  aboutInfoGameAssetsPage,
  setAboutInfoGameAssetsPage,

  setUserData,
  setPage,
  windowWidth,
  windowHeight,

  noMetaMaskOptions = false,
  doubleAltFlamingo = false,
  doubleAltFlamingoBottomSpacer = false,
  tripleAltFlamingo = false,
}) {
  const buttonsDisabled = isLoading;

  return (
    <div
      // className="MintUltraFlaminMeta"
      style={{
        backgroundColor: "black",
        width: "100%",
        maxWidth: 850,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      {!tripleAltFlamingo && doubleAltFlamingo && (
        <AboutInfo
          windowWidth={windowWidth}
          setImageDialog={setImageDialog}
          currentInfoPage={aboutInfoCurrentInfoPage}
          setCurrentInfoPage={setAboutInfoCurrentInfoPage}
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
          setIsLoading={setIsLoading}
          address={address}
          provider={provider}
          updateStatus={updateStatus}
          permaNoMint={permaNoMint}
          isLoading={isLoading}
          isConnected={isConnected}
          setAddress={setAddress}
          setIsConnected={setIsConnected}
          setProvider={setProvider}
          setPermaNoMint={setPermaNoMint}
          setMetaMaskAddress={setMetaMaskAddress}
        />
      )}
      {noMetaMaskOptions ? (
        <div
          // className="MintUltraFlaminMeta"
          style={{
            backgroundColor: "black",
            width: 40,
            height: 40,
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "space-around",
            // alignItems: "center",
          }}
        />
      ) : (
        <MidFashionStyleBar
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
          isPixieMint={!doubleAltFlamingo && !tripleAltFlamingo}
          doubleAltFlamingo={doubleAltFlamingo}
          tripleAltFlamingo={tripleAltFlamingo}
        />
      )}
      {/* <div
        style={{
          // fontFamily: `"Amaranth", sans-serif`,
          fontFamily: `"Tajawal", sans-serif`,
          userSelect: "none",
          textAlign: "left",
          color: "white",
          fontSize: 18,
          width: "90%",
          marginTop: 10,
          marginBottom: 15,
        }}
      >
        {`Poi minting is now live! Pois can be used to claim metaverse homes with zero fees or gas. Upcoming metaverse land claim event February 12th. `}
        <div
          style={{
            // fontFamily: `"Amaranth", sans-serif`,
            fontSize: 14,
            marginTop: 2,
          }}
        >
          {`5% of mints go to support the `}
          {<a href="https://www.sickkids.ca/">SickKids Foundation</a>}
          {"."}
        </div>
      </div> */}
      {!doubleAltFlamingo && !tripleAltFlamingo && (
        <FlamingoInfo
          windowWidth={windowWidth}
          windowHeight={windowHeight}
          setImageDialog={setImageDialog}
          updateDialogMode={updateDialogMode}
        />
      )}
      {!doubleAltFlamingo && !tripleAltFlamingo && (
        <FlamingoMinterCore
          isConnected={isConnected}
          buttonsDisabled={buttonsDisabled}
          updateStatus={updateStatus}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          provider={provider}
          address={address}
          windowWidth={windowWidth}
          // status={status}
          // setStatus={setStatus}
          // address={address}
        />
      )}
      {doubleAltFlamingo && doubleAltFlamingoBottomSpacer && (
        <div
          style={{
            width: "100%",
            backgroundColor: "rgb(7, 11, 34)",
            height: 60,
            marginTop: 20,
            marginBottom: 30,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-start",
          }}
        />
      )}
    </div>
  );
}

export default FlamingoMinter;
