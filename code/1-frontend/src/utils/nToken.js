import { N_TOKEN_DATA } from "../constants";
/*

    await axios-login => nToken

    nToken => add to local storage
    isLogged 
*/

export const storeNTokenData = ({ nToken, address, expiry }) => {
  const nTokenData = JSON.stringify({
    nToken,
    address,
    expiry,
  });

  localStorage.setItem(N_TOKEN_DATA, nTokenData);
};

export const getNTokenData = () => {
  const rawNTokenData = localStorage.getItem(N_TOKEN_DATA);

  if (!rawNTokenData) {
    return null;
  }

  const nTokenData = JSON.parse(rawNTokenData);

  return nTokenData;
};

export const deleteNTokenData = () => {
  localStorage.removeItem(N_TOKEN_DATA);
};
