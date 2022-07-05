import React from "react"; //  useEffect, useState
// import { getNTokenData } from "../../utils/nToken";

const nftNameToDisplayData = {
  CUSTOM_PIXIES: {
    displayName: "Custom PJs",
    unit: "PJ",
    pluralUnit: "PJs",
  },
  CRYPDOLLS: {
    displayName: "CDolls",
    unit: "CDoll",
    pluralUnit: "CDolls",
  },

  PIXIEJARS: {
    displayName: "PJs",
    unit: "PJ",
    pluralUnit: "PJs",
  },

  LONELY_FROG_LAMBO_CLUB: {
    displayName: "Lonely Frog Lambo Club",
    unit: "Frog",
    pluralUnit: "Frogs",
  },

  LANDS: {
    displayName: "NFT Item Lands",
    unit: "Land",
    pluralUnit: "Lands",
  },

  FANTASTIC_FLAMINS: {
    displayName: "Fantastic Flamingos",
    unit: "Flamingo",
    pluralUnit: "Flamingos",
  },

  ULTRA_FLAMINS: {
    displayName: "Ultra Flamingos",
    unit: "Flamingo",
    pluralUnit: "Flamingos",
  },

  POIPOI: {
    displayName: "NFT Item Ethereum",
    unit: "NFT",
    pluralUnit: "NFTs",
  },

  CRYPTO_CHICKS: {
    displayName: "Crypto Chicks",
    unit: "Chick",
    pluralUnit: "Chicks",
  },
};

//       MEGA LOG: {
//     "stakingDatum": {
//         "id": "a51b2a7f-c446-41e6-9c29-8aa65bd4749a",
//         "time": 1642951853961,
//         "value": {
//             "name": "CUSTOM_PIXIES",
//             "nftCount": 1,
//             "pixieCrystals": 1
//         }
//     }
// }

const getToMinuteTimeString = (time) => {
  const toMinuteTimesString = new Date(time).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (toMinuteTimesString.startsWith("0")) {
    const modToMinuteTimesString = toMinuteTimesString.substring(1);
    return modToMinuteTimesString;
  }
  return toMinuteTimesString;
};

function StakingRewardMessage({ stakingDatum }) {
  const displayData = nftNameToDisplayData[stakingDatum?.value?.name];

  if (!displayData) {
    return null;
  }

  const toMinuteTimeString = getToMinuteTimeString(stakingDatum.time);

  return (
    <div
      style={{
        width: "100%",
        // height: 80,
        // fontFamily: `"Tajawal", sans-serif`,
        backgroundColor: "black",
        // borderTopStyle: "solid",
        // borderBottomStyle: "solid",
        // borderWidth: 3,
        // borderColor: "black",                display: "flex",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "92%",
          height: 28,
          fontFamily: `"Tajawal", sans-serif`,
          // backgroundColor: "teal",

          color: "white",

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: "100%",
            // height: 30,
            fontFamily: `"Tajawal", sans-serif`,
            // backgroundColor: "teal",
            color: "white",
            marginTop: 5,
            // borderTopStyle: "solid",
            // borderBottomStyle: "solid",
            // borderWidth: 3,
            // borderColor: "black",
          }}
        >
          {displayData.displayName}
        </div>
      </div>
      <div
        style={{
          width: "93%",
          height: 1,
          backgroundColor: "white",
        }}
      />
      <div
        style={{
          width: "92%",
          height: 25,
          fontFamily: `"Tajawal", sans-serif`,
          // backgroundColor: "teal",
          color: "white",
          // marginTop: 3,
          marginTop: 5,
          fontSize: 14,
          // borderTopStyle: "solid",
          // borderBottomStyle: "solid",
          // borderWidth: 3,
          // borderColor: "black",
        }}
      >
        <span style={{ fontSize: 16 }}>
          {`${new Date(stakingDatum.time).toDateString()}`}
        </span>
         {`${toMinuteTimeString}`}
      </div>

      <div
        style={{
          width: "92%",
          height: 30,
          // backgroundColor: "brown",

          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <div
          style={{
            height: "100%",
            // width: 50,
            // backgroundColor: "pink",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "100%",
              // width: 20,
              // marginLeft: 15,
              marginRight: 10,
              backgroundColor: "black",

              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                // width: "100%",
                textAlign: "left",
                // height: 30,
                fontFamily: `"Tajawal", sans-serif`,
                // backgroundColor: "teal",
                color: "white",
                marginTop: 3,
                // marginLeft: 6,
                marginRight: 4,
                fontSize: 16,
                // borderTopStyle: "solid",
                // borderBottomStyle: "solid",
                // borderWidth: 3,
                // borderColor: "black",
              }}
            >
              {`${stakingDatum.value.nftCount} ${
                stakingDatum.value.nftCount > 1
                  ? displayData.pluralUnit
                  : displayData.unit
              }`}
            </div>
          </div>
        </div>
        <div
          style={{
            height: "65%",
            width: 2,
            backgroundColor: "white",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        />
        <div
          style={{
            height: "100%",
            // width: 50,
            // backgroundColor: "pink",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              height: "100%",
              // width: 20,
              marginLeft: 8,
              // marginRight: 15,

              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div
              style={{
                height: "100%",
                // width: 20,
                marginLeft: 5,
                // marginRight: 15,
                // backgroundColor: "peru",

                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 0,
                  height: 0,
                  marginBottom: 2,
                  borderStyle: "solid",
                  borderWidth: "0 9px 14px 9px",
                  borderColor: `transparent transparent #1B8E2D transparent`,
                }}
              ></div>
              <div
                style={{
                  // width: "100%",
                  textAlign: "center",
                  // height: 30,
                  fontFamily: `"Tajawal", sans-serif`,
                  // backgroundColor: "teal",
                  color: "white",
                  marginTop: 3,
                  marginLeft: 6,
                  fontSize: 16,
                  marginRight: 6,
                  // borderTopStyle: "solid",
                  // borderBottomStyle: "solid",
                  // borderWidth: 3,
                  // borderColor: "black",
                }}
              >
                {`${stakingDatum.value.pixieCrystals} Pixie Crystals`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StakingRewardMessage;
