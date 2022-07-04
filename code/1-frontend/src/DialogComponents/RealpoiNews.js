const RealPoiNews = () => {
  return (
    <div
      className={"GameMoreInfo"}
      style={{
        borderStyle: "solid",
        borderWidth: 3,
        borderColor: "darkblue",
      }}
    >
      <div
        className="TopMeta"
        style={{
          width: "90%",
        }}
      >
        <div
          className="TitleMeta"
          style={{
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <div className="Text">{"Metaverse News"}</div>
        </div>

        <div
          className="Text"
          style={{
            width: "94%",
            marginTop: 3,
            marginBottom: 2,
            fontSize: 16,
            // width: "100%",
            fontFamily: `"Tajawal", sans-serif`,
            color: "white",
          }}
        >
          Updated April 29th 2022
        </div>

        <img
          alt="World"
          style={{
            width: "80%",
          }}
          src={
            "https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/realpoi_world_2_background.png"
          }
        ></img>
      </div>

      <div className="BottomMeta">
        <div className="TextMeta">
          <div
            className="Text"
            style={{
              marginTop: 20,
              marginBottom: 15,
              fontFamily: `"Tajawal", sans-serif`,
            }}
          >
            Welcome to the new realtime multiplayer NFT Item Land metaverse.
            <br />
            <br />
            Enjoy the luxurious Grand Squirrel Lobby while new metaverse lands
            and features are currently being constructed by NFTItemLand.com.
            <br />
            <br />
            Stay tuned on Twitter for key metaverse updates!
            <br />
            <a
              href={"https://twitter.com/nftitemland"}
              target="_blank"
              rel="noreferrer"
              className="NewStandardExternalLink"
            >
              <div
                style={{
                  marginTop: 4,
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-start",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 50,
                    height: 50,
                    // backgroundColor: "blue",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginRight: 10,
                    fontSize: 20,
                  }}
                >
                  <img
                    alt="Twitter logo"
                    src="https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/twitterlogo.png"
                    style={{
                      width: "100%",
                    }}
                  ></img>
                </div>
                <span
                  style={{
                    fontSize: 20,
                    fontFamily: `"Tajawal", sans-serif`,
                  }}
                >
                  NFT Item Land on Twitter
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealPoiNews;
