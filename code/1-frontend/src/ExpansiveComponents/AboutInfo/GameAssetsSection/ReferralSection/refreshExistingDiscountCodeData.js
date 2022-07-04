import axios from "axios";
import { API_BASE_URL } from "../../../../constants";

const refreshExistingDiscountCodeData = async ({
  setExistingDiscountCodeData,
  address,
}) => {
  try {
    const response = await axios({
      method: "GET",
      url: `${API_BASE_URL}/expansive-world/referrals`,
      headers: {
        "nftitem-address": address,
      },
    });

    setExistingDiscountCodeData(response.data);
  } catch (err) {
    console.log("error in loading referral data:", err);
  }
};

export default refreshExistingDiscountCodeData;
