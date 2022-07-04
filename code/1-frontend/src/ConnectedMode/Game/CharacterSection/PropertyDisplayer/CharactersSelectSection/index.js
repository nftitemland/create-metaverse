import React, { useEffect } from "react"; //  useEffect, useState
import InfiniteScroll from "react-infinite-scroll-component";
import loadCharacters from "./loadCharacters";
// import StakingRewardMessage from "./MessagesElements/StakingRewardMessage";
import { getNTokenData } from "../../../../../utils/nToken";
import refreshUserData from "../../../../../api/refreshUserData";
import {
  API_BASE_URL,
  nftKeys,
  NULL_ADDRESS,
  NULL_USER_ID,
} from "../../../../../constants";
import axios from "axios";
import { getImageUrl } from "../../../../../utils/getImageUrl";

// const getImageUrl = ({ type, id }) => {
//   switch (type) {
//     case nftKeys.POIPOI:
//       return `https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/item-images/slime_${id}.png`;
//     case nftKeys.GAME_CHARACTERS:
//       return `https://coreminterstackprods3nftmine83689-nftmine6aababc1-1i1zrafm04pwk.s3.amazonaws.com/character-images/character_${id}.png`;
//     default:
//       break;
//   }

//   return null;
// };

const CharacterSection = ({
  datum,
  isLoading,
  setIsLoading,
  address,
  setUserData,
}) => {
  return (
    <div
      style={{
        marginLeft: 8,
        marginTop: 15,
        width: 292,
        // height: 292,
        backgroundColor: "teal",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          // marginLeft: 8,
          // marginTop: 15,
          width: "100%",
          // height: 292,
          backgroundColor: "teal",
        }}
      >
        <img
          alt={"character"}
          src={getImageUrl({
            type: datum.type,
            id: datum.id,
            shouldGetUltraFlaminSword: true,
          })}
          style={{
            width: "100%",
          }}
        ></img>
      </div>
      <div
        style={{
          // marginLeft: 8,
          // marginTop: 15,
          width: "100%",
          height: 60,
          backgroundColor: "teal",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            // marginLeft: 8,
            // marginTop: 15,
            width: 150,
            height: 46,
            backgroundColor: isLoading ? "darkgray" : "black",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            userSelect: "none",
          }}
          onClick={async () => {
            if (isLoading) {
              return;
            }
            setIsLoading(true);

            try {
              const nTokenData = getNTokenData();

              await axios({
                method: "POST",
                url: `${API_BASE_URL}/expansive-world/characters`,
                headers: {
                  "nftitem-address": address,
                  "nftitem-ntoken": nTokenData.nToken,
                },
                // miniGameState: "END",
                data: {
                  type: datum.type,
                  id: datum.id,
                },
              });

              await refreshUserData({
                address,
                nToken: nTokenData.nToken,
                setUserData,
              });

              setIsLoading(false);
            } catch (err) {
              setIsLoading(false);

              console.log("error in selecting character:", err);
            }
          }}
        >
          <div
            style={{
              fontFamily: `"Amaranth", sans-serif`,
              // marginLeft: 8,
              // marginTop: 15,
              width: "100%",
              textAlign: "center",
              color: "white",
              // height: 60,
              // backgroundColor: "teal",
            }}
          >
            {datum.type === nftKeys.ULTRA_FLAMINS
              ? "Equip and Select Default Character"
              : "Select Character"}
          </div>
        </div>
      </div>
    </div>
  );
};

