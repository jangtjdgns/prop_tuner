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
            <main className='w-full min-w-[1024px]'>
                {children}
            </main>
            <Footer />
        </>
    );
}

export default Layout;