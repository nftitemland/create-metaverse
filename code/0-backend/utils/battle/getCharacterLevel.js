"use strict";

const {
  nftKeys: { POIPOI },
} = require("../constants");

const getRoundedNumber = require("../getRoundedNumber");

const getCharacterLevel = ({ user }) => {
  const selectedCharacter = user.txDbCache && user.txDbCache.selectedCharacter;

  const battleBonus = (selectedCharacter && selectedCharacter.battleBonus) || 0;

  if (!selectedCharacter) {
    return battleBonus;
  }
  switch (selectedCharacter.type) {
    case POIPOI:
      return getRoundedNumber(100 + battleBonus);

    default:
      return battleBonus;
  }
};

module.exports = getCharacterLevel;
