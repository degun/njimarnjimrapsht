import React, { useEffect } from 'react';
import Container from '../_common/Container';
import Imazh from './Imazh/Imazh';
import QuickInfo from './QuickInfo/QuickInfo';
import Vitrine from './Showcase/Showcase';
import BlogPosts from './BlogPosts/BlogPosts';
import { useDispatch } from 'react-redux';
import { setMenuOpen } from '../../state/actions/appActions';
import './Home.sass';

function Home() { 
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setMenuOpen(true))
    }, []);

    return(
        <Container>
            <Imazh />
            <QuickInfo />
            <Vitrine title="Produkte të zgjedhura" variant="best-sellers" />
            <Vitrine title="Produkte të tjera" variant="by-tag" />
            <Vitrine title="Produkte sipas llojit" variant="by-type" />
            <BlogPosts />
        </Container>
    )
 }

export default Home;