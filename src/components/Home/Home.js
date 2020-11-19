import React, { useEffect } from 'react';
import { withNamespaces } from 'react-i18next';
import Imazh from './Imazh/Imazh';
import QuickInfo from './QuickInfo/QuickInfo';
import Vitrine from './Showcase/Showcase';
import BlogPosts from './BlogPosts/BlogPosts';
import { useDispatch } from 'react-redux';
import { setMenuOpen } from '../../state/actions/appActions';
import './Home.sass';

function Home({ t }) { 
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setMenuOpen(true))
    }, []);

    return(
        <section className="Home">
            <Imazh />
            <QuickInfo />
            <Vitrine title={t("Home.Produkte të zgjedhura")} variant="best-sellers" />
            <Vitrine title={t("Home.Produkte të tjera")} variant="by-tag" />
            <Vitrine title={t("Home.Produkte sipas llojit")} variant="by-type" />
            <BlogPosts />
        </section>
    )
 }

export default withNamespaces()(Home);