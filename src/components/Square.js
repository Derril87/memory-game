import React from 'react';

const Square = ({ id, picture, isShown, handleClick }) => {
    return (
        <button
            className={`square ${isShown ? "open" : ""}`}
            onClick={() => handleClick(id)}
        >
            {isShown ? picture : ""}
        </button>
    );
};

export default Square;