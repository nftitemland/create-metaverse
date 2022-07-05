// import React, { Suspense } from "react";
import "./TopBar.css";
// import { ReactComponent as BasisPoiV2 } from "./BasisPoiV2.svg";
import { ReactComponent as ElectricPotentialHeart } from "./ElectricPotentialHeart6.svg";

// import { useState } from "react";

// import init from "./init";
// import mintSlime from "./MintPoiPoiSection/mintSlime";

function LeftSection({ desktopMode }) {
  const { cnLeftSection } = desktopMode
    ? {
        cnLeftSection: "LeftSection Mobile",
      }
    : {
        cnLeftSection: "LeftSection",
      };

  return (
    <div className={cnLeftSection}>
      <ElectricPotentialHeart
        style={{
          width: 54,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          marginBottom: 11.5,
        }}
      >
        <div className="TitleText">
          {
            <span
              style={{
                color: "#E4609E",
              }}
            >
              {"nft"}
            </span>
          }
          {
            <span
              style={{
                color: "white",
              }}
            >
              {"item"}
            </span>
          }
          {
            <span
              style={{
                color: "#75EBDF",
              }}
            >
              {"land"}
            </span>
          }
        </div>
        {/* <div
          style={{
            fontFamily: `"Tajawal", sans-serif`,
            color: "white",
            // width: "100%",
            textAlign: "left",
            marginLeft: 10,
          }}
        >
          Formerly nftitem.net
        </div> */}
      </div>
    </div>
  );
}

export default LeftSection;
