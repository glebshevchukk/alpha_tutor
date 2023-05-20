import React, { ChangeEvent } from "react";

import { GameData } from "../types";
import sample_game from "../assets/sample_game.json";
import { logEvent } from "../util/analytics";
// import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

interface GameLoaderProps {
  updateGame: (game: GameData) => void;
}

function GameLoader(props: GameLoaderProps) {
  const { updateGame } = props;

  function validateGame(data: any): GameData | null {
    const game = data.game;
    if (game === undefined) {
      console.log("Game key not found in JSON payload.");
      return null;
    }
    // TODO: additional validation
    return game;
  }

  function handleGameUpload(event: ChangeEvent<HTMLInputElement>) {
    logEvent("Upload Game");
    if (event.target.files === null) {
      return;
    }
    event.target.files[0].text().then((text) => {
      const data: any = JSON.parse(text);
      const game = validateGame(data);
      if (game !== null) {
        updateGame(data);
      } else {
        console.log("Invalid game.");
      }
    });
  }

  function downloadSampleGame() {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(sample_game, null, 4)], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = "sample_game.json";
    document.body.appendChild(element);
    element.click();
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
    <div className="max-w-lg mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">JeopardyGPT</h1>
      <hr className="mb-4"/>
      <div className="py-2">
        <h2 className="text-xl mb-2 text-center">Play a Game</h2>
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-white/25 px-6 py-10">
                <div className="text-center">
                  {/* <PhotoIcon className="mx-auto h-12 w-12 text-gray-500" aria-hidden="true" /> */}
                  <div className="mt-4 flex text-sm leading-6 text-gray-400">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-gray-900 font-semibold text-white focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 hover:text-indigo-500"
                    >
                      <span>Upload a file</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleGameUpload}/>
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-400">PNG, JPG, GIF up to 10MB</p>
                </div>
              </div>
        {/* <input type="file" name="file" onChange={handleGameUpload} className="mb-4"/> */}
      </div>
      <hr className="mb-4"/>
      <div className="py-2">
        <h2 className="text-xl mb-2 text-center">Create a Game</h2>
        <div className="mb-4 text-center">
          To create a Jeopardy game, download the below game configuration file,
          edit it to include your desired clues, and re-upload it here.
          <div className="mt-2">
            <button onClick={downloadSampleGame} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Download Configuration</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  


  );
}

export default GameLoader;
