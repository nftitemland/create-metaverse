import React from "react";
import "./Messages.css";
import TitleSection from "../../../../ExpansiveComponents/TitleSection";
import CharactersSelectSection from "./CharactersSelectSection";
import TypeChooser from "./TypeChooser";
import { nftKeys } from "../../../../constants";

const CharacterSelectSectionMeta = ({
  userId,
  characterType,
  isLoading,
  setIsLoading,
  address,
  characterElements,
  setCharacterElements,
  characterElementsPag,
  characterElementsSetPag,
  gameCharacterElements,
  setGameCharacterElements,
  gameCharacterElementsPag,
  gameCharacterElementsSetPag,
  charactersHasFirstLoaded,
  setCharactersHasFirstLoaded,
  gameCharactersHasFirstLoaded,
  setGameCharactersHasFirstLoaded,
  charactersHasFirstLoadFinished,
  setCharactersHasFirstLoadFinished,
  gameCharactersHasFirstLoadFinished,
  setGameCharactersHasFirstLoadFinished,
  setUserData,
  ultraFlaminCharactersElements,
  setUltraFlaminCharactersElements,
  ultraFlaminCharactersElementsPag,
  setUltraFlaminCharactersElementsPag,
  ultraFlaminCharactersHasFirstLoaded,
  setUltraFlaminCharactersHasFirstLoaded,
  ultraFlaminCharactersHasFirstLoadFinished,
  setUltraFlaminCharactersHasFirstLoadFinished,
}) => {
  switch (characterType) {
    case nftKeys.POIPOI:
      return (
        <div>
          <CharactersSelectSection
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            address={address}
            characterElements={characterElements}
            setCharacterElements={setCharacterElements}
            pag={characterElementsPag}
            setPag={characterElementsSetPag}
            setUserData={setUserData}
            firstLoadHasOccurred={charactersHasFirstLoaded}
            setFirstLoadHasStarted={setCharactersHasFirstLoaded}
            firstLoadHasFinished={charactersHasFirstLoadFinished}
            setFirstLoadHasFinished={setCharactersHasFirstLoadFinished}
          />
        </div>
      );
    case nftKeys.GAME_CHARACTERS:
      return (
        <div>
          <div>
            <CharactersSelectSection
              userId={userId}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              address={address}
              characterElements={gameCharacterElements}
              setCharacterElements={setGameCharacterElements}
              pag={gameCharacterElementsPag}
              setPag={gameCharacterElementsSetPag}
              setUserData={setUserData}
              mode={nftKeys.GAME_CHARACTERS}
              firstLoadHasOccurred={gameCharactersHasFirstLoaded}
              setFirstLoadHasStarted={setGameCharactersHasFirstLoaded}
              firstLoadHasFinished={gameCharactersHasFirstLoadFinished}
              setFirstLoadHasFinished={setGameCharactersHasFirstLoadFinished}
            />
          </div>
        </div>
      );
    case nftKeys.ULTRA_FLAMINS:
      return (
        <div>
          <div>
            <div>
              <CharactersSelectSection
                userId={userId}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                address={address}
                characterElements={ultraFlaminCharactersElements}
                setCharacterElements={setUltraFlaminCharactersElements}
                pag={ultraFlaminCharactersElementsPag}
                setPag={setUltraFlaminCharactersElementsPag}
                setUserData={setUserData}
                mode={nftKeys.ULTRA_FLAMINS}
                firstLoadHasOccurred={ultraFlaminCharactersHasFirstLoaded}
                setFirstLoadHasStarted={setUltraFlaminCharactersHasFirstLoaded}
                firstLoadHasFinished={ultraFlaminCharactersHasFirstLoadFinished}
                setFirstLoadHasFinished={
                  setUltraFlaminCharactersHasFirstLoadFinished
                }
              />
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

function PropertyDisplayer({
  userId,
  address,
  characterElements,
  setCharacterElements,
  characterElementsPag,
  characterElementsSetPag,
  gameCharacterElements,
  setGameCharacterElements,
  gameCharacterElementsPag,
  gameCharacterElementsSetPag,
  characterType,
  setCharacterType,
  charactersHasFirstLoaded,
  setCharactersHasFirstLoaded,
  gameCharactersHasFirstLoaded,
  setGameCharactersHasFirstLoaded,
  charactersHasFirstLoadFinished,
  setCharactersHasFirstLoadFinished,
  gameCharactersHasFirstLoadFinished,
  setGameCharactersHasFirstLoadFinished,
  isLoading,
  setIsLoading,
  setUserData,
  ultraFlaminCharactersElements,
  setUltraFlaminCharactersElements,
  ultraFlaminCharactersElementsPag,
  setUltraFlaminCharactersElementsPag,
  ultraFlaminCharactersHasFirstLoaded,
  setUltraFlaminCharactersHasFirstLoaded,
  ultraFlaminCharactersHasFirstLoadFinished,
  setUltraFlaminCharactersHasFirstLoadFinished,
}) {
  // const [a, b] = useState({});

  return (
    <div className="TwoMultiContentBoxMeta">
      <div className="MessageBoxMeta">
        <TitleSection titleText="Characters" />
        <TypeChooser
          characterType={characterType}
          setCharacterType={setCharacterType}
        />
        <CharacterSelectSectionMeta
          characterType={characterType}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          address={address}
          userId={userId}
          characterElements={characterElements}
          setCharacterElements={setCharacterElements}
          characterElementsPag={characterElementsPag}
          characterElementsSetPag={characterElementsSetPag}
          gameCharacterElements={gameCharacterElements}
          setGameCharacterElements={setGameCharacterElements}
          gameCharacterElementsPag={gameCharacterElementsPag}
          gameCharacterElementsSetPag={gameCharacterElementsSetPag}
          charactersHasFirstLoaded={charactersHasFirstLoaded}
          setCharactersHasFirstLoaded={setCharactersHasFirstLoaded}
          gameCharactersHasFirstLoaded={gameCharactersHasFirstLoaded}
          setGameCharactersHasFirstLoaded={setGameCharactersHasFirstLoaded}
          charactersHasFirstLoadFinished={charactersHasFirstLoadFinished}
          setCharactersHasFirstLoadFinished={setCharactersHasFirstLoadFinished}
          gameCharactersHasFirstLoadFinished={
            gameCharactersHasFirstLoadFinished
          }
          setGameCharactersHasFirstLoadFinished={
            setGameCharactersHasFirstLoadFinished
          }
          setUserData={setUserData}
          ultraFlaminCharactersElements={ultraFlaminCharactersElements}
          setUltraFlaminCharactersElements={setUltraFlaminCharactersElements}
          ultraFlaminCharactersElementsPag={ultraFlaminCharactersElementsPag}
          setUltraFlaminCharactersElementsPag={
            setUltraFlaminCharactersElementsPag
          }
          ultraFlaminCharactersHasFirstLoaded={
            ultraFlaminCharactersHasFirstLoaded
          }
          setUltraFlaminCharactersHasFirstLoaded={
            setUltraFlaminCharactersHasFirstLoaded
          }
          ultraFlaminCharactersHasFirstLoadFinished={
            ultraFlaminCharactersHasFirstLoadFinished
          }
          setUltraFlaminCharactersHasFirstLoadFinished={
            setUltraFlaminCharactersHasFirstLoadFinished
          }
        />
      </div>
    </div>
  );
}

export default PropertyDisplayer;
