const LegendItemSection = ({ text }) => {
  return (
    <div
      style={{
        // backgroundColor: landColor,
        // backgroundColor: landColor,
        marginTop: 5,
        height: 30,
        // width: 130,

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          color: "white",
          // height: 30,
          // width: 30,

          display: "flex",
          textAlign: "right",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: `"Amaranth", sans-serif`,
          fontSize: 14,
        }}
      >
        {text}
      </div>
    </div>
  );
};

const LegendSection = ({ landColor, text = "" }) => {
  return (
    <div
      style={{
        width: "100%",
        // backgroundColor: "blue",
        // height: 40,

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: landColor,
          height: 30,
          width: 30,

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      />

      <LegendItemSection text={text} />
    </div>
  );
};

const Legend = () => {
  return (
    <div
      style={{
        // backgroundColor: "black",
        // height: 60,
        width: 270,

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LegendSection landColor={"darkblue"} text="Ultra-Premium Land" />
      <LegendSection landColor={"teal"} text="Reserved Ultra-Premium Land" />
      <LegendSection landColor={"black"} text="Diamond Land" />
      <LegendSection landColor={"peru"} text="Reserved Diamond Land" />
      <LegendSection landColor={"red"} text="Royal Guard's Land" />
    </div>
  );
};

export default Legend;
