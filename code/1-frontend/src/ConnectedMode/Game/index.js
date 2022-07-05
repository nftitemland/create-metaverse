import React from "react";
import {
  dialogModes,
  gameSectionModes,
  NULL_ADDRESS,
  NULL_USER_ID,
} from "../../constants";
import BasicButton from "../../ExpansiveComponents/BasicButton";
// import { getCurrentGameSectionMode } from "../../utils/pageManager";
// import TxDisplaySection from "../../ExpansiveComponents/TxDisplaySection";

// import { ReactComponent as Diary } from "./Diary1.svg";
import MidFashionStyleBar from "../../MidFashionStyleBar";
// import LoginButton from "../../MidFashionStyleBar/LoginButton";

// import RealPoi from "./RealPoi";
import BattleSection from "./BattleSection";
// import HeroineSection from "./HeroineSection";
// import PropertyDisplayer from "./PropertyDisplayer";
import CharacterSection from "./CharacterSection";
import RealpoiFacade from "./RealpoiFacade";

// const gameSectionModes = {
//   BATTLE: "BATTLE",
//   CHARACTER_SELECT: "CHARACTER_SELECT",
// };

const SelectButton = ({
  text = "text",
  mode,
  gameSectionMode,
  setGameSectionMode,
}) => {
  return (
    <div
      style={{
        width: 120,
        height: "100%",
        backgroundColor: gameSectionMode === mode ? "blue" : "darkblue",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        userSelect: "none",
      }}
      onClick={() => {
        setGameSectionMode(mode);
      }}
    >
      <div
        style={{
          width: "100%",
          textAlign: "center",
          color: "white",
          fontFamily: `"Amaranth", sans-serif`,
        }}
      >
        {text}
      </div>
    </div>
  );
};

const SelectBar = ({ gameSectionMode, setGameSectionMode }) => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: 40,
          marginTop: 30,
          // backgroundColor: "green",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SelectButton
          text={"Battle"}
          setGameSectionMode={setGameSectionMode}
          gameSectionMode={gameSectionMode}
          mode={gameSectionModes.BATTLE}
        />
        <div
          style={{
            width: 7,
            height: 7,
          }}
        />
        <SelectButton
          text={"Profile"}
          setGameSectionMode={setGameSectionMode}
          gameSectionMode={gameSectionMode}
          mode={gameSectionModes.CHARACTER_SELECT}
        />
      </div>
    </div>
  );
};

