import React, { useState } from "react";

import MyArticles from "./MyArticles";
import MainOptions from "./MainOptions";

import { constants } from "./articlesTools";
//{ useEffect }

// import { NULL_ADDRESS, NULL_USER_ID } from "../../constants";
// import refreshProfiles from "../../api/refreshProfiles";
// import delay from "../../utils/delay";

function Articles() {
  const [articlesMode, setArticlesMode] = useState(constants.modes.HOME);

  if (articlesMode === constants.modes.EDIT) {
    return (
      <div
        style={{
          width: "100%",
          marginTop: 40,
          maxWidth: 730,

          // height: 200,

          backgroundColor: "pink",

          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          // alignItems: isMobileMode ? "flex-start" : "center",
          alignItems: "center",
        }}
      ></div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        marginTop: 40,
        maxWidth: 730,

        // height: 200,

        backgroundColor: "pink",

        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        // alignItems: isMobileMode ? "flex-start" : "center",
        alignItems: "center",
      }}
    >
      <MyArticles />
      <div
        style={{
          width: 10,
          height: 10,
        }}
      />
      <MainOptions />
    </div>
  );
}

export default Articles;
