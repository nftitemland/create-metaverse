"use strict";

// `cId@QtLINc8KoAMCF4A=|t@1650166734450|x@0|y@0|cmd@MOVE_x$3_y$6`;
module.exports = (cmdValue) => {
  const splitCommandData = cmdValue.split("_");

  // [ "MOVE","x$3","y$6" ]
  const command = splitCommandData[0];

  const data = {};

  for (let i = 1; i < splitCommandData.length; i++) {
    const [key, value] = splitCommandData[i].split("$");

    data[key] = value;
  }

  const decodedCommandData = {
    command,
    data,
  };

  return decodedCommandData;
};
