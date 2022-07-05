import axios from "axios";

import { API_BASE_URL } from "../constants";

const refreshProfiles = async ({ setProfiles }) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${API_BASE_URL}/expansive-world/profiles`,
      headers: {
        // "nftitem-address": address,
        // "nftitem-ntoken": nTokenData?.nToken,
      },
      // data: {
      //   username: usernameInput,
      // },
    });

    setProfiles(response.data.profiles);
  } catch (err) {
    console.log("error in refreshing profiles:", err);
    throw err;
  }
};

export default refreshProfiles;
