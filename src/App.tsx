import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout';
import Category from './components/Category';
import Home from './pages/Home';
import Board from './pages/Board';
import CtLayout from './pages/category/layout/Layout';
import AspectRatio from './pages/category/layout/components/AspectRatio';
import Columns from './pages/category/layout/components/Columns';
import Break from './pages/category/layout/components/Break';
import BoxSizing from './pages/category/layout/components/BoxSizing';
import Display from './pages/category/layout/components/Display';
import Float from './pages/category/layout/components/Float';
import ObjectFit from './pages/category/layout/components/ObjectFit';
import ObjectPosition from './pages/category/layout/components/ObjectPosition';
import Overflow from './pages/category/layout/components/Overflow';
import Position from './pages/category/layout/components/Position';
import Visibility from './pages/category/layout/components/Visibility';
import ZIndex from './pages/category/layout/components/ZIndex';
import Sizing from './pages/category/sizing/Sizing';
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
                        <Route path="Columns" element={<Columns />} />
                        <Route path="Break" element={<Break />} />
                        <Route path="BoxSizing" element={<BoxSizing />} />
                        <Route path="Display" element={<Display />} />
                        <Route path="Float" element={<Float />} />
                        <Route path="ObjectFit" element={<ObjectFit />} />
                        <Route path="ObjectPosition" element={<ObjectPosition />} />
                        <Route path="Overflow" element={<Overflow />} />
                        <Route path="Position" element={<Position />} />
                        <Route path="Visibility" element={<Visibility />} />
                        <Route path="ZIndex" element={<ZIndex />} />
                    </Route>
                    <Route path="Sizing" element={<Sizing />} />
                </Route>
            </Routes>
        </Layout>
    </Router>
    );
}

export default App;