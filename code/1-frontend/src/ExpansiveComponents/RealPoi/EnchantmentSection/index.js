import React from "react"; //  useEffect, useState
import EnchantmentSelect from "./EnchantmentSelect";
import { enchantments } from "../../../constants";

const EnchantmentSection = ({ stateWebsocket, userId, selfPoiData }) => {
  return (
    <div
      style={{
        // marginTop: 50,
        // width: MAP_WIDTH,
        // width: 220,
        // height: 100,
        // backgroundColor: "purple",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
      }}
    >
      <EnchantmentSelect
        options={enchantments.character}
        stateWebsocket={stateWebsocket}
        userId={userId}
        selfPoiData={selfPoiData}
      />
      {/* <EnchantmentSelect name={"Character2"} /> */}
    </div>
  );
};

export default EnchantmentSection;
