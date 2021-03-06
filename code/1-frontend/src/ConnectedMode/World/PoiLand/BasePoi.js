const BasePoi = ({ color = "#17A700" }) => {
  // <svg
  //   width="25"
  //   height="26"
  //   viewBox="0 0 25 26"
  //   fill="none"
  //   xmlns="http://www.w3.org/2000/svg"
  // >
  //   <ellipse cx="12.3441" cy="13" rx="12.3441" ry="13" fill={color} />
  //   <ellipse cx="6.72222" cy="10.5639" rx="3.16216" ry="3.58378" fill="white" />
  //   <ellipse cx="18.2002" cy="10.5639" rx="3.16216" ry="3.58378" fill="white" />
  //   <ellipse
  //     cx="6.04322"
  //     cy="9.60361"
  //     rx="2.01441"
  //     ry="1.96757"
  //     fill="#2E3CBE"
  //   />
  //   <ellipse cx="5.92593" cy="9.50989" rx="1.38198" ry="1.31171" fill="black" />
  //   <ellipse
  //     cx="17.802"
  //     cy="9.50993"
  //     rx="2.01441"
  //     ry="1.96757"
  //     fill="#2E3CBE"
  //   />
  //   <ellipse cx="17.7082" cy="9.4162" rx="1.35856" ry="1.31171" fill="black" />
  // </svg>;
  return (
    <svg
      width="25"
      height="26"
      viewBox="0 0 25 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="12.3441" cy="13" rx="12.3441" ry="13" fill={color} />
      <ellipse
        cx="6.72222"
        cy="10.5639"
        rx="3.16216"
        ry="3.58378"
        fill="white"
      />
      <ellipse
        cx="18.2002"
        cy="10.5639"
        rx="3.16216"
        ry="3.58378"
        fill="white"
      />
      <ellipse
        cx="6.04322"
        cy="9.60361"
        rx="2.01441"
        ry="1.96757"
        fill="#2E3CBE"
      />
      <ellipse
        cx="5.92593"
        cy="9.50989"
        rx="1.38198"
        ry="1.31171"
        fill="black"
      />
      <ellipse
        cx="17.802"
        cy="9.50993"
        rx="2.01441"
        ry="1.96757"
        fill="#2E3CBE"
      />
      <ellipse
        cx="17.7082"
        cy="9.4162"
        rx="1.35856"
        ry="1.31171"
        fill="black"
      />
    </svg>
  );
};

export default BasePoi;
