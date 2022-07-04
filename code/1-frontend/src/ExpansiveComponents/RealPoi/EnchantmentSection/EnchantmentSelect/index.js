import React, { useState } from "react"; //  useEffect, useState
import { enchantments, enchantTraitCharacters } from "../../../../constants";
// import FirstSection from "./FirstSection";
import { LeftButton, RightButton } from "./LeftAndRightButtons";
import SelectEnchantmentButton from "./SelectEnchantmentButton";

const EnchantmentSelect = ({
  name,
  options,
  stateWebsocket,
  userId,
  selfPoiData,
}) => {
  const optionKeys = Object.keys(options);

  const [index, setIndex] = useState(0);

  // console.log(`

  //     MEGA LOG: ${JSON.stringify(
  //       {
  //         index,
  //         s: optionKeys[index],
  //       },
  //       null,
  //       4
  //     )}

  // `);

  const currentOptionName = optionKeys[index];

  const currentOptionDatum = options[currentOptionName];

  // console.log(`

  //     MEGA LOG: ${JSON.stringify(
  //       {
  //         currentOptionDatum,
  //       },
  //       null,
  //       4
  //     )}

  // `);

  const enchantmentRequirementLevel =
    typeof enchantments.character?.[currentOptionName]?.requiredLevel ===
    "number"
      ? enchantments.character[currentOptionName].requiredLevel
      : 100;

  const selfLvl = selfPoiData.lvl || 100;

  let isAllowed = selfLvl <= enchantmentRequirementLevel;

  const requiredKey = enchantments.character?.[currentOptionName]?.requiredKey;

  if (requiredKey) {
    if (!selfPoiData[requiredKey]) {
      isAllowed = false;
    }
  }

  return (
    <div
      style={{
        // marginTop: 50,
        // width: MAP_WIDTH,
        width: 200,
        // height: 100,
        backgroundColor: "teal",

        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <FirstSection name={name} /> */}

      <div
        style={{
          // width: "100%",
          // width: 320,
          // height: "100%",
          // backgroundColor: "salmon",

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 200,
            height: 280,
            // height: "100%",
            backgroundColor: "black",
            fontFamily: `"Amaranth", sans-serif`,
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {currentOptionDatum && (
            <img
              alt={"Selectable Character Trait"}
              style={{
                width:
                  currentOptionName === enchantTraitCharacters.GURR
                    ? "96%"
                    : "unset",
                maxWidth: "100%",
                maxHeight: "100%",
                userSelect: "none",
                // minHeight: 313,
                // minHeight: 313,
              }}
              src={currentOptionDatum.image}
            ></img>
          )}
        </div>

        <div
          style={{
            width: "100%",
            // height: 40,
            // height: "100%",
            backgroundColor: "rgb(18, 34, 158)",
            // fontFamily: `"Amaranth", sans-serif`,

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              marginTop: 10,
              marginBottom: 10,
              width: "90%",
              height: 20,
              // height: "100%",
              // backgroundColor: "pink",
              backgroundColor: "black",
              paddingLeft: 2,
              paddingTop: 10,
              paddingBottom: 10,
              paddingRight: 2,
              borderRadius: 20,
              fontSize: 18,
              // fontFamily: `"Amaranth", sans-serif`,

              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",

              fontFamily: `"Amaranth", sans-serif`,
              textAlign: "center",
              color: "white",
            }}
          >
            {currentOptionDatum.displayName}
          </div>
        </div>

        <div
          style={{
            width: "100%",
            // height: 40,
            // height: "100%",
            backgroundColor: "rgb(18, 34, 158)",
            // fontFamily: `"Amaranth", sans-serif`,

            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              // marginTop: 10,
              marginBottom: 10,
              width: "90%",
              height: 20,
              fontSize: 15,
              // height: "100%",
              // backgroundColor: "pink",
              // backgroundColor: "#4e7ef2",
              paddingLeft: 2,
              paddingTop: 10,
              paddingBottom: 10,
              paddingRight: 2,
              borderRadius: 2,
              // width: "90%",
              // height: 20,
              // height: "100%",
              backgroundColor: isAllowed ? "#00c61c" : "#77005d",
              // fontFamily: `"Amaranth", sans-serif`,

              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",

              fontFamily: `"Amaranth", sans-serif`,
              textAlign: "center",
              color: isAllowed ? "black" : "white",
            }}
          >
            {isAllowed ? "Activated" : currentOptionDatum.missingLvlMessage}
          </div>
        </div>

        <div
          style={{
            width: "100%",
            // height: 40,
            // height: "100%",
            backgroundColor: "orange",
            fontFamily: `"Amaranth", sans-serif`,

            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <LeftButton
            index={index}
            setIndex={setIndex}
            optionKeys={optionKeys}
          />
          <SelectEnchantmentButton
            currentOptionName={currentOptionName}
            currentOptionRequiredLevel={currentOptionName}
            stateWebsocket={stateWebsocket}
            userId={userId}
            selfPoiData={selfPoiData}
            enchantmentRequirementLevel={enchantmentRequirementLevel}
            selfLvl={selfLvl}
            isAllowed={isAllowed}
          />
          <RightButton
            index={index}
            setIndex={setIndex}
            optionKeys={optionKeys}
          />
        </div>
      </div>
    </div>
  );
};

export default EnchantmentSelect;
