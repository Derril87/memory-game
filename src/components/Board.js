import React from 'react';
import Square from "./Square";

const Board = ({board, handleClick, resetBoard, result, bestScore}) => {

    return (
        <div className='board-container'>
            <div className="board">

                {board.map((el) => (
                    <Square
                        key={el.id}
                        id={el.id}
                        picture={el.picture}
                        isShown={el.isShown}
                        handleClick={handleClick}
                    />
                ))}
            </div>
            <div className='general-container'>
                <div className='results'>
                    <div className='result-container'>
                        <div className="current-result">Score</div>
                        <div className='current-result-value'>{result}</div>
                    </div>
                    <div className='result-container'>
                        <div className="best-result">Best score</div>
                        <div className='best-result-value'>{bestScore}</div>
                    </div>
                </div>
                <div className='buttons-container'>
                    <button onClick={resetBoard} className='reset-button'>New Game</button>
                </div>
            </div>


        </div>
    );
};

export default Board;