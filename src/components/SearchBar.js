import React from "react";
import { useRef, useEffect } from "react";

function SearchBar({ setIsFocused, setAlert, setLinks, links, isFocused }) {
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

  const inputRef = useRef("");
  return (
    <div className="searchbar">
      <input
        ref={inputRef}
        placeholder="Enter URL"
        onFocus={() => setIsFocused("true")}
        onBlur={() => setIsFocused("false")}
      ></input>
      <button className="btn" onClick={handleShortener}>
        Shorten
      </button>
    </div>
  );
}

export default SearchBar;
