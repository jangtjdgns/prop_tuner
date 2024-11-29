import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css';

import Layout from './components/Layout';
import Category from './pages/Category';
import Home from './pages/Home';
import Board from './pages/Board';

// category-layout
import AspectRatio from './pages/category/layout/AspectRatio';
import Columns from './pages/category/layout/Columns';
import Break from './pages/category/layout/Break';
import BoxSizing from './pages/category/layout/BoxSizing';
import Display from './pages/category/layout/Display';
import Float from './pages/category/layout/Float';
import ObjectFit from './pages/category/layout/ObjectFit';
import ObjectPosition from './pages/category/layout/ObjectPosition';
import Overflow from './pages/category/layout/Overflow';
import Position from './pages/category/layout/Position';
import Visibility from './pages/category/layout/Visibility';
import ZIndex from './pages/category/layout/ZIndex';
// category-sizing
import Width from './pages/category/sizing/Width';
import Height from './pages/category/sizing/Height';
import MinWidth from './pages/category/sizing/MinWidth';
import MinHeight from './pages/category/sizing/MinHeight';
import MaxWidth from './pages/category/sizing/MaxWidth';
import MaxHeight from './pages/category/sizing/MaxHeight';
import Margin from './pages/category/sizing/Margin';
import Padding from './pages/category/sizing/Padding';
import Border from './pages/category/sizing/Border';
import Outline from './pages/category/sizing/Outline';
// category-typography
import BasicFont from './pages/category/typography/BasicFont';
import AdvancedFont from './pages/category/typography/AdvancedFont';
import LineHeight from './pages/category/typography/LineHeight';
import LetterSpacing from './pages/category/typography/LetterSpacing';
import WordSpacing from './pages/category/typography/WordSpacing';
import TextIndent from './pages/category/typography/TextIndent';
import TextDecoration from './pages/category/typography/TextDecoration';
import TextShadow from './pages/category/typography/TextShadow';
import TextAlign from './pages/category/typography/TextAlign';
import WhiteSpace from './pages/category/typography/WhiteSpace';
import OverflowWrap from './pages/category/typography/OverflowWrap';
import WordBreak from './pages/category/typography/WordBreak';
import TextOverflow from './pages/category/typography/TextOverflow';
import Direction from './pages/category/typography/Direction';
import WritingMode from './pages/category/typography/WritingMode';
import Hyphens from './pages/category/typography/Hyphens';
import ListStyle from './pages/category/typography/ListStyle';
// category-design
import Background from './pages/category/design/Background';
import Color from './pages/category/design/Color';
import Gradient from './pages/category/design/Gradient';
import ClipPath from './pages/category/design/ClipPath';
// category-transform
import Transform from './pages/category/transform/Transform';
import Transform3D from './pages/category/transform/Transform3D';
import TransformOrigin from './pages/category/transform/TransformOrigin';
import Perspective from './pages/category/transform/Perspective';
import TransformStyle from './pages/category/transform/TransformStyle';
import PerspectiveOrigin from './pages/category/transform/PerspectiveOrigin';
import BackfaceVisibility from './pages/category/transform/BackfaceVisibility';
// category-flexbox
import FlexDirection from './pages/category/flexbox/FlexDirection';
import FlexWrap from './pages/category/flexbox/FlexWrap';

const App = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/board" element={<Board />} />
                    <Route path="/category" element={<Category />}>
                        <Route path="layout">
                            {/* Layout의 하위 항목들 */}
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
                        <Route path="sizing">
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
                        <Route path="typography">
                            <Route index element={<BasicFont />} />
                            <Route path="BasicFont" element={<BasicFont />} />
                            <Route path="AdvancedFont" element={<AdvancedFont />} />
                            <Route path="LineHeight" element={<LineHeight />} />
                            <Route path="LetterSpacing" element={<LetterSpacing />} />
                            <Route path="WordSpacing" element={<WordSpacing />} />
                            <Route path="TextIndent" element={<TextIndent />} />
                            <Route path="TextDecoration" element={<TextDecoration />} />
                            <Route path="TextShadow" element={<TextShadow />} />
                            <Route path="TextAlign" element={<TextAlign />} />
                            <Route path="WhiteSpace" element={<WhiteSpace />} />
                            <Route path="OverflowWrap" element={<OverflowWrap />} />
                            <Route path="WordBreak" element={<WordBreak />} />
                            <Route path="TextOverflow" element={<TextOverflow />} />
                            <Route path="Direction" element={<Direction />} />
                            <Route path="WritingMode" element={<WritingMode />} />
                            <Route path="Hyphens" element={<Hyphens />} />
                            <Route path="ListStyle" element={<ListStyle />} />
                        </Route>
                        <Route path="design">
                            <Route index element={<Background />} />
                            <Route path="Background" element={<Background />} />
                            <Route path="Color" element={<Color />} />
                            <Route path="Gradient" element={<Gradient />} />
                            <Route path="ClipPath" element={<ClipPath />} />
                        </Route>
                        <Route path='transform'>
                            <Route index element={<Transform />} />
                            <Route path='Transform' element={<Transform />} />
                            <Route path='Transform3D' element={<Transform3D />} />
                            <Route path='TransformOrigin' element={<TransformOrigin />} />
                            <Route path='Perspective' element={<Perspective />} />
                            <Route path='TransformStyle' element={<TransformStyle />} />
                            <Route path='PerspectiveOrigin' element={<PerspectiveOrigin />} />
                            <Route path='BackfaceVisibility' element={<BackfaceVisibility />} />
                        </Route>
                        <Route path='flexbox'>
                            <Route index element={<FlexDirection />} />
                            <Route path='FlexDirection' element={<FlexDirection />} />
                            <Route path='FlexWrap' element={<FlexWrap />} />
                        </Route>
                    </Route>
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;