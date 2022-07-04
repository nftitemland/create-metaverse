import React, { useEffect } from "react";
import "./ConnectedMode.css";
import { pages } from "../constants";
import MediaBar from "./MediaBar";
// import MyAccount from "./MyAccount";
import MyAccountV2 from "./MyAccountV2";
import MintPoiPoi from "./MintPoiPoi";
import World from "./World";
import Game from "./Game";
// import Messages from "./Messages";
import Settings from "./Settings";
import { getCurrentPage } from "../utils/pageManager";

/*
  menuIsOpen={menuIsOpen}
  setMenuIsOpen={setMenuIsOpen}
*/

const PseudoLoadPage = ({ setPage }) => {
  useEffect(() => {
    const currentPage = getCurrentPage();

    setPage(currentPage || pages.GAME);
  }, [setPage]);

  return <></>;
};

const PageElement = ({
  page,
  address,
  isLoading,
  isConnected,
  provider,
  setPage,
  setStatus,
  setIsLoading,
  updateDialogMode,
  windowWidth,
  windowHeight,
  setMenuIsOpen,
  userData,
  setUserData,

  aboutInfoCurrentInfoPage,
  setAboutInfoCurrentInfoPage,
  setImageDialog,

  metaMaskAddress,
  setMetaMaskAddress,

  permaNoMint,
  setAddress,
  setIsConnected,
  setProvider,
  setPermaNoMint,
  profiles,
  setProfiles,
  userDataLandClaim,
  setUserDataLandClaim,

  gameSectionMode,
  setGameSectionMode,

  selectedLandData,
  setSelectedLandData,
  setNftPreviewDialogData,

  aboutInfoGameAssetsPage,
  setAboutInfoGameAssetsPage,
  aboutInfoGameAssetsLandMintAmount,
  setAboutInfoGameAssetsLandMintAmount,
  aboutInfoGameAssetsPoiMintAmount,
  setAboutInfoGameAssetsPoiMintAmount,
  mintSectionSelectedPoiPoiType,
  setMintSectionSelectedPoiPoiType,

  battleProfiles,
  setBattleProfiles,
  battleProfilesPag,
  setBattleProfilesPag,
  transactionIdToTransaction,
  setTransactionIdToTransaction,
  transactionIdToTransactionPag,
  setTransactionIdToTransactionPag,
  characterElements,
  setCharacterElements,
  characterElementsPag,
  characterElementsSetPag,
  gameCharacterElements,
  setGameCharacterElements,
  gameCharacterElementsPag,
  gameCharacterElementsSetPag,
  characterType,
  setCharacterType,
  charactersHasFirstLoaded,
  setCharactersHasFirstLoaded,
  gameCharactersHasFirstLoaded,
  setGameCharactersHasFirstLoaded,
  charactersHasFirstLoadFinished,
  setCharactersHasFirstLoadFinished,
  gameCharactersHasFirstLoadFinished,
  setGameCharactersHasFirstLoadFinished,
  withdrawLevelData,
  setWithdrawLevelData,
  aboutInfoGameAssetsCharacterMintAmount,
  setAboutInfoGameAssetsCharacterMintAmount,
  resetStateLogin,
  hasBattleProfilesFirstLoaded,
  setHasBattleProfilesFirstLoaded,
  ultraFlaminCharactersElements,
  setUltraFlaminCharactersElements,
  ultraFlaminCharactersElementsPag,
  setUltraFlaminCharactersElementsPag,
  ultraFlaminCharactersHasFirstLoaded,
  setUltraFlaminCharactersHasFirstLoaded,
  ultraFlaminCharactersHasFirstLoadFinished,
  setUltraFlaminCharactersHasFirstLoadFinished,
  recentlyBattled,
  setRecentlyBattled,
  discountCode,
  setDiscountCode,
  existingDiscountCodeData,
  setExistingDiscountCodeData,
}) => {
  switch (page) {
    case pages.ACCOUNT:
      // return <MyAccount address={address} />;
      return (
        <MyAccountV2
          setPage={setPage}
          address={address}
          updateStatus={setStatus}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          provider={provider}
          userData={userData}
          setUserData={setUserData}
          permaNoMint={permaNoMint}
          isConnected={isConnected}
          setAddress={setAddress}
          setIsConnected={setIsConnected}
          setProvider={setProvider}
          setPermaNoMint={setPermaNoMint}
          metaMaskAddress={metaMaskAddress}
          setMetaMaskAddress={setMetaMaskAddress}
          updateDialogMode={updateDialogMode}
          profiles={profiles}
          setProfiles={setProfiles}
          setMenuIsOpen={setMenuIsOpen}
          userDataLandClaim={userDataLandClaim}
          setUserDataLandClaim={setUserDataLandClaim}
        />
      );
    case pages.MINT:
      return (
        <MintPoiPoi
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          isConnected={isConnected}
          provider={provider}
          address={address}
          setStatus={setStatus}
          updateDialogMode={updateDialogMode}
          setMenuIsOpen={setMenuIsOpen}
          permaNoMint={permaNoMint}
          updateStatus={setStatus}
          setAddress={setAddress}
          setIsConnected={setIsConnected}
          setProvider={setProvider}
          setPermaNoMint={setPermaNoMint}
          metaMaskAddress={metaMaskAddress}
          setMetaMaskAddress={setMetaMaskAddress}
        />
      );
    case pages.GAME:
      return (
        <Game
          resetStateLogin={resetStateLogin}
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
          gameSectionMode={gameSectionMode}
          setGameSectionMode={setGameSectionMode}
          userData={userData}
          updateStatus={setStatus}
          battleProfiles={battleProfiles}
          setBattleProfiles={setBattleProfiles}
          battleProfilesPag={battleProfilesPag}
          hasBattleProfilesFirstLoaded={hasBattleProfilesFirstLoaded}
          setHasBattleProfilesFirstLoaded={setHasBattleProfilesFirstLoaded}
          setBattleProfilesPag={setBattleProfilesPag}
          transactionIdToTransaction={transactionIdToTransaction}
          setTransactionIdToTransaction={setTransactionIdToTransaction}
          transactionIdToTransactionPag={transactionIdToTransactionPag}
          setTransactionIdToTransactionPag={setTransactionIdToTransactionPag}
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
          setGameCharactersHasFirstLoaded={setGameCharactersHasFirstLoaded}
          charactersHasFirstLoadFinished={charactersHasFirstLoadFinished}
          setCharactersHasFirstLoadFinished={setCharactersHasFirstLoadFinished}
          gameCharactersHasFirstLoadFinished={
            gameCharactersHasFirstLoadFinished
          }
          setGameCharactersHasFirstLoadFinished={
            setGameCharactersHasFirstLoadFinished
          }
          characterType={characterType}
          setCharacterType={setCharacterType}
          setProfiles={setProfiles}
          windowWidth={windowWidth}
          withdrawLevelData={withdrawLevelData}
          setWithdrawLevelData={setWithdrawLevelData}
          ultraFlaminCharactersElements={ultraFlaminCharactersElements}
          setUltraFlaminCharactersElements={setUltraFlaminCharactersElements}
          ultraFlaminCharactersElementsPag={ultraFlaminCharactersElementsPag}
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
          recentlyBattled={recentlyBattled}
          setRecentlyBattled={setRecentlyBattled}
        />
      );

    case pages.WORLD:
      return (
        <World
          address={address}
          isLoading={isLoading}
          setUserData={setUserData}
          setIsLoading={setIsLoading}
          userData={userData}
          updateDialogMode={updateDialogMode}
          userDataLandClaim={userDataLandClaim}
          windowWidth={windowWidth}
          windowHeight={windowHeight}
          selectedLandData={selectedLandData}
          setSelectedLandData={setSelectedLandData}
          setNftPreviewDialogData={setNftPreviewDialogData}
          updateStatus={setStatus}
          setUserDataLandClaim={setUserDataLandClaim}
        />
      );

    // case pages.MESSAGES:
    //   return (
    //     <Messages
    //       address={address}
    //       userData={userData}
    //       isLoading={isLoading}
    //       setIsLoading={setIsLoading}
    //       setPage={setPage}
    //     />
    //   );

    case pages.SETTINGS:
      return (
        <Settings
          userData={userData}
          setMenuIsOpen={setMenuIsOpen}
          windowWidth={windowWidth}
          resetStateLogin={resetStateLogin}
          updateDialogMode={updateDialogMode}
          address={address}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
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
          setUserData={setUserData}
          setPage={setPage}
          windowHeight={windowHeight}
          aboutInfoCurrentInfoPage={aboutInfoCurrentInfoPage}
          setAboutInfoCurrentInfoPage={setAboutInfoCurrentInfoPage}
          setImageDialog={setImageDialog}
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
          discountCode={discountCode}
          setDiscountCode={setDiscountCode}
          existingDiscountCodeData={existingDiscountCodeData}
          setExistingDiscountCodeData={setExistingDiscountCodeData}
        />
      );
    default:
      return <PseudoLoadPage setPage={setPage} />;
  }
};

