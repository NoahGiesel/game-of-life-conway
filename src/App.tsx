import React, { useState } from "react"

import './App.css';
import Board from "./Board/Board"
import InteractableUi from "./InteractableUi/InteractableUi";
import ButtonInput from "./ButtonInput/ButtonInput";





const App: React.FC = () => {

  // App shares state with multiple components
  const [resetField, setResetField] = useState<Boolean>(false)
  const [isPlaying, setIsPlaying] = useState<Boolean>(false)
  const [slider, setSlider] = useState<number>(500);
  const [rowCount, setRowCount] = useState<number>(35)
  const [colCount, setColCount] = useState<number>(40)



  return (

    <div className="App">
      <div className="user__input">
        <ButtonInput
          isPlaying={isPlaying}
          resetField={() => setResetField(!resetField)}
          updatePlaying={(x) => setIsPlaying(x)}
        />
        <InteractableUi
          slider={slider}
          rowCount={rowCount}
          colCount={colCount}
          updateSlider={e => setSlider(e)}
          updateRowCount={e => setRowCount(e)}
          updateColCount={e => setColCount(e)}
        />
      </div>

      <Board
        nColumn={colCount}
        nRow={rowCount}
        boardUpdateSpeed={slider}
        playSimulation={isPlaying}
        resetField={resetField}
      />

    </div>
  );
}

export default App;
