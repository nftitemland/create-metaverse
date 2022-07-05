"use strict";

const {
  landPictures: { genericLand, royalGuardLand, diamondLand },

  areas: {
    UPPER_POI,
    //  FLAMINGO_LAND, FLAMINGO_VALLEY, NFT_ITEM_TOWERS
  },
} = require("./constants");

const getLandUrl = (landNumber) =>
  `https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/land-images/land_${landNumber}.png`;

module.exports = {
  landData: [
    {
      description: "Land",
      external_url: genericLand,
      image: genericLand,
      name: "Land",
      attributes: [
        {
          trait_type: "Type",
          value: "Land",
        },
      ],
    },
    {
      name: "Land 1",
      description: "Upper Poi Land",
      external_url: getLandUrl(1),
      image: getLandUrl(1),
      attributes: [
        {
          trait_type: "Type",
          value: "Ultra-Premium",
        },
        {
          trait_type: "Area",
          value: UPPER_POI,
        },
      ],
    },
    {
      name: "Land 2",
      description: "Upper Poi Land",
      external_url: getLandUrl(2),
      image: getLandUrl(2),
      attributes: [
        {
          trait_type: "Type",
          value: "Ultra-Premium",
        },
        {
          trait_type: "Area",
          value: UPPER_POI,
        },
      ],
    },
    {
      name: "Land 3",
      description: "Upper Poi Land",
      external_url: getLandUrl(3),
      image: getLandUrl(3),
      attributes: [
        {
          trait_type: "Type",
          value: "Ultra-Premium",
        },
        {
          trait_type: "Area",
          value: UPPER_POI,
        },
      ],
    },
    {
      name: "Land 4",
      description: "Upper Poi Land",
      external_url: getLandUrl(4),
      image: getLandUrl(4),
      attributes: [
        {
          trait_type: "Type",
          value: "Ultra-Premium",
        },
        {
          trait_type: "Area",
          value: UPPER_POI,
        },
      ],
    },
    {
      name: "Land 5",
      description: "Upper Poi Land",
      external_url: getLandUrl(5),
      image: getLandUrl(5),
      attributes: [
        {
          trait_type: "Type",
          value: "Ultra-Premium",
        },
        {
          trait_type: "Area",
          value: UPPER_POI,
        },
      ],
    },
    {
      name: "Land 6",
      description: "Upper Poi Land",
      external_url: getLandUrl(6),
      image: getLandUrl(6),
      attributes: [
        {
          trait_type: "Type",
          value: "Ultra-Premium",
        },
        {
          trait_type: "Area",
          value: UPPER_POI,
        },
      ],
    },

    // {
    //   description: "Land",
    //   external_url: genericLand,
    //   image: genericLand,
    //   name: "PoiPoi",
    //   attributes: [
    //     {
    //       trait_type: "Type",
    //       value: "Land",
    //     },
    //   ],
    // },
  ],

  getDiamondLandData: (index) => {
    return {
      name: `Diamond Land ${index}`,
      description: "Upper Poi Diamond Land",
      external_url: diamondLand,
      image: diamondLand,
      attributes: [
        {
          trait_type: "Type",
          value: "Diamond",
        },
        {
          trait_type: "Area",
          value: UPPER_POI,
        },
      ],
    };
  },

  royalGuardLand: {
    name: `Upper Poi Royal Guard Land`,
    description: "Upper Poi Security",
    external_url: royalGuardLand,
    image: royalGuardLand,
    attributes: [
      {
        trait_type: "Type",
        value: "Royal Guard",
      },
      {
        trait_type: "Area",
        value: UPPER_POI,
      },
    ],
  },

  getLand: ({ name, description, type, url, area }) => {
    return {
      // name: `Flamingo Land ${number}`,
      // description: `Flamingo Land ${type}`,
      name,
      description,
      external_url: url,
      image: url,
      attributes: [
        {
          trait_type: "Type",
          value: type,
        },
        {
          trait_type: "Area",
          value: area,
        },
      ],
    };
  },
};