function ConnectedMode({
  menuIsOpen,
  setMenuIsOpen,
  page,
  setPage,
  address,
  isLoading,
  isConnected,
  provider,
  setStatus,
  setIsLoading,
  updateDialogMode,
  windowWidth,
  windowHeight,
  userData,
  setUserData,
  permaNoMint,
  setAddress,
  setIsConnected,
  setProvider,
  setPermaNoMint,
  metaMaskAddress,
  setMetaMaskAddress,
  profiles,
  setProfiles,
  userDataLandClaim,
  setUserDataLandClaim,
  selectedLandData,
  setSelectedLandData,
  setNftPreviewDialogData,
  aboutInfoCurrentInfoPage,
  setAboutInfoCurrentInfoPage,
  setImageDialog,
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
  battleProfiles,
  setBattleProfiles,
  battleProfilesPag,
  setBattleProfilesPag,
  transactionIdToTransaction,
  setTransactionIdToTransaction,
  transactionIdToTransactionPag,
  setTransactionIdToTransactionPag,
  characterElements,
  setCharacterElements,
  characterElementsPag,
  characterElementsSetPag,
  gameCharacterElements,
  setGameCharacterElements,
  gameCharacterElementsPag,
  gameCharacterElementsSetPag,
  charactersHasFirstLoaded,
  setCharactersHasFirstLoaded,
  gameCharactersHasFirstLoaded,
  setGameCharactersHasFirstLoaded,
  characterType,
  setCharacterType,
  gameSectionMode,
  setGameSectionMode,
  withdrawLevelData,
  setWithdrawLevelData,
  charactersHasFirstLoadFinished,
  setCharactersHasFirstLoadFinished,
  gameCharactersHasFirstLoadFinished,
  setGameCharactersHasFirstLoadFinished,
  resetStateLogin,
  hasBattleProfilesFirstLoaded,
  setHasBattleProfilesFirstLoaded,
  ultraFlaminCharactersElements,
  setUltraFlaminCharactersElements,
  ultraFlaminCharactersElementsPag,
  setUltraFlaminCharactersElementsPag,
  ultraFlaminCharactersHasFirstLoaded,
  setUltraFlaminCharactersHasFirstLoaded,
  ultraFlaminCharactersHasFirstLoadFinished,
  setUltraFlaminCharactersHasFirstLoadFinished,
  recentlyBattled,
  setRecentlyBattled,

  discountCode,
  setDiscountCode,
  existingDiscountCodeData,
  setExistingDiscountCodeData,
}) {
  return (
    <div className="ConnectedMode">
      <MediaBar
        menuIsOpen={menuIsOpen}
        setMenuIsOpen={setMenuIsOpen}
        page={page}
      />
      <PageElement
        page={page}
        setPage={setPage}
        address={address}
        isLoading={isLoading}
        isConnected={isConnected}
        provider={provider}
        setStatus={setStatus}
        setIsLoading={setIsLoading}
        updateDialogMode={updateDialogMode}
        windowWidth={windowWidth}
        setMenuIsOpen={setMenuIsOpen}
        userData={userData}
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
        setAboutInfoCurrentInfoPage={setAboutInfoCurrentInfoPage}
        setImageDialog={setImageDialog}
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
        battleProfiles={battleProfiles}
        setBattleProfiles={setBattleProfiles}
        battleProfilesPag={battleProfilesPag}
        setBattleProfilesPag={setBattleProfilesPag}
        transactionIdToTransaction={transactionIdToTransaction}
        setTransactionIdToTransaction={setTransactionIdToTransaction}
        transactionIdToTransactionPag={transactionIdToTransactionPag}
        setTransactionIdToTransactionPag={setTransactionIdToTransactionPag}
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
        setGameCharactersHasFirstLoaded={setGameCharactersHasFirstLoaded}
        gameSectionMode={gameSectionMode}
        setGameSectionMode={setGameSectionMode}
        withdrawLevelData={withdrawLevelData}
        setWithdrawLevelData={setWithdrawLevelData}
        aboutInfoGameAssetsCharacterMintAmount={
          aboutInfoGameAssetsCharacterMintAmount
        }
        setAboutInfoGameAssetsCharacterMintAmount={
          setAboutInfoGameAssetsCharacterMintAmount
        }
        characterType={characterType}
        setCharacterType={setCharacterType}
        charactersHasFirstLoadFinished={charactersHasFirstLoadFinished}
        setCharactersHasFirstLoadFinished={setCharactersHasFirstLoadFinished}
        gameCharactersHasFirstLoadFinished={gameCharactersHasFirstLoadFinished}
        setGameCharactersHasFirstLoadFinished={
          setGameCharactersHasFirstLoadFinished
        }
        resetStateLogin={resetStateLogin}
        hasBattleProfilesFirstLoaded={hasBattleProfilesFirstLoaded}
        setHasBattleProfilesFirstLoaded={setHasBattleProfilesFirstLoaded}
        ultraFlaminCharactersElements={ultraFlaminCharactersElements}
        setUltraFlaminCharactersElements={setUltraFlaminCharactersElements}
        ultraFlaminCharactersElementsPag={ultraFlaminCharactersElementsPag}
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
        recentlyBattled={recentlyBattled}
        setRecentlyBattled={setRecentlyBattled}
        discountCode={discountCode}
        setDiscountCode={setDiscountCode}
        existingDiscountCodeData={existingDiscountCodeData}
        setExistingDiscountCodeData={setExistingDiscountCodeData}
      />
    </div>
  );
}

export default ConnectedMode;
