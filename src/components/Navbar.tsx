import { FormControlLabel, Switch, withStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import useDictionary from "../context/DicContext";
const Navbar: React.FC = () => {
  const { lightTheme, setLightTheme } = useDictionary();
  const DarkSwitch = withStyles({
    switchBase: {
      color: grey[50],
      "&$checked": {
        color: grey[900],
      },
      "&$checked + $track": {
        backgroundColor: grey[500],
      },
    },
    checked: {},
    track: {},
  })(Switch);
  return (
    <nav>
      {" "}
      <span
        className={`${lightTheme ? "mode light-theme" : "mode dark-theme"}`}
      >
        {lightTheme ? "Dark Mode" : "Light Mode"}
        {"   "}
        <FormControlLabel
          label=""
          control={
            <DarkSwitch
              checked={lightTheme}
              onChange={() => setLightTheme(!lightTheme)}
            />
          }
        />
      </span>
    </nav>
  );
};

export default Navbar;
