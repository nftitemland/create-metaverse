import React from "react";

const moreInfoData = [
  {
    topic: "What's NFT Item Land?",
    communication: (
      <div>
        NFT Item Land is an NFT play-to-earn (P2E) metaverse game platform.
      </div>
    ),
  },

  {
    topic: "Where are NFT Item Land NFTs on OpenSea?",

    maxComHeight: 59,
    diff: 1,
    communication: (
      <>
        {"Polygon Hunnies • "}
        <a
          href="https://opensea.io/collection/nftitem"
          target="_blank"
          rel="noreferrer"
          className="NewStandardExternalLink"
        >
          opensea.io/collection/nftitem
        </a>
        <br />
        <br />
        {"Ethereum Gurrs • "}
        <a
          href="https://opensea.io/collection/nftitemmars"
          target="_blank"
          rel="noreferrer"
          className="NewStandardExternalLink"
        >
          opensea.io/collection/nftitemmars
        </a>
        <br />
        <br />
        {"Basic Item • "}
        <a
          href="https://opensea.io/collection/nftitembasics"
          target="_blank"
          rel="noreferrer"
          className="NewStandardExternalLink"
        >
          opensea.io/collection/nftitembasics
        </a>
        <br />
        <br />
        {"Metaverse Lands • "}
        <a
          href="https://opensea.io/collection/nftitemland"
          target="_blank"
          rel="noreferrer"
          className="NewStandardExternalLink"
        >
          opensea.io/collection/nftitemland
        </a>
      </>
    ),
  },
  {
    maxComHeight: 500,
    diff: 5,
    topic: "Where's NFT Item Land on social media?",
    communication: (
      <>
        <a
          href="https://twitter.com/nftitemland"
          target="_blank"
          rel="noreferrer"
          className="NewStandardExternalLink"
        >
          {"NFT Item Land Twitter"}
        </a>{" "}
        • Key Updates
        <div
          style={{
            height: 20,
            width: 20,
          }}
        />
        <a
          href="https://twitter.com/dogedestinyapp"
          target="_blank"
          rel="noreferrer"
          className="NewStandardExternalLink"
        >
          {"Founder Twitter"}
        </a>{" "}
        • All Updates
        <div
          style={{
            height: 20,
            width: 20,
          }}
        />
        <div
          style={{
            fontSize: 22,
          }}
        >
          {"NFT Item Land Discord"}
        </div>
        {/* <div
          style={{
            fontSize: 18,
          }}
        >
          {"NFT Item Land Discord"}
        </div> */}
        <div>
          <iframe
            title="DiscordWidget"
            src="https://discord.com/widget?id=889480439910244402&theme=dark"
            width="250"
            height="320"
            allowtransparency="true"
            frameBorder="0"
            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
          ></iframe>
        </div>
      </>
    ),
  },

  // {
  //   topic: "What are NFT Item Land PoiPoi rarities?",
  //   maxComHeight: 300,
  //   diff: 3,
  //   communication: (
  //     <div>
  //       {`PoiPois have different rarity tiers. ` +
  //         `Rarer PoiPois provide better utility and produce better gaming rewards. `}
  //       <div
  //         style={{
  //           width: 2,
  //           height: 12,
  //         }}
  //       />
  //       PoiPoi rarity tiers are based on how much they were minted for.
  //       Giga-Rare PoiPois have the highest minting cost. Hyper-Rare PoiPois are
  //       lower in cost. Normal rarity PoiPois are minted in giveaways.
  //     </div>
  //   ),
  // },

  {
    topic: "How does NFT Item Land minting work?",
    maxComHeight: 200,
    diff: 5,
    communication: (
      <div>
        {/* {`From the user's perspective ` +
          `to mint a PoiPoi, ` +
          `what's required is completing the steps in the above section "How do I mint an NFT Item Land PoiPoi?".`} */}
        {/* <div
          style={{
            width: 2,
            height: 12,
          }}
        /> */}
        Basic Item, Polygon Hunny, and Land minting have standard decentralized
        smart-contract based minting on the Polygon blockchain.
        <div
          style={{
            width: 2,
            height: 12,
          }}
        />
        Original Gurrs (on the Ethereum blockchain) are all 1-of-1 and are only
        minted via email request to support@dogedestiny.com. Ethereum Gurrs will
        always have the highest level game utility!
      </div>
    ),
  },

  {
    topic: "Do I need an NFT game character to play?",
    maxComHeight: 50,
    diff: 3,
    communication: (
      <div>
        {/* {`From the user's perspective ` +
          `to mint a PoiPoi, ` +
          `what's required is completing the steps in the above section "How do I mint an NFT Item Land PoiPoi?".`} */}
        {/* <div
          style={{
            width: 2,
            height: 12,
          }}
        /> */}
        No, you can play for free as the default character without any NFT.
      </div>
    ),
  },

  {
    topic: "How will my NFT appear in-game?",
    maxComHeight: 200,
    diff: 5,
    communication: (
      <div>
        <b>P2E Battle</b>
        <br />
        The in-game P2E playable NFTs are any NFTs from the Basic Item, Polygon
        Hunnies, or Ethereum Gurrs collections.
        <br />
        <br />
        Basic Item NFTs increase your default character's power level. All NFTs
        from the Polygon and Ethereum Gurr collections each provide an in-game
        playable character. Polygon Hunnies have a high power level and Ethereum
        Gurrs have a very high power level.
        <br />
        <br />
        NFTs from these three collections are selectable in-game within a few
        minutes after minting, transferring, or purchasing on the market.
        <br />
        <br />
        <b>Land Party Metaverse</b>
        <br />
        NFTs from the Basic Item, Polygon Hunnies, or Ethereum Gurrs collections
        all unlock playable multiplayer metaverse characters.
      </div>
    ),
  },

  {
    topic: "How does NFT Item Land manage data?",
    maxComHeight: 200,
    // diff:
    communication: (
      <div>
        NFT Item Land prioritizes data privacy and security. NFT Item Land does
        not collect personally identifiable information.
        <br />
        <br />
        Some data collection is used in order to provide statistics and utility
        to support NFT holders. Any data collected will be anonymized and no
        personally identifiable information will be taken or used.
        <br />
        <br />
        NFT Item Land does use several different web services for hosting and
        for security including Google to prevent bots; this site is protected by
        reCAPTCHA and the {`Google `}
        <a
          target="_blank"
          rel="noreferrer"
          className="NewStandardExternalLink"
          href="https://policies.google.com/privacy"
        >
          Privacy Policy
        </a>{" "}
        and{" "}
        <a
          target="_blank"
          rel="noreferrer"
          className="NewStandardExternalLink"
          href="https://policies.google.com/terms"
        >
          Terms of Service
        </a>{" "}
        apply.
      </div>
    ),
  },

  {
    topic: "Who founded NFT Item Land?",
    maxComHeight: 50,
    // maxComHeight: 110,
    // diff: 1,
    communication: (
      <div>
        {`NFT Item Land was founded by artist DogeDestiny. `}
        <a
          href="https://twitter.com/dogedestinyapp"
          target="_blank"
          rel="noreferrer"
          className="NewStandardExternalLink"
        >
          Doge Destiny on Twitter
        </a>
      </div>
    ),
  },

  {
    topic: "Who do I contact for support?",
    maxComHeight: 50,
    communication: (
      <div>
        {`If you have any questions please email `}
        support
        <wbr />
        @dogedestiny.com.
      </div>
    ),
  },
];

export default moreInfoData;

// const { cnPalaceMain, cnPalaceJuice } = isMobileMode
//   ? {
//       cnPalaceMain: "PalaceMain Mobile",
//       cnPalaceJuice: "PalaceJuice Mobile",
//     }
//   : {
//       cnPalaceMain: "PalaceMain",
//       cnPalaceJuice: "PalaceJuice",
//     };
