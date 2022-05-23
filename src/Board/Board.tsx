import React, { useState, useEffect, useCallback, useRef } from 'react';
import Box from "./Box"

import produce from "immer"

interface Props {
    nColumn: number;
    nRow: number;
    resetField: Boolean;
    playGeneration: Boolean;
}

const Board: React.FC<Props> = ({ nColumn, nRow, resetField, playGeneration }) => {

    
    const generateField : () => number[][] = () => {
        const row = [];
        for (let i = 0; i < nRow; i++) {
            row.push(Array.from(Array(nColumn), () => 0))
        }
        return row;
    }
    const [matrix, setMatrix] = useState<number[][]>(generateField);
    const runningRef = useRef<Boolean>();
    runningRef.current = playGeneration

    useEffect(() => {
        console.log("RESETTING FIELD") 
        setMatrix(generateField)
    }, [resetField])


    useEffect(() => {
        console.log("PLAY GENERATION") 
        generation()
    }, [playGeneration])


    console.log(matrix)

    const operataions = [
        [0,1],
        [0,-1],
        [1,-1],
        [-1,1],
        [1,1],
        [-1,-1],
        [1,0],
        [-1,0],
    ]

    // metodo per generare board game of life conway
    const generation = useCallback(() => {
        //seeing if running,then return ( exit )
        if(!runningRef.current) return 

        //generate next field
        setMatrix(prev => {
            console.log("simulating")
            return produce(prev, matrixCopy => { 
                for(let i = 0; i < nRow; i++){
                    for(let j = 0; j < nColumn; j++) { 
                        //get number of neighbors of a cell
                        let neighbors : number = 0;
                        operataions.forEach(([x,y]) => { 
                            const newI = i +x ; 
                            const newJ = j + y;
                            if(newI >= 0 && newI < nRow && newJ >=0 && newJ < nColumn){
                                neighbors += prev[newI][newJ];
                            }
                        })
                        if(neighbors< 2 || neighbors > 3) { 
                            matrixCopy[i][j] = 0;
                        }else if(prev[i][j] === 0 && neighbors === 3) {
                            matrixCopy[i][j] =1;

                        }
                        //left check
                        // if(matrixCopy[i][j] > 0 && matrixCopy[i][j-1]){
                        //     neighbors += 1;
                        // }
                        // //right check
                        // if(matrixCopy[i][j] < nColumn && matrixCopy[i][j+1]){
                        //     neighbors += 1;
                        // }
                        // //top check
                        // if(matrixCopy[i][j] > 0 && matrixCopy[i][j-1]){
                        //     neighbors += 1;
                        // }
                        // //bottom check
                        // if(matrixCopy[i][j] < nColumn && matrixCopy[i][j+1]){
                        //     neighbors += 1;
                        // }
                    }
                }
            })
        })

        setTimeout(generation , 20);
    },[])


    // metodo per ricevere coordinate x_y dell'oggetto cliccato per usarlo per aggiornare board 
    const updateField = (x: number, y: number) => {
        const newMatrix = produce(matrix,matrixCopy=>{
            matrixCopy[x][y]  = matrix[x][y] ? 0 : 1;
        })
        setMatrix(newMatrix)
    }
    const getCellCoordinate = (e: any) => {
        let key: string = e.target.id
        let numbers = key.split("_")
        let x: number = parseInt(numbers[0], 10);
        let y: number = parseInt(numbers[1], 10);
        updateField(x,y);
    }

    return (
        <div className="Board">
            <div className="field" style={{ display: "grid", gridTemplateColumns: `repeat(${nColumn},20px)` }}>
                {matrix.map((nRow, rowIndex) =>
                    nRow.map((nCol, colIndex) => (
                        // <Box unique={`${rowIndex}_${colIndex}`}  boxPressed={(x) => boxPressed(x)} />
                        <div
                            id={`${rowIndex}_${colIndex}`}
                            key={`${rowIndex}_${colIndex}`}
                            className="box"
                            style={{ backgroundColor: matrix[rowIndex][colIndex] ? "black" : "white" }}
                            onClick={e => getCellCoordinate(e)}
                        />
                    ))
                )
                }
            </div>
        </div>
    )
};

export default Board;