"use strict";

const getCharacterUrl = (characterNumber) =>
  `https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/character-images/character_${characterNumber}.png`;

const description = "NFT Item Land game character";

const getBoi = (n) => {
  return {
    description,
    // description: "NFT Item Land game character",
    external_url: getCharacterUrl(n),
    image: getCharacterUrl(n),
    name: `Boi ${n}`,
    attributes: [
      {
        trait_type: "Type",
        value: "Boi",
      },
    ],
  };
};

const getGurr = (n) => {
  return {
    description,
    external_url: getCharacterUrl(n),
    image: getCharacterUrl(n),
    name: `Gurr ${n}`,
    attributes: [
      {
        trait_type: "Type",
        value: "Gurr",
      },
    ],
  };
};

const NEAR_EVO_GURR_URL =
  "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/character-images/character_near_evo.png";

const getDefaultGurr = (n) => {
  return {
    description:
      "NFT Item Land game character, default Gurr. " +
      "This Gurr will evolve within 24 hours!",
    external_url: getCharacterUrl(696969),
    image: getCharacterUrl(696969),
    name: `Gurr ${n}`,
    attributes: [
      {
        trait_type: "Type",
        value: "Gurr",
      },
      // {
      //   trait_type: "Item",
      //   value: "Tesla Cybertruck",
      // },
    ],
  };
};

const getDefaultGurrV2 = (n) => {
  return {
    description:
      "NFT Item Land game character, default Gurr V2. " +
      "This Gurr will evolve soon!",
    external_url: NEAR_EVO_GURR_URL,
    image: NEAR_EVO_GURR_URL,
    name: `Gurr ${n}`,
    attributes: [
      {
        trait_type: "Type",
        value: "Gurr",
      },
      // {
      //   trait_type: "Item",
      //   value: "Tesla Cybertruck",
      // },
    ],
  };
};

module.exports = {
  getDefaultGurr,
  itemData: [
    {
      description: "Reserved for Game Character",
      external_url: getCharacterUrl(0),
      image: getCharacterUrl(0),
      name: "Reserved for Game Character",
      attributes: [
        {
          trait_type: "Type",
          value: "Reserved",
        },
      ],
    },
    {
      description: "NFT Item Land game character",
      external_url: getCharacterUrl(1),
      image: getCharacterUrl(1),
      name: "Gurr 1",
      attributes: [
        {
          trait_type: "Type",
          value: "Gurr",
        },
      ],
    },

    {
      description: "NFT Item Land game character",
      external_url: getCharacterUrl(2),
      image: getCharacterUrl(2),
      name: "Gurr 2",
      attributes: [
        {
          trait_type: "Type",
          value: "Gurr",
        },
      ],
    },

    {
      description: "NFT Item Land game character",
      external_url: getCharacterUrl(3),
      image: getCharacterUrl(3),
      name: "Gurr 3",
      attributes: [
        {
          trait_type: "Type",
          value: "Gurr",
        },
        // {
        //   trait_type: "Item",
        //   value: "Tesla Cybertruck",
        // },
      ],
    },

    {
      description: "NFT Item Land game character",
      external_url: getCharacterUrl(4),
      image: getCharacterUrl(4),
      name: "Boi 4",
      attributes: [
        {
          trait_type: "Type",
          value: "Boi",
        },
        // {
        //   trait_type: "Item",
        //   value: "Tesla Cybertruck",
        // },
      ],
    },

    {
      description: "NFT Item Land game character",
      external_url: getCharacterUrl(5),
      image: getCharacterUrl(5),
      name: "Gurr 5",
      attributes: [
        {
          trait_type: "Type",
          value: "Gurr",
        },
        // {
        //   trait_type: "Item",
        //   value: "Tesla Cybertruck",
        // },
      ],
    },

    {
      description: "NFT Item Land game character",
      external_url: getCharacterUrl(6),
      image: getCharacterUrl(6),
      name: "Gurr 6",
      attributes: [
        {
          trait_type: "Type",
          value: "Gurr",
        },
        // {
        //   trait_type: "Item",
        //   value: "Tesla Cybertruck",
        // },
      ],
    },

    {
      description: "NFT Item Land game character",
      external_url: getCharacterUrl(7),
      image: getCharacterUrl(7),
      name: "Gurr 7",
      attributes: [
        {
          trait_type: "Type",
          value: "Gurr",
        },
        // {
        //   trait_type: "Item",
        //   value: "Tesla Cybertruck",
        // },
      ],
    },

    {
      description: "NFT Item Land game character",
      external_url: getCharacterUrl(8),
      image: getCharacterUrl(8),
      name: "Gurr 8",
      attributes: [
        {
          trait_type: "Type",
          value: "Gurr",
        },
        // {
        //   trait_type: "Item",
        //   value: "Tesla Cybertruck",
        // },
      ],
    },

    {
      description: "NFT Item Land game character",
      external_url: getCharacterUrl(9),
      image: getCharacterUrl(9),
      name: "Boi 9",
      attributes: [
        {
          trait_type: "Type",
          value: "Boi",
        },
        // {
        //   trait_type: "Item",
        //   value: "Tesla Cybertruck",
        // },
      ],
    },

    {
      description: "NFT Item Land game character",
      external_url: getCharacterUrl(10),
      image: getCharacterUrl(10),
      name: "Gurr 10",
      attributes: [
        {
          trait_type: "Type",
          value: "Gurr",
        },
        // {
        //   trait_type: "Item",
        //   value: "Tesla Cybertruck",
        // },
      ],
    },

    {
      description: "NFT Item Land game character",
      external_url: getCharacterUrl(11),
      image: getCharacterUrl(11),
      name: "Gurr 11",
      attributes: [
        {
          trait_type: "Type",
          value: "Gurr",
        },
        // {
        //   trait_type: "Item",
        //   value: "Tesla Cybertruck",
        // },
      ],
    },

    getGurr(12),
    getGurr(13),
    getGurr(14),
    getBoi(15),
    getGurr(16),
    getGurr(17),
    getGurr(18),
    getGurr(19),
    getGurr(20),
    getGurr(21),
    getGurr(22),
    getGurr(23),
    getBoi(24),
    getGurr(25),
    getGurr(26),
    getGurr(27),
    getGurr(28),
    getDefaultGurrV2(29),
    getDefaultGurrV2(30),
    getDefaultGurrV2(31),
    getGurr(32),
    getDefaultGurrV2(33),
    getDefaultGurrV2(34),
    getDefaultGurrV2(35),
    getDefaultGurrV2(36),
    getDefaultGurrV2(37),
    getDefaultGurrV2(38),
    getDefaultGurrV2(39),
    getDefaultGurrV2(40),
    getDefaultGurr(41),
    getDefaultGurr(42),
    getDefaultGurr(43),
    getDefaultGurr(44),
    getDefaultGurr(45),
    getDefaultGurr(46),
    getDefaultGurr(47),
    getDefaultGurr(48),
    getDefaultGurr(49),
    getDefaultGurr(50),
  ],

  getItem: ({ name, description, type, url }) => {
    return {
      name,
      description,
      external_url: url,
      image: url,
      attributes: [
        {
          trait_type: "Type",
          value: type,
        },
      ],
    };
  },
};
