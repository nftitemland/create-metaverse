const stringify = require("../../stringify");
const {
  nftKeys,
  nftTypes,
  realtime: { realPoiLvls },
} = require("../../constants");

const getGameTierCore = ({ withdrawLevelData }) => {
  const poiPoiAssetLevelDatum = withdrawLevelData.assetLevelData.filter(
    (datum) => {
      return datum.type === nftKeys.POIPOI;
    }
  )[0];

  if (poiPoiAssetLevelDatum.nftTypes.includes(nftTypes.poiPoi.ELITE_GURR)) {
    return realPoiLvls.ELITE;
  }

  if (poiPoiAssetLevelDatum.amount > 0) {
    return realPoiLvls.GIGA;
  }

  const gameCharactersAssetLevelDatum = withdrawLevelData.assetLevelData.filter(
    (datum) => {
      return datum.type === nftKeys.GAME_CHARACTERS;
    }
  )[0];

  if (gameCharactersAssetLevelDatum.amount > 0) {
    return realPoiLvls.GIGA;
  }

  const poiAssetLevelDatum = withdrawLevelData.assetLevelData.filter(
    (datum) => {
      return datum.type === nftKeys.ULTRA_FLAMINS;
    }
  )[0];

  if (poiAssetLevelDatum.amount > 0) {
    return realPoiLvls.MANGANESESTRATEGIST;
  }

  return realPoiLvls.LOGGED_IN;
};

const getGameTier = ({ withdrawLevelData }) => {
  console.log("running getGameTier: " + stringify({}));

  const gameTier = getGameTierCore({ withdrawLevelData });

  console.log(
    "getGameTier executed successfully, got game tier: " +
      stringify({
        gameTier,
      })
  );

  return gameTier;
};

module.exports = getGameTier;
