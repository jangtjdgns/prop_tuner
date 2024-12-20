// src/components/Layout.tsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
    children: React.ReactNode; // children의 타입 정의
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <>
            <Header />
            <main className='min-h-[calc(100vh-80px)]'>
                {children}
            </main>
            <Footer />
        </>
    );
}

export default Layout;