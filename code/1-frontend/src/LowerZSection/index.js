// import React, { Suspense } from "react";
import "./LowerZSection.css";
// import { ReactComponent as DiscordButtonAlt } from "./DiscordButtonAlt.svg";
import { ReactComponent as OpenSeaButtonAlt } from "./OpenSeaButtonAlt.svg";
import { ReactComponent as TwitterButtonAlt } from "./TwitterButtonAlt.svg";

const bottomLinkData = [
  {
    Component: OpenSeaButtonAlt,
    href: "https://opensea.io/collection/nftitem",
  },
  {
    Component: TwitterButtonAlt,
    href: "https://twitter.com/nftitemland",
  },
];

function BottomLinks() {
  const bottomLinks = bottomLinkData.map((bottomLinkDatum, index) => {
    const cnBottomLinkBox =
      index === 0 ? "BottomLinkBox MostRightBox" : "BottomLinkBox";

    return (
      <div className={cnBottomLinkBox} key={"bottomLink" + index}>
        <a target="_blank" rel="noreferrer" href={bottomLinkDatum.href}>
          <bottomLinkDatum.Component />
        </a>
      </div>
    );
  });

  return <div className={"BottomLinksMeta"}>{bottomLinks}</div>;
}

function LowerZSection({ windowWidth }) {
  const isMobileMode = windowWidth < 555;

  const { cnLowerZSectionBottomBar } = isMobileMode
    ? {
        cnLowerZSectionBottomBar: "LowerZSectionBottomBar Mobile",
        cnPreviousVersionButton: "PreviousVersionButton Mobile",
      }
    : {
        cnLowerZSectionBottomBar: "LowerZSectionBottomBar",
        cnPreviousVersionButton: "PreviousVersionButton",
      };

  return (
    <div className="LowerZSection">
      <div className={cnLowerZSectionBottomBar}>
        {/* <div
          className={cnPreviousVersionButton}
          onClick={() => {
            setWebsiteVersion(1);
            window.scrollTo({
              behavior: "smooth",
              top: 0,
            });
          }}
        >
          <div className="PreviousVersionButtonText">
            {"Previous Website Version"}
          </div>
        </div> */}
        <BottomLinks />
      </div>
    </div>
  );
}

export default LowerZSection;
