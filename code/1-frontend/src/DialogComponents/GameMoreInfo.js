import "./GameMoreInfo.css";

const GameMoreInfo = () => {
  return (
    <div className={"GameMoreInfo"}>
      <div className="TopMeta">
        <div className="TitleMeta">
          <div className="Text">{"PoiPoi Press"}</div>
        </div>
      </div>
      <div className="BottomMeta">
        <div className="TextMeta">
          <div className="Text">
            {"Press the PoiPoi as soon as it appears. " +
              "You only have 3 seconds to press the PoiPoi!"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameMoreInfo;
