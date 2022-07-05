import React, { useState } from "react"; //  useEffect, useState
// import InfiniteScroll from "react-infinite-scroll-component";
// import StakingRewardMessage from "./MessagesElements/StakingRewardMessage";
// import { getFirstDayOfWeek, pageNumberToTime } from "./local";
// import delay from "../../utils/delay";
// import LastBattleDataSection from "./LastBattleDataSection";
import Battle from "./Battle";
import BattleProfiles from "../../../ExpansiveComponents/BattleProfiles";

// const battleSectionModes = {
//   FIND_OPPONENT: "FIND_OPPONENT",
// };

// const NavSection = ({ battleSectionMode, setBattleSectionMode }) => {
//   let buttonText = "Find Opponents";

//   const isFindOpponentMode =
//     battleSectionMode === battleSectionModes.FIND_OPPONENT;

//   if (isFindOpponentMode) {
//     buttonText = "Back";
//   }

//   return (
//     <div
//       style={{
//         // marginTop: 40,
//         width: "100%",
//         height: 100,
//         backgroundColor: "pink",

//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <div
//         style={{
//           // marginTop: 40,
//           width: 180,
//           height: 60,
//           backgroundColor: "#970000",

//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",

//           userSelect: "none",
//           cursor: "pointer",
//         }}
//         onClick={() => {
//           if (battleSectionMode === battleSectionModes.FIND_OPPONENT) {
//             setBattleSectionMode(null);
//             return;
//           }

//           setBattleSectionMode(battleSectionModes.FIND_OPPONENT);
//         }}
//       >
//         <div
//           style={{
//             // marginTop: 40,
//             width: "100%",
//             // maxHeight: "20%",
//             //   height: 55,
//             marginTop: 5,
//             // fontSize: 22,
//             color: "black",

//             textAlign: "center",
//             // fontFamily: `"Amaranth", sans-serif`,
//             fontFamily: `"Tajawal", sans-serif`,
//           }}
//         >
//           {buttonText}
//         </div>
//       </div>
//     </div>
//   );
// };

const getOne = () => {
  return 1;
};

const LobbySection = ({
  userData,
  battleSectionMode,
  setBattleSectionMode,
  windowWidth,
  updateStatus,
  isLoading,
  setIsLoading,
  setUserData,
  address,
  battleProfiles,
  setBattleProfiles,
  battleProfilesPag,
  setBattleProfilesPag,
  hasBattleProfilesFirstLoaded,
  setHasBattleProfilesFirstLoaded,
  transactionIdToTransaction,
  setTransactionIdToTransaction,
  setTransactionIdToTransactionPag,
  recentlyBattled,
  setRecentlyBattled,
}) => {
  const isMobileMode = windowWidth < 800;

  return (
    <div
      style={{
        // backgroundColor: "green",
        // height: "100%",
        width: "100%",
      }}
    >
      <div
        style={{
          // backgroundColor: "purple",
          // height: "100%",
          width: "100%",
        }}
      >
        <BattleProfiles
          isMobileMode={isMobileMode}
          mainUserId={userData.userId}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setUserData={setUserData}
          address={address}
          userData={userData}
          windowWidth={windowWidth}
          updateStatus={updateStatus}
          battleProfiles={battleProfiles}
          setBattleProfiles={setBattleProfiles}
          pag={battleProfilesPag}
          setPag={setBattleProfilesPag}
          firstLoadHasStarted={hasBattleProfilesFirstLoaded}
          setFirstLoadHasStarted={setHasBattleProfilesFirstLoaded}
          transactionIdToTransaction={transactionIdToTransaction}
          setTransactionIdToTransaction={setTransactionIdToTransaction}
          setTransactionIdToTransactionPag={setTransactionIdToTransactionPag}
          recentlyBattled={recentlyBattled}
          setRecentlyBattled={setRecentlyBattled}
        />
      </div>
      {isMobileMode && (
        <div
          style={{
            // backgroundColor: "purple",
            // height: "100%",
            width: "100%",
            height: 65,
          }}
        ></div>
      )}
      {/* <NavSection
        battleSectionMode={battleSectionMode}
        setBattleSectionMode={setBattleSectionMode}
      /> */}
      {/* <LastBattleDataSection userData={userData} /> */}
    </div>
  );
};

