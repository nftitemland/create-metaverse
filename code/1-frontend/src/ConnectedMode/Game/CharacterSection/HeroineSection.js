import React from "react"; //  useEffect, useState
import { getImageUrl } from "../../../utils/getImageUrl";
// import { getPoiPoiImageUrl } from "../../../utils/getImageUrls";
// import InfiniteScroll from "react-infinite-scroll-component";
// import StakingRewardMessage from "./MessagesElements/StakingRewardMessage";
// import { getFirstDayOfWeek, pageNumberToTime } from "./local";
// import delay from "../../utils/delay";

function HeroineSection({ userData }) {
  return (
    <div
      style={{
        marginTop: 50,
        // width: "100%",
        // height: 300,,
        // backgroundColor: "green",

        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <div
        style={{
          // marginTop: 40,
          width: 320,
          height: 320,
          backgroundColor: "black",

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {userData?.character ? (
          <img
            alt={"character"}
            style={{
              width: "100%",
            }}
            src={getImageUrl({
              type: userData.character.type,
              id: userData.character.id,
            })}
            // getPoiPoiImageUrl(userData.character.id)}
          />
        ) : (
          <img
            alt="Character Placeholder"
            style={{
              width: "100%",
            }}
            src={
              "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/default_character.png"
            }
          />
        )}
      </div>
      {/* <div
        style={{
          // marginTop: 40,
          width: "100%",
          height: 70,
          backgroundColor: "blue",

          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <div
          style={{
            // marginTop: 40,
            width: "55%",
            height: "85%",
            backgroundColor: "brown",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></div>

        <div
          style={{
            // marginTop: 40,
            width: "35%",
            height: "85%",
            backgroundColor: "beige",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        ></div>
      </div> */}
    </div>
  );
}

export default HeroineSection;
