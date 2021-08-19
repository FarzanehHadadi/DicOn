import DictionaryContainer from "./DictionaryContainer";
import DictionaryForm from "./DictionaryForm";
import { ThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import useDictionary from "../context/DicContext";

const Dictionary = () => {
  const { lightTheme } = useDictionary();
  const theme = createTheme({
    palette: {
      primary: {
        main: lightTheme ? "#000" : "#fff",
      },
      type: lightTheme ? "light" : "dark",
    },
  });

  return (
    <div>
      <ThemeProvider theme={theme}>
        <DictionaryForm />
      </ThemeProvider>
      <DictionaryContainer />
    </div>
  );
};

export default Dictionary;
