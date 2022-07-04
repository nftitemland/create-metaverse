"use strict";

const {
  realtime: { realPoiComponentNames, realPoiInteractTags },
} = require("../../constants");

const compiledMapData = {
  coordKeyToData: {},
  coordKeys: [],
};

const coordKeyToData = {
  "0$0": {
    w: 1660,
    h: 700,
    componentData: [
      // {
      //   name: componentNames.COUCH,
      //   x: 300,
      //   y: 200,
      // },
      {
        name: realPoiComponentNames.DOOR,
        // x: 725,
        // y: 0,

        x: 1200,
        y: 0,
        to: {
          x: 630,
          y: 570,
          crdX: 0,
          crdY: 1,
        },
      },

      {
        name: realPoiComponentNames.DOOR,
        x: 1450,
        y: 0,
        to: {
          x: 150,
          y: 150,
          crdX: 1,
          crdY: 0,
        },
      },
      // {
      //   name: componentNames.DOOR,
      // x: 1200,
      // y: 0,
      //   to: {
      //     x: 200,
      //     y: 0,
      //     crdX: 1,
      //     crdY: 0,
      //   },
      // },
    ],
  },

  "-1$0": {
    w: 700,
    h: 700,
    componentData: [
      // {
      //   name: componentNames.COUCH,
      //   x: 300,
      //   y: 200,
      // },
      {
        name: realPoiComponentNames.DOOR,

        x: 0,
        y: 0,
        to: {
          x: 50,
          y: 50,
          crdX: 0,
          crdY: 0,
        },
      },
    ],
  },

  "1$0": {
    w: 500,
    h: 1100,
    // ownerUserId: "0338187a-46e4-4ed3-bd19-85a7699f81af", // DAMILOSKI
    // ownerUserId: "be18091a-8378-40b8-9417-9eaae16c983f",
    componentData: [
      {
        name: realPoiComponentNames.DOOR,
        x: 0,
        y: 0,
        to: {
          x: 50,
          y: 50,
          crdX: 0,
          crdY: 0,
        },
      },
      {
        name: realPoiComponentNames.FOUNTAIN,
        x: 125,
        y: 720,
        to: {
          x: 50,
          y: 50,
          crdX: 0,
          crdY: 0,
        },
      },
    ],
  },

  "0$1": {
    w: 1000,
    h: 1000,
    // ownerUserId: "0338187a-46e4-4ed3-bd19-85a7699f81af", // DAMILOSKI
    ownerUserId: "be18091a-8378-40b8-9417-9eaae16c983f",
    componentData: [
      {
        name: realPoiComponentNames.COUCH,

        x: 500,
        y: 50,
      },
      {
        tag: realPoiInteractTags.FUNTUB,
        name: realPoiComponentNames.TUB,
        x: 275,
        y: 395,
      },

      {
        name: realPoiComponentNames.DOOR,
        x: 850,
        y: 635,
        to: {
          x: 50,
          y: 50,
          crdX: 0,
          crdY: 0,
        },
      },
      {
        name: realPoiComponentNames.ZENPOND,
        x: 0,
        y: -25,
      },
      {
        name: realPoiComponentNames.FLOWERPOT,
        x: 25,
        y: 725,
      },
      // {
      //   name: componentNames.BED,
      //   x: 600,
      //   y: 600,
      // },
    ],
  },
};

const coordKeys = Object.keys(coordKeyToData);

compiledMapData.coordKeys.push(...coordKeys);

for (const coordKey of coordKeys) {
  // can compile
  // component name to tag

  const data = coordKeyToData[coordKey];

  compiledMapData.coordKeyToData[coordKey] = data;
  // const updatedData = Object.assign({}, data, {
  //   coordKey,
  // });

  // compiledMapData.coordKeyToData[coordKey] = updatedData;
}

// module.exports = () => {
//   return compiledMapData;
// };

module.exports = compiledMapData;

/*
    getUserMapLevel

*/
