import React, { useState } from "react";
import championData from "./data/champions.json";

const App = () => {
  const [guess, setGuess] = useState("");
  const [responses, setResponses] = useState<String[]>([]);

  const champNames = championData.map((championInfo) =>
    championInfo.name.toLowerCase()
  );
  console.log(champNames);
  const answer = champNames[10];

  const guessHandler = (event: any) => {
    const g = guess.toLowerCase();
    console.log("Guessed", g);
    if (!champNames.includes(g)) {
      setResponses(["Not a valid champion.", ...responses]);
    } else if (g === answer) {
      setResponses(["You won!", ...responses]);
    } else {
      setResponses(["Not quite.", ...responses]);
    }
  };

  const guessChange = (event: any) => {
    setGuess(event.target.value);
  };

  return (
    <div id="main">
      <div id="game-window">
        <div id="guesses">
          {responses.map((response) => (
            <div>{response}</div>
          ))}
        </div>
        <div id="submission">
          <input placeholder="Guess a Champion" onChange={guessChange} />
          <button onClick={guessHandler}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default App;
