// import React, { Suspense } from "react";
import "./HighlightPoiDisplay.css";
// import "./HighlightPoi.svg";
import { ReactComponent as HighlightPoi } from "./HighlightPoi.svg";

// import mintSlime from "./MintPoiPoiSection/mintSlime";

function HighlightPoiDisplay() {
  return (
    <div className="HighlightPoiDisplay">
      <HighlightPoi className="HighlightPoi" />
    </div>
  );
}

export default HighlightPoiDisplay;
