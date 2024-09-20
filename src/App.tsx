import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout';
import Category from './components/Category';
import Home from './pages/Home';
import Board from './pages/Board';
import CtLayout from './pages/category/Layout';
import AspectRatio from './pages/category/layout/AspectRatio';
import Container from './pages/category/layout/Container';
import Sizing from './pages/category/Sizing';
import './App.css';

const App = () => {
    return (
      <Router>
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/board" element={<Board />} />
                <Route path="/category" element={<Category />}>
                    <Route path="Layout" element={<CtLayout />}>
                        <Route index element={<AspectRatio />} />
                        <Route path="AspectRatio" element={<AspectRatio />} />
                        <Route path="Container" element={<Container />} />
                    </Route>
                    <Route path="Sizing" element={<Sizing />} />
                </Route>
            </Routes>
        </Layout>
    </Router>
    );
}

export default App;