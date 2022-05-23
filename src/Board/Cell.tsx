import React from "react"


interface Props {
    rowIndex: number
    colIndex: number
    matrix: number[][]
    updateField: (x: number, y: number) => void
}

const Cell: React.FC<Props> = (props) => {

    // converting string to coordinates
    const getCellCoordinate = (e: any) => {
        let key: string = e.target.id
        let numbers = key.split("_")
        let x: number = parseInt(numbers[0], 10);
        let y: number = parseInt(numbers[1], 10);
        props.updateField(x, y);
    }

    return (
        <div>
            <div
                className="box"
                id={`${props.rowIndex}_${props.colIndex}`}
                key={`${props.rowIndex}_${props.colIndex}`}
                style={{ backgroundColor: props.matrix[props.rowIndex][props.colIndex] ? "black" : "white" }}
                onClick={e => getCellCoordinate(e)}
            />
        </div>)
}


export default Cell