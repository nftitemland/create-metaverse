import axios from "axios";
import { API_BASE_URL } from "../../../constants";

const safeLoadProfiles = async ({ address }) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${API_BASE_URL}/expansive-world/profiles?mode=metaverse`,
      headers: {
        "nftitem-address": address,
        // "nftitem-ntoken": nTokenData.nToken,
      },
    });

    return {
      profiles: response.data.profiles,
      error: null,
    };
  } catch (err) {
    console.log("Error loading data p:", err);
    return {
      profiles: null,
      error: err,
    };
  }
};

const loadPois = async ({ address, setLoadedProfilesData }) => {
  // console.log("POI LOADING");

  const { profiles, error } = await safeLoadProfiles({
    address,
  });

  if (!!error) {
    console.log("error in loading Pois:", error);
    return;
  }

  setLoadedProfilesData(profiles);
  // return {};
};

export default loadPois;
