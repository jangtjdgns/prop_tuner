import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';

import Layout from './components/Layout';
import Category from './components/Category';
import Home from './pages/Home';
import Board from './pages/Board';

// category-layout
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
// category-sizing
import Sizing from './pages/category/sizing/Sizing';
import Width from './pages/category/sizing/components/Width';
import Height from './pages/category/sizing/components/Height';
import MinWidth from './pages/category/sizing/components/MinWidth';
import MinHeight from './pages/category/sizing/components/MinHeight';
import MaxWidth from './pages/category/sizing/components/MaxWidth';
import MaxHeight from './pages/category/sizing/components/MaxHeight';
import Margin from './pages/category/sizing/components/Margin';
import Padding from './pages/category/sizing/components/Padding';
import Border from './pages/category/sizing/components/Border';
import Outline from './pages/category/sizing/components/Outline';
// category-typography
import Typography from './pages/category/typography/Typography';
import BasicFont from './pages/category/typography/components/BasicFont';
import AdvancedFont from './pages/category/typography/components/AdvancedFont';
import LineHeight from './pages/category/typography/components/LineHeight';
import LetterSpacing from './pages/category/typography/components/LetterSpacing';
import WordSpacing from './pages/category/typography/components/WordSpacing';
import TextIndent from './pages/category/typography/components/TextIndent';
import TextDecoration from './pages/category/typography/components/TextDecoration';
import TextShadow from './pages/category/typography/components/TextShadow';


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
                        <Route path="Sizing" element={<Sizing />}>
                            <Route index element={<Width />} />
                            <Route path="Width" element={<Width />} />
                            <Route path="Height" element={<Height />} />
                            <Route path="MinWidth" element={<MinWidth />} />
                            <Route path="MinHeight" element={<MinHeight />} />
                            <Route path="MaxWidth" element={<MaxWidth />} />
                            <Route path="MaxHeight" element={<MaxHeight />} />
                            <Route path="Margin" element={<Margin />} />
                            <Route path="Padding" element={<Padding />} />
                            <Route path="Border" element={<Border />} />
                            <Route path="Outline" element={<Outline />} />
                        </Route>
                        <Route path="Typography" element={<Typography />}>
                            <Route index element={<BasicFont />} />
                            <Route path="BasicFont" element={<BasicFont />} />
                            <Route path="AdvancedFont" element={<AdvancedFont />} />
                            <Route path="LineHeight" element={<LineHeight />} />
                            <Route path="LetterSpacing" element={<LetterSpacing />} />
                            <Route path="WordSpacing" element={<WordSpacing />} />
                            <Route path="TextIndent" element={<TextIndent />} />
                            <Route path="TextDecoration" element={<TextDecoration />} />
                            <Route path="TextShadow" element={<TextShadow />} />
                        </Route>
                    </Route>
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;