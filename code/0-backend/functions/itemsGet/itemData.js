"use strict";

const getSlimeUrl = (slimeNumber) =>
  `https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/slime_${slimeNumber}.png`;

const nftNames = {
  NORMAL_ITEM: "NORMAL_ITEM",
  GIGA_RARE_ITEM: "GIGA_RARE_ITEM",
  HYPER_RARE_ITEM: "HYPER_RARE_ITEM",
};

const { NORMAL_ITEM, GIGA_RARE_ITEM, HYPER_RARE_ITEM } = nftNames;

const nftUrls = {
  [NORMAL_ITEM]:
    "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/item_normal_1.png",
  [HYPER_RARE_ITEM]:
    "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/item_hyper_rare_1.png",
  [GIGA_RARE_ITEM]:
    "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/item_giga_rare_1.png",
};

const traitTypes = {
  ITEM: "Item",
  GURR: "Gurr",
  ELONA: "Elona",
};

const nftAttributes = {
  [NORMAL_ITEM]: [
    {
      trait_type: "Type",
      value: traitTypes.ITEM,
    },
    {
      trait_type: "Rarity",
      value: "Normal",
    },
  ],
};

const getName = (type, number) => {
  if (!number) {
    throw new Error("getName operation error, invalid number: " + number);
  }
  switch (type) {
    case NORMAL_ITEM:
      return `Item ${number}`;
    case HYPER_RARE_ITEM:
      return `Hyper-Rare Item ${number}`;
    case GIGA_RARE_ITEM:
      return `Giga-Rare Item ${number}`;
    default:
      throw new Error("getName operation error, invalid name: " + type);
  }
};

const nftDescriptions = {
  [NORMAL_ITEM]: "Normal rarity Item",
  [HYPER_RARE_ITEM]: "Hyper-rare Item",
  [GIGA_RARE_ITEM]: "Giga-rare Item",
};

const getSlimeDatum = (type, number) => {
  return {
    name: getName(type, number),
    description: nftDescriptions[type],
    external_url: nftUrls[type],
    image: nftUrls[type],
    attributes: nftAttributes[type],
  };
};

const genericSlimeDatum = {
  name: "NFT Item Land",
  description: "NFT Item Land Item",
  external_url: nftUrls[nftNames.NORMAL_ITEM],
  image: nftUrls[nftNames.NORMAL_ITEM],
  attributes: nftAttributes[nftNames.NORMAL_ITEM],
};

const getGurrDatum = ({ body, background, eyes, hat, description, number }) => {
  const attributes = [
    {
      trait_type: "Type",
      value: "Gurr",
    },
    {
      trait_type: "Body",
      value: body,
    },
    {
      trait_type: "Background",
      value: background,
    },
    {
      trait_type: "Eyes",
      value: eyes,
    },
  ];

  if (hat) {
    attributes.push({
      trait_type: "Hat",
      value: hat,
    });
  }

  return {
    name: `Gurr ${number}`,
    description,
    external_url: getSlimeUrl(number),
    image: getSlimeUrl(number),
    attributes,
  };
};