function Game({
  permaNoMint,
  provider,
  setPage,
  setAddress,
  isConnected,
  setIsConnected,
  updateDialogMode,
  setProvider,
  setPermaNoMint,
  setMetaMaskAddress,
  // desktopMode,
  address,
  userData,
  isLoading,
  setIsLoading,
  setUserData,
  updateStatus,
  battleProfiles,
  setBattleProfiles,
  battleProfilesPag,
  setBattleProfilesPag,
  hasBattleProfilesFirstLoaded,
  setHasBattleProfilesFirstLoaded,
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
  setProfiles,
  windowWidth,
  gameSectionMode,
  setGameSectionMode,
  withdrawLevelData,
  setWithdrawLevelData,
  resetStateLogin,
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
}) {
  let notLoggedInSection = [];

  if (address === NULL_ADDRESS || userData.specialTag === NULL_ADDRESS) {
    // const desktopMode = windowWidth > 832;

    notLoggedInSection.push(
      <div
        key="abc"
        style={{
          width: "100%",
          // backgroundColor: "green",
          // height: 30,
          marginBottom: 40,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <RealpoiFacade
          updateStatus={updateStatus}
          address={address}
          userData={userData}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
          windowWidth={windowWidth}
          updateDialogMode={updateDialogMode}
        />

        <div
          style={{
            width: "100%",
            maxWidth: 720,
            height: 0,

            backgroundColor: "blue",
            marginTop: 50,
            // marginBottom: 25,
            // display: "flex",
            // flexDirection: "column",
            // justifyContent: "center",
            // alignItems: "center",
          }}
        ></div>

        <MidFashionStyleBar
          connectButtonBorderRadius={6}
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
        />
      </div>
    );
  }

  // const [hasLoadedFromLocalStorage, setHasLoadedFromLocalStorage] =
  //   useState(false);

  // useEffect(() => {
  //   if (!hasLoadedFromLocalStorage) {
  //     setHasLoadedFromLocalStorage(true);

  //     const localStorageGameSectionMode = getCurrentGameSectionMode();

  //     if (localStorageGameSectionMode) {
  //       setGameSectionMode(localStorageGameSectionMode);
  //     }
  //   }
  // }, [hasLoadedFromLocalStorage, setGameSectionMode]);

  return (
    <div
      style={{
        width: "100%",
        // backgroundColor: "green",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <div
        style={{
          marginTop: 10,
          // marginBottom: 10,
          width: 160,
          // backgroundColor: "green",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: 75,
            // backgroundColor: "green",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontFamily: `"Amaranth", sans-serif`,
              color: "white",
              textAlign: "center",
              fontSize: 18,
            }}
          >
            {"Alpha Release"}
          </div>
        </div>
      </div> */}

      <div
        style={{
          width: "100%",
          // backgroundColor: "green",
          display: "flex",
          flexDirection: windowWidth > 800 ? "row" : "column-reverse",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            // backgroundColor: "green",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              marginTop: 50,
              // marginBottom: 10,
              width: "100%",
              // backgroundColor: "green",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {notLoggedInSection}
            <div
              style={{
                // height: 95,
                borderRadius: 5,
                width: 260,
                backgroundColor: "darkblue",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  // height: 95,
                  // width: 240,
                  width: 135,
                  // backgroundColor: "teal",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    textAlign: "left",
                    marginBottom: 4,
                    fontFamily: `"Amaranth", sans-serif`,
                    color: "white",
                    // textAlign: "center",
                    fontSize: 16,
                  }}
                >
                  {`Pixie Crystals:`} <br />
                  {`${userData.artPoints}`}
                </div>
                <div
                  style={{
                    width: "100%",
                    textAlign: "left",
                    marginBottom: 4,
                    fontFamily: `"Amaranth", sans-serif`,
                    color: "white",
                    // textAlign: "center",
                    fontSize: 16,
                  }}
                >
                  {`Character Level:`} <br />
                  {`${userData.characterLevel}`}
                </div>

                <div
                  style={{
                    width: "100%",
                    textAlign: "left",
                    fontFamily: `"Amaranth", sans-serif`,
                    color: "white",
                    // textAlign: "center",
                    fontSize: 16,
                  }}
                >
                  {`User HP:`} <br />
                  {`${userData.hp}`}
                </div>
              </div>

              <div
                style={{
                  // height: 10,
                  // width: 20,
                  marginTop: 15,
                  marginBottom: 5,
                  // backgroundColor: "blue",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <BasicButton
                  fontMarginTop={7}
                  fontMarginBottom={3}
                  borderRadius={6}
                  label="Diary"
                  backgroundColor="unset"
                  color="white"
                  onClick={() => {
                    if (userData.userId === NULL_USER_ID) {
                      updateStatus("Login Required");
                    } else {
                      updateDialogMode(dialogModes.TXS);
                    }
                  }}
                  width={100}
                  height="100%"
                  fontFamily={`"Tajawal", sans-serif`}
                  flexDirection={"column"}
                  icon={
                    <div
                      style={{
                        height: 100,
                        width: 100,
                        // marginLeft: 20,
                        // marginRight: 15,
                        // backgroundColor: "blue",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          height: 69,
                          width: 69,
                          // marginLeft: 20,
                          // marginRight: 15,
                          // backgroundColor: "blue",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          alt="Diary"
                          style={{
                            width: "100%",
                          }}
                          src={
                            "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/diary_1.png"
                          }
                        ></img>
                      </div>
                    </div>
                  }
                />
              </div>
            </div>
          </div>

          <SelectBar
            gameSectionMode={gameSectionMode}
            setGameSectionMode={setGameSectionMode}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </div>

        {/* {userData.specialTag !== NULL_ADDRESS && (
          <div
            style={{
              marginTop: 20,
              marginBottom: 20,
              width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TxDisplaySection
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setUserData={setUserData}
              address={address}
              transactionIdToTransaction={transactionIdToTransaction}
              setTransactionIdToTransaction={setTransactionIdToTransaction}
              pag={transactionIdToTransactionPag}
              setPag={setTransactionIdToTransactionPag}
            />
          </div>
        )} */}
      </div>

      {gameSectionMode === gameSectionModes.CHARACTER_SELECT ? (
        <CharacterSection
          address={address}
          userData={userData}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setUserData={setUserData}
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
          setCharactersHasFirstLoadFinished={setCharactersHasFirstLoadFinished}
          gameCharactersHasFirstLoadFinished={
            gameCharactersHasFirstLoadFinished
          }
          setGameCharactersHasFirstLoadFinished={
            setGameCharactersHasFirstLoadFinished
          }
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
          setProfiles={setProfiles}
          windowWidth={windowWidth}
          updateStatus={updateStatus}
          withdrawLevelData={withdrawLevelData}
          setWithdrawLevelData={setWithdrawLevelData}
        />
      ) : (
        <div
          style={{
            width: "100%",
            // backgroundColor: "green",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {userData.address !== NULL_ADDRESS && (
            <>
              <div
                style={{
                  // backgroundColor: "green",
                  width: 200,
                  height: 40,
                }}
              />
              <div
                style={{
                  backgroundColor: "green",
                  width: "100%",
                  maxWidth: 500,
                  // height: 40,
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingRight: 4,
                  paddingLeft: 4,
                  borderRadius: 10,
                }}
              >
                <div
                  style={{
                    width: "100%",
                    textAlign: "left",
                    color: "white",
                    fontFamily: `"Tajawal", sans-serif`,
                  }}
                >
                  <b>Battle Mode V2</b> - Alpha Launch Now Live
                  <br />
                  <br />
                  Fast Action P2E Battles for Your Entertainment!!❤️❤️❤️
                </div>
              </div>
              <div
                style={{
                  // backgroundColor: "green",
                  width: 200,
                  height: 40,
                }}
              />
            </>
          )}
          <BattleSection
            address={address}
            userData={userData}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            windowWidth={windowWidth}
            setUserData={setUserData}
            updateStatus={updateStatus}
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

          <div
            style={{
              width: "100%",
              height: 25,
            }}
          ></div>
        </div>
      )}
    </div>
  );
}

export default Game;
