import { enchantTraitCharacters } from "../../../../constants";

const componentNames = {
  COUCH: "COUCH",
  DOOR: "DOOR",
  TUB: "TUB",
  BED: "BED",
  ZENPOND: "ZENPOND",
  FLOWERPOT: "FLOWERPOT",
  FOUNTAIN: "FOUNTAIN",
};

const tubImages = {
  empty:
    "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/enchantment_object_tub_4empty.png",
  boi: "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/enchantment_object_tub_4boi.png",
  gurr: "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/enchantment_object_tub_4gurr.png",
  love: "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/enchantment_object_tub_4love.png",
};

const IMAGE_FOUNTAIN_3 =
  "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/enchantment_object_fountain_3.png";

const Fountain = ({ x, y, s }) => {
  return (
    <div
      style={{
        width: 270 * s,
        // height: 100 * s,
        // backgroundColor: "teal",
        position: "absolute",
        // position: "relative",
        left: x * s,
        top: y * s,
      }}
    >
      <img
        alt="fountain"
        style={{
          width: "100%",
        }}
        src={IMAGE_FOUNTAIN_3}
      ></img>
    </div>
  );
};

const ZenPond = ({ x, y, s }) => {
  return (
    <div
      style={{
        width: 300 * s,
        // height: 100 * s,
        // backgroundColor: "blue",
        // position: "relative",
        position: "absolute",
        left: x * s,
        top: y * s,
      }}
    >
      <img
        alt="zen pond"
        style={{
          width: "100%",
        }}
        src={
          "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/realpoi_object_zenpond_1.png"
        }
      ></img>
    </div>
  );
};

const FlowerPot = ({ x, y, s }) => {
  return (
    <div
      style={{
        width: 100 * s,
        // height: 100 * s,
        // backgroundColor: "blue",
        // position: "relative",
        position: "absolute",
        left: x * s,
        top: y * s,
      }}
    >
      <img
        alt="flowerpot"
        style={{
          width: "100%",
        }}
        src={
          "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/realpoi_object_flowerpot_1.png"
        }
      ></img>
    </div>
  );
};

const Bed = ({ x, y, s }) => {
  return (
    <div
      style={{
        width: 100 * s,
        height: 100 * s,
        backgroundColor: "beige",
        position: "absolute",
        left: x * s,
        top: y * s,
      }}
    ></div>
  );
};

const getTubImageUrl = (selfTubCoordKeyData) => {
  if (selfTubCoordKeyData.BOI && selfTubCoordKeyData.GURR) {
    return tubImages.love;
  } else if (selfTubCoordKeyData.BOI) {
    return tubImages.boi;
  } else if (selfTubCoordKeyData.GURR) {
    return tubImages.gurr;
  }
  return tubImages.empty;
};

const Tub = ({
  x,
  y,
  s,
  crdX,
  crdY,
  stateWebsocket,
  userId,
  lvl,
  etC,
  selfPoiCoordKey,
  tubCoordKeyToData,
}) => {
  const selfTubCoordKeyData = tubCoordKeyToData[selfPoiCoordKey] || {};

  const tubImageUrl = getTubImageUrl(selfTubCoordKeyData);

  return (
    <div
      style={{
        width: 420 * s,
        // height: 100 * s,
        // backgroundColor: "blue",
        // position: "relative",
        position: "absolute",
        left: x * s,
        top: y * s,
      }}
      onClick={() => {
        if (lvl > 1) {
          return;
        }

        const tubby = etC === enchantTraitCharacters.BOI ? "TUBBOI" : "TUBGURR";
        // const tubby = "TUBGURR";

        const message = `${userId}|INTERACT|${crdX}@${crdY}@FUNTUB@${tubby}`;

        // console.log(`

        //     MEGA LOG: ${JSON.stringify(
        //       {
        //         MAKA: message,
        //       },
        //       null,
        //       4
        //     )}

        // `);

        // return;÷¿÷

        stateWebsocket.send(message);
      }}
    >
      <img
        alt="tub"
        style={{
          width: "100%",
        }}
        src={
          tubImageUrl
          //"https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/realpoi_object_tub_1.png"
        }
      ></img>
    </div>
  );
};

const Couch = ({ x, y, s }) => {
  return (
    <div
      style={{
        width: 400 * s,
        // height: 100 * s,
        // backgroundColor: "teal",
        position: "absolute",
        // position: "relative",
        left: x * s,
        top: y * s,
      }}
    >
      <img
        alt="couch"
        style={{
          width: "100%",
        }}
        src={
          "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/realpoi_object_couch_1.png"
        }
      ></img>
    </div>
  );
};

