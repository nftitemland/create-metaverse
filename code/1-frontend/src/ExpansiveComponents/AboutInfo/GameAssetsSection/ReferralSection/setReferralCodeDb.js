import axios from "axios";
import { API_BASE_URL } from "../../../../constants";
import refreshExistingDiscountCodeData from "./refreshExistingDiscountCodeData";

const setReferralCodeDb = async ({
  provider,
  address,
  setExistingDiscountCodeData,
  discountCode,
  setIsLoading,
  updateStatus,
}) => {
  setIsLoading(true);

  const referralCode = discountCode;

  const msgParams = JSON.stringify({
    domain: {},
    message: {
      contents: referralCode,
    },
    primaryType: "ReferralCode",
    types: {
      ReferralCode: [{ name: "contents", type: "string" }],
    },
  });

  const from = address;

  const params = [from, msgParams];
  const method = "eth_signTypedData_v4";

  try {
    const sendAsyncResults = await new Promise((resolve, reject) => {
      provider.sendAsync(
        {
          method,
          params,
          from,
        },
        function (err, result) {
          if (err) {
            return reject(err);
          }
          if (result.error) {
            console.log("ERROR", result, result.error.message);
            return reject(result.error);
          }

          resolve(result);
        }
      );
    });

    //const setReferralCodeResults =
    await axios({
      method: "post",
      url: `${API_BASE_URL}/expansive-world/referrals`,
      headers: {
        "nftitem-address": address,
        "nftitem-web3-signature": sendAsyncResults.result,
        "nftitem-referral-code": referralCode,
      },
    });

    await refreshExistingDiscountCodeData({
      setExistingDiscountCodeData,
      address,
    });

    // setExistingDiscountCodeData(setReferralCodeResults.data);

    updateStatus("Discount Code Applied✅");

    setIsLoading(false);
  } catch (err) {
    setIsLoading(false);
    console.log("error in signing data:", err);

    const errorMessage = err?.response?.data?.message || err.message || "error";

    updateStatus(errorMessage);

    throw err;
  }
};

export default setReferralCodeDb;
