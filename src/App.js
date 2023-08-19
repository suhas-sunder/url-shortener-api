import "./App.css";
import { useState, useRef, useEffect } from "react";

function App() {
  const [links, setLinks] = useState([]);
  const [isFocused, setIsFocused] = useState("default");
  const [alert, setAlert] = useState("");
  const inputRef = useRef("");

  const handleShortener = () => {
    const inputValue = inputRef.current.value;
    if (inputValue) {
      try {
        fetch(`https://api.shrtco.de/v2/shorten?url=${inputValue}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.ok) {
              console.log(data.result.code);
              inputRef.current.value = ""; //Reset input text
              setLinks((prevState) => [
                ...prevState,
                {
                  id: data.result.code,
                  short: data.result.short_link,
                  original: data.result.original_link,
                },
              ]);
            } else {
              setAlert(`${data.error.split(",")[0]}, please try again!`);
            }
          });
      } catch {
        console.log("Failed to fetch data.");
      }
    }
  };

  // Delete URL from list
  const handleDeleteURL = (id) => {
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

  // Handle error message for empty input
  useEffect(() => {
    console.log(links);
    const inputValue = inputRef.current.value;
    if (isFocused === "false") {
      if (inputValue === "") {
        setAlert("Please enter a valid URL");
      }
    } else {
      setAlert(""); //Reset error msg onBlur
    }
  }, [isFocused]);

  return (
    <div className="wrapper">
      <h1 className="title">URL Shortener</h1>
      <div className="searchbar">
        <input
          ref={inputRef}
          placeholder="Enter URL"
          onFocus={() => setIsFocused("true")}
          onBlur={() => setIsFocused("false")}
        ></input>
        <button className="btn" onClick={handleShortener}>Shorten</button>
      </div>
      {alert && <p className="alert">*{alert}*</p>}
      {links.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <td>Original</td>
              <td>Short</td>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {links.map((link) => (
              <tr key={link.id}>
                <td>{link.original}</td>
                <td>{link.short}</td>
                <td>
                  <button
                    className="btn"
                    onClick={() => handleCopy(link.short)}
                  >
                    Copy
                  </button>
                </td>
                <td>
                  <button
                    className="btn"
                    onClick={() => handleDeleteURL(link.id)}
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;
