export const isProductionMode = process.env.REACT_APP_MODE === "production";

const NFT_ITEM_LAND_FULL_URL = "https://www.nftitemland.com";

export const isTrueProductionMode =
  window.location.origin === NFT_ITEM_LAND_FULL_URL;

export const API_BASE_URL = isProductionMode
  ? "https://mathbitcoin.com"
  : process.env.REACT_APP_API_BASE_URL_STAGING;
// "http://localhost:42069";

export const WEBSOCKET_API_BASE_URL = isProductionMode
  ? process.env.REACT_APP_WURL
  : process.env.REACT_APP_WURL_STAGING;
// "http://localhost:42069";

export const NULL_ADDRESS = "0x000000000000000";
export const NULL_USER_ID = "00000000-0000-4000-0000-000000000000";

export const pages = {
  PSEUDO_LOAD_PAGE: "PSEUDO_LOAD_PAGE",
  ACCOUNT: "ACCOUNT",
  WORLD: "WORLD",
  MINT: "MINT",
  MESSAGES: "MESSAGES",
  SETTINGS: "SETTINGS",
  GAME: "GAME",
};

export const dialogModes = {
  LANDS_PREVIEW: "LANDS_PREVIEW", // deprecated
  minigame: {
    MINI_GAME_ONE_MORE_INFO: "MINI_GAME_ONE_MORE_INFO",
  }, // deprecated
  FAQ: "FAQ", // not used
  IMAGE: "IMAGE", // special case
  PROFILE_SETTINGS: "PROFILE_SETTINGS",
  NFT_PREVIEW: "NFT_PREVIEW",
  PIXIE_JARS_MINT_DATA: "PIXIE_JARS_MINT_DATA",
  REALPOI_NEWS: "REALPOI_NEWS",
  TXS: "TXS",
  REFERRAL_INFO: "REFERRAL_INFO",
};

export const areaNames = {
  HIGHER_REALM: "HIGHER_REALM",
  UPPER_POI: "UPPER_POI",
  FLAMINGO_LAND: "FLAMINGO_LAND",
  FLAMINGO_VALLEY: "FLAMINGO_VALLEY",
  PROMO: "PROMO",
};

export const N_TOKEN_DATA = "N_TOKEN_DATA";

export const chains = {
  POLYGON: "Polygon",
  ETHEREUM: "Ethereum",
};

export const chainToCurrencyUnit = {
  [chains.ETHEREUM]: "ETH",
  [chains.POLYGON]: "MATIC",
};

export const nftKeys = {
  POIPOI: "POIPOI",
  GIGA: "GIGA",
  HYPER: "HYPER",
  NORMAL: "NORMAL",
  DPS_DOGES: "DPS_DOGES",
  DPS_PUPPIES: "DPS_PUPPIES",
  CRYPDOLLS: "CRYPDOLLS",
  CUSTOM_PIXIES: "CUSTOM_PIXIES",
  PIXIEJARS: "PIXIEJARS",
  ULTRA_FLAMINS: "ULTRA_FLAMINS",
  FANTASTIC_FLAMINS: "FANTASTIC_FLAMINS",
  LANDS: "LANDS",
  LONELY_FROG_LAMBO_CLUB: "LONELY_FROG_LAMBO_CLUB",
  CRYPTO_CHICKS: "CRYPTO_CHICKS",
  GAME_CHARACTERS: "GAME_CHARACTERS",
};

export const gameSectionModes = {
  BATTLE: "BATTLE",
  CHARACTER_SELECT: "CHARACTER_SELECT",
};

export const poipoiTypes = {
  GIGA_RARE: "GIGA_RARE",
  HYPER_RARE: "HYPER_RARE",
};

export const nftImages = {
  DEFAULT_POI:
    "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/default_character.png",
};

export const enchantTraitCharacters = {
  BOI: "BOI",
  GURR: "GURR",
  SQUR: "SQUR",
  MANGANESE: "MANGANESE",
  MANGANESESTRATEGIST: "MANGANESESTRATEGIST",
  TARA: "TARA",
};

export const extendedETC = {
  AUX_NFT_1: "AUX_NFT_1",
};

const enchantmentsCharacter = {
  SQUR: {
    displayName: "Squrr",
    missingLvlMessage: "-",
    requiredLevel: 100,
    image:
      "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/enchantment_character_squr_1.png",
  },

  TARA: {
    displayName: "Hellenic Tara",
    missingLvlMessage: "-",
    requiredLevel: 100,
    image:
      "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/enchantment_character_tara_1.png",
  },

  MANGANESE: {
    displayName: "Manganese Zealot",
    missingLvlMessage: "Requires login",
    requiredLevel: 10,
    image:
      "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/enchantment_character_manganese_1.png",
  },
  MANGANESESTRATEGIST: {
    displayName: "Martian Strategist",
    missingLvlMessage: "Requires Basic Item NFT",
    requiredLevel: 9,
    image:
      "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/enchantment_character_manganesestrategist_1.png",
  },

  GURR: {
    displayName: "Gurr",
    missingLvlMessage: "Requires Polygon Gurr NFT",
    requiredLevel: 1,
    image:
      "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/enchantment_character_gurr_2.png",
  },
  BOI: {
    displayName: "Boi",
    missingLvlMessage: "Requires Ethereum Gurr NFT",
    requiredLevel: 0,
    image:
      "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/enchantment_character_boi_4.png",
  },

  AUX_NFT_1: {
    displayName: "Aux NFT 1",
    missingLvlMessage: "Requires Aux NFT 1",
    requiredLevel: 100,
    requiredKey: "aux1",
    image:
      "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/enchantment_object_tub_4empty.png",
  },
};

if (isTrueProductionMode) {
  delete enchantmentsCharacter.AUX_NFT_1;
}

export const enchantments = {
  character: enchantmentsCharacter,
};