module.exports = {
  slimeData: [
    genericSlimeDatum,
    getSlimeDatum(GIGA_RARE_ITEM, 1),
    getSlimeDatum(GIGA_RARE_ITEM, 2),
    getSlimeDatum(GIGA_RARE_ITEM, 3),
    getSlimeDatum(GIGA_RARE_ITEM, 4),
    getSlimeDatum(HYPER_RARE_ITEM, 5),
    getSlimeDatum(HYPER_RARE_ITEM, 6),
    getSlimeDatum(GIGA_RARE_ITEM, 7),
    getSlimeDatum(GIGA_RARE_ITEM, 8),
    getSlimeDatum(GIGA_RARE_ITEM, 9),
    getSlimeDatum(GIGA_RARE_ITEM, 10),
    getSlimeDatum(NORMAL_ITEM, 11),
    getSlimeDatum(GIGA_RARE_ITEM, 12),
    getSlimeDatum(GIGA_RARE_ITEM, 13),
    getSlimeDatum(HYPER_RARE_ITEM, 14),
    getSlimeDatum(GIGA_RARE_ITEM, 15),
    getSlimeDatum(NORMAL_ITEM, 16),
    getSlimeDatum(HYPER_RARE_ITEM, 17),
    getSlimeDatum(GIGA_RARE_ITEM, 18),
    getSlimeDatum(GIGA_RARE_ITEM, 19),
    getSlimeDatum(GIGA_RARE_ITEM, 20),
    getSlimeDatum(GIGA_RARE_ITEM, 21),
    getSlimeDatum(HYPER_RARE_ITEM, 22),
    getSlimeDatum(NORMAL_ITEM, 23),
    getGurrDatum({
      number: 24,
      description:
        "She will go and set the world on fire, no one ever thought she could do that.",
      body: "Tesla Merch",
      background: "Tesla Cybertruck",
      eyes: "Hazel",
      hat: "Flower Crown",
    }),
    getGurrDatum({
      number: 25,
      description: `And I know you heard about me, so hey, let's be friends.`,
      body: "Nightclub Dress",
      background: "Geometric",
      eyes: "Blue",
      hat: "Heart",
    }),
    getSlimeDatum(NORMAL_ITEM, 26),
    getSlimeDatum(NORMAL_ITEM, 27),
    // getSlimeDatum(HYPER_RARE_ITEM, 28),
    getGurrDatum({
      number: 28,
      description:
        "Just a small town Gurr, living in a superposition of quantum states.",
      body: "Tesla Merch",
      background: "Tesla Cybertruck",
      eyes: "Green",
      hat: "Flower Crown",
    }),

    getSlimeDatum(NORMAL_ITEM, 29),
    getGurrDatum({
      number: 30,
      description: "Sparks Fly",
      body: "Favourite Outfit",
      background: "Planet Vacay",
      eyes: "Purple",
    }),
    getSlimeDatum(NORMAL_ITEM, 31),
    getGurrDatum({
      number: 32,
      description: "Riveting Gurr",
      body: "Factory Uniform",
      background: "Hangar",
      eyes: "Brown",
      hat: "Bandana",
    }),
    {
      name: "Emo Elona",
      description: "May I watch, please?",
      // description: "May I observe, please?",
      external_url: getSlimeUrl(33),
      image: getSlimeUrl(33),
      attributes: [
        {
          trait_type: "Type",
          value: "Elona",
        },
        {
          trait_type: "Body",
          value: "Sultry",
        },
        {
          trait_type: "Background",
          value: "Flower",
        },
        {
          trait_type: "Eyes",
          value: "Kaleidoscope",
        },
        {
          trait_type: "Hat",
          value: "Happy Shine",
        },
      ],
    },

    getSlimeDatum(GIGA_RARE_ITEM, 34),
    getSlimeDatum(GIGA_RARE_ITEM, 35),
    getSlimeDatum(HYPER_RARE_ITEM, 36),
    getSlimeDatum(GIGA_RARE_ITEM, 37),
    getSlimeDatum(NORMAL_ITEM, 38),
    getSlimeDatum(GIGA_RARE_ITEM, 39),

    getGurrDatum({
      number: 40,
      description: "Enchanté",
      body: "Boy Clothes",
      background: "Her World",
      eyes: "Hazel",
      hat: "Flower Crown",
    }),

    getGurrDatum({
      number: 41,
      description: "Didn't you flash your green eyes at me?",
      body: "Her Style",
      background: "Hellenic",
      eyes: "Green",
      hat: "Flower Crown",
    }),

    getSlimeDatum(GIGA_RARE_ITEM, 42),

    getGurrDatum({
      number: 43,
      description:
        "If you want to, I can save you, I can take you away from here.",
      body: "Poi X Merch",
      background: "Poi X Mission",
      eyes: "Crypto Blue",
      hat: "Headband",
    }),

    genericSlimeDatum,
  ],
};
