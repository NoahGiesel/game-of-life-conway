import React from 'react';


interface Props {
    resetField : () => void;
    updatePlaying : (x:boolean) => void;
    isPlaying : Boolean;
}

const UserInput: React.FC<Props> = (props) => {


    const stopGame = () => {
        props.resetField()
        props.updatePlaying(false)
      }
    
      const startGame = () => {
        props.updatePlaying(true) 
      }
    

    return (
        <div className="button__input">
            <div>
                <button onClick={() => stopGame()} className={props.isPlaying ? "enabled" : "disabled"} >RESET</button>
                <button onClick={() => startGame()} className={!props.isPlaying ? "enabled" : "disabled"}  >Generate</button>
            </div>
        </div>
    )
};

export default UserInput;