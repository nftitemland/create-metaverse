const XENA = "XENA";

const getWsLoginTokenDataIfValid = (rawWsLoginToken) => {
  if (typeof rawWsLoginToken !== "string") {
    return null;
  }

  const splitWsLoginToken = rawWsLoginToken.split(XENA);

  if (splitWsLoginToken.length !== 2) {
    return null;
  }

  const [
    ,
    //websocketLoginTokenId,
    expiry,
  ] = splitWsLoginToken;

  const numberExpiry = Number(expiry);

  if (Number.isNaN(numberExpiry) || Date.now() > numberExpiry) {
    return null;
  }

  return {};
};

export default getWsLoginTokenDataIfValid;
