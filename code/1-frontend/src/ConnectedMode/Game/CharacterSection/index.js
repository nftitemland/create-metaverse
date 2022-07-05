import React from "react";
import MyProfileManager from "../../MyAccountV2/MyProfileManager";
import "./CharacterSection.css";
// import TxDisplaySection from "../../ExpansiveComponents/TxDisplaySection";

// import RealPoi from "./RealPoi";
// import BattleSection from "./BattleSection";
import HeroineSection from "./HeroineSection";
import PropertyDisplayer from "./PropertyDisplayer";
import MyAccountV3 from "./MyAccountV3";

import WithdrawSection from "./WithdrawSection";
import { NULL_ADDRESS, NULL_USER_ID } from "../../../constants";

function CharacterSection({
  // updateStatus,
  // battleProfiles,
  // setBattleProfiles,
  // battleProfilesPag,
  // setBattleProfilesPag,
  // transactionIdToTransaction,
  // setTransactionIdToTransaction,
  // transactionIdToTransactionPag,
  // setTransactionIdToTransactionPag,
  address,
  userData,
  isLoading,
  setIsLoading,
  setUserData,
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
  setProfiles,
  windowWidth,
  updateStatus,
  withdrawLevelData,
  setWithdrawLevelData,
  ultraFlaminCharactersElements,
  setUltraFlaminCharactersElements,
  ultraFlaminCharactersElementsPag,
  setUltraFlaminCharactersElementsPag,
  ultraFlaminCharactersHasFirstLoaded,
  setUltraFlaminCharactersHasFirstLoaded,
  ultraFlaminCharactersHasFirstLoadFinished,
  setUltraFlaminCharactersHasFirstLoadFinished,
}) {
  const isMobileMode = windowWidth < 900;

  // console.log(`

  //     MEGA LOG: ${JSON.stringify(
  //       {
  //         gameCharacterElements: gameCharacterElements,
  //         setGameCharacterElements: !!setGameCharacterElements,
  //         gameCharacterElementsPag: gameCharacterElementsPag,
  //         gameCharacterElementsSetPag: !!gameCharacterElementsSetPag,
  //         characterElementsSetPag: !!characterElementsSetPag,
  //       },
  //       null,
  //       4
  //     )}

  // `);

  const outerDivStyle = isMobileMode
    ? {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "green",
      }
    : {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "flex-start",
        width: "100%",
        maxWidth: 1175,
        // backgroundColor: "green",
      };

  return (
    <div style={outerDivStyle}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "green",
        }}
      >
        <HeroineSection userData={userData} />
        {userData?.userId !== NULL_USER_ID && (
          <PropertyDisplayer
            userId={userData.userId}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            address={address}
            characterElements={characterElements}
            setCharacterElements={setCharacterElements}
            characterElementsPag={characterElementsPag}
            characterElementsSetPag={characterElementsSetPag}
            gameCharacterElements={gameCharacterElements}
            setGameCharacterElements={setGameCharacterElements}
            gameCharacterElementsPag={gameCharacterElementsPag}
            gameCharacterElementsSetPag={gameCharacterElementsSetPag}
            characterType={characterType}
            setCharacterType={setCharacterType}
            charactersHasFirstLoaded={charactersHasFirstLoaded}
            setCharactersHasFirstLoaded={setCharactersHasFirstLoaded}
            gameCharactersHasFirstLoaded={gameCharactersHasFirstLoaded}
            setGameCharactersHasFirstLoaded={setGameCharactersHasFirstLoaded}
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
            setUserData={setUserData}
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
          />
        )}
        <div
          style={{
            height: 40,
            width: 50,
          }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: "blue",

          // height: 300,
          width: 320,
          marginTop: 50,
        }}
      >
        <MyProfileManager
          updateStatus={updateStatus}
          userData={userData}
          isLoading={isLoading}
          address={address}
          setIsLoading={setIsLoading}
          setUserData={setUserData}
          setProfiles={setProfiles}
          displayPreviewMyProfile={false}
          displaySelectArtPointsVisibility={false}
          displaySelectCharacterPictureVisibility={true}
        />
        <MyAccountV3
          address={address}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          userData={userData}
          setUserData={setUserData}
          updateStatus={updateStatus}
        />

        {address !== NULL_ADDRESS && userData?.userId !== NULL_USER_ID && (
          <WithdrawSection
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            address={address}
            updateStatus={updateStatus}
            withdrawLevelData={withdrawLevelData}
            setWithdrawLevelData={setWithdrawLevelData}
          />
        )}

        {/* <div
            style={{
              height: 150,
              width: "100%",
              backgroundColor: "#212746",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                height: 80,
                width: "80%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: "#070b22",
                alignItems: "center",
                userSelect: "none",
              }}
            >
              <div
                style={{
                  fontFamily: `"Amaranth", sans-serif`,
                  textAlign: "center",
                  width: "100%",
                  color: "white",
                }}
              >
                {"Available Soon"}
              </div>
            </div>
          </div> */}
      </div>
    </div>
  );
}

export default CharacterSection;
