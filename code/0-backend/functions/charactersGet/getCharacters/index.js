"use strict";

const {
  stringify,
  constants: {
    nftKeys: { POIPOI, GAME_CHARACTERS, ULTRA_FLAMINS },
    aws: {
      database: {
        assetsPrefixes: {
          asset_PoiPois_,
          asset_GameCharacters_,
          asset_UltraFlamingos_,
        },
      },
    },
  },
} = require("compute-utils");

const getNFTChars = require("./getNFTChars");

const getAssetsData = ({ mode }) => {
  if (mode === GAME_CHARACTERS) {
    return {
      assetsPrefix: asset_GameCharacters_,
      characterType: GAME_CHARACTERS,
    };
  } else if (mode === ULTRA_FLAMINS) {
    return {
      assetsPrefix: asset_UltraFlamingos_,
      characterType: ULTRA_FLAMINS,
    };
  }
  return {
    assetsPrefix: asset_PoiPois_,
    characterType: POIPOI,
  };
};

module.exports = async ({ address, pag, mode }) => {
  console.log(
    "💁‍♀️running getCharacters with the following values:",
    stringify({ address, pag, mode })
  );

  const { assetsPrefix, characterType } = getAssetsData({
    mode,
  });

  const responseValues = await getNFTChars({
    address,
    pag,
    assetsPrefix,
    characterType,
  });

  console.log(
    "💁‍♀️getCharacters executed successfully, " +
      "returning values: " +
      stringify(Object.keys(responseValues))
  );

  return responseValues;
};
