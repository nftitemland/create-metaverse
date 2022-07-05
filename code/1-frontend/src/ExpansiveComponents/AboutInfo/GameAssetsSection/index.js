import BasicButton from "../../BasicButton";
import TitleSection from "../../TitleSection";

import getGameAssetsData from "./getGameAssetsDatum";
import MintingSection from "./MintingSection";
import ReferralSection from "./ReferralSection";

const ModeSelectButton = ({
  setAboutInfoGameAssetsPage,
  aboutInfoGameAssetsPage,
  buttonPage,
  label,
}) => {
  const pageIsSelected = aboutInfoGameAssetsPage === buttonPage;
  return (
    <BasicButton
      label={label}
      backgroundColor={pageIsSelected ? "#4B58BE" : "rgb(7, 11, 34)"}
      color={pageIsSelected ? "white" : "white"}
      onClick={() => {
        setAboutInfoGameAssetsPage(buttonPage);
      }}
      height={60}
    />
  );
};

const HighlightMessage = ({ text }) => {
  return (
    <div
      style={{
        width: "100%",
        // height: 40,
        backgroundColor: "rgb(18, 34, 158)",

        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <div
        style={{
          // marginTop: 20,
          width: "100%",

          // marginTop: 6,
          // marginBottom: 6,
          fontSize: 16,
          borderBottomStyle: "solid",
          borderBottomWidth: 2,
          borderBottomColor: "black",
        }}
      >
        <div
          style={{
            // marginTop: 20,
            width: "100%",

            color: "white",
            fontFamily: `"Amaranth", sans-serif`,
            textAlign: "left",
            marginTop: 6,
            marginLeft: 6,
            marginBottom: 5,
            // marginBottom: 6,
            fontSize: 16,
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
};

const GameAssetsSection = ({
  isMobileMode,
  aboutInfoGameAssetsPage,
  setAboutInfoGameAssetsPage,
  aboutInfoGameAssetsLandMintAmount,
  setAboutInfoGameAssetsLandMintAmount,
  aboutInfoGameAssetsPoiMintAmount,
  setAboutInfoGameAssetsPoiMintAmount,
  aboutInfoGameAssetsCharacterMintAmount,
  setAboutInfoGameAssetsCharacterMintAmount,
  mintSectionSelectedPoiPoiType,
  setMintSectionSelectedPoiPoiType,
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
  const gameAssetsDatum = getGameAssetsData({
    aboutInfoGameAssetsPage,
    aboutInfoGameAssetsLandMintAmount,
    setAboutInfoGameAssetsLandMintAmount,
    aboutInfoGameAssetsPoiMintAmount,
    setAboutInfoGameAssetsPoiMintAmount,
    mintSectionSelectedPoiPoiType,
    setMintSectionSelectedPoiPoiType,
    aboutInfoGameAssetsCharacterMintAmount,
    setAboutInfoGameAssetsCharacterMintAmount,
  });

  return (
    <div
      style={{
        // marginTop: 20,
        backgroundColor: "#071262",
        width: "100%",
        // height: "100%",

        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <div
        style={{
          // marginTop: 20,
          // backgroundColor: "pink",
          //   width: "100%",
          height: "100%",

          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <ModeSelectButton
          label={"Gurr"}
          buttonPage={0}
          setAboutInfoGameAssetsPage={setAboutInfoGameAssetsPage}
          aboutInfoGameAssetsPage={aboutInfoGameAssetsPage}
        />
        {/* <div
          style={{
            width: 2,
            height: 2,
          }}
        />
        <ModeSelectButton
          label={"PoiPoi"}
          buttonPage={1}
          setAboutInfoGameAssetsPage={setAboutInfoGameAssetsPage}
          aboutInfoGameAssetsPage={aboutInfoGameAssetsPage}
        />
        <div
          style={{
            width: 4,
            height: 2,
          }}
        /> */}
        <ModeSelectButton
          label={"Land"}
          buttonPage={3}
          setAboutInfoGameAssetsPage={setAboutInfoGameAssetsPage}
          aboutInfoGameAssetsPage={aboutInfoGameAssetsPage}
        />
        <ModeSelectButton
          label={"Hunny"}
          buttonPage={2}
          setAboutInfoGameAssetsPage={setAboutInfoGameAssetsPage}
          aboutInfoGameAssetsPage={aboutInfoGameAssetsPage}
        />

        <div
          style={{
            width: 2,
            height: 2,
          }}
        />
        <ModeSelectButton
          label={"Basic Item"}
          buttonPage={4}
          setAboutInfoGameAssetsPage={setAboutInfoGameAssetsPage}
          aboutInfoGameAssetsPage={aboutInfoGameAssetsPage}
        />
      </div>
      <div
        style={{
          // marginTop: 20,
          backgroundColor: "black",
          // backgroundColor: "pink",
          width: "100%",
          height: isMobileMode ? 950 : "unset",

          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div
          style={{
            // marginTop: 20,
            // backgroundColor: "pink",
            width: "100%",
            // height: "100%",

            display: "flex",
            flexDirection: isMobileMode ? "column-reverse" : "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <div
            style={{
              // marginTop: 20,
              // backgroundColor: "black",
              width: 200,
              // maxWidth: "90%",
              height: isMobileMode ? "unset" : 350,

              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <div
              style={{
                // marginTop: 20,
                backgroundColor: "black",
                width: 200,
                marginTop: 60,
                // maxWidth: "90%",
                // height: isMobileMode ? 500 : 500,

                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <TitleSection
                fontSize={22}
                marginLeft={0}
                titleText={gameAssetsDatum.title}
                height={40}
                width={"100%"}
                textBoxWidth={"100%"}
                textAlign={"center"}
                backgroundColor="rgb(7, 11, 34)"
              />
              <HighlightMessage text={`${gameAssetsDatum.chain}`} />
              {gameAssetsDatum.type && (
                <HighlightMessage text={gameAssetsDatum.type} />
              )}
              {gameAssetsDatum.staking && <HighlightMessage text={"Staking"} />}
              <div
                style={{
                  // marginTop: 20,
                  // backgroundColor: "blue/",
                  width: "100%",
                  // maxWidth: "90%",
                  height: "100%",

                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    // marginTop: 20,
                    width: "90%",

                    color: "white",

                    fontFamily: `"Tajawal", sans-serif`,
                    textAlign: "left",
                    marginTop: 6,
                  }}
                >
                  {gameAssetsDatum.text}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              // marginTop: 20,
              // backgroundColor: "green",
              width: isMobileMode ? 200 : 350,
              height: isMobileMode ? 200 : 350,
              // height: 200,

              // width: 220,
              // height: 220,
              // maxWidth: "90%",
              // height: 2,50,

              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              alt={"Game Asset"}
              style={{
                width: "100%",
                marginTop: isMobileMode ? 25 : 25,
              }}
              src={gameAssetsDatum.image}
              onClick={() => {
                setImageDialog(gameAssetsDatum.image);
              }}
            ></img>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            height: 425,
          }}
        >
          <ReferralSection
            address={address}
            isMobileMode={isMobileMode}
            discountCode={discountCode}
            setDiscountCode={setDiscountCode}
            existingDiscountCodeData={existingDiscountCodeData}
            setExistingDiscountCodeData={setExistingDiscountCodeData}
            provider={provider}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setAddress={setAddress}
            setIsConnected={setIsConnected}
            setProvider={setProvider}
            setPermaNoMint={setPermaNoMint}
            setMetaMaskAddress={setMetaMaskAddress}
            updateStatus={updateStatus}
            updateDialogMode={updateDialogMode}
          />

          <MintingSection
            isMobileMode={isMobileMode}
            gameAssetsDatum={gameAssetsDatum}
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
        </div>
      </div>
    </div>
  );
};

export default GameAssetsSection;
