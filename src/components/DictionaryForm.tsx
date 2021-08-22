import { MenuItem, TextField } from "@material-ui/core";
import Languages from "./languages";
import useDictionary from "../context/DicContext";
const DictionaryForm: React.FC = () => {
  const { word, changeWord, lightTheme, language, setLanguage } =
    useDictionary();

  return (
    <form noValidate autoComplete="off">
      <TextField
        id="standard-basic"
        label="please select a word"
        value={word}
        onChange={(e) => changeWord(e.target.value)}
      />
      <TextField
        id="standard-select-language"
        select
        label="Language"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        {Languages.map((lan) => (
          <MenuItem key={lan.name} value={lan.value}>
            {lan.name}
          </MenuItem>
        ))}
      </TextField>
    </form>
  );
};

export default DictionaryForm;
