import React from "react";
//{ useEffect }

// import { NULL_ADDRESS, NULL_USER_ID } from "../../constants";
// import refreshProfiles from "../../api/refreshProfiles";
// import delay from "../../utils/delay";

function MainOptions() {
  return (
    <div
      style={{
        width: "90%",

        height: 60,

        backgroundColor: "blue",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        // alignItems: isMobileMode ? "flex-start" : "center",
        alignItems: "center",
      }}
    >
      <button
        style={{
          backgroundColor: "grey",
          width: 300,
          height: 40,
          fontFamily: `"Amaranth", sans-serif`,
        }}
        onClick={() => {
          console.log("XYZABC");
        }}
      >
        Create New Article
      </button>
    </div>
  );
}

export default MainOptions;
