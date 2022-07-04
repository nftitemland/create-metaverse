import React, { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { NULL_ADDRESS, NULL_USER_ID } from "../../constants";
import offlineBattleProfiles from "./offlineBattleProfiles";
// import refreshProfiles from "../../api/refreshProfiles";
// import delay from "../../utils/delay";

import BattleProfile from "../BattleProfile";
import loadBattleProfiles from "./loadBattleProfiles";

const ROW_MARGIN_TOP = 54;

function BattleProfiles({
  isMobileMode,
  mainUserId,
  marginTop = 0,
  windowWidth,
  // profiles,
  // setProfiles,
  height = "unset",
  backgroundColor = "black",

  setIsLoading,
  isLoading,
  setUserData,
  address,
  updateStatus,
  battleProfiles,
  setBattleProfiles,
  pag,
  setPag,
  transactionIdToTransaction,
  setTransactionIdToTransaction,
  setTransactionIdToTransactionPag,
  firstLoadHasStarted,
  setFirstLoadHasStarted,

  recentlyBattled,
  setRecentlyBattled,
}) {
  // const [firstLoadHasStarted, setFirstLoadHasStarted] = useState(false);
  // const [battleProfiles, setBattleProfiles] = useState([]);
  // const [pag, setPag] = useState(null);

  useEffect(() => {
    if (battleProfiles.length > 0) {
      setFirstLoadHasStarted(true);
      return;
    }

    if (!firstLoadHasStarted) {
      setFirstLoadHasStarted(true);

      if (address === NULL_ADDRESS || mainUserId === NULL_USER_ID) {
        const response = {
          response: {
            data: {
              profiles: offlineBattleProfiles,
            },
          },
        };

        setBattleProfiles(response.response.data.profiles);
        return;
      }

      new Promise(async (resolve) => {
        const response = await loadBattleProfiles({
          address,
        });

        if (response.response) {
          setBattleProfiles(response.response.data.profiles);
          if (response.response.data.pag) {
            setPag(response.response.data.pag);
          }
        }

        await setRecentlyBattled({
          address,
        });

        resolve();
      });
    }
  }, [
    setFirstLoadHasStarted,
    firstLoadHasStarted,
    address,
    setBattleProfiles,
    setPag,
    battleProfiles,
    mainUserId,
    setRecentlyBattled,
  ]);

  battleProfiles.sort((a, b) => {
    // return b.hp - a.hp;
    return b.hp - a.hp;
  });

  const ogProfileElements = battleProfiles.map((profile, index) => {
    let nextPlayTime = null;

    for (const enemyDatum of recentlyBattled) {
      if (enemyDatum.enemyUserId === profile.userId) {
        if (enemyDatum.nextPlayTime > Date.now()) {
          nextPlayTime = enemyDatum.nextPlayTime;
        }
      }
    }

    return (
      <BattleProfile
        windowWidth={windowWidth}
        mainUserId={mainUserId}
        updateStatus={updateStatus}
        mainUserAddress={address}
        key={`${profile.username}-${index}`}
        username={profile.username}
        address={profile.address}
        artPoints={profile.artPoints}
        flipImage={profile.flipImage}
        hp={profile.hp}
        userId={profile.userId}
        character={profile.character}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        setUserData={setUserData}
        transactionIdToTransaction={transactionIdToTransaction}
        setTransactionIdToTransaction={setTransactionIdToTransaction}
        setTransactionIdToTransactionPag={setTransactionIdToTransactionPag}
        nextPlayTime={nextPlayTime}
        setRecentlyBattled={setRecentlyBattled}
      />
    );
  });

  const profileElements = [];

  const isFive = ogProfileElements.length === 5;

  if (windowWidth > 1400) {
    if (isFive) {
      profileElements.push(
        <div
          key={`1new`}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",

            marginTop: "unset",
          }}
        >
          {ogProfileElements[0]}
          <div
            style={{
              width: 100,
              height: 45,
              // display: "flex",
              // flexDirection: "row",
              // justifyContent: "center",

              // marginTop: "unset",
            }}
          ></div>
          {ogProfileElements[1]}
          {/* {ogProfileElements[i + 2]} */}
        </div>,
        <div
          key={`2new`}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",

            marginTop: ROW_MARGIN_TOP,
          }}
        >
          {ogProfileElements[2]}
          {ogProfileElements[3]}
          {ogProfileElements[4]}
        </div>
      );
    } else {
      for (let i = 0; i < ogProfileElements.length; i = i + 3) {
        profileElements.push(
          <div
            key={`${i}new`}
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",

              marginTop: i === 0 ? "unset" : ROW_MARGIN_TOP,
            }}
          >
            {ogProfileElements[i]}
            {ogProfileElements[i + 1]}
            {ogProfileElements[i + 2]}
          </div>
        );
      }
    }
  } else if (windowWidth > 920) {
    for (let i = 0; i < ogProfileElements.length; i = i + 2) {
      profileElements.push(
        <div
          key={`${i}new`}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",

            marginTop: i === 0 ? "unset" : ROW_MARGIN_TOP,
          }}
        >
          {ogProfileElements[i]}
          {ogProfileElements[i + 1]}
        </div>
      );
    }
  } else {
    for (let i = 0; i < ogProfileElements.length; i++) {
      profileElements.push(
        <div
          key={`${i}new`}
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: i === 0 ? "unset" : ROW_MARGIN_TOP,
          }}
        >
          {ogProfileElements[i]}
        </div>
      );
    }
  }

  // const profilesBoxHeight = isProductionMode
  //   ? isMobileMode
  //     ? 500
  //     : mainUserId === NULL_USER_ID
  //     ? 1150
  //     : 600
  //   : isMobileMode
  //   ? 200
  //   : mainUserId === NULL_USER_ID
  //   ? 1150
  //   : 600;

  return (
    <div
      style={{
        height,
        // backgroundColor: isMobileMode ? "rgb(8 10 34)" : backgroundColor,
        // backgroundColor,

        width: "100%",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        // alignItems: isMobileMode ? "flex-start" : "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          marginTop,
          width: "100%",
          // backgroundColor: "pink",
          maxWidth: "90%",
          // maxWidth: 1080,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "50px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            alignItems: "flex-start",
            backgroundColor: "black",
          }}
        >
          <div
            style={{
              // width: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",

              marginLeft: "7px",
              marginBottom: "7px",
            }}
          >
            <div
              style={{
                fontFamily: `"Amaranth", sans-serif`,
                textAlign: "center",
                fontSize: "24px",
                color: "white",
              }}
            >
              {"Battle Profiles"}
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            // height: profilesBoxHeight,
            // backgroundColor: "#4d536e",
            // width: "100%",
            // overflowY: "scroll",
            // overflowX: "clip",
          }}
        >
          <InfiniteScroll
            scrollableTarget={"MessageTrack"}
            dataLength={profileElements.length}
            next={async () => {
              const response = await loadBattleProfiles({
                address,
                pag,
              });

              if (response.response) {
                const newBattleProfiles = battleProfiles.concat(
                  response.response.data.profiles
                );

                setBattleProfiles(newBattleProfiles);
                if (response.response.data.pag) {
                  setPag(response.response.data.pag);
                } else {
                  setPag(null);
                }
              }
            }}
            // inverse={true}
            // style={{ display: "flex", flexDirection: "column-reverse" }}
            hasMore={!!pag}
            loader={
              <h4
                style={{
                  fontFamily: `"Tajawal", sans-serif`,
                  marginLeft: 20,
                }}
              >
                ...
              </h4>
            }
            // height={profilesBoxHeight}
            style={{
              width: "100%",
              // touchAction: "pan-y",
              // overflowY: "scroll",
              // maxWidth: "90%",

              // display: "flex",
              // flexDirection: "column",
              // justifyContent: "",
              // backgroundColor: "black",
              // overflowY: "hidden",
            }}
            initialScrollY={0}
            endMessage={
              <p
                style={{
                  textAlign: "center",
                  fontFamily: `"Tajawal", sans-serif`,
                }}
              >
                <b>- - -</b>
              </p>
            }
          >
            {profileElements}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}

export default BattleProfiles;
