import React, { useState } from "react";
import championData from "./data/champions.json";

const App = () => {
  const [guess, setGuess] = useState("");
  const [responses, setResponses] = useState<number[][]>([]);
  const [error, setError] = useState<String>("");

  const champNames = championData.map((championInfo) =>
    championInfo.name.toLowerCase()
  );
  console.log(champNames);
  const answerId = 10;
  const answer = champNames[answerId];

  const guessHandler = (event: any) => {
    event.preventDefault();
    setGuess("");

    const g = guess.toLowerCase();

    if (!champNames.includes(g)) {
      setError("Not a valid champion.");
    } else if (g === answer) {
      setResponses([[1, 1, 1], ...responses]);
    } else {
      const champInfo = championData[champNames.indexOf(g)];
      const res = [0, 0, 0];
      if (champInfo.class === championData[answerId].class) {
        res[0] = 1;
      }

      if (champInfo.health === championData[answerId].health) {
        res[1] = 1;
      } else if (
        parseInt(champInfo.health) > parseInt(championData[answerId].health)
      ) {
        res[1] = 2;
      }

      if (champInfo.match_count === championData[answerId].match_count) {
        res[2] = 1;
      } else if (
        parseInt(champInfo.match_count) >
        parseInt(championData[answerId].match_count)
      ) {
        res[2] = 2;
      }

      setResponses([res, ...responses]);

      if (responses.length > 3) {
        setError("You lost 🤣");
      }
    }
  };

  const output = responses.map((res) => (
    <tr>
      {res.map((x, i) => {
        if (x === 1) {
          return <th>🟩</th>;
        } else if (i === 0) {
          return <th>🟥</th>;
        } else if (x === 0) {
          return <th>🔼</th>;
        } else {
          return <th>🔽</th>;
        }
      })}
    </tr>
  ));

  return (
    <div id="main">
      <div id="game-window">
        <table id="guesses">
          <tr id="guess-header">
            <th>Class </th>
            <th>HP </th>
            <th>Matches </th>
          </tr>
          {output}
        </table>
        <form id="submission">
          <input
            placeholder="Guess a Champion"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />
          <button type="submit" onClick={guessHandler}>
            Submit
          </button>
        </form>
        {error}
      </div>
    </div>
  );
};

export default App;
