import { Container, ThemeProvider } from "@material-ui/core";
import "./App.css";
import Dictionary from "./components/Dictionary";
import Header from "./components/header";
import Navbar from "./components/Navbar";
import useDictionary from "./context/DicContext";

function App() {
  const { lightTheme } = useDictionary();
  return (
    <div
      className={`section ${
        lightTheme ? "mode light-theme bg-light" : "mode dark-theme bg-dark"
      }`}
    >
      <Container fixed>
        <Navbar />
        <Header />
        <Dictionary />
      </Container>
    </div>
  );
}

export default App;
