import { getPoiPoiImageUrl } from "./getImageUrls";
import { nftKeys } from "../constants";

export const getImageUrl = ({ type, id, shouldGetUltraFlaminSword }) => {
  switch (type) {
    case nftKeys.POIPOI:
      return getPoiPoiImageUrl(id);
    case nftKeys.GAME_CHARACTERS:
      return `https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/character-images/character_${id}.png`;
    case nftKeys.ULTRA_FLAMINS:
      if (shouldGetUltraFlaminSword) {
        return `https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/sword_1.png`;
      }
      return `https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/weapon_character.png`;
    default:
      break;
  }

  return null;
};
