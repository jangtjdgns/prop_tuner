// src/pages/Board.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Board = () => {
    const navigate = useNavigate();

    return (
        <div>
            <h1>Board Page</h1>
            <button onClick={() => navigate('/')}>Go to Home</button>
        </div>
    );
}

export default Board;