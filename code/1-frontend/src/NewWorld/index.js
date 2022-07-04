import React, { useState, useEffect } from "react";
import "./NewWorld.css";
import { ReactComponent as OGPyramid } from "./OGPyramid.svg";
import { ReactComponent as OmegaPalmLeft } from "./OmegaPalmLeft.svg";
import { ReactComponent as OmegaPalmRight } from "./OmegaPalmRight.svg";
import { ReactComponent as StarGroupSix } from "./StarGroupSix.svg";
import { ReactComponent as PoiRocket } from "./PoiRocket.svg";
// import { useState } from "react";
// import TopBar from "./TopBar";
// import ConnectedMode from "./ConnectedMode";
// import HighlightPoiDisplay from "./HighlightPoiDisplay";
// import MidFashionStyleBar from "./MidFashionStyleBar";
// import LowerMidMetaphoricalPalace from "./LowerMidMetaphoricalPalace";
// import LowerMoreInfoSection from "./LowerMoreInfoSection";
// import LowerZSection from "./LowerZSection";
// import Menu from "./Menu";
// import SnackBar from "./SnackBar";
// import { pages } from "./constants";

// import mintSlime from "./MintPoiPoiSection/mintSlime";

function NewWorld({ windowWidth }) {
  const [scrollTop, setScrollTop] = useState(0);
  const [, /*scrolling*/ setScrolling] = useState(false);

  useEffect(() => {
    const onScroll = (e) => {
      setScrollTop(e.target.documentElement.scrollTop);
      setScrolling(e.target.documentElement.scrollTop > scrollTop);
    };
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollTop]);

  const ogPlaformTopW = 773;
  const omegaTreeW = 773;
  const planetW = 2600;

  const isStarDesktop = windowWidth > 1350;
  const isTreeDesktop = windowWidth > 940;
  const isRocketDesktop = windowWidth > 940;

  return (
    <div className="NewWorld">
      {isStarDesktop && (
        <div
          style={{
            position: "absolute",
            zIndex: 2,
            width: omegaTreeW,

            top: 4,
            left: 2,
            // left: 100,
          }}
        >
          <StarGroupSix className="StarGroupSix" />
        </div>
      )}
      {isTreeDesktop && (
        <div
          style={{
            position: "absolute",
            zIndex: 2,
            width: omegaTreeW,

            top: 100,
            left: windowWidth / 3.5 - (omegaTreeW - 75) / 2,
            // left: 100,
          }}
        >
          <OmegaPalmLeft className="OmegaPalmLeft" />
        </div>
      )}
      <div
        style={{
          position: "absolute",
          zIndex: 3,
          width: ogPlaformTopW,

          top: 382,
          left: windowWidth / 2 - (ogPlaformTopW - 70) / 2,
        }}
      >
        <OGPyramid className="OGPyramid" />
      </div>
      {isTreeDesktop && (
        <div
          style={{
            position: "absolute",
            zIndex: 2,
            width: omegaTreeW,

            top: 100,
            right: windowWidth / 4 - (omegaTreeW + 639) / 2,
            // left: windowWidth / 0.25 - (ogPlaformTopW - 75) / 2,
            // left: 700,
          }}
        >
          <OmegaPalmRight className="OmegaPalmRight" />
        </div>
      )}
      {isRocketDesktop && (
        <div
          style={{
            position: "absolute",
            zIndex: 1,
            width: omegaTreeW,

            top: 500 - scrollTop * 2,
            // top: scrollTop,
            // right: windowWidth / 2.8 - 1200 - scrollTop,
            right: windowWidth / 2.8 - 800 - scrollTop * 2,
            // left: 100,
          }}
        >
          <PoiRocket className="PoiRocket" />
        </div>
      )}
      <div
        className="Planet"
        style={{
          position: "absolute",
          left: windowWidth / 2 - planetW / 2,
          bottom: -20,
          width: planetW,
          height: 250,
          backgroundColor: "#006A0B",
          borderRadius: "50%",
          zIndex: 1,
        }}
      />
    </div>
  );
}

export default NewWorld;
