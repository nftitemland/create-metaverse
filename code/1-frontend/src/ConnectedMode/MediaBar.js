import React from "react";
// import { ReactComponent as BasisPoi40V1 } from "./BasisPoi40V1.svg";
// import { ReactComponent as SButton } from "./SButton.svg";
// import { ReactComponent as SButtonOpen } from "./SButtonOpen.svg";
// import { ReactComponent as ElectricHeart } from "../../src/TopBar/ElectricPotentialHeart6.svg";
// import { ReactComponent as ElectricHeart } from "./ElectricPotentialHeartAlt2.svg";
import { pages } from "../constants";
import "./MediaBar.css";

const getPageName = (page) => {
  switch (page) {
    case pages.ACCOUNT:
      return "Staking";
    case pages.MINT:
      return "NFT Item";
    case pages.SETTINGS:
      return "NFT Item Land";
    default:
      return "Game";
  }
};

function ConnectedMode({ menuIsOpen, setMenuIsOpen, page }) {
  const pageName = getPageName(page);

  return (
    <div className="MediaBar">
      <div className="LeftSection">
        <div className="LeftSectionPoiBox">
          {/* <ElectricHeart
            style={{
              width: 40,
            }}
          /> */}

          <img
            alt="Heart"
            src="https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/e_heart_1.png"
            style={{
              width: "100%",
            }}
          />
        </div>
        <div className="OverallTextMeta">
          <div className="UpperTextMeta">
            <div className="UpperText">
              <span style={{ color: "#75EBDF" }}>{"nft"}</span>
              <span style={{ color: "#75EBDF" }}>{"item"}</span>
              <span style={{ color: "#75EBDF" }}>{"land"}</span>
              <span style={{ color: "rgb(198, 235, 224)" }}>{".com"}</span>
              {/* <span style={{ color: "" }}>{".com"}</span> */}
            </div>
          </div>
          <div className="TextMetaSpacer" />
          <div className="LowerTextMeta">
            <div className="LowerText">{pageName}</div>
          </div>
        </div>
      </div>
      <div className="RightSection">
        <div className="RightSectionSButtonBox">
          <button
            onClick={() => {
              setMenuIsOpen(!menuIsOpen);
            }}
            style={{
              backgroundColor: "#c6ebe0",
              width: 100,
              height: "100%",
              fontFamily: `"Amaranth", sans-serif`,
              fontSize: 18,
              color: "black",
            }}
          >
            Menu
          </button>

          {/* {menuIsOpen ? <SButtonOpen /> : <SButton />} */}
        </div>
      </div>
    </div>
  );
}

/*
  NEXT text boxes
*/

export default ConnectedMode;
