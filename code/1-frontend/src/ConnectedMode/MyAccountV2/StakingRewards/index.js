// import PublicProfilePreview from "./PublicProfilePreview";
// import VisibilitySelectors from "./VisibilitySelectors";
// import axios from "axios";
// import { getNTokenData } from "../../../utils/nToken";
// import refreshUserData from "../../../api/refreshUserData";
// import refreshProfiles from "../../../api/refreshProfiles";

import { useState, useEffect } from "react";
import MultiContentBoxMeta from "../../../ExpansiveComponents/MultiContentBox";

import TitleSection from "../../../ExpansiveComponents/TitleSection";
import { getNTokenData } from "../../../utils/nToken";
import restart from "../../../utils/restart";

import loadStakingRewards from "./loadStakingRewards";

const RewardsInfoGroup = ({ text1, text2 }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        // height: 30,
        // backgroundColor: "black",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          height: 25,
          backgroundColor: "black",
        }}
      >
        <div
          style={{
            fontFamily: `"Tajawal", sans-serif`,
            width: "96%",
            marginTop: 4,
            // height: 30,
            // backgroundColor: "black",
            color: "white",
          }}
        >
          {text1}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          height: 25,
          backgroundColor: "#4d536e",
        }}
      >
        <div
          style={{
            fontFamily: `"Tajawal", sans-serif`,
            width: "96%",
            marginTop: 4,
            // height: 30,
            // backgroundColor: "black",
            color: "white",
          }}
        >
          {text2}
        </div>
      </div>
    </div>
  );
};

const NftSection = ({ name, text1, text2, text3, text4, imageLink }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        flexDirection: "row",
        width: "96%",
        height: 130,
        // backgroundColor: "green",
        marginTop: 10,
        marginBottom: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: 120,
          borderRadius: 5,
          // height: 120,
          // backgroundColor: "blue",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            width: 75,
            height: 75,
            borderRadius: 5,
            backgroundColor: "black",
          }}
        >
          <img
            alt="NFT Item Land Custom PJ"
            src={
              imageLink ||
              "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/pixies/PJNFTItemlandZoomedIn.jpeg"
            }
            style={{
              width: "100%",
              borderRadius: 5,
            }}
          />
        </div>
        <div
          style={{
            width: 5,
            height: 7,
            // backgroundColor: "pink",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexDirection: "row",
            width: "100%",
            height: 30,
            backgroundColor: "black",
          }}
        >
          <div
            style={{
              width: "96%",
              fontFamily: `"Tajawal", sans-serif`,
              // height: 30,
              // backgroundColor: "white",
              textAlign: "center",
              color: "white",
              marginTop: 5,
            }}
          >
            {name || "Custom Pixies"}
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: 140,
          // height: 100,
          backgroundColor: "blanchedalmond",
        }}
      >
        <RewardsInfoGroup text1={text1} text2={text2} />
        <RewardsInfoGroup text1={text3} text2={text4} />
      </div>
    </div>
  );
};

