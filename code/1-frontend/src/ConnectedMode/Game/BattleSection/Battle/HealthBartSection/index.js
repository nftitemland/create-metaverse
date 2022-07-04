// import { useEffect, useState } from "react";
// import loadTransactions from "../../../../../api/loadTransactions";
// import { nftKeys, nftImages } from "../../../../../constants";
// import doBattle from "../../../../../utils/doBattle";
// import { getPoiPoiImageUrl } from "../../../../../utils/getImageUrls";
import getRoundedNumber from "../../../../../utils/getRoundedNumber";
import "./FighterSection.css";

const getHealthPercent = ({ hp, damage }) => {
  const lifeRemaining = hp - damage;

  const healthPercent = getRoundedNumber(lifeRemaining / hp);

  return healthPercent;
};

// const getHealthBarWidthClass = ({ healthPercent }) => {
//   if (healthPercent > 0.9) {
//     return "wA";
//   } else if (healthPercent > 0.8) {
//     return "wB";
//   } else if (healthPercent > 0.7) {
//     return "wC";
//   } else if (healthPercent > 0.6) {
//     return "wD";
//   } else if (healthPercent > 0.5) {
//     return "wE";
//   } else if (healthPercent > 0.4) {
//     return "wF";
//   } else if (healthPercent > 0.3) {
//     return "wG";
//   } else if (healthPercent > 0.2) {
//     return "wH";
//   } else if (healthPercent > 0.1) {
//     return "wI";
//   }
//   return "wJ";
// };

const HealthBar = ({ hp, damage, right = false }) => {
  const healthPercent = getHealthPercent({
    hp,
    damage,
  });

  const healthBarWidth = `${healthPercent * 100}%`;

  // const widthClass = getHealthBarWidthClass({
  //   healthPercent,
  // });

  return (
    <div
      style={{
        // marginTop: 40,
        width: "50%",
        maxWidth: 500,
        backgroundColor: "black",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "darkblue",
          display: "flex",
          flexDirection: "row",
          justifyContent: right ? "flex-end" : "flex-start",
          alignItems: "center",
        }}
      >
        <div
          className={`HealthBar`}
          style={{
            width: healthBarWidth,
            height: "90%",
            backgroundColor: "black",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        ></div>
      </div>
    </div>
  );
};

const HealthBarSection = ({ userData }) => {
  // const isUserTurn = getIsUserTurn({
  //   battleData: userData.battleData,
  // });

  return (
    <div
      style={{
        // marginTop: 40,
        width: "100%",
        // backgroundColor: "blue",

        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <HealthBar
        hp={userData?.battleData?.info?.hp}
        damage={userData?.battleData?.turnData?.damage}
      />
      <HealthBar
        hp={userData?.battleData?.info?.enemyHp}
        damage={userData?.battleData?.turnData?.enemyDamage}
        right={true}
      />
    </div>
  );
};

export default HealthBarSection;
