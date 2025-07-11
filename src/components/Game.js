import React, {useEffect, useState} from 'react';
import {v4 as uuidv4} from 'uuid';
import Board from "./Board";

const Game = () => {

    const icons = ['🐶', '🐱', '🐹', '🐰', '🐼', '🐨', '🐯', '🦁']

    const [board, setBoard] = useState(() => Array(16).fill(null).map(el => ({
        id: uuidv4(),
        picture: null,
        isShown: false
    })));

    const [clickedValue, setClickedValue] = useState([]);

    const [readyCards, setReadyCards] = useState([]);

    const [count, setCount] = useState(0);

    const [result, setResult] = useState(0);

    const [isWin, setIsWin] = useState(false);

    const [bestScore, setBestScore] = useState(0);

    const resetBoard = () => {
        shuffledGame();
        setClickedValue([]);
        setReadyCards([]);
        setCount(0);
        setResult(0);
        setIsWin(false)
    }

    const shuffledGame = () => {
        const shuffledBoard = [...icons, ...icons];
        for (let i = shuffledBoard.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledBoard[i], shuffledBoard[j]] = [shuffledBoard[j], shuffledBoard[i]];
        }

        const newBoard = shuffledBoard.map(icon => ({
            id: uuidv4(),
            picture: icon,
            isShown: false
        }));

        setBoard(newBoard);
    };

    useEffect(() => {
        shuffledGame();
    }, []);

    const handleClick = (id) => {
        const findValue = board.find(el => el.id === id);
        if (!findValue || findValue.isShown) return;

        const updatedClickedValue = [...clickedValue, findValue];
        setClickedValue(updatedClickedValue);

        setBoard(board.map(el =>
            el.id === id ? { ...el, isShown: true } : el
        ));

        if (updatedClickedValue.length === 2) {
            const pairCount = (count + 1);
            setCount(pairCount);
            const [firstCard, secondCard] = updatedClickedValue;

            if (firstCard.picture === secondCard.picture) {
                const newReadyCards = [...readyCards, firstCard, secondCard];
                setReadyCards(newReadyCards);
                setClickedValue([]);

                if (newReadyCards.length === board.length) {
                    setResult(count + 1);
                    setIsWin(true);
                    if (bestScore === 0 || pairCount < bestScore) {
                        setBestScore(pairCount);
                    }
                }
            } else {
                setTimeout(() => {
                    setBoard(board.map(el =>
                        el.id === firstCard.id || el.id === secondCard.id
                            ? { ...el, isShown: false }
                            : el
                    ));
                    setClickedValue([]);
                }, 500);
            }
        }
    };


    return (
        <div>

            <Board
                board={board}
                handleClick={handleClick}
                resetBoard={resetBoard}
                result={result}
                bestScore={bestScore}
            />

        </div>
    );
};

export default Game;