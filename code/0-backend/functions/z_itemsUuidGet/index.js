"use strict";

const {
  landData,
  getDiamondLandData,
  royalGuardLand,
  getLand,
} = require("./itemData");

const {
  landPictures: {
    flamingoLand1,
    flamingoValley1,
    nftItemTowers1,
    ParisHiltonIslandMansion1,
    nFTItemTowersDay1,
    higherRealms1,
    genericLand,
  },
  areas,
} = require("./constants");

const version = "megamonkey2";

console.log("Lamb Lamb version:", version);

exports.handler = async (event) => {
  console.log(event);

  const id = Number(event.pathParameters.uuid.split(".")[0]) || 0;

  if (id === 27) {
    const response = {
      statusCode: 200,
      body: JSON.stringify(royalGuardLand),
    };
    return response;
  } else if (id > 6 && id < 27) {
    const response = {
      statusCode: 200,
      body: JSON.stringify(getDiamondLandData(id)),
    };
    return response;
  } else if (28 <= id && id <= 31) {
    const response = {
      statusCode: 200,
      body: JSON.stringify(
        getLand({
          name: `Flamingo Land ${id}`,
          description: "Flamingo Land Mansion",
          type: "Mansion",
          url: flamingoLand1,
          area: areas.FLAMINGO_LAND,
        })
      ),
    };
    return response;
  } else if (32 <= id && id <= 33) {
    const response = {
      statusCode: 200,
      body: JSON.stringify(
        getLand({
          name: `Flamingo Land ${id}`,
          description: "Flamingo Land Rare Mansion",
          type: "Rare Mansion",
          url: flamingoLand1,
          area: areas.FLAMINGO_LAND,
        })
      ),
    };
    return response;
  } else if (33 <= id && id <= 37) {
    const response = {
      statusCode: 200,
      body: JSON.stringify(
        getLand({
          name: `Flamingo Land ${id}`,
          description: "Flamingo Land Large House",
          type: "Large House",
          url: flamingoLand1,
          area: areas.FLAMINGO_LAND,
        })
      ),
    };

    return response;
  } else if (
    [48, 49, 50, 51, 52, 53].includes(id) ||
    (38 <= id && id <= 41) ||
    (43 <= id && id <= 46) ||
    (58 <= id && id <= 68)
  ) {
    const response = {
      statusCode: 200,
      body: JSON.stringify(
        getLand({
          name: `Flamingo Valley ${id}`,
          description: "Flamingo Valley House",
          type: "House",
          url: flamingoValley1,
          area: areas.FLAMINGO_VALLEY,
        })
      ),
    };
    return response;
  } else if (42 === id) {
    const response = {
      statusCode: 200,
      body: JSON.stringify(
        getLand({
          name: `Flamingo Land ${id}`,
          description: "Flamingo Land Paris Hilton Island Mansion",
          type: "Paris Hilton Island Mansion",
          url: ParisHiltonIslandMansion1,
          area: areas.FLAMINGO_LAND,
        })
      ),
    };
    return response;
  } else if ([47, 54, 55, 56, 57, 69].includes(id)) {
    const response = {
      statusCode: 200,
      body: JSON.stringify(
        getLand({
          name: `Flamingo Valley ${id}`,
          description: "Flamingo Valley Rare House",
          type: "Rare House",
          url: flamingoValley1,
          area: areas.FLAMINGO_VALLEY,
        })
      ),
    };
    return response;
  } else if (70 <= id && id <= 86) {
    const response = {
      statusCode: 200,
      body: JSON.stringify(
        getLand({
          name: `NFT Item Towers ${id}`,
          description: "NFT Item Towers Condo",
          type: "Condo",
          url: nFTItemTowersDay1,
          area: areas.NFT_ITEM_TOWERS,
        })
      ),
    };
    return response;
  } else if ([87, 88].includes(id)) {
    const response = {
      statusCode: 200,
      body: JSON.stringify(
        getLand({
          name: `NFT Item Towers ${id}`,
          description: "NFT Item Towers Puppy Penthouse",
          type: "Puppy Penthouse",
          url: nftItemTowers1,
          area: areas.NFT_ITEM_TOWERS,
        })
      ),
    };
    return response;
  } else if (id === 89) {
    const response = {
      statusCode: 200,
      body: JSON.stringify(
        getLand({
          name: `NFT Item Towers ${id}`,
          description: "NFT Item Towers Doge Penthouse",
          type: "Doge Penthouse",
          url: nftItemTowers1,
          area: areas.NFT_ITEM_TOWERS,
        })
      ),
    };
    return response;
  } else if (90 <= id && id <= 97) {
    const response = {
      statusCode: 200,
      body: JSON.stringify(
        getLand({
          name: `NFT Item Towers ${id}`,
          description: "NFT Item Towers Luxury Condo",
          type: "Condo",
          url: nFTItemTowersDay1,
          area: areas.FLAMINGO_VALLEY,
        })
      ),
    };
    return response;
  } else if (id === 98) {
    const response = {
      statusCode: 200,
      body: JSON.stringify(
        getLand({
          name: `NFT Item Towers ${id}`,
          description: "NFT Item Towers Pixie Penthouse",
          type: "Pixie Penthouse",
          url: nftItemTowers1,
          area: areas.NFT_ITEM_TOWERS,
        })
      ),
    };
    return response;
  } else if (id === 99) {
    const response = {
      statusCode: 200,
      body: JSON.stringify(
        getLand({
          name: `NFT Item Towers ${id}`,
          description: "NFT Item Towers Premier Pixie Penthouse",
          type: "Premier Pixie Penthouse",
          url: nftItemTowers1,
          area: areas.NFT_ITEM_TOWERS,
        })
      ),
    };
    return response;
  } else if (id === 100) {
    const response = {
      statusCode: 200,
      body: JSON.stringify(
        getLand({
          name: `Higher Realms ${id}`,
          description: "Higher Realms Fairytale Castle",
          type: "Fairytale Castle",
          url: higherRealms1,
          area: areas.HIGHER_REALMS,
        })
      ),
    };

    return response;
  } else if (id === 101) {
    const response = {
      statusCode: 200,
      body: JSON.stringify(
        getLand({
          name: `Higher Realms ${id}`,
          description: "Higher Realms Sugar Farm",
          type: "Sugar Farm",
          url: higherRealms1,
          area: areas.HIGHER_REALMS,
        })
      ),
    };
    return response;
  } else if (id === 102) {
    const response = {
      statusCode: 200,
      body: JSON.stringify(
        getLand({
          name: `Higher Realms ${id}`,
          description: "Higher Realms Spice Farm",
          type: "Spice Farm",
          url: higherRealms1,
          area: areas.HIGHER_REALMS,
        })
      ),
    };

    return response;
  } else if (id === 103) {
    const response = {
      statusCode: 200,
      body: JSON.stringify(
        getLand({
          name: `Higher Realms ${id}`,
          description: "Higher Realms Everything Nice Farm",
          type: "Everything Nice Farm",
          url: higherRealms1,
          area: areas.HIGHER_REALMS,
        })
      ),
    };

    return response;
  } else if ([104, 105].includes(id)) {
    const response = {
      statusCode: 200,
      body: JSON.stringify(
        getLand({
          name: `Higher Realms ${id}`,
          description: "Higher Realms Large House",
          type: "Large House",
          url: higherRealms1,
          area: areas.HIGHER_REALMS,
        })
      ),
    };

    return response;
  } else if (id > 105) {
    const response = {
      statusCode: 200,
      body: JSON.stringify(
        getLand({
          name: `NFT Item Land ${id}`,
          description: "Land Plot",
          type: "Land Plot",
          url: genericLand,
          area: areas.NEW_ZONE,
        })
      ),
    };

    return response;
  }

  const body = landData[id] || landData[0];

  const response = {
    statusCode: 200,
    body: JSON.stringify(body),
  };
  return response;
};