const Door = ({
  x,
  y,
  s,
  stateWebsocket,
  userId,
  to,
  selfPoiUserGameDatum,
  offsetTransport = true,
}) => {
  return (
    <div
      style={{
        width: 150 * s,
        // height: 100 * s,
        // backgroundColor: "red",
        position: "absolute",
        left: x * s,
        top: y * s,
      }}
      onClick={() => {
        // console.log("NAOW");

        if (!stateWebsocket) {
          return;
        }

        // console.log(`

        //     MEGA LOG: ${JSON.stringify(
        //       {
        //         NAR: "OW",
        //       },
        //       null,
        //       4
        //     )}

        // `);

        let xOffset = 0;
        let yOffset = 0;

        if (
          offsetTransport &&
          (!selfPoiUserGameDatum.etC ||
            selfPoiUserGameDatum.etC === enchantTraitCharacters.SQUR)
        ) {
          xOffset += 100;
        }

        const message = `${userId}|ENTER|${to.x + xOffset}@${to.y + yOffset}@${
          to.crdX
        }@${to.crdY}`;

        try {
          stateWebsocket.send(message);
        } catch (err) {
          console.log("error in sending action:", err);
        }
      }}
    >
      <img
        alt="door"
        style={{
          width: "100%",
        }}
        src={
          "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/realpoi_object_door_1.png"
        }
      ></img>
    </div>
  );
};

const MapFederalResources = ({
  // coordKey,
  stateWebsocket,
  userId,
  selfPoiCoordData,
  selfPoiUserGameDatum,
  s,
  tubCoordKeyToData,
  selfPoiCoordKey,
}) => {
  const mapFederalResources = [];

  const componentDataLength = selfPoiCoordData?.componentData?.length || 0;

  for (let i = 0; i < componentDataLength; i++) {
    const selfPoiCoordDatum = selfPoiCoordData.componentData[i];

    switch (selfPoiCoordDatum.name) {
      case componentNames.COUCH: {
        const couch = (
          <Couch
            key={`${i}key`}
            x={selfPoiCoordDatum.x}
            y={selfPoiCoordDatum.y}
            s={s}
          />
        );

        mapFederalResources.push(couch);

        break;
      }

      case componentNames.DOOR: {
        const couch = (
          <Door
            key={`${i}key`}
            x={selfPoiCoordDatum.x}
            y={selfPoiCoordDatum.y}
            s={s}
            stateWebsocket={stateWebsocket}
            userId={userId}
            to={selfPoiCoordDatum.to}
            selfPoiUserGameDatum={selfPoiUserGameDatum}
          />
        );

        mapFederalResources.push(couch);

        break;
      }

      case componentNames.TUB: {
        const tub = (
          <Tub
            key={`${i}key`}
            x={selfPoiCoordDatum.x}
            y={selfPoiCoordDatum.y}
            s={s}
            crdX={selfPoiUserGameDatum.crdX}
            crdY={selfPoiUserGameDatum.crdY}
            stateWebsocket={stateWebsocket}
            userId={userId}
            lvl={selfPoiUserGameDatum.lvl}
            etC={selfPoiUserGameDatum.etC}
            selfPoiCoordKey={selfPoiCoordKey}
            tubCoordKeyToData={tubCoordKeyToData}
          />
        );

        mapFederalResources.push(tub);

        break;
      }

      case componentNames.ZENPOND: {
        const zenPond = (
          <ZenPond
            key={`${i}key`}
            x={selfPoiCoordDatum.x}
            y={selfPoiCoordDatum.y}
            s={s}
          />
        );

        mapFederalResources.push(zenPond);

        break;
      }

      case componentNames.FLOWERPOT: {
        const zenPond = (
          <FlowerPot
            key={`${i}key`}
            x={selfPoiCoordDatum.x}
            y={selfPoiCoordDatum.y}
            s={s}
          />
        );

        mapFederalResources.push(zenPond);

        break;
      }
      case componentNames.BED: {
        const bed = (
          <Bed
            key={`${i}key`}
            x={selfPoiCoordDatum.x}
            y={selfPoiCoordDatum.y}
            s={s}
          />
        );

        mapFederalResources.push(bed);

        break;
      }

      case componentNames.FOUNTAIN: {
        const fountain = (
          <Fountain
            key={`${i}key`}
            x={selfPoiCoordDatum.x}
            y={selfPoiCoordDatum.y}
            s={s}
          />
        );

        mapFederalResources.push(fountain);
        break;
      }

      default:
        break;
    }
  }

  // if (coordKey === "0$0") {
  //   mapFederalResources.push(
  //     <div
  //       key={"0$0$a"}
  // style={{
  //   width: 100,
  //   height: 100,
  //   backgroundColor: "blue",
  //   position: "relative",
  //   left: 100,
  // }}
  // onClick={() => {
  //   console.log("NAOW");

  //   if (!stateWebsocket) {
  //     return;
  //   }

  //   const message = `${userId}|ENTER|${250}@${250}@${1}@${2}`;

  //   try {
  //     stateWebsocket.send(message);
  //   } catch (err) {
  //     console.log("error in sending action:", err);
  //   }
  // }}
  //     ></div>
  //   );
  // }

  return mapFederalResources;
};

export default MapFederalResources;