function CharactersSelectSection({
  userId,
  isLoading,
  setIsLoading,
  address,
  characterElements,
  setCharacterElements,
  pag,
  setPag,
  setUserData,
  mode = nftKeys.POIPOI,
  firstLoadHasOccurred,
  setFirstLoadHasStarted,
  firstLoadHasFinished,
  setFirstLoadHasFinished,
}) {
  // const [firstLoadHasOccurred, setFirstLoadHasStarted] = [
  //   hasFirstLoaded,
  //   setHasFirstLoaded,
  // ];
  // const [firstLoadHasFinished, setFirstLoadHasFinished] = [
  //   hasFirstLoadFinished,
  //   setHasFirstLoadFinished,
  // ];
  // const [characterElements, setCharacterElements] = useState([]);
  // const [pag, setPag] = useState(null);

  useEffect(() => {
    if (characterElements.length > 0) {
      setFirstLoadHasStarted(true);
      setFirstLoadHasFinished(true);
      return;
    }

    if (!firstLoadHasOccurred) {
      setFirstLoadHasStarted(true);

      if (address === NULL_ADDRESS || userId === NULL_USER_ID) {
        new Promise(async (resolve, reject) => {
          const gottenCharacterData = [];

          const gottenPag = null;

          const newCharacterElements =
            characterElements.concat(gottenCharacterData);

          setCharacterElements(newCharacterElements);

          setPag(gottenPag);

          setFirstLoadHasFinished(true);

          resolve();
        });
        return;
      }

      new Promise(async (resolve, reject) => {
        const results = await loadCharacters({
          address,
          pag,
          mode,
        });

        const gottenCharacterData = results.characters;

        const gottenPag = results.pag;

        // console.log(`

        //     MEGA LOG: ${JSON.stringify(
        //       {
        //         gottenPag,
        //       },
        //       null,
        //       4
        //     )}

        // `);

        // const gottenCharacterElements =

        // gottenCharacterData.map((datum) => {
        //   return (
        //     <CharacterSection
        //       key={`${datum.type}${datum.id}`}
        //       datum={datum}
        //       address={address}
        //       setUserData={setUserData}
        //       setIsLoading={setIsLoading}
        //       isLoading={isLoading}
        //     />
        //   );
        // });

        const newCharacterElements =
          characterElements.concat(gottenCharacterData);

        setCharacterElements(newCharacterElements);

        setPag(gottenPag);

        setFirstLoadHasFinished(true);

        resolve();
      });
    }
  }, [
    userId,
    firstLoadHasOccurred,
    characterElements,
    pag,
    address,
    setCharacterElements,
    setPag,
    setUserData,
    setIsLoading,
    isLoading,
    mode,
    setFirstLoadHasStarted,
    setFirstLoadHasFinished,
  ]);

  const actualCharactersElements = characterElements.map((datum) => {
    return (
      <CharacterSection
        key={`${datum.type}${datum.id}`}
        datum={datum}
        address={address}
        setUserData={setUserData}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
    );
  });

  const userHasNoCharacters =
    firstLoadHasFinished && actualCharactersElements.length === 0;

  const height = userHasNoCharacters ? 0 : 430;

  return (
    <div
      style={{
        width: "100%",
        height,
        // backgroundColor: "green",
      }}
    >
      <InfiniteScroll
        scrollableTarget={"MessageTrack"}
        dataLength={characterElements.length}
        next={async () => {
          const results = await loadCharacters({
            address,
            pag,
            mode,
          });

          const gottenCharacterData = results.characters;

          const gottenPag = results.pag;

          // const gottenCharacterElements = gottenCharacterData.map((datum) => {
          //   return (
          //     <CharacterSection
          //       key={`${datum.type}${datum.id}`}
          //       datum={datum}
          //       isLoading={isLoading}
          //       setIsLoading={setIsLoading}
          //       address={address}
          //       setUserData={setUserData}
          //     />
          //   );
          // });

          const newCharacterElements =
            characterElements.concat(gottenCharacterData);

          setCharacterElements(newCharacterElements);

          setPag(gottenPag);

          // await loadMessages({
          //   address,
          //   nextMessagesData,
          //   messageIdToData,
          //   setMessageIdToData,
          //   setNextMessagesData,
          // });
        }}
        // inverse={true}
        // style={{ display: "flex", flexDirection: "column-reverse" }}
        hasMore={!!pag}
        loader={
          <h4
            style={{
              fontFamily: `"Tajawal", sans-serif`,
              marginLeft: 20,
            }}
          >
            ...
          </h4>
        }
        height={height}
        style={{
          width: "100%",
          touchAction: "pan-y",
          // backgroundColor: "black",
          // overflowY: "hidden",
        }}
        initialScrollY={0}
        endMessage={
          <p
            style={{
              textAlign: "center",
              fontFamily: `"Tajawal", sans-serif`,
              color: userHasNoCharacters ? "white" : "unset",
              fontSize: 14,
            }}
          >
            <b>
              {userHasNoCharacters
                ? "No NFT Item characters available"
                : "- - -"}
            </b>
          </p>
        }
      >
        {actualCharactersElements}
      </InfiniteScroll>
    </div>
  );
}

export default CharactersSelectSection;
