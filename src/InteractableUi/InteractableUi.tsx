import React from 'react';


interface Props {
    slider: number;
    rowCount: number;
    colCount: number
    updateSlider: (x:number) => void 
    updateRowCount: (x:number) => void 
    updateColCount: (x:number) => void 
}

const InteractableUi: React.FC<Props> = (props) => {
    return (
        <div className="interactableUi">
            <ul>
                <li><p>Update every {props.slider} ms</p></li>
                <li><input type="range" onChange={(e) => props.updateSlider(parseInt(e.target.value, 10))} min={0} max={2000} value={props.slider} /></li>
                <li><p>Rows <input type="number" min={3} max={200} onInput={(e) =>  props.updateRowCount(parseInt(e.currentTarget.value))} value={props.rowCount} /></p></li>
                <li><p>Columns <input type="number" min={3} max={200} onInput={(e) => props.updateColCount(parseInt(e.currentTarget.value))} value={props.colCount} /></p></li>
            </ul>
        </div>
    )
};

 export default InteractableUi;