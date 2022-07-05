import React from "react";
// import DirectionControls from "./DirectionControls";
// import DirectionControlsTemp from "./DirectionControlsTemp";
// import BackgroundMap from "../../BackgroundMap";

import GameCharacter from "./GameCharacter";

import {
  enchantTraitCharacters,
  extendedETC, // enchantments
  isTrueProductionMode,
} from "../../../../constants";

const BOI_SCALAR = 1.754;
const GURR_SCALAR = 2.126;
const TARA_SCALAR = 1.75;

const characterToData = ({
  character,
  imageIndex,
  a,
  lvl,
  tubCoordKeyToData,
  coordKey,
}) => {
  if (character === enchantTraitCharacters.BOI) {
    const isTubBoi = a === "TUBBOI";

    if (isTubBoi) {
      tubCoordKeyToData[coordKey] = tubCoordKeyToData[coordKey] || {};
      tubCoordKeyToData[coordKey].BOI = true;
    }

    return {
      isInTub: isTubBoi,
      characterName: character,
      src: `https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/enchantment_character_boi_4${
        a ? "a" : ""
      }.png`,
      width: 632 / BOI_SCALAR,
      height: 885 / BOI_SCALAR,
      getXShift: (s) => {
        // if (s > 0.8) {
        //   return 0;
        // }
        if (s >= 0.9) {
          return 10;
        }

        if (s >= 0.75) {
          return -20;
        }

        return -66;
      },
      getYShift: (s) => {
        if (s >= 0.9) {
          return 60;
        }

        if (s >= 0.75) {
          return 5;
        }

        return -55;
      },
      lvl,
    };
  } else if (character === enchantTraitCharacters.GURR) {
    const isTubGurr = a === "TUBGURR";

    if (isTubGurr) {
      tubCoordKeyToData[coordKey] = tubCoordKeyToData[coordKey] || {};
      tubCoordKeyToData[coordKey].GURR = true;
    }

    return {
      isInTub: isTubGurr,
      characterName: character,
      src: "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/enchantment_character_gurr_2.png",
      width: 632 / GURR_SCALAR,
      height: 885 / GURR_SCALAR,
      getXShift: (s) => {
        // if (s > 0.8) {
        //   return 0;
        // }
        if (s >= 0.9) {
          return 7;
        }

        if (s >= 0.75) {
          return -30;
        }

        if (s >= 0.7) {
          return -45;
        }

        return -68;
      },
      getYShift: (s) => {
        if (s >= 0.9) {
          return 20;
        }

        if (s >= 0.75) {
          return -45;
        }

        return -80;
      },

      lvl,
    };
  } else if (character === enchantTraitCharacters.MANGANESESTRATEGIST) {
    return {
      isInTub: false,
      characterName: character,
      src: "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/enchantment_character_manganesestrategist_1.png",
      width: 632 / BOI_SCALAR,
      height: 885 / BOI_SCALAR,
      getXShift: (s) => {
        // if (s > 0.8) {
        //   return 0;
        // }
        if (s >= 0.9) {
          return 7;
        }

        if (s >= 0.75) {
          return -30;
        }

        if (s >= 0.7) {
          return -45;
        }

        return -68;
      },
      getYShift: (s) => {
        if (s >= 0.9) {
          return 20;
        }

        if (s >= 0.75) {
          return -45;
        }

        return -80;
      },

      lvl,
    };
  } else if (character === enchantTraitCharacters.MANGANESE) {
    return {
      isInTub: false,
      characterName: character,
      src: "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/enchantment_character_manganese_1.png",
      width: 632 / BOI_SCALAR,
      height: 885 / BOI_SCALAR,
      getXShift: (s) => {
        // if (s > 0.8) {
        //   return 0;
        // }
        if (s >= 0.9) {
          return 7;
        }

        if (s >= 0.75) {
          return -30;
        }

        if (s >= 0.7) {
          return -45;
        }

        return -68;
      },
      getYShift: (s) => {
        if (s >= 0.9) {
          return 20;
        }

        if (s >= 0.75) {
          return -45;
        }

        return -80;
      },

      lvl,
    };
  } else if (character === enchantTraitCharacters.TARA) {
    return {
      characterName: character,
      src: `https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/enchantment_character_tara_1${
        a ? "a" : ""
      }.png`,
      width: 632 / TARA_SCALAR,
      height: 885 / TARA_SCALAR,
      getXShift: (s) => {
        // if (s > 0.8) {
        //   return 0;
        // }
        if (s >= 0.9) {
          return 10;
        }

        if (s >= 0.75) {
          return -20;
        }

        return -66;
      },
      getYShift: (s) => {
        if (s >= 0.9) {
          return 60;
        }

        if (s >= 0.75) {
          return 5;
        }

        return -55;
      },
      lvl,
    };
  } else if (!isTrueProductionMode && character === extendedETC.AUX_NFT_1) {
    return {
      characterName: character,
      src: "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/enchantment_object_tub_4empty.png",
      width: 632 / GURR_SCALAR,
      height: 885 / GURR_SCALAR,
      getXShift: (s) => {
        // if (s > 0.8) {
        //   return 0;
        // }
        if (s >= 0.9) {
          return 7;
        }

        if (s >= 0.75) {
          return -30;
        }

        if (s >= 0.7) {
          return -45;
        }

        return -68;
      },
      getYShift: (s) => {
        if (s >= 0.9) {
          return 20;
        }

        if (s >= 0.75) {
          return -45;
        }

        return -80;
      },

      lvl,
    };
  }

  let src;

  if (a) {
    src = `https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/squr_move_${imageIndex}.png`;
  } else {
    src = `https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/squr_${imageIndex}.png`;
  }

  return {
    isInTub: false,
    characterName: character,
    src,
    width: 75,
    height: 75,
    lvl,
    getXShift: (s) => {
      if (s >= 0.8) {
        return 0;
      }

      return -12;
    },
    getYShift: (s) => {
      // return 0;

      if (s >= 0.8) {
        return -35;
      }

      return -45;
    },
  };
};

const getGameCharacters = (gameData = {}, mainUserId, s, selfPoiCoordKey) => {
  const gameCharacters = [];
  let selfPoiData;
  const tubCoordKeyToData = {};

  const userIds = Object.keys(gameData);

  // for (const userId in gameData) {
  for (let i = 0; i < userIds.length; i++) {
    const userId = userIds[i];

    const isSelfRealPoi = mainUserId === userId;

    const userDatum = gameData[userId];

    const crdX = userDatum.crdX || 0;
    const crdY = userDatum.crdY || 0;

    const a = userDatum.a;

    const coordKey = `${crdX}$${crdY}`;

    if (coordKey === selfPoiCoordKey) {
      const x = Number(userDatum.x) || 0;
      const y = Number(userDatum.y) || 0;

      const character = userDatum.etC || enchantTraitCharacters.SQUR;

      const imageIndex = (i % 4) + 1;

      const characterData = characterToData({
        character,
        imageIndex,
        a,
        lvl: userDatum.lvl,
        tubCoordKeyToData,
        coordKey,
      });

      if (isSelfRealPoi) {
        selfPoiData = Object.assign({}, characterData, userDatum);
      }

      const gameCharacter = (
        <GameCharacter
          key={userId}
          x={x}
          y={y}
          characterData={characterData}
          isSelfRealPoi={isSelfRealPoi}
          s={s}
        />
      );

      gameCharacters.push(gameCharacter);
    }
  }

  return {
    selfPoiData,
    gameCharacters,
    tubCoordKeyToData,
  };
};

export default getGameCharacters;
