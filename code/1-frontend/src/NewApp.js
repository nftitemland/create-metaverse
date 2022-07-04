import "./NewApp.css";
import React, { useState, useEffect, Suspense } from "react";
import useDialog from "./hooks/useDialog";
import TopBar from "./TopBar";
import MiniMap2 from "./ExpansiveComponents/MiniMap2";
import FlamingoMinter from "./ExpansiveComponents/FlamingoMinter";
import FlamingoMinter2 from "./ExpansiveComponents/FlamingoMinter2";
import {
  pages,
  dialogModes,
  gameSectionModes,
  poipoiTypes,
  nftKeys,
  NULL_ADDRESS,
  NULL_USER_ID,
} from "./constants";
import {
  setCurrentGameSectionMode,
  getCurrentGameSectionMode,
} from "./utils/pageManager";
import getRecentlyBattled from "./api/getRecentlyBattled";
const Menu = React.lazy(() => import("./Menu"));
const Dialog = React.lazy(() => import("./Dialog"));
const SnackBar = React.lazy(() => import("./SnackBar"));
const ConnectedMode = React.lazy(() => import("./ConnectedMode"));
const LowerMoreInfoSection = React.lazy(() => import("./LowerMoreInfoSection"));
const LowerZSection = React.lazy(() => import("./LowerZSection"));

const SPECIAL_REFERRALS = {
  FINK: "FINK",
  MEDIUM: "MEDIUM",
  CRYPDOLLS: "CRYPDOLLS",
  PROMO: "PROMO",
  SPECIAL: "SPECIAL",
  IMAGIKA: "IMAGIKA",
  KILLER: "KILLER",
  JIMMY: "JIMMY",
};

