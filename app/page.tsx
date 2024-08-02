"use client";
import { log } from "console";
import { useEffect, useState } from "react";

export default function Home() {
  let [theme, setTheme] = useState(false);
  let [inputValue, setInputValue] = useState("");
  let [values, setValues] = useState([]);
  let [selectedIndexes, setSelectedIndexes] = useState([]);

  function changeTheme() {
    if (theme == false) {
      setTheme(true);
    } else if (theme == true) {
      setTheme(false);
    }
  }

  const handleCheckboxChange = (index) => {
    setSelectedIndexes((prevSelected) =>
      prevSelected.includes(index)
        ? prevSelected.filter((i) => i !== index)
        : [...prevSelected, index]
    );
  };

  const deleteSelected = () => {
    setValues((prevValues) =>
      prevValues.filter((_, index) => !selectedIndexes.includes(index))
    );
    setSelectedIndexes([]);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const add = (event) => {
    event.preventDefault(); // Prevents the form from submitting and refreshing the page
    if (inputValue !== "")
      setValues((prevValues) => [...prevValues, inputValue]);
    setInputValue(""); // Logs the input value to the console
  };

  return (
    <main>
      <div
        className={
          theme == false
            ? "container_black h-screen"
            : "container_white h-screen"
        }
      >
        <nav className="flex justify-end w-screen">
          <button
            className={
              theme == false
                ? "p-2 border border-white rounded-full m-2"
                : "p-2 border border-black rounded-full m-2"
            }
            onClick={() => changeTheme()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={theme == false ? "currentColor" : "black"}
              className="w-8 h-8"
            >
              <path
                fill-rule="evenodd"
                d={
                  theme == false
                    ? "M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z"
                    : "M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
                }
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </nav>
        <div className="scale-95 w-full flex items-center justify-center mt-10">
          <div
            className={
              theme == false
                ? "bg-zinc-800 p-6 rounded-lg border border-zinc-600 border-4"
                : "bg-gray-500 p-6 rounded-lg border border-slate-200 border-4"
            }
          >
            <form onSubmit={add}>
              <span className="mt-5 mb-20 flex items-center justify-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  className="w-80 p-3 rounded-l-lg bg-purple-100 text-black"
                />
                <button className="rounded-r-lg bg-purple-400 hover:bg-purple-500 p-3">
                  ADD
                </button>
              </span>
            </form>
            <div className="mt-5 checklist">
              <ul className="h-64 overflow-y-auto p-4">
                {values.map((value, index) => (
                  <li
                    className={`p-2 border border-2 rounded-lg flex items-center justify-start gap-2 mt-2 ${
                      theme == false
                        ? selectedIndexes.includes(index)
                          ? "bg-red-400"
                          : "bg-zinc-500"
                        : selectedIndexes.includes(index)
                        ? "bg-red-400"
                        : "bg-slate-400"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedIndexes.includes(index)}
                      onChange={() => handleCheckboxChange(index)}
                      key={index}
                      id={index}
                    />
                    <label for={index} className="ml-2 text-black select-none">
                      {value}
                    </label>
                  </li>
                ))}
              </ul>
              <span className="flex items-center justify-end mt-10">
                <button
                  onClick={deleteSelected}
                  className="bg-red-400 hover:bg-red-500 rounded-lg p-3"
                >
                  DELETE
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
