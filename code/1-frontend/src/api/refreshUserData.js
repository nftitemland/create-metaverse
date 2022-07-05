import axios from "axios";

import { API_BASE_URL } from "../constants";

// import delay from "../utils/delay";

const refreshUserData = async ({
  address,
  nToken,
  setUserData,
  landClaimMode,
}) => {
  try {
    // if (landClaimMode) {
    //   await delay(3000);
    //   throw new Error("test error");
    // }
    const queryString = landClaimMode ? "?landClaimMode=yes" : "";
    const response = await axios({
      method: "GET",
      url: `${API_BASE_URL}/expansive-world/user-data` + queryString,
      headers: {
        "nftitem-address": address,
        "nftitem-ntoken": nToken,
      },
    });

    setUserData(response.data);
  } catch (err) {
    console.log("error in refreshing user data:", err);
    throw err;
  }
};

export default refreshUserData;
