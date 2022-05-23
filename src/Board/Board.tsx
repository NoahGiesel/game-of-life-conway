import React, { useState, useEffect, useCallback, useRef } from 'react';
import Cell from "./Cell"

import produce from "immer"

interface Props {
    nColumn: number;
    boardUpdateSpeed: number;
    nRow: number;
    resetField: Boolean;
    playSimulation: Boolean;
}

const Board: React.FC<Props> = ({ nColumn, nRow, resetField, playSimulation, boardUpdateSpeed }) => {

    const generateEmptyField: () => number[][] = () => {
        const row = [];
        for (let i = 0; i < nRow; i++) {
            row.push(Array.from(Array(nColumn), () => 0))
        }
        return row;
    }

    const [matrix, setMatrix] = useState<number[][]>(generateEmptyField);
    const [simulationCount, setSimulationCount] = useState<number>(0);


    const runningRef = useRef<Boolean>();
    const updateSpeedRef = useRef<number>();
    runningRef.current = playSimulation
    updateSpeedRef.current = boardUpdateSpeed

    // Reset field 
    useEffect(() => {
        setMatrix(generateEmptyField)
        setSimulationCount(0);
    }, [resetField, nColumn, nRow])


    // Start simulation
    useEffect(() => {
        simulation()
    }, [playSimulation])


    // operations during field simulation
    const operataions = [
        [0, 1],
        [0, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
        [-1, -1],
        [1, 0],
        [-1, 0],
    ]

    // Board simulation
    const simulation = useCallback(() => {

        // Run simulation until runningRef is false
        if (!runningRef.current) return
        
        setSimulationCount(prev => prev +1 ) 
        
        //generate next field
        setMatrix(prev => {
            return produce(prev, matrixCopy => {
                for (let i = 0; i < nRow; i++) {
                    for (let j = 0; j < nColumn; j++) {
                        //get number of neighbors of a cell
                        let neighbors: number = 0;
                        operataions.forEach(([x, y]) => {
                            const newI = i + x;
                            const newJ = j + y;
                            if (newI >= 0 && newI < nRow && newJ >= 0 && newJ < nColumn) {
                                neighbors += prev[newI][newJ];
                            }
                        })
                        if (neighbors < 2 || neighbors > 3) {
                            matrixCopy[i][j] = 0;
                        } else if (prev[i][j] === 0 && neighbors === 3) {
                            matrixCopy[i][j] = 1;
                        }
                    }
                }
            })
        }) 
        setTimeout(simulation, updateSpeedRef.current);
    }, [])

    // Update Field after cell pressed 
    const updateField = (x: number, y: number) => {
        const newMatrix = produce(matrix, matrixCopy => {
            matrixCopy[x][y] = matrix[x][y] ? 0 : 1;
        })
        setMatrix(newMatrix)
    }

    return (
        <div className="Board">
            <p>Generation : {simulationCount}</p>
            <div className="field" style={{ display: "grid", gridTemplateColumns: `repeat(${nColumn},20px)` }}>
                {matrix.map((nRow, rowIndex) =>
                    nRow.map((nCol, colIndex) => (
                        <Cell
                            matrix={matrix}
                            rowIndex={rowIndex}
                            colIndex={colIndex}
                            updateField={(x, y) => updateField(x, y)}
                        />
                    ))
                )
                }
            </div>
        </div>
    )
};

export default Board;