const BattleSectionCore = ({
  address,
  userData,
  isLoading,
  setIsLoading,
  setUserData,
  updateStatus,
  windowWidth,
  battleSectionMode,
  setBattleSectionMode,
  battleProfiles,
  setBattleProfiles,
  hasBattleProfilesFirstLoaded,
  setHasBattleProfilesFirstLoaded,
  battleProfilesPag,
  setBattleProfilesPag,
  transactionIdToTransaction,
  setTransactionIdToTransaction,
  setTransactionIdToTransactionPag,
  recentlyBattled,
  setRecentlyBattled,
}) => {
  return (
    <div
      style={{
        // marginTop: 40,
        width: "100%",
        // height: "100%",
        // backgroundColor: "peru",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* {userData.battleData && !userData.battleData.battleEnd ? ( */}
      {!getOne() ? (
        <>
          <Battle
            updateStatus={updateStatus}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            setUserData={setUserData}
            userData={userData}
            address={address}
            transactionIdToTransaction={transactionIdToTransaction}
            setTransactionIdToTransaction={setTransactionIdToTransaction}
            setTransactionIdToTransactionPag={setTransactionIdToTransactionPag}
            setRecentlyBattled={setRecentlyBattled}
          />
        </>
      ) : (
        <LobbySection
          userData={userData}
          battleSectionMode={battleSectionMode}
          updateStatus={updateStatus}
          setBattleSectionMode={setBattleSectionMode}
          windowWidth={windowWidth}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setUserData={setUserData}
          address={address}
          battleProfiles={battleProfiles}
          setBattleProfiles={setBattleProfiles}
          battleProfilesPag={battleProfilesPag}
          setBattleProfilesPag={setBattleProfilesPag}
          hasBattleProfilesFirstLoaded={hasBattleProfilesFirstLoaded}
          setHasBattleProfilesFirstLoaded={setHasBattleProfilesFirstLoaded}
          transactionIdToTransaction={transactionIdToTransaction}
          setTransactionIdToTransaction={setTransactionIdToTransaction}
          setTransactionIdToTransactionPag={setTransactionIdToTransactionPag}
          recentlyBattled={recentlyBattled}
          setRecentlyBattled={setRecentlyBattled}
        />
      )}
    </div>
  );
};

function BattleSection({
  address,
  userData,
  isLoading,
  setIsLoading,
  setUserData,
  updateStatus,
  windowWidth,
  battleProfiles,
  setBattleProfiles,
  battleProfilesPag,
  setBattleProfilesPag,
  hasBattleProfilesFirstLoaded,
  setHasBattleProfilesFirstLoaded,
  transactionIdToTransaction,
  setTransactionIdToTransaction,
  setTransactionIdToTransactionPag,
  recentlyBattled,
  setRecentlyBattled,
}) {
  const [battleSectionMode, setBattleSectionMode] = useState(null);

  return (
    <div
      style={{
        marginTop: 50,
        width: "100%",
        // maxWidth: 740,
        // height: 420,
        // backgroundColor: "green",

        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <BattleSectionCore
        address={address}
        userData={userData}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        windowWidth={windowWidth}
        updateStatus={updateStatus}
        setUserData={setUserData}
        battleSectionMode={battleSectionMode}
        setBattleSectionMode={setBattleSectionMode}
        hasBattleProfilesFirstLoaded={hasBattleProfilesFirstLoaded}
        setHasBattleProfilesFirstLoaded={setHasBattleProfilesFirstLoaded}
        battleProfiles={battleProfiles}
        setBattleProfiles={setBattleProfiles}
        battleProfilesPag={battleProfilesPag}
        setBattleProfilesPag={setBattleProfilesPag}
        transactionIdToTransaction={transactionIdToTransaction}
        setTransactionIdToTransaction={setTransactionIdToTransaction}
        setTransactionIdToTransactionPag={setTransactionIdToTransactionPag}
        recentlyBattled={recentlyBattled}
        setRecentlyBattled={setRecentlyBattled}
      />
    </div>
  );
}

export default BattleSection;

/*
{
  "poiPassTechnical": "ppt_324lkealweiwqg38469",
  "username": "Poi648ad99",
  "public": false,
  "artPoints": 92.1629064,
  "visibilities": {
      "USERNAME": true,
      "ART_POINTS": false,
      "CHARACTER_PICTURE": false,
      "METAVERSE_PRESENT": true,
      "ADDRESS": true
  },
  "landClaimLevel": 1,
  "xPosition": 0,
  "yPosition": 0,
  "crypDollCount": 0,
  "crypDollCrystals": 0,
  "customPixieCount": 0,
  "customPixieCrystals": 0,
  "minitablePixieJarsCount": 0,
  "minitablePixieJarsCrystals": 0,
  "poiPoiCount": 0,
  "poiPoiCrystals": 0,
  "landsCount": 0,
  "landsCrystals": 0,
  "ultraFlaminCount": 7,
  "ultraFlaminCrystals": 0.0042,
  "fantasticFlamingoCount": 0,
  "fantasticFlamingoCrystals": 0,
  "lonelyFrogCount": 0,
  "lonelyFrogCrystals": 0,
  "cryptoChicksCount": 0,
  "cryptoChicksCrystals": 0,
  "userId": "7a70c441-d18b-4095-b5d3-f2f8a12274fa",
  "character": null,
  "battleMode": true,
  "battleLoseCount": 4,
  "battleWinCount": 0,
  "battleData": {
      "info": {
          "isFirst": false,
          "enemyUserId": "2d41647b-5f7a-4c24-be41-b88602bebf5d",
          "battleValue": 49.10412936,
          "attack": 30.7209688,
          "hp": 92.1629064,
          "enemyHp": 491.0412936,
          "userCharacterData": {
              "selectedCharacter": null,
              "characterLevel": 0
          },
          "enemyAttack": 163.6804312,
          "enemyUserCharacterData": {
              "selectedCharacter": {
                  "type": "POIPOI",
                  "id": "30"
              },
              "characterLevel": 10
          }
      },
      "turnData": {
          "damage": 163.6804312,
          "enemyDamage": 0,
          "turn": 1,
          "isUserTurn": false
      },
      "winInfo": {
          "isWinner": false,
          "amount": -49.10412936
      }
  }
*/
