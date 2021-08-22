import useDictionary from "../context/DicContext";

const Header :React.FC= () => {
  // return <div></div>
  const { word } = useDictionary();
  return (
    <div className="header">
      <h2>{word.length > 0 ? word : "Dictionary online"}</h2>
    </div>
  );
};

export default Header;
