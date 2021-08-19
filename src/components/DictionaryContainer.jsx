import { useState, useEffect } from "react";
import useDictionary from "../context/DicContext";
const DictionaryContainer = () => {
  const { meanings, phonetics, lightTheme, audioUrl } = useDictionary();
  const [cardclass, setCardClass] = useState("");
  useEffect(() => {
    setCardClass(
      `${lightTheme ? "card bg-dark dark-theme" : "card bg-light light-theme"}`
    );
  }, [lightTheme]);

  return (
    <div className="dictionary-container">
      {meanings.length < 1 ? (
        <h3>welcome to dictionary</h3>
      ) : (
        <div>
          {audioUrl.length > 0 && (
            <audio src={audioUrl} controls>
              audio
            </audio>
          )}

          <h4 className={`${lightTheme ? "light-theme" : "dark-theme"}`}>
            {meanings.length} meanings found
          </h4>
          <div className={cardclass}>
            <h3>phonetics</h3>
            <span>{phonetics}</span>
          </div>
          {meanings.map((mean, index) => (
            <article key={index} className="dictionary-item">
              <h4 className="light-theme">meaning {index + 1}</h4>
              <div className={cardclass}>
                <h6>part Of Speech</h6>
                <span>{mean.partOfSpeech}</span>
              </div>

              {mean.definitions.length > 0 && (
                <div>
                  {mean.definitions.map((def, ind) => (
                    <div key={ind}>
                      {def.antonyms.length > 0 && (
                        <div className={cardclass}>
                          <h6>antonyms</h6>
                          {def.antonyms.map((antonym, key) => (
                            <div key={key}>{antonym}</div>
                          ))}
                        </div>
                      )}
                      <div className={cardclass}>
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
                        <div className={cardclass}>
                          <h6>synonyms</h6>

                          {def.synonyms.map((syn, counter) => {
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