const StakingRewards = ({ userData, address }) => {
  const [isHoveredOverInfo, setIsHoveredOverInfo] = useState(false);
  // const setProfileVisibilityButtonIsDisabled = isLoading;

  useEffect(() => {
    const nTokenData = getNTokenData();

    if (!nTokenData) {
      restart();
    }
  }, []);

  // const profileIsPublic = userData.public;

  // const setPublicIsDisabled =
  //   setProfileVisibilityButtonIsDisabled || profileIsPublic;
  // const setPrivateIsDisabled =
  //   setProfileVisibilityButtonIsDisabled || !profileIsPublic;

  return (
    <div
      style={{
        marginTop: 35,
        marginBottom: 25,
        maxWidth: 320,
        width: "100%",
        // height: 100,
        backgroundColor: "#212746",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <TitleSection titleText={"Staking"} height={60} width={"100%"} />

      {/* <div
        style={{
          width: "100%",
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
              marginBottom: 10,

              fontFamily: `"Tajawal", sans-serif`,
              color: "white",
              // height: 180,
            }}
          >
            Update February 5th: For a better and more consistent user
            experience, staking rewards will be distributed once a day in the
            morning EST.
          </div>
        </div>
      </div> */}

      <NftSection
        name={"Ether Gurrs"}
        text1={"Staking Rewards"}
        text2={`${userData.poiPoiCrystals}`}
        text3={"Gurr Count"}
        text4={`${userData.poiPoiCount}`}
        imageLink={
          "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/slime_30.png"
        }
      />

      <NftSection
        name={"Lands"}
        text1={"Staking Rewards"}
        text2={`${userData.landsCrystals}`}
        text3={"Last Land Count"}
        text4={`${userData.landsCount}`}
        imageLink={
          "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/land-images/higher_realms1.png"
        }
      />

      <NftSection
        name={"Basic Item"}
        text1={"Staking Rewards"}
        text2={`${userData.ultraFlaminCrystals}`}
        // text3={"Poi/Flamingo"}
        text3={"Item Count"}
        text4={`${userData.ultraFlaminCount}`}
        imageLink={
          "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/sword_1.png"
        }
      />

      {/* <NftSection
        name={"Crypto Chicks"}
        text1={"Staking Rewards"}
        text2={userData.cryptoChicksCrystals}
        text3={"Last Chick Count"}
        text4={userData.cryptoChicksCount}
        imageLink={
          "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/cc7675.png"
        }
      />

      <NftSection
        name={"Lonely Frog"}
        text1={"Staking Rewards"}
        text2={`${userData.lonelyFrogCrystals}`}
        text3={"Last Frog Count"}
        text4={`${userData.lonelyFrogCount}`}
        imageLink={
          "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/lonely1253.png"
        }
      />
      <NftSection
        name={"Flamingo"}
        text1={"Staking Rewards"}
        text2={`${userData.fantasticFlamingoCrystals}`}
        text3={"Last Flamingo Count"}
        text4={`${userData.fantasticFlamingoCount}`}
        imageLink={
          "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/flamin/1113.png"
        }
      />
      <NftSection
        name={"PJs"}
        text1={"Staking Rewards"}
        text2={`${userData.minitablePixieJarsCrystals}`}
        text3={"Last PJ Count"}
        text4={`${userData.minitablePixieJarsCount}`}
        imageLink={
          "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/PJ.png"
        }
      />
      <NftSection
        name={"Custom PJs"}
        text1={"Staking Rewards"}
        text2={`${userData.customPixieCrystals}`}
        text3={"Last PJ Count"}
        text4={`${userData.customPixieCount}`}
        imageLink={
          "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/PJcustom.png"
        }
      />
      <NftSection
        name={"CDolls"}
        text1={"Staking Rewards"}
        text2={`${userData.crypDollCrystals}`}
        text3={"Last CDoll Count"}
        text4={`${userData.crypDollCount}`}
        imageLink={
          "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/CDoll.png"
        }
      /> */}

      <MultiContentBoxMeta
        address={address}
        loadMessages={loadStakingRewards}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          flexDirection: "column",
          width: "100%",
          // height: 50,
          backgroundColor: "black",
          userSelect: "none",
        }}
        onClick={() => {
          setIsHoveredOverInfo(!isHoveredOverInfo);
        }}
      >
        <div
          style={{
            fontFamily: `"Tajawal", sans-serif`,
            width: "96%",
            marginTop: 7,
            marginBottom: 7,
            height: 70,
            // backgroundColor: "black",
            color: "white",
          }}
        >
          {isHoveredOverInfo ? (
            <>
              Info: Staking rewards are distributed daily automatically. After
              first login, your rewards and your Pixie count will appear within
              one day.
            </>
          ) : (
            "Info >"
          )}
        </div>
      </div>
    </div>
  );
};

export default StakingRewards;
/*
section for each type
  DATA: total earned by type
  DATA: current number
*/
