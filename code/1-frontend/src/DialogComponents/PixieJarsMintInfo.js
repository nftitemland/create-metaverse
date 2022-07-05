import "./GameMoreInfo.css";

const PixieJarsMintInfo = () => {
  return (
    <div className={"GameMoreInfo"}>
      <div className="TopMeta">
        <div
          className="TitleMeta"
          style={{
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <div className="Text">
            {"NFT Item Official Pixie Jars Mint Hosting"}
          </div>
        </div>

        <img
          alt="pixie"
          style={{
            width: "80%",
          }}
          src={
            "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/pixies/490.png"
          }
        ></img>
      </div>

      <div className="BottomMeta">
        <div className="TextMeta">
          <div
            className="Text"
            style={{
              marginTop: 20,
              marginBottom: 20,
            }}
          >
            The official Pixie Jars NFT minting site has been moved here. Please
            see the{" "}
            {<a href={"https://linktr.ee/PixieJars"}>Pixie Jars Linktree</a>}{" "}
            for more info. Pixie staking now live. NFT Item is working with
            Pixie Jars and generated Pixie Tokens will be shared with the
            artist, Pixie Jars, fairly.🧚‍♀️
          </div>
        </div>
      </div>
    </div>
  );
};

export default PixieJarsMintInfo;
