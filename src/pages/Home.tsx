// src/pages/Home.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate(); // useNavigate 훅을 사용하여 네비게이션 함수 가져오기
    
    return (
        <>
            {/* <div className='color-change-2x w-full h-96'> */}

            {/* </div> */}
            <div>
                <h1>Home Page</h1>
                <button className='btn' onClick={() => navigate('/board')}>Go to Board</button>
            </div>
        </>
    );
}

export default Home;