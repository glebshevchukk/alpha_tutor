import { useEffect, useState } from "react";

import GameLoader from "./GameLoader";
import JeopardyBoard from "./JeopardyBoard";
import Scoreboard from "./Scoreboard";
import {
  Game,
  GameData,
  GameRound,
  Player,
  RoundName,
  ROUND_SINGLE,
} from "../types";
import { logEvent, logEventWithLabel } from "../util/analytics";
import { preloadedGames } from "../util/preloaded_games";
import { useOutletContext,useLocation } from "react-router";

import "./App.css";
import { Dictionary } from "express-serve-static-core";


export default function Jeopordy() {
  const [game, setGame] = useState<Game | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [round, setRound] = useState<RoundName>(ROUND_SINGLE);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [numCategoriesShown, setNumCategoriesShown] = useState(0);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState<
    number | null
  >(null);
  const [currentClueIndex, setCurrentClueIndex] = useState<number | null>(null);
  const { state: { user_data } = {} } = useLocation();
  console.log("JEOOOOOO")
  console.log(user_data);
  // Specify a game in the query string as /?game=GAME_ID loads a pre-loaded game
  useEffect(() => {

    
    let text = `{
      "game": {
        "single": [
          {
            "category": "Single Category 1",
            "clues": [
              {
                "value": 200,
                "clue": "This is clue 1.1",
                "solution": "This is solution 1.1"
              },
              {
                "value": 400,
                "clue": "This is clue 1.2",
                "solution": "This is solution 1.2"
              },
              {
                "value": 600,
                "clue": "This is clue 1.3",
                "solution": "This is solution 1.3"
              },
              {
                "value": 800,
                "clue": "This is clue 1.4",
                "solution": "This is solution 1.4"
              },
              {
                "value": 1000,
                "clue": "This is clue 1.5",
                "solution": "This is solution 1.5",
                "dailyDouble": true
              }
            ]
          },
          {
            "category": "Single Category 2",
            "clues": [
              {
                "value": 200,
                "clue": "This is clue 2.1",
                "solution": "This is solution 2.1"
              },
              {
                "value": 400,
                "clue": "This is clue 2.2",
                "solution": "This is solution 2.2"
              },
              {
                "value": 600,
                "clue": "This is clue 2.3",
                "solution": "This is solution 2.3"
              },
              {
                "value": 800,
                "clue": "This is clue 2.4",
                "solution": "This is solution 2.4",
                "dailyDouble": true
              },
              {
                "value": 1000,
                "clue": "This is clue 2.5",
                "solution": "This is solution 2.5"
              }
            ]
          },
          {
            "category": "Single Category 3",
            "clues": [
              {
                "value": 200,
                "clue": "This is clue 3.1",
                "solution": "This is solution 3.1"
              },
              {
                "value": 400,
                "clue": "This is clue 3.2",
                "solution": "This is solution 3.2"
              },
              {
                "value": 600,
                "clue": "This is clue 3.3",
                "solution": "This is solution 3.3"
              },
              {
                "value": 800,
                "clue": "This is clue 3.4",
                "solution": "This is solution 3.4"
              },
              {
                "value": 1000,
                "clue": "This is clue 3.5",
                "solution": "This is solution 3.5"
              }
            ]
          },
          {
            "category": "Single Category 4",
            "clues": [
              {
                "value": 200,
                "clue": "This is clue 4.1",
                "solution": "This is solution 4.1"
              },
              {
                "value": 400,
                "clue": "This is clue 4.2",
                "solution": "This is solution 4.2"
              },
              {
                "value": 600,
                "clue": "This is clue 4.3",
                "solution": "This is solution 4.3"
              },
              {
                "value": 800,
                "clue": "This is clue 4.4",
                "solution": "This is solution 4.4"
              },
              {
                "value": 1000,
                "clue": "This is clue 4.5",
                "solution": "This is solution 4.5"
              }
            ]
          },
          {
            "category": "Single Category 5",
            "clues": [
              {
                "value": 200,
                "clue": "This is clue 5.1",
                "solution": "This is solution 5.1"
              },
              {
                "value": 400,
                "clue": "This is clue 5.2",
                "solution": "This is solution 5.2"
              },
              {
                "value": 600,
                "clue": "This is clue 5.3",
                "solution": "This is solution 5.3"
              },
              {
                "value": 800,
                "clue": "This is clue 5.4",
                "solution": "This is solution 5.4"
              },
              {
                "value": 1000,
                "clue": "This is clue 5.5",
                "solution": "This is solution 5.5"
              }
            ]
          },
          {
            "category": "Single Category 6",
            "clues": [
              {
                "value": 200,
                "clue": "This is clue 6.1",
                "solution": "This is solution 6.1"
              },
              {
                "value": 400,
                "clue": "This is clue 6.2",
                "solution": "This is solution 6.2"
              },
              {
                "value": 600,
                "clue": "This is clue 6.3",
                "solution": "This is solution 6.3"
              },
              {
                "value": 800,
                "clue": "This is clue 6.4",
                "solution": "This is solution 6.4"
              },
              {
                "value": 1000,
                "clue": "This is clue 6.5",
                "solution": "This is solution 6.5"
              }
            ]
          }
        ],
        "double": [
          {
            "category": "Double Category 1",
            "clues": [
              {
                "value": 400,
                "clue": "This is double clue 1.1",
                "solution": "This is double solution 1.1"
              },
              {
                "value": 800,
                "clue": "This is double clue 1.2",
                "solution": "This is double solution 1.2"
              },
              {
                "value": 1200,
                "clue": "This is double clue 1.3",
                "solution": "This is double solution 1.3"
              },
              {
                "value": 1600,
                "clue": "This is double clue 1.4",
                "solution": "This is double solution 1.4"
              },
              {
                "value": 2000,
                "clue": "This is double clue 1.5",
                "solution": "This is double solution 1.5"
              }
            ]
          },
          {
            "category": "Double Category 2",
            "clues": [
              {
                "value": 400,
                "clue": "This is double clue 2.1",
                "solution": "This is double solution 2.1"
              },
              {
                "value": 800,
                "clue": "This is double clue 2.2",
                "solution": "This is double solution 2.2"
              },
              {
                "value": 1200,
                "clue": "This is double clue 2.3",
                "solution": "This is double solution 2.3"
              },
              {
                "value": 1600,
                "clue": "This is double clue 2.4",
                "solution": "This is double solution 2.4"
              },
              {
                "value": 2000,
                "clue": "This is double clue 2.5",
                "solution": "This is double solution 2.5"
              }
            ]
          },
          {
            "category": "Double Category 3",
            "clues": [
              {
                "value": 400,
                "clue": "This is double clue 3.1",
                "solution": "This is double solution 3.1"
              },
              {
                "value": 800,
                "clue": "This is double clue 3.2",
                "solution": "This is double solution 3.2"
              },
              {
                "value": 1200,
                "clue": "This is double clue 3.3",
                "solution": "This is double solution 3.3",
                "dailyDouble": true
              },
              {
                "value": 1600,
                "clue": "This is double clue 3.4",
                "solution": "This is double solution 3.4"
              },
              {
                "value": 2000,
                "clue": "This is double clue 3.5",
                "solution": "This is double solution 3.5"
              }
            ]
          },
          {
            "category": "Double Category 4",
            "clues": [
              {
                "value": 400,
                "clue": "This is double clue 4.1",
                "solution": "This is double solution 4.1"
              },
              {
                "value": 800,
                "clue": "This is double clue 4.2",
                "solution": "This is double solution 4.2"
              },
              {
                "value": 1200,
                "clue": "This is double clue 4.3",
                "solution": "This is double solution 4.3"
              },
              {
                "value": 1600,
                "clue": "This is double clue 4.4",
                "solution": "This is double solution 4.4"
              },
              {
                "value": 2000,
                "clue": "This is double clue 4.5",
                "solution": "This is double solution 4.5"
              }
            ]
          },
          {
            "category": "Double Category 5",
            "clues": [
              {
                "value": 400,
                "clue": "This is double clue 5.1",
                "solution": "This is double solution 5.1"
              },
              {
                "value": 800,
                "clue": "This is double clue 5.2",
                "solution": "This is double solution 5.2"
              },
              {
                "value": 1200,
                "clue": "This is double clue 5.3",
                "solution": "This is double solution 5.3"
              },
              {
                "value": 1600,
                "clue": "This is double clue 5.4",
                "solution": "This is double solution 5.4"
              },
              {
                "value": 2000,
                "clue": "This is double clue 5.5",
                "solution": "This is double solution 5.5"
              }
            ]
          },
          {
            "category": "Double Category 6",
            "clues": [
              {
                "value": 400,
                "clue": "This is double clue 6.1",
                "solution": "This is double solution 6.1"
              },
              {
                "value": 800,
                "clue": "This is double clue 6.2",
                "solution": "This is double solution 6.2"
              },
              {
                "value": 1200,
                "clue": "This is double clue 6.3",
                "solution": "This is double solution 6.3"
              },
              {
                "value": 1600,
                "clue": "This is double clue 6.4",
                "solution": "This is double solution 6.4"
              },
              {
                "value": 2000,
                "clue": "This is double clue 6.5",
                "solution": "This is double solution 6.5"
              }
            ]
          }
        ],
        "final": {
          "category": "Final Category",
          "clue": "This is the final jeopardy clue.",
          "solution": "This is the final jeopardy solution!"
        }
      }
    }`


    let data=undefined;
    console.log("COME ONNNNN")
    console.log(user_data.json_string)
      let new_text=user_data.json_string;
     console.log(new_text);
      data=new_text;
    
    
    updateGame(data);
  }, []);

  function updateGame(data: GameData) {
    setPlayers(data.players || []);
    setRound(data.round || ROUND_SINGLE);
    setIsGameStarted(data.players !== undefined);
    setGame(data.game);
  }

  function handleCategoryShown() {
    logEvent("Show Category");
    setNumCategoriesShown(numCategoriesShown + 1);
  }

  function chooseClue(categoryIndex: number, clueIndex: number) {
    logEvent("Show Clue");
    let newGame: Game = Object.assign({}, game);
    let newRound: GameRound = (newGame as any)[round];
    newRound[categoryIndex].clues[clueIndex].chosen = true;
    setGame(newGame);
    setCurrentCategoryIndex(categoryIndex);
    setCurrentClueIndex(clueIndex);
  }

  function updateScore(playerIndex: number, value: number, correct: boolean) {
    logEvent("Update Score");
    const newPlayers = [...players];
    players[playerIndex].score += value;
    if (correct) players[playerIndex].correct++;
    else players[playerIndex].incorrect++;
    setPlayers(newPlayers);
  }

  function returnToBoard() {
    logEvent("Back to Board");
    setCurrentClueIndex(null);
    setCurrentCategoryIndex(null);
  }

  if (game === null) {
    return (
      <div className="app">
        <GameLoader updateGame={updateGame} />
      </div>
    );
  }

  if (round === "single" || round === "double") {
    const board = game[round];
    if (board === undefined) {
      return <div>Error: Game board not found.</div>;
    }

   
    let p = { name:"User", score: 0, correct: 0, incorrect: 0 };
    let plays = [p];
    return (
      <div className="app">
        <JeopardyBoard
          board={board}
          backToBoard={returnToBoard}
          categoryShown={handleCategoryShown}
          chooseClue={chooseClue}
          categoriesShown={numCategoriesShown}
          currentCategory={currentCategoryIndex}
          currentClue={currentClueIndex}
        />
        <Scoreboard
          players={plays}
          currentValue={
            currentCategoryIndex !== null && currentClueIndex !== null
              ? board[currentCategoryIndex].clues[currentClueIndex].value
              : null
          }
          updateScore={updateScore}
          wagering={
            currentCategoryIndex !== null &&
            currentClueIndex !== null &&
            board[currentCategoryIndex].clues[currentClueIndex].dailyDouble ===
              true
          }
          stats={false}
        />

      </div>
    );
  } else if (round === "done") {
    return (
      <div>
        <Scoreboard
          players={players}
          currentValue={null}
          updateScore={updateScore}
          wagering={false}
          stats={true}
        />
      </div>
    );
  } else {
    return <div>Error: Unknown game round.</div>;
  }
}

