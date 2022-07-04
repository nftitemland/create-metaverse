import axios from "axios";
import { API_BASE_URL } from "../../constants";
import { getNTokenData } from "../../utils/nToken";
import refreshUserData from "../../api/refreshUserData";

const updateLand = async ({
  address,
  land,
  setUserData,
  polygonAddress,
  updateStatus,
}) => {
  const numberLand = Number(land);

  if (!Number.isInteger(numberLand) || numberLand < 28 || numberLand > 99) {
    return updateStatus("Invalid land selected");
  }

  const nTokenData = getNTokenData();

  await axios({
    method: "POST",
    url: `${API_BASE_URL}/expansive-world/user-data`,
    headers: {
      "nftitem-address": address,
      "nftitem-ntoken": nTokenData.nToken,
    },
    // miniGameState: "END",
    data: {
      landClaimData: {
        land: String(land),
        polygonAddress,
      },
    },
  });

  await refreshUserData({
    address,
    nToken: nTokenData.nToken,
    setUserData,
    landClaimMode: true,
  });
};

export default updateLand;