function NewApp({
  windowWidth,
  windowHeight,
  status,
  // setStatus,
  address,
  setAddress,
  isLoading,
  setIsLoading,
  isConnected,
  setIsConnected,
  provider,
  setProvider,
  permaNoMint,
  setPermaNoMint,
  snackBarTime,
  setSnackBarTime,
  updateStatus,
  // isLoggedIn,
  // setIsLoggedIn,
  userData,
  setUserData,
  metaMaskAddress,
  setMetaMaskAddress,
  profiles,
  setProfiles,
  userDataLandClaim,
  setUserDataLandClaim,
}) {
  // const [useEffectHasBeenTrigged, setUseEffectHasBeenTrigged] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const {
    dialogMode,
    updateDialogMode,
    dialogIsClosing,
    closeDialog,
    setImageDialog,
    dialogModeImage,
  } = useDialog({ setMenuIsOpen });
  // const [dialogImageUrl, setDialogImageUrl] = useState(pages.PSEUDO_LOAD_PAGE);
  // const [dialogMode, setDialogMode] = useState(null);
  // USE DIALOG HOOK THAT ALSO CLOSES MENU ON OPEN
  const [page, setPage] = useState(pages.PSEUDO_LOAD_PAGE);
  const [nftPreviewDialogData, setNftPreviewDialogData] = useState({
    name: null,
    image: null,
    link: null,
  });
  const [selectedLandData, setSelectedLandData] = useState({
    propertyNumber: null,
    area: null,
  });
  const [gameSectionMode, rawSetGameSectionMode] = useState(
    // page gameSectionModes.BATTLE
    getCurrentGameSectionMode() || gameSectionModes.BATTLE
  );
  const [aboutInfoCurrentInfoPage, setAboutInfoCurrentInfoPage] = useState(0);
  const [aboutInfoGameAssetsPage, setAboutInfoGameAssetsPage] = useState(2);
  const [
    aboutInfoGameAssetsPoiMintAmount,
    setAboutInfoGameAssetsPoiMintAmount,
  ] = useState("1");
  const [
    aboutInfoGameAssetsLandMintAmount,
    setAboutInfoGameAssetsLandMintAmount,
  ] = useState("1");
  const [
    aboutInfoGameAssetsCharacterMintAmount,
    setAboutInfoGameAssetsCharacterMintAmount,
  ] = useState("1");
  const [mintSectionSelectedPoiPoiType, setMintSectionSelectedPoiPoiType] =
    useState(poipoiTypes.HYPER_RARE);
  const [battleProfiles, setBattleProfiles] = useState([]);
  const [battleProfilesPag, setBattleProfilesPag] = useState(null);
  const [hasBattleProfilesFirstLoaded, setHasBattleProfilesFirstLoaded] =
    useState(false);
  const [transactionIdToTransaction, setTransactionIdToTransaction] = useState(
    {}
  );
  const [transactionIdToTransactionPag, setTransactionIdToTransactionPag] =
    useState(null);
  const [characterType, setCharacterType] = useState(nftKeys.GAME_CHARACTERS);
  const [characterElements, setCharacterElements] = useState([]);
  const [characterElementsPag, characterElementsSetPag] = useState(null);
  const [gameCharacterElements, setGameCharacterElements] = useState([]);
  const [gameCharacterElementsPag, gameCharacterElementsSetPag] =
    useState(null);
  const [charactersHasFirstLoaded, setCharactersHasFirstLoaded] =
    useState(false);
  const [gameCharactersHasFirstLoaded, setGameCharactersHasFirstLoaded] =
    useState(false);
  const [charactersHasFirstLoadFinished, setCharactersHasFirstLoadFinished] =
    useState(false);
  const [
    gameCharactersHasFirstLoadFinished,
    setGameCharactersHasFirstLoadFinished,
  ] = useState(false);

  const [ultraFlaminCharactersElements, setUltraFlaminCharactersElements] =
    useState([]);
  const [
    ultraFlaminCharactersElementsPag,
    setUltraFlaminCharactersElementsPag,
  ] = useState(null);
  const [
    ultraFlaminCharactersHasFirstLoaded,
    setUltraFlaminCharactersHasFirstLoaded,
  ] = useState(false);
  const [
    ultraFlaminCharactersHasFirstLoadFinished,
    setUltraFlaminCharactersHasFirstLoadFinished,
  ] = useState(false);

  const [withdrawLevelData, setWithdrawLevelData] = useState(null);
  const [recentlyBattled, rawSetRecentlyBattled] = useState([]);

  const setRecentlyBattled = async ({ address }) => {
    const recentlyBattled = await getRecentlyBattled({ address });
    rawSetRecentlyBattled(recentlyBattled);
  };

  const setGameSectionMode = (gsm) => {
    rawSetGameSectionMode(gsm);
    setCurrentGameSectionMode(gsm);
  };

  const [discountCode, setDiscountCode] = useState("");
  const [existingDiscountCodeData, setExistingDiscountCodeData] =
    useState(null);

  useEffect(() => {
    const listenForClick = (e) => {
      if (dialogMode === dialogModes.IMAGE) {
        return;
      }

      if (dialogMode) {
        let element = e?.target;

        if (element) {
          let safeguardCounter = 0;

          if (
            typeof element?.className?.includes === "function" &&
            element?.className?.includes("RealDialogOuterMeta")
          ) {
            return;
          }

          while (element.parentNode) {
            if (safeguardCounter > 200) {
              return;
            }
            element = element.parentNode;

            if (
              typeof element?.className?.includes === "function" &&
              element?.className?.includes("RealDialogOuterMeta")
            ) {
              return;
            }

            safeguardCounter++;
          }

          closeDialog();
        }
        return;
      }

      if (selectedLandData.area || selectedLandData.propertyNumber) {
        for (const doNotCloseClassName of [
          "RealEstate_FlamingoApts",
          "RealEstate_LargeHome",
          "RealEstate_Mansion",
          "RealEstate_FlamingoHome",
        ]) {
          if (
            typeof e?.target?.className?.includes === "function" &&
            e?.target?.className?.includes(doNotCloseClassName)
          ) {
            return;
          }
        }

        let element = e?.target;

        if (element) {
          let safeguardCounter = 0;

          if (
            typeof e?.target?.className?.includes === "function" &&
            element?.className?.includes("MapInfoCard")
          ) {
            return;
          }

          while (element.parentNode) {
            if (safeguardCounter > 200) {
              return;
            }
            element = element.parentNode;

            if (
              typeof e?.target?.className?.includes === "function" &&
              element?.className?.includes("MapInfoCard")
            ) {
              return;
            }

            safeguardCounter++;
          }

          setSelectedLandData({
            propertyNumber: null,
            area: null,
          });
        }
        return;
      }

      if (menuIsOpen) {
        let element = e?.target;

        if (element) {
          let safeguardCounter = 0;

          if (
            typeof element?.className === "string" &&
            element?.className === "OuterOuterDialogOuterMeta"
          ) {
            setMenuIsOpen(false);
            return;
          }

          if (
            typeof element?.className?.includes === "function" &&
            element?.className?.includes("DialogOuterMeta")
          ) {
            return;
          }

          while (element.parentNode) {
            if (safeguardCounter > 200) {
              return;
            }
            element = element.parentNode;

            if (
              typeof element?.className?.includes === "function" &&
              element?.className?.includes("DialogOuterMeta")
            ) {
              return;
            }

            safeguardCounter++;
          }

          setMenuIsOpen(false);
        }
        return;
      }
    };

    window.addEventListener("click", listenForClick);
    //  addEventListener();

    return () => {
      window.removeEventListener("click", listenForClick);
    };

    // setUseEffectHasBeenTrigged(true);
  }, [selectedLandData, dialogMode, closeDialog, menuIsOpen]);

  useEffect(() => {
    const pathname = window.location.pathname;

    const slashSplitPathname = pathname.split("/");

    if (slashSplitPathname.length === 2) {
      const referralCode = slashSplitPathname[1].toUpperCase();
      if (slashSplitPathname[0] === "" && SPECIAL_REFERRALS[referralCode]) {
        window.history.pushState({}, "", "/");
        setDiscountCode(referralCode);
        setPage(pages.SETTINGS);
      }
    }

    if (slashSplitPathname.length === 3) {
      if (
        slashSplitPathname[0] === "" &&
        slashSplitPathname[1] === "discount" &&
        slashSplitPathname[2] &&
        slashSplitPathname[2].length < 1000
      ) {
        const referralCode = slashSplitPathname[2];

        window.history.pushState({}, "", "/");
        setDiscountCode(referralCode);
        setPage(pages.SETTINGS);
      }
    }

    const queryParams = new URLSearchParams(window.location.search);

    const discountCode =
      queryParams.get("referral") ||
      queryParams.get("referralCode") ||
      queryParams.get("discount") ||
      queryParams.get("discountCode");

    if (discountCode) {
      // window.location.search = "";
      setPage(pages.SETTINGS);
      setDiscountCode(discountCode);

      if (window?.history?.pushState) {
        var newurl =
          window.location.protocol +
          "//" +
          window.location.host +
          window.location.pathname +
          "";
        window.history.pushState({ path: newurl }, "", newurl);
      }
    }

    // if (splitPathname.length === 3) {
    //   if (
    //     splitPathname[0] === "" &&
    //     splitPathname[1] === "referral" &&
    //     splitPathname[2] &&
    //     splitPathname[2].length < 1000
    //   ) {
    //     const referralCode = splitPathname[2];

    //     setDiscountCode(referralCode);

    //     window.history.pushState({}, "NFT Item Land", "/");
    //   }
    // }
  }, []);

  const resetStateLogin = () => {
    setBattleProfiles([]);
    setBattleProfilesPag(null);
    setHasBattleProfilesFirstLoaded(false);
  };

  // const isSomeMobileMode = windowWidth < 575 || windowHeight < 575;
  const isSomeMobileMode = windowWidth < 99999 || windowHeight < 99999;
  const doNotShowApp = isSomeMobileMode && dialogMode === dialogModes.IMAGE;

  if (!userData) {
    userData = {
      username: "Demo_User",
      // artPoints: 1,
      address: NULL_ADDRESS,
      specialTag: NULL_ADDRESS,
      public: false,
      artPoints: 150,
      visibilities: {
        USERNAME: false,
        ART_POINTS: false,
        CHARACTER_PICTURE: false,
        METAVERSE_PRESENT: false,
        ADDRESS: false,
      },
      landClaimLevel: 0,
      xPosition: 0,
      yPosition: 0,
      crypDollCount: 0,
      crypDollCrystals: 0,
      customPixieCount: 0,
      customPixieCrystals: 0,
      minitablePixieJarsCount: 0,
      minitablePixieJarsCrystals: 0,
      poiPoiCount: 0,
      poiPoiCrystals: 0,
      landsCount: 0,
      landsCrystals: 0,
      ultraFlaminCount: 0,
      ultraFlaminCrystals: 0,
      fantasticFlamingoCount: 0,
      fantasticFlamingoCrystals: 0,
      lonelyFrogCount: 0,
      lonelyFrogCrystals: 0,
      cryptoChicksCount: 0,
      cryptoChicksCrystals: 0,
      hp: 1250,
      characterLevel: 1100,
      userId: NULL_USER_ID,
      // character: {
      //   type: "GAME_CHARACTERS",
      //   battleBonus: 1000,
      //   id: "0",
      // },

      character: {
        type: "GAME_CHARACTERS",
        battleBonus: 1000,
        id: "0",
      },
      battleMode: false,
      battleLoseCount: 0,
      battleWinCount: 0,
    };
  }
  if (!address) {
    address = NULL_ADDRESS;
  }

  return (
    <div className="NewApp">
      {!!userData || true ? (
        <>
          {doNotShowApp ? (
            <></>
          ) : (
            <Suspense
              fallback={
                <div
                  style={{
                    backgroundColor: "#212746",
                    width: "100%",
                    // backgroundColor: "#fcffc8",
                  }}
                />
              }
            >
              <ConnectedMode
                resetStateLogin={resetStateLogin}
                windowWidth={windowWidth}
                menuIsOpen={menuIsOpen}
                setMenuIsOpen={setMenuIsOpen}
                page={page}
                setPage={setPage}
                address={address}
                isLoading={isLoading}
                isConnected={isConnected}
                provider={provider}
                setStatus={updateStatus}
                setIsLoading={setIsLoading}
                updateDialogMode={updateDialogMode}
                userData={userData}
                setImageDialog={setImageDialog}
                dialogMode={dialogMode}
                setUserData={setUserData}
                permaNoMint={permaNoMint}
                setAddress={setAddress}
                setIsConnected={setIsConnected}
                setProvider={setProvider}
                setPermaNoMint={setPermaNoMint}
                metaMaskAddress={metaMaskAddress}
                setMetaMaskAddress={setMetaMaskAddress}
                profiles={profiles}
                setProfiles={setProfiles}
                userDataLandClaim={userDataLandClaim}
                setUserDataLandClaim={setUserDataLandClaim}
                selectedLandData={selectedLandData}
                setSelectedLandData={setSelectedLandData}
                setNftPreviewDialogData={setNftPreviewDialogData}
                windowHeight={windowHeight}
                aboutInfoCurrentInfoPage={aboutInfoCurrentInfoPage}
                gameSectionMode={gameSectionMode}
                setGameSectionMode={setGameSectionMode}
                setAboutInfoCurrentInfoPage={setAboutInfoCurrentInfoPage}
                aboutInfoGameAssetsPage={aboutInfoGameAssetsPage}
                setAboutInfoGameAssetsPage={setAboutInfoGameAssetsPage}
                aboutInfoGameAssetsLandMintAmount={
                  aboutInfoGameAssetsLandMintAmount
                }
                setAboutInfoGameAssetsLandMintAmount={
                  setAboutInfoGameAssetsLandMintAmount
                }
                aboutInfoGameAssetsPoiMintAmount={
                  aboutInfoGameAssetsPoiMintAmount
                }
                aboutInfoGameAssetsCharacterMintAmount={
                  aboutInfoGameAssetsCharacterMintAmount
                }
                setAboutInfoGameAssetsCharacterMintAmount={
                  setAboutInfoGameAssetsCharacterMintAmount
                }
                setAboutInfoGameAssetsPoiMintAmount={
                  setAboutInfoGameAssetsPoiMintAmount
                }
                mintSectionSelectedPoiPoiType={mintSectionSelectedPoiPoiType}
                setMintSectionSelectedPoiPoiType={
                  setMintSectionSelectedPoiPoiType
                }
                characterType={characterType}
                setCharacterType={setCharacterType}
                battleProfiles={battleProfiles}
                setBattleProfiles={setBattleProfiles}
                battleProfilesPag={battleProfilesPag}
                setBattleProfilesPag={setBattleProfilesPag}
                hasBattleProfilesFirstLoaded={hasBattleProfilesFirstLoaded}
                setHasBattleProfilesFirstLoaded={
                  setHasBattleProfilesFirstLoaded
                }
                transactionIdToTransaction={transactionIdToTransaction}
                setTransactionIdToTransaction={setTransactionIdToTransaction}
                transactionIdToTransactionPag={transactionIdToTransactionPag}
                setTransactionIdToTransactionPag={
                  setTransactionIdToTransactionPag
                }
                characterElements={characterElements}
                setCharacterElements={setCharacterElements}
                characterElementsPag={characterElementsPag}
                characterElementsSetPag={characterElementsSetPag}
                gameCharacterElements={gameCharacterElements}
                setGameCharacterElements={setGameCharacterElements}
                gameCharacterElementsPag={gameCharacterElementsPag}
                gameCharacterElementsSetPag={gameCharacterElementsSetPag}
                charactersHasFirstLoaded={charactersHasFirstLoaded}
                setCharactersHasFirstLoaded={setCharactersHasFirstLoaded}
                gameCharactersHasFirstLoaded={gameCharactersHasFirstLoaded}
                setGameCharactersHasFirstLoaded={
                  setGameCharactersHasFirstLoaded
                }
                charactersHasFirstLoadFinished={charactersHasFirstLoadFinished}
                setCharactersHasFirstLoadFinished={
                  setCharactersHasFirstLoadFinished
                }
                gameCharactersHasFirstLoadFinished={
                  gameCharactersHasFirstLoadFinished
                }
                setGameCharactersHasFirstLoadFinished={
                  setGameCharactersHasFirstLoadFinished
                }
                ultraFlaminCharactersElements={ultraFlaminCharactersElements}
                setUltraFlaminCharactersElements={
                  setUltraFlaminCharactersElements
                }
                ultraFlaminCharactersElementsPag={
                  ultraFlaminCharactersElementsPag
                }
                setUltraFlaminCharactersElementsPag={
                  setUltraFlaminCharactersElementsPag
                }
                ultraFlaminCharactersHasFirstLoaded={
                  ultraFlaminCharactersHasFirstLoaded
                }
                setUltraFlaminCharactersHasFirstLoaded={
                  setUltraFlaminCharactersHasFirstLoaded
                }
                ultraFlaminCharactersHasFirstLoadFinished={
                  ultraFlaminCharactersHasFirstLoadFinished
                }
                setUltraFlaminCharactersHasFirstLoadFinished={
                  setUltraFlaminCharactersHasFirstLoadFinished
                }
                withdrawLevelData={withdrawLevelData}
                setWithdrawLevelData={setWithdrawLevelData}
                recentlyBattled={recentlyBattled}
                setRecentlyBattled={setRecentlyBattled}
                discountCode={discountCode}
                setDiscountCode={setDiscountCode}
                existingDiscountCodeData={existingDiscountCodeData}
                setExistingDiscountCodeData={setExistingDiscountCodeData}
              />
            </Suspense>
          )}
        </>
      ) : (
        dialogMode !== dialogModes.IMAGE && (
          <>
            {/* <NewWorld windowWidth={windowWidth} /> */}
            <div className="TopMeta">
              <div className="TopBarMeta">
                <TopBar
                  windowWidth={windowWidth}
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
                />
              </div>
              {/* <HighlightPoiDisplay /> */}
              <div
                style={{
                  width: "100%",
                  maxWidth: 700,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: "#070b22",
                  // marginTop: 42,
                }}
              >
                <div
                  style={{
                    width: 5,
                    height: 42,
                  }}
                />
                {/* <div
                  style={{
                    width: "100%",
                    // height: 200,
                    maxWidth: 320,
                    backgroundColor: "rgb(33, 39, 70)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "98%",
                      marginTop: 10,
                      marginBottom: 10,
                      // height: 180,
                      backgroundColor: "black",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "98%",
                        marginTop: 10,
                        marginBottom: 10,

                        fontFamily: `"Tajawal", sans-serif`,
                        color: "white",
                        // height: 180,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: `"Amaranth", sans-serif`,
                        }}
                      >
                        Update Friday February 11th
                      </span>
                      {
                        <>
                          <br />
                        </>
                      }
                      Next week there will be a game assets storefront. Land
                      claim for Pixie Crystal holders is now live.
                    </div>
                  </div>
                </div> */}

                {/* <FlamingoMinter
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  isConnected={isConnected}
                  provider={provider}
                  address={address}
                  setStatus={updateStatus}
                  // status={status}
                  updateStatus={updateStatus}
                  updateDialogMode={updateDialogMode}
                  setImageDialog={setImageDialog}
                  // setStatus={setStatus}
                  // address={address}
                  setAddress={setAddress}
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
                />
                <div
                  style={{
                    width: 5,
                    height: 42,
                  }}
                /> */}
              </div>

              {/* <MidFashionStyleBar
              // status={status}
              updateStatus={updateStatus}
              // setStatus={setStatus}
              // address={address}
              setAddress={setAddress}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              isConnected={isConnected}
              setIsConnected={setIsConnected}
              // provider={provider}
              setProvider={setProvider}
              permaNoMint={permaNoMint}
              setPermaNoMint={setPermaNoMint}
              setMetaMaskAddress={setMetaMaskAddress}
            /> */}

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  // backgroundColor: windowWidth < 1000 ? "#070b22" : undefined,
                  // backgroundColor: windowWidth < 1000 ? "#070b22" : undefined,
                  marginTop: 42,
                  width: "100%",
                }}
              >
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
                  aboutInfoGameAssetsLandMintAmount={
                    aboutInfoGameAssetsLandMintAmount
                  }
                  setAboutInfoGameAssetsLandMintAmount={
                    setAboutInfoGameAssetsLandMintAmount
                  }
                  aboutInfoGameAssetsPoiMintAmount={
                    aboutInfoGameAssetsPoiMintAmount
                  }
                  setAboutInfoGameAssetsPoiMintAmount={
                    setAboutInfoGameAssetsPoiMintAmount
                  }
                  mintSectionSelectedPoiPoiType={mintSectionSelectedPoiPoiType}
                  setMintSectionSelectedPoiPoiType={
                    setMintSectionSelectedPoiPoiType
                  }
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
                />

                {/* <div
                  style={{
                    width: "100%",
                    maxWidth: 460,
                    marginTop: 50,
                    // height: 200,
                    backgroundColor: "rgb(33, 39, 70)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "98%",
                      marginTop: 10,
                      marginBottom: 10,
                      // height: 180,
                      backgroundColor: "black",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "98%",
                        marginTop: 10,
                        marginBottom: 4,
                        fontFamily: `"Amaranth", sans-serif`,

                        color: "white",
                        // height: 180,
                      }}
                    >
                      Update February 16th:
                    </div>
                    <div
                      style={{
                        width: "98%",
                        marginTop: 4,
                        marginBottom: 10,

                        fontFamily: `"Tajawal", sans-serif`,
                        color: "white",
                        // height: 180,
                      }}
                    >
                      NFT game will be ready here on March 5th.
                    </div>
                  </div>
                </div> */}

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
                    height: 42,
                  }}
                />
                <MiniMap2
                  userLandsData={userDataLandClaim?.landsData}
                  windowWidth={windowWidth}
                  windowHeight={windowHeight}
                  selectedLandData={selectedLandData}
                  setSelectedLandData={setSelectedLandData}
                  updateDialogMode={updateDialogMode}
                  setNftPreviewDialogData={setNftPreviewDialogData}
                />
                <div
                  style={{
                    width: 5,
                    height: 26,
                  }}
                />
                <FlamingoMinter
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
                  setAddress={setAddress}
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
                  // doubleAltFlamingo={true}
                  tripleAltFlamingo={true}
                />
                {/* <AirdropClaimSection
                userData={userData}
                address={address}
                userDataLandClaim={userDataLandClaim}
                setUserDataLandClaim={setUserDataLandClaim}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                updateStatus={updateStatus}
                windowWidth={windowWidth}
              /> */}
                <div
                  style={{
                    width: 5,
                    height: 42,
                  }}
                />
              </div>
            </div>
            <Suspense
              fallback={
                <div
                  style={{
                    backgroundColor: "#212746",
                    width: "100%",
                    height: 400,
                  }}
                />
              }
            >
              {/* <LowerMidMetaphoricalPalace windowWidth={windowWidth} key={"a"} /> */}
              {/* HERE */}
              {/* <div
                style={{
                  width: "100%",
                  // height: 1000,
                  paddingTop: 38,
                  paddingBottom: 5,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#212746",
                }}
              >
                <Messages setPage={setPage} />
              </div> */}
              {/* <UserProfilesDisplayCase
                profiles={profiles}
                setProfiles={setProfiles}
              /> */}
              <LowerMoreInfoSection key={"b"} />,
              <LowerZSection windowWidth={windowWidth} />
            </Suspense>
            <div
              style={{
                height: 25,
                width: 5,
              }}
            />
          </>
        )
      )}
      <Suspense fallback={<div />}>
        <Menu
          menuIsOpen={menuIsOpen}
          setMenuIsOpen={setMenuIsOpen}
          windowWidth={windowWidth}
          page={page}
          userData={userData}
          setPage={setPage}
        />
        <SnackBar
          snackBarTime={snackBarTime}
          setSnackBarTime={setSnackBarTime}
          status={status}
        />
        <Dialog
          updateStatus={updateStatus}
          nftPreviewDialogData={nftPreviewDialogData}
          closeDialog={closeDialog}
          dialogMode={dialogMode}
          dialogModeImage={dialogModeImage}
          // updateDialogMode={updateDialogMode}
          windowHeight={windowHeight}
          windowWidth={windowWidth}
          dialogIsClosing={dialogIsClosing}
          userData={userData}
          isLoading={isLoading}
          address={address}
          setIsLoading={setIsLoading}
          setUserData={setUserData}
          setProfiles={setProfiles}
          userDataLandClaim={userDataLandClaim}
          transactionIdToTransaction={transactionIdToTransaction}
          setTransactionIdToTransaction={setTransactionIdToTransaction}
          transactionIdToTransactionPag={transactionIdToTransactionPag}
          setTransactionIdToTransactionPag={setTransactionIdToTransactionPag}
          existingDiscountCodeData={existingDiscountCodeData}
          setAddress={setAddress}
          setIsConnected={setIsConnected}
          setProvider={setProvider}
          setPermaNoMint={setPermaNoMint}
          setMetaMaskAddress={setMetaMaskAddress}
        />
      </Suspense>
    </div>
  );
}

export default NewApp;
