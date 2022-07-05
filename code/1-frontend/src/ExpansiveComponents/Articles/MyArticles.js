import React from "react";
import TitleSection from "../TitleSection";
//{ useEffect }

// import { NULL_ADDRESS, NULL_USER_ID } from "../../constants";
// import refreshProfiles from "../../api/refreshProfiles";
// import delay from "../../utils/delay";

const articleData = [
  {
    id: "abc",
    title: "Article Title",
    description: (
      <>
        This is an article about a very interesting topic, read more to learn
        more info about this great topic! This is extra tex.
      </>
    ),
    author: "xyz-222",
  },

  {
    id: "abc2",
    title: "Article Title 2",
    description: <>This is an article about a very interesting topic 2.</>,
    author: "yyz-222",
  },
];

const ArticleData = ({ title, description, author }) => {
  return (
    <div
      style={{
        width: "100%",
        // height: 20,
        backgroundColor: "green",
        marginTop: 10,
      }}
    >
      <div
        style={{
          width: "70%",
          // height: "100%",
          fontFamily: `"Tajawal", sans-serif`,
          backgroundColor: "green",
          fontSize: 20,
          paddingTop: 6,
          paddingLeft: 10,
        }}
      >
        {title}
      </div>

      <div
        style={{
          width: "90%",
          // height: "100%",
          fontFamily: `"Tajawal", sans-serif`,
          backgroundColor: "darkgreen",
          paddingLeft: 10,
        }}
      >
        {description}
      </div>

      <div
        style={{
          width: "90%",
          // height: "100%",
          fontFamily: `"Tajawal", sans-serif`,
          backgroundColor: "darkgreen",
          paddingLeft: 10,
        }}
      >
        {`By: ${author}`}
      </div>
    </div>
  );
};

const ModeSelect = () => {
  return (
    <div
      style={{
        width: "100%",

        height: 50,

        backgroundColor: "blue",

        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        // alignItems: isMobileMode ? "flex-start" : "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 300,

          height: "100%",

          backgroundColor: "blue",

          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          // alignItems: isMobileMode ? "flex-start" : "center",
          alignItems: "center",
        }}
      >
        <button
          style={{
            backgroundColor: "grey",
            width: 100,
            height: "100%",
            fontFamily: `"Amaranth", sans-serif`,
          }}
          onClick={() => {
            console.log("XYZABC");
          }}
        >
          Drafts
        </button>

        <button
          style={{
            backgroundColor: "grey",
            width: 100,
            height: "100%",
            fontFamily: `"Amaranth", sans-serif`,
          }}
          onClick={() => {
            console.log("XYZABC");
          }}
        >
          Published
        </button>
      </div>
    </div>
  );
};

function MyArticles() {
  const articles = [];

  for (const article of articleData) {
    articles.push(
      <ArticleData
        key={article.id}
        title={article.title}
        description={article.description}
        author={article.author}
      />
    );
  }

  return (
    <div
      style={{
        width: "90%",

        // height: 50,

        // backgroundColor: "blue",

        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        // alignItems: isMobileMode ? "flex-start" : "center",
        alignItems: "center",
      }}
    >
      <TitleSection
        titleText={"My Articles"}
        height={50}
        width={"100%"}
        textBoxWidth={"unset"}
        backgroundColor={"black"}
        fontSize={22}
        marginLeft={14}
        textAlign={"left"}
      />
      <ModeSelect />

      <div
        style={{
          height: 300,
          overflow: "scroll",

          // height: 50,

          // backgroundColor: "blue",

          // display: "flex",
          // flexDirection: "flex-start",
          // justifyContent: "center",
          // alignItems: isMobileMode ? "flex-start" : "center",
          // alignItems: "center",
        }}
      >
        {articles}
      </div>
    </div>
  );
}

export default MyArticles;
