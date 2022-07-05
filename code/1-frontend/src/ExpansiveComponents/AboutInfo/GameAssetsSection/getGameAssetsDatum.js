import { chains } from "../../../constants";

const nftTypes = {
  GAME_CHARACTER: "Game Character",
  LAND: "Land",
};

const titles = {
  POI: "Basic Item",
  POIPOI: "PoiPoi",
  GAME_CHARACTER: "Hunny",
  GURR: "Gurr",
  LANDS: "Land",
};

const baseGameAssetData = [
  {
    title: titles.GURR,
    image:
      "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/slime_28.png",
    text: "Ethereum Gurrs are the highest level game character and have the best game utility.  Ethereum Gurrs are all 1-of-1 and are available by request only.",
    type: nftTypes.GAME_CHARACTER,
    chain: chains.ETHEREUM,
    price: 0.2,
    contractAddress: "0xd4d29a9ea76d6e31bd02af1d02549a35db08a30d",
    altMint: true,
    currentServerOutage: false,
    customMadeRequestOnly: true,
  },

  {
    title: titles.POIPOI,
    image:
      "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/slime_42.png",
    text: "PoiPoi creatures provide high level utility including access to exclusive gaming utility.",
    type: nftTypes.GAME_CHARACTER,
    chain: chains.ETHEREUM,
    price: 0.07,
    contractAddress: "0xd4d29a9ea76d6e31bd02af1d02549a35db08a30d",
    altMint: true,
    currentServerOutage: false,
  },

  {
    title: titles.GAME_CHARACTER,
    image:
      // "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/slime_25.png",
      "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/character-images/character_3.png",
    // text: "Elona is emo: highly intelligent, emotionally powerful, and confidently in charge. +400 game points.",
    text: "Hunnies are the main game character in NFT Item Land. +400 game points.",
    type: nftTypes.GAME_CHARACTER,
    chain: chains.POLYGON,
    price: 20,
    maxMintAmount: 42,

    contractAddress: "0xba75108527c630a093ab4a4a569ddab2e2b8a8ba",
    altMint: false,
    currentServerOutage: false,
    discountSection: true,
  },

  {
    title: titles.LANDS,
    image:
      "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/falmingovalleyland.png",
    type: nftTypes.LAND,
    text: "Land gives part ownership of the NFT Item metaverse. Lands have staking and are reserved for future utility.",
    chain: chains.POLYGON,
    price: 30,
    staking: true,
    contractAddress: "0xd70292d3Df1C7ee16D395469A3F0e7BA3824d355",
  },
  {
    title: titles.POI,
    image:
      "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/sword_1.png",
    // image:
    // "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/pois/PoiDisplay1.png",
    // text: "Poi creatures provide base level utility including staking.",
    text: "Basic Items provide base level utility including staking. +15 game points.",
    type: nftTypes.GAME_CHARACTER,
    chain: chains.POLYGON,
    price: 1,
    maxMintAmount: 100,
    staking: true,
    contractAddress: "0xc3844c3aea8458e21bdeee7ba6ed328637fef8cb",
    discountSection: true,
  },
];

const getGameAssetsData = ({
  aboutInfoGameAssetsPage,
  aboutInfoGameAssetsLandMintAmount,
  setAboutInfoGameAssetsLandMintAmount,
  aboutInfoGameAssetsPoiMintAmount,
  setAboutInfoGameAssetsPoiMintAmount,
  mintSectionSelectedPoiPoiType,
  setMintSectionSelectedPoiPoiType,
  aboutInfoGameAssetsCharacterMintAmount,
  setAboutInfoGameAssetsCharacterMintAmount,
}) => {
  const gameAssetDatum = baseGameAssetData[aboutInfoGameAssetsPage];

  if (gameAssetDatum.title === titles.LANDS) {
    gameAssetDatum.mintAmount = aboutInfoGameAssetsLandMintAmount;
    gameAssetDatum.setMintAmount = setAboutInfoGameAssetsLandMintAmount;
    gameAssetDatum.maxMintAmount = 35;
  } else if (gameAssetDatum.title === titles.POI) {
    gameAssetDatum.mintAmount = aboutInfoGameAssetsPoiMintAmount;
    gameAssetDatum.setMintAmount = setAboutInfoGameAssetsPoiMintAmount;
    gameAssetDatum.maxMintAmount = 35;
  } else if (gameAssetDatum.title === titles.POIPOI) {
    gameAssetDatum.mintSectionSelectedPoiPoiType =
      mintSectionSelectedPoiPoiType;
    gameAssetDatum.setMintSectionSelectedPoiPoiType =
      setMintSectionSelectedPoiPoiType;
  } else if (gameAssetDatum.title === titles.GAME_CHARACTER) {
    gameAssetDatum.mintAmount = aboutInfoGameAssetsCharacterMintAmount;
    gameAssetDatum.setMintAmount = setAboutInfoGameAssetsCharacterMintAmount;
    gameAssetDatum.maxMintAmount = 42;
  }

  return gameAssetDatum;
};

export default getGameAssetsData;
