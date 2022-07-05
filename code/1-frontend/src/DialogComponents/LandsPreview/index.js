import "./Lands.css";

// import MiniMap from "./MiniMap";
import MiniMap from "../../ExpansiveComponents/MiniMap/index.js";
import Legend from "../../ExpansiveComponents/MiniMap/Legend";

const LandsPreview = ({ userLandsData }) => {
  return (
    <div className="LandsPreviewMeta">
      <div
        style={{
          // backgroundColor: "black",
          height: 60,
          width: 100,
          color: "white",

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            // backgroundColor: "black",
            width: 100,
            color: "white",
            fontSize: 22,
            // color: "black",

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: `"Amaranth", sans-serif`,
          }}
        >
          {"MiniMap"}
        </div>
      </div>

      <div
        style={{
          width: 10,
          height: 32,
        }}
      />

      <MiniMap userLandsData={userLandsData} />

      <div
        style={{
          width: 10,
          height: 32,
          // backgroundColor: "violet",
        }}
      />

      <Legend />
    </div>
  );
};

export default LandsPreview;
