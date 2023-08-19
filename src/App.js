import "./App.css";
import { useState, useRef, useEffect } from "react";
import TableOfURLs from "./components/TableOfURLs";
import SearchBar from "./components/SearchBar";

function App() {
  const [links, setLinks] = useState([]);
  const [isFocused, setIsFocused] = useState("default");
  const [alert, setAlert] = useState("");

  // Delete URL from list
  const handleDeleteURL = (id) => {
    setAlert("");
    setLinks(links.filter((link) => link.id !== id));
  };

  const handleCopy = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      setAlert("Content copied to clipboard");
      console.log("Content copied to clipboard");
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="wrapper">
      <h1 className="title">URL Shortener</h1>
      <SearchBar
        setIsFocused={setIsFocused}
        setAlert={setAlert}
        isFocused={isFocused}
        setLinks={setLinks}
        links={links}
      />
      {alert && <p className="alert">*{alert}*</p>}
      {links.length > 0 && (
        <TableOfURLs
          handleCopy={handleCopy}
          handleDeleteURL={handleDeleteURL}
          links={links}
        />
      )}
    </div>
  );
}

export default App;
