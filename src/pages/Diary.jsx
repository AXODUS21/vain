import React, { useState, useEffect } from "react";
import Paper from "../components/Paper";
import "../css/diary.css";
import Button from "../components/Record";
import Delete from "../components/delete";
import SearchBar from "../components/search";

const Diary = () => {
  const [lettersLeft, setLettersLeft] = useState(400);
  const [text, setText] = useState("");
  const [diaryArr, setDiaryArr] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    setLettersLeft(400 - value.length);
  };

  const handleDelete = (id) => {
    setDiaryArr((prevDiaryArr) =>
      prevDiaryArr.filter((entry) => entry.id !== id)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      id: Date.now(),
      date: new Date().toLocaleDateString(),
      content: text,
    };
    setDiaryArr((prevDiaryArr) => [...prevDiaryArr, newEntry]);
    setText("");
    setLettersLeft(400);
  };

  const handleSearch = () => {
    // Search functionality is now only filtering for display
    return diaryArr.filter((entry) =>
      entry.date.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const saveToLocalStorage = () => {
    localStorage.setItem("diary", JSON.stringify(diaryArr));
  };

  useEffect(() => {
    const savedDiary = localStorage.getItem("diary");
    if (savedDiary) {
      const parsedDiary = JSON.parse(savedDiary);
      setDiaryArr(parsedDiary);
    }
  }, []);

  useEffect(() => {
    if (diaryArr.length > 0) {
      saveToLocalStorage();
    }
  }, [diaryArr]);

  return (
    <div className="diary-container">
      <Button
        specialStyle={{
          position: "absolute",
          top: "10px",
          left: "10px",
          zIndex: "100",
        }}
      />

      <form className="new-entry-container" onSubmit={handleSubmit}>
        <textarea maxLength={400} value={text} onChange={handleChange} />
        <div>
          <div className="diary-submit-button">
            <p>{lettersLeft}</p>
            <button type="submit" className="button type--A">
              <div className="button__line"></div>
              <div className="button__line"></div>
              <span className="button__text">Submit entry</span>
              <div className="button__drow1"></div>
              <div className="button__drow2"></div>
            </button>
          </div>
          <div className="search-entry">
            <SearchBar
              setSearchTerm={setSearchTerm}
              submitSearch={handleSearch}
            />
          </div>
        </div>
      </form>

      <div className="past-entry-containers">
        {handleSearch()
          .slice()
          .reverse()
          .map((entry) => (
            <div key={entry.id} className="past-entry">
              <div className="date-n-delete">
                <h1>{entry.date}</h1>
                <Delete handleClick={() => handleDelete(entry.id)} />
              </div>
              <Paper content={entry.content} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default Diary;
