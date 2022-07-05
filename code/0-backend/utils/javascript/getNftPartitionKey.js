"use strict";

const getNftPartitionKey = ({ tokenId, tokenAddress }) => {
  return `nft_${tokenAddress}_${tokenId}`;
};

module.exports = getNftPartitionKey;
