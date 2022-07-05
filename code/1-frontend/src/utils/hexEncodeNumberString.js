const hexEncode = function (stringValue) {
  // var hex, i;

  // var result = "";
  // for (i = 0; i < stringValue.length; i++) {
  //   hex = stringValue.charCodeAt(i).toString(16);
  //   result += ("000" + hex).slice(-4);
  // }

  const hex = Number(stringValue).toString(16);

  return `0x${hex}`;
};

export default hexEncode;
