// src/components/Category.tsx
// layout
import React from 'react';
import { Outlet } from 'react-router-dom';

const Category: React.FC = () => {
    return (
        <>
            <Outlet />
        </>
    );
}

export default Category;