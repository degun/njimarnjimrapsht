import React from 'react';
import Container from '../_common/Container';
import Imazh from './Imazh/Imazh';
import QuickInfo from './QuickInfo/QuickInfo';
import Vitrine from './Showcase/Showcase';
import BlogPosts from './BlogPosts/BlogPosts';
import './Home.sass';

function Home() { 
    return(
        <div className="Home">
            <Container>
                <Imazh />
                <QuickInfo />
                <Vitrine title="Produkte të zgjedhura" variant="best-sellers" />
                <Vitrine title="Produkte të tjera" variant="by-tag" />
                <Vitrine title="Produkte sipas llojit" variant="by-type" />
                <BlogPosts />
            </Container>
        </div>
    )
 }

export default Home;