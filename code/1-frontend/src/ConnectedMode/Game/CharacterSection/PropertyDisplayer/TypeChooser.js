import React from "react";
import { nftKeys } from "../../../../constants";
// import "./Messages.css";
// import TitleSection from "../../../../ExpansiveComponents/TitleSection";
// import CharactersSelectSection from "./CharactersSelectSection";

const characterTypeToTitle = {
  [nftKeys.POIPOI]: "Ether",
  [nftKeys.GAME_CHARACTERS]: "Poly",
  [nftKeys.ULTRA_FLAMINS]: "Basic",
};

const TypeButton = ({
  buttonCharacterType,
  characterType,
  setCharacterType,
}) => {
  const title = characterTypeToTitle[buttonCharacterType];

  return (
    <div
      style={{
        width: "33%",
        backgroundColor:
          characterType === buttonCharacterType ? "blue" : "#212746",
        height: "100%",
        cursor: "pointer",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={() => {
        setCharacterType(buttonCharacterType);
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontFamily: '"Tajawal", sans-serif',
          color: "white",
        }}
      >
        {title}
      </div>
    </div>
  );
};

const TypeChooser = ({ characterType, setCharacterType }) => {
  // const isPoiPoi = nftKeys.POIPOI === characterType;

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#070b22",
        height: 70,

        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TypeButton
        buttonCharacterType={nftKeys.ULTRA_FLAMINS}
        characterType={characterType}
        setCharacterType={setCharacterType}
      />
      <TypeButton
        buttonCharacterType={nftKeys.GAME_CHARACTERS}
        characterType={characterType}
        setCharacterType={setCharacterType}
      />
      <TypeButton
        buttonCharacterType={nftKeys.POIPOI}
        characterType={characterType}
        setCharacterType={setCharacterType}
      />
    </div>
  );
};

export default TypeChooser;
