import React, {useState} from "react"

import './App.css';
import Board from "./Board/Board"
 

const App: React.FC = () => {

  const [ reset, setResetField ] = useState<Boolean>(false)
  const [ isPlaying, setIsPlaying ] = useState<Boolean>(false)

  const stopGame = () => {
     setResetField(true)
     setIsPlaying(false)
  }

  const startGame = () => {
     setResetField(false)
     setIsPlaying(true)
  }


  return (
    <div className="App">
      <div className="user__input">
        <button onClick={() => stopGame() } className={ isPlaying ? "enabled" : "disabled"} >RESET</button>
        {/* <button className={ isPlaying ? "enabled" : "disabled"}>Generate</button> */}
        <button onClick={() => startGame() } className={ !isPlaying ? "enabled" : "disabled"}  >Generate</button>
      </div>
      <Board nColumn={70} nRow={30} playGeneration={isPlaying}  resetField={reset}  />
    </div>
  );
}

export default App;
