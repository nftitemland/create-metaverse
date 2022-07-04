/*

    Roadmap Element:

        Website
        build metaverse foundation website

        Airdrop
        launch metaverse map and airdrop NFTs

        
*/

const roadmapElementData = [
  // {
  //   title: "Website",
  //   completed: true,
  //   text: `Build base metaverse foundation website.`,
  // },
  // {
  //   title: "Land Airdrop",
  //   completed: true,
  //   text: `Distribute lands to select NFT holders through land claim event.`,
  // },

  // {
  //   title: "NFT Staking",
  //   completed: true,
  //   text: (
  //     <>
  //       Add staking for native NFT Item Land NFTs and additional NFT
  //       collections. Users can collect Pixie Crystals daily by holding select
  //       NFTs.
  //     </>
  //   ),
  // },

  {
    title: "Launch Games",
    completed: true,
    // completed: true,
    text: `P2E and realtime multiplayer games are now live!`,
  },

  {
    title: "Next Chapter for Games",
    // completed: true,
    text: `️2 new playable worlds, new playable characters & customizations, new earning mechanics.`,
  },

  // {
  //   title: "Game Upgrades [ONGOING]",
  //   // completed: true,
  //   text: `Upgrade and improve game play, add new features, playable characters, and gameplay mechanics.`,
  // },
  // {
  //   title: "Game Upgrades [ONGOING]",
  //   // completed: true,
  //   text: `Upgrade and improve game play, add new features, playable characters, and gameplay mechanics.`,
  // },
];

const RoadmapElement = ({ title, text, completed }) => {
  return (
    <div
      style={{
        width: "90%",
        // height: 100,
        // height: "100%",
        backgroundColor: "#071262",

        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <div
        style={{
          marginTop: 6,
          width: "96%",
          //   height: 100,
          fontSize: 20,
          // height: "100%",
          color: "white",
          fontFamily: `"Amaranth", sans-serif`,
        }}
      >
        {`${title} ${completed ? "[COMPLETE]" : ""}`}
      </div>
      <div
        style={{
          marginTop: 16,
          marginBottom: 6,
          width: "96%",
          //   height: 100,
          // height: "100%",
          color: "white",
          fontFamily: `"Tajawal", sans-serif`,
        }}
      >
        {text}
      </div>
    </div>
  );
};

const Roadmap = () => {
  const roadmapElements = [];

  for (const datum of roadmapElementData) {
    roadmapElements.push(
      <div
        key={datum.title}
        style={{
          width: "100%",
          // height: 100,
          // height: "100%",
          // backgroundColor: "black",

          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <RoadmapElement
          title={datum.title}
          text={datum.text}
          completed={datum.completed}
        />
        <div
          key={datum.title}
          style={{
            // width: "100%",
            height: 20,
            width: 2,
          }}
        ></div>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        // height: 500,
        // height: "100%",
        backgroundColor: "black",
        // backgroundColor: "rgb(75, 88, 190)",

        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
      }}
    >
      <div
        style={{
          // width: "100%",
          height: 15,
          width: 2,
        }}
      ></div>
      {roadmapElements}
    </div>
  );
};

export default Roadmap;
