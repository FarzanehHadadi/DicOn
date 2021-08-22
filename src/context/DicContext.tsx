import React, { useState, useEffect, useCallback } from "react";
import { useContext } from "react";
import axios from "axios";
export interface IValue {
  lightTheme: boolean;
  word: string;
  setLightTheme: React.Dispatch<React.SetStateAction<boolean>>;
  changeWord: (word: string) => void;
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  audioUrl: string;
  phonetic: string | null;
  meanings: IMeaning[] | null;
}
export interface IMeaning {
  partOfSpeech: string;
  definitions: IDefinition[];
}
export interface IDefinition {
  antonyms: string[];
  definition: string;
  synonyms: string[];
  example: string;
}
const initialState = {
  lightTheme: false,
  setLightTheme: () => {},
  word: "",
  changeWord: () => {},
  language: "",
  setLanguage: () => {},
  audioUrl: "",
  phonetic: "",
  meanings: null,
};
const DicContext = React.createContext<IValue>(initialState);
const url: string = "https://api.dictionaryapi.dev/api/v2/entries/";
const DicContextProvider = ({ children }: any | null | undefined) => {
  const [lightTheme, setLightTheme] = useState<boolean>(false);
  const [word, setWord] = useState<string>("");
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [language, setLanguage] = useState<string>("en");
  const [phonetic, setPhonetic] = useState<string | null>("");
  const [meanings, setMeanings] = useState<[] | null>([]);

  const fetchWord = useCallback(async (): Promise<void> => {
    if (word.length < 1) return;

    try {
      const response = await axios.get(`${url}${language}/${word}`);
      const result = await response.data[0];

      const { phonetic, meanings, phonetics } = result;
      setPhonetic(phonetic);
      setMeanings(meanings);
      console.log(result);
      if (phonetics[0].audio) {
        setAudioUrl(phonetics[0].audio);
      } else {
        setAudioUrl("");
      }
    } catch (error) {
      setMeanings([]);
      setPhonetic("");
      setAudioUrl("");
      console.log(error);
    }
  }, [language, word]);

  useEffect(() => {
    fetchWord();
  }, [word, language, fetchWord]);
  const changeWord = (word: string): void => {
    setWord(word);
  };

  return (
    <DicContext.Provider
      value={{
        word,
        changeWord,
        lightTheme,
        setLightTheme,
        language,
        setLanguage,
        audioUrl,
        phonetic,
        meanings,
      }}
    >
      {children}
    </DicContext.Provider>
  );
};
const useDictionary = () => {
  return useContext(DicContext);
};
export { DicContext, DicContextProvider };
export default useDictionary;
