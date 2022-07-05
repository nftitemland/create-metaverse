"use strict";

const AUX_NFT_1 = "AUX_NFT_1";

const tempConstants = {
  smartContractAddressAuxNft1: "0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB",
  asset_AuxNft1_: "asset_AuxNft1_",
};

const temporaryDb = {
  typeToParams: {
    AUX_NFT_1: {
      name: AUX_NFT_1,
      chain: "matic",
      tokenAddress: tempConstants.smartContractAddressAuxNft1,
      assetPrefix: tempConstants.asset_AuxNft1_,
      userCpDataKey: "aux1",
    },
  },
};

module.exports = temporaryDb;
