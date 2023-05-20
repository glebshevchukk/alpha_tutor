import { ChangeEvent, KeyboardEvent, useState } from "react";
import { Player } from "../types";

interface PlayerChooserProps {
  addPlayer: (name: string) => void;
  players: Player[];
  playGame: () => void;
}

function PlayerChooser({ addPlayer, playGame, players }: PlayerChooserProps) {
  const [name, setName] = useState("");

  function handleAddPlayer() {
    addPlayer(name);
    setName("");
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleAddPlayer();
    }
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen p-4">
      <div className="max-w-lg mx-auto p-4">
        {/* Page Header */}
        <h1 className="text-2xl font-bold mb-4 text-center">JeopardyGPT</h1>
        <hr className="mb-4"/>

        {/* Player Generation Section */}
        <div className="py-2">

          {/* Add Player Section */}
          <div className="bg-white p-8 rounded shadow-lg mb-8">
            <h3 className="text-lg font-bold mb-4 text-black">Add Player</h3>
            <input
              value={name}
              onKeyDown={handleKeyDown}
              onChange={handleNameChange}
              autoFocus
              type="text"
              placeholder="Player Name"
              className="p-2 border rounded w-full text-black"
            />
            <button className="add-player-button bg-blue-500 text-white py-2 px-4 rounded mt-4 w-full" onClick={handleAddPlayer}>
              Add Player
            </button>
            <button className="play-game-button bg-green-500 text-white py-2 px-4 rounded w-full max-w-md mt-4" onClick={playGame}>
              Play Game
            </button>
          </div>
        </div>


        {/* Player List Section */}
        <div className="py-2">
          <div className="bg-white p-8 rounded shadow-lg">
          <h3 className="text-lg font-bold mb-4 text-black">Current Players</h3>

            <div className="flex flex-col items-center justify-center space-y-4">
              {players.map((player, i) => (
                <div key={i} className="bg-gray-100 shadow-md rounded p-4 w-full flex items-center justify-center">
                  <h3 className="text-lg font-semibold text-black">{player.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerChooser;
