import React, { useState, useEffect } from "react";
import useDictionary from "../context/DicContext";

const DictionaryContainer: React.FC = () => {
  const { meanings, phonetic, lightTheme, audioUrl } = useDictionary();
  const [cardClass, setCardClass] = useState<string>("");
  useEffect(() => {
    setCardClass(
      `${lightTheme ? "card bg-dark dark-theme" : "card bg-light light-theme"}`
    );
  }, [lightTheme]);

  return (
    <div className="dictionary-container">
      {meanings && meanings?.length < 1 ? (
        <h3>welcome to dictionary</h3>
      ) : (
        <div>
          {audioUrl.length > 0 && (
            <audio src={audioUrl} controls>
              audio
            </audio>
          )}

          <h4 className={`${lightTheme ? "light-theme" : "dark-theme"}`}>
            {meanings?.length} meanings found
          </h4>
          <div className={cardClass}>
            <h3>phonetics</h3>
            <span>{phonetic}</span>
          </div>
          {meanings?.map((mean: any, index: number) => (
            <article key={index} className="dictionary-item">
              <h4 className="light-theme">meaning {index + 1}</h4>
              <div className={cardClass}>
                <h6>part Of Speech</h6>
                <span>{mean.partOfSpeech}</span>
              </div>

              {mean.definitions.length > 0 && (
                <div>
                  {mean.definitions.map((def: any, ind: number) => (
                    <div key={ind}>
                      {def.antonyms.length > 0 && (
                        <div className={cardClass}>
                          <h6>antonyms</h6>
                          {def.antonyms.map((antonym: string, key: number) => (
                            <div key={key}>{antonym}</div>
                          ))}
                        </div>
                      )}
                      <div className={cardClass}>
                        <h6>definition</h6>
                        <p>{def.definition}</p>
                        {def.example && (
                          <div>
                            <h6>example</h6>
                            <span>{def.example}</span>
                          </div>
                        )}
                      </div>
                      {def.synonyms.length > 0 && (
                        <div className={cardClass}>
                          <h6>synonyms</h6>

                          {def.synonyms.map((syn: string, counter: number) => {
                            return <span key={counter}>{syn}, </span>;
                          })}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default DictionaryContainer;
