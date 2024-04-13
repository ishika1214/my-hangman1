import React, { useEffect, useState } from "react";
import { Alphabets, data } from "./data";
import "../component/home.css";
import { debug } from "console";
import hangman0 from "../images/hangman0.png";
import hangman1 from "../images/hangman1.png";
import hangman2 from "../images/hangman2.png";
import hangman3 from "../images/hangman3.png";
import hangman4 from "../images/hangman4.png";
import hangman5 from "../images/hangman5.png";
import hangman6 from "../images/hangman6.png";
import hangman7 from "../images/hangman7.png";
import hangmanfinal from "../images/hangmanfinal.png";
import hangmanwin from "../images/hangmanwin.png";
import { MdRefresh } from "react-icons/md";

const Home = () => {
  //stores random genrated word
  const [randomWord, setRandomWord] = useState<string>();

  //stores hint
  const [hint, setHint] = useState<string>();

  //no of wrong guesses
  const [count, setCount] = useState<number>(0);

  //stores letter input
  const [letterChoose, setLetterChoose] = useState<string[]>([]);

  const [won, setWon] = useState(false);

  //stores letters positions
  const [positions, setPositions] = useState<Record<string, number[]>>({});

  //handles revealation of answer
  const [showAns, setShowAnswer] = useState(false);

  //generates randon word
  const handleRandomWord = () => {
    const words = data.map((item) => item.word);
    console.log(words, ":dfsd");
    let word = words[Math.floor(Math.random() * words.length)];
    data.map((item) => {
      if (item.word === word) setHint(item.hint);
      return null;
    });
    setRandomWord(word);
  };

  //handles click on Alphabets
  const handleAlphabetClick = (value: string) => {
    if (randomWord?.toLowerCase()?.includes(value.toLowerCase()) && count < 7) {
      let array = Array.from(randomWord);
      let ind: number;
      for (let i = 0; i < array?.length; i++) {
        let currentValue = array[i].toLowerCase();
        if (currentValue === value) {
          if (positions[currentValue] === undefined) {
            setPositions((prevPositions) => ({
              ...prevPositions,
              [currentValue]: [i],
            }));
            ind = i;
            break;
          } else {
            if (!positions[currentValue].filter((ele) => ele === i).length) {
              setPositions((prevPositions) => ({
                ...prevPositions,
                [currentValue]: [...prevPositions[currentValue], i],
              }));
              ind = i;
              break;
            }
          }
        }
      }

      // setLetterIndex(ind);
      setLetterChoose((prevLetters) => {
        const newLetters = [...prevLetters];
        newLetters[ind] = value;
        return newLetters;
      });
    } else {
      setCount(() => {
        return count + 1;
      });
    }
  };
  useEffect(() => {
    handleRandomWord();
  }, []);
  console.log(randomWord);
  useEffect(() => {
    if (randomWord) {
      if (letterChoose.join("").toLowerCase() === randomWord.toLowerCase()) {
        setTimeout(() => {
          setWon(true);
          setCount(9);
        }, 100);
      }
    }
    console.log(letterChoose.join("").toString(), "sfjg");
  }, [letterChoose, letterChoose.length, randomWord]);

  useEffect(() => {
    if (count === 7) {
      setTimeout(() => {
        setShowAnswer(true);
        setCount(8);
      }, 1000);
    }

    if (count === 9 && won === true) {
      setTimeout(() => {
        setCount(0);
        handleRandomWord();
        setWon(false);
        setLetterChoose([]);
      }, 2000);
    }
  }, [count]);
  return (
    <div>
      <h3>Hey welcome to Hangman Game!</h3>
      <br />
      <div className="alpha-parent">
        {Alphabets.map((item) => (
          <div className="alphabets" onClick={() => handleAlphabetClick(item)}>
            {item.toUpperCase()}
          </div>
        ))}
      </div>
      {showAns ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <span>Answer : {randomWord}</span>
          <MdRefresh
            color="blue"
            size={30}
            onClick={() => {
              setCount(0);
              setShowAnswer(false);
              setLetterChoose([])
            }}
          />
        </div>
      ) : (
        <>
          <h4>Hint! "" {hint} ""</h4>
          <p>Your Word</p>
        </>
      )}

      <div className="box-parent">
        {randomWord ? (
          Array.from(randomWord).map((char, index) => (
            <div className="box" id=" boxes" key={index}>
              {letterChoose[index]}
            </div>
          ))
        ) : (
          <></>
        )}
      </div>
      <div>
        <img
          className="Images"
          src={
            count === 0
              ? hangman0
              : count === 1
              ? hangman1
              : count === 2
              ? hangman2
              : count === 3
              ? hangman3
              : count === 4
              ? hangman4
              : count === 5
              ? hangman5
              : count === 6
              ? hangman6
              : count === 7
              ? hangman7
              : count === 9 && won === true
              ? hangmanwin
              : hangmanfinal
          }
          alt=""
        />
      </div>
    </div>
  );
};

export default Home;
