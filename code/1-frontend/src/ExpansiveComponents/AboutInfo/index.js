import React from "react";
// import React from "react";
import Roadmap from "./Roadmap";
import GameAssetsSection from "./GameAssetsSection/index";
import BasicButton from "../BasicButton";

const InfoData = ({
  currentInfoPage,
  isMobileMode,
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
  setImageDialog,

  setIsLoading,
  address,
  provider,
  updateStatus,

  permaNoMint,
  isLoading,
  isConnected,
  setAddress,
  setIsConnected,
  setProvider,
  setPermaNoMint,
  setMetaMaskAddress,

  discountCode,
  setDiscountCode,
  existingDiscountCodeData,
  setExistingDiscountCodeData,
  updateDialogMode,
}) => {
  switch (currentInfoPage) {
    case 0:
      return (
        <GameAssetsSection
          isMobileMode={isMobileMode}
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
          setImageDialog={setImageDialog}
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
          discountCode={discountCode}
          setDiscountCode={setDiscountCode}
          existingDiscountCodeData={existingDiscountCodeData}
          setExistingDiscountCodeData={setExistingDiscountCodeData}
          updateDialogMode={updateDialogMode}
        />
        // <div
        //   style={{
        //     width: "100%",
        //     height: "100%",
        //     backgroundColor: "pink",
        //   }}
        // ></div>
      );
    default:
      return (
        <Roadmap />
        // <div
        //   style={{
        //     width: "100%",
        //     height: "100%",
        //     // height: "100%",
        //     backgroundColor: "green",
        //   }}
        // ></div>
      );
  }
};

// const infoData = [
//   {
//     element: (
// {
/* <div
  style={{
    width: "100%",
    height: "100%",
    backgroundColor: "green",
  }}
></div>; */
// }
//     ),
//   },
//   {
//     element: (
//       <div
//         style={{
//           width: "100%",
//           height: "100%",
//           backgroundColor: "blue",
//         }}
//       ></div>
//     ),
//   },

//   {
//     element: (
//       <div
//         style={{
//           width: "100%",
//           height: "100%",
//           backgroundColor: "pink",
//         }}
//       ></div>
//     ),
//   },
// ];

// ROADMAP, quick points, Already implemented

const AboutInfo = ({
  windowWidth,
  setImageDialog,
  currentInfoPage,
  setCurrentInfoPage,

  aboutInfoGameAssetsLandMintAmount,
  setAboutInfoGameAssetsLandMintAmount,
  aboutInfoGameAssetsPoiMintAmount,
  setAboutInfoGameAssetsPoiMintAmount,
  mintSectionSelectedPoiPoiType,
  setMintSectionSelectedPoiPoiType,
  aboutInfoGameAssetsCharacterMintAmount,
  setAboutInfoGameAssetsCharacterMintAmount,

  setIsLoading,
  address,
  provider,
  updateStatus,
  updateDialogMode,

  aboutInfoGameAssetsPage,
  setAboutInfoGameAssetsPage,

  permaNoMint,
  isLoading,
  isConnected,
  setAddress,
  setIsConnected,
  setProvider,
  setPermaNoMint,
  setMetaMaskAddress,
  discountCode,
  setDiscountCode,
  existingDiscountCodeData,
  setExistingDiscountCodeData,
}) => {
  const isMobileMode = windowWidth <= 700;

  // const infoDatum = infoData[currentInfoPage] || {};

  const infoDatum = (
    <InfoData
      currentInfoPage={currentInfoPage}
      isMobileMode={isMobileMode}
      aboutInfoGameAssetsPage={aboutInfoGameAssetsPage}
      setAboutInfoGameAssetsPage={setAboutInfoGameAssetsPage}
      aboutInfoGameAssetsLandMintAmount={aboutInfoGameAssetsLandMintAmount}
      setAboutInfoGameAssetsLandMintAmount={
        setAboutInfoGameAssetsLandMintAmount
      }
      mintSectionSelectedPoiPoiType={mintSectionSelectedPoiPoiType}
      setMintSectionSelectedPoiPoiType={setMintSectionSelectedPoiPoiType}
      aboutInfoGameAssetsPoiMintAmount={aboutInfoGameAssetsPoiMintAmount}
      setAboutInfoGameAssetsPoiMintAmount={setAboutInfoGameAssetsPoiMintAmount}
      aboutInfoGameAssetsCharacterMintAmount={
        aboutInfoGameAssetsCharacterMintAmount
      }
      setAboutInfoGameAssetsCharacterMintAmount={
        setAboutInfoGameAssetsCharacterMintAmount
      }
      updateDialogMode={updateDialogMode}
      setImageDialog={setImageDialog}
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
      discountCode={discountCode}
      setDiscountCode={setDiscountCode}
      existingDiscountCodeData={existingDiscountCodeData}
      setExistingDiscountCodeData={setExistingDiscountCodeData}
    />
  );

  return (
    <div
      style={{
        marginTop: 20,
        // backgroundColor: "rgb(18, 34, 158)",
        width: "100%",
        // height: 300,

        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <div
        style={{
          //   marginTop: 20,
          //   backgroundColor: "pink",
          width: "100%",
          // height: "100%",

          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <BasicButton
          label={"Game NFTs"}
          width={"100%"}
          height={60}
          fontSize={20}
          fontFamily={`"Amaranth", sans-serif`}
          backgroundColor={currentInfoPage === 0 ? "#071262" : "rgb(7, 11, 34)"}
          onClick={() => {
            setCurrentInfoPage(0);
          }}
        />
        <BasicButton
          label={"Roadmap"}
          width={180}
          height={60}
          fontSize={20}
          fontFamily={`"Amaranth", sans-serif`}
          // backgroundColor="rgb(7, 11, 34)"
          backgroundColor={currentInfoPage === 1 ? "#071262" : "rgb(7, 11, 34)"}
          onClick={() => {
            setCurrentInfoPage(1);
          }}
        />
        {/* <TitleSection
          titleText="Game Assets"
          height={60}
          width={"50%"}
          backgroundColor="rgb(7, 11, 34)"
        /> */}
        {/* <TitleSection
          titleText="Roadmap"
          height={60}
          width={"50%"}
          backgroundColor="rgb(7, 11, 34)"
        /> */}
      </div>
      <div
        style={{
          //   marginTop: 20,
          backgroundColor: "pink",
          width: "100%",
          // height: "100%",

          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div
          style={{
            //   marginTop: 20,
            // backgroundColor: "pink",
            width: "100%",
            // height: isMobileMode ? 750 : 400,

            display: "flex",
            flexDirection: "column",
            // flexDirection: isMobileMode ? "column-reverse" : "row",
            // flexDirection: isMobileMode ? "column-reverse" : "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {infoDatum}
        </div>
      </div>
    </div>
  );
};

export default AboutInfo;
