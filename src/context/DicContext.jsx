import React, { useState, useEffect } from "react";
import { useContext } from "react";
import axios from "axios";

const DicContext = React.createContext();
const url = "https://api.dictionaryapi.dev/api/v2/entries/";

const DicContextProvider = ({ children }) => {
  const [word, setWord] = useState("");
  const [phonetics, setPhonetics] = useState("");
  const [synonyms, setSynonyms] = useState([]);
  const [meanings, setMeanings] = useState([]);
  const [language, setLanguage] = useState("en");
  const [lightTheme, setLightTheme] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const fetchWord = async () => {
    if (word.length < 1) return;
    try {
      const response = await axios.get(`${url}${language}/${word}`);
      const result = await response.data[0];
      const { phonetic, meanings, phonetics } = result;
      setPhonetics(phonetic);
      setMeanings(meanings);
      console.log(result);
      if (phonetics[0].audio) {
        setAudioUrl(phonetics[0].audio);
      } else {
        setAudioUrl("");
      }
    } catch (error) {
      setMeanings([]);
      setPhonetics("");
      setAudioUrl("");
      console.log(error);
    }

    // distructResullt(result);
    // console.log("meanings", meanings);
  };
  //   const meaning = {partOfSpeech:'',
  //   definitions:[],
  // }
  // const definition ={
  //   antonyms:[],
  //   example:'',
  //   synonyms:[]
  // }
  //   const distructResullt = (result)=>{
  //  const { phonetic, meanings } = result;

  //     setPhonetics(phonetic);
  //     setMeanings(meanings);

  //     const {}

  //   }
  useEffect(() => {
    fetchWord();
  }, [word, language]);
  const changeWord = (word) => {
    setWord(word);
  };
  return (
    <DicContext.Provider
      value={{
        word,
        changeWord,
        meanings,
        setLanguage,
        language,
        phonetics,
        synonyms,
        lightTheme,
        setLightTheme,
        audioUrl,
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
