import useDictionary from "../context/DicContext";
const Header = () => {
  const { word } = useDictionary();
  return (
    <div className="header">
      <h2>{word.length > 0 ? word : "Dictionary online"}</h2>
    </div>
  );
};

export default Header;
