const BasicButton = ({
  label = "Label",
  backgroundColor = "black",
  color = "white",
  onClick = () => {},
  borderRadius = 0,
  width = 100,
  height = "100%",
  fontFamily = `"Tajawal", sans-serif`,
  fontMarginTop = 4,
  fontMarginBottom = 0,
  icon = null,
  flexDirection = "row",
}) => {
  return (
    <div
      style={{
        backgroundColor,
        width,
        height,
        borderRadius,
        display: "flex",
        flexDirection,
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {icon}
      <div
        style={{
          fontSize: 20,
          width: "auto",
          // width: "100%",
          // marginTop: 4,

          textAlign: "center",
          fontFamily,
          userSelect: "none",
          color,

          marginTop: fontMarginTop,
          marginBottom: fontMarginBottom,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export default BasicButton;
