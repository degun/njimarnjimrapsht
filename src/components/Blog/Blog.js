import React, { useEffect, useState } from 'react';
import { withNamespaces } from 'react-i18next';
import { useQuery } from '@apollo/client';
import { GET_ARTICLES } from '../../graphql/queries';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuOpen } from '../../state/actions/appActions';
import { setSelectedArticle } from '../../state/actions/blogActions';
import './Blog.sass';
import './Article.sass';

function Blog({ t }){
    const dispatch = useDispatch();
    const [ cursors, setCursors ] = useState([]);

    const { selectedArticle } = useSelector(state => state.blog);

    useEffect(() => {
        dispatch(setMenuOpen(true))
    })

    const { data } = useQuery(GET_ARTICLES, {variables: {first: 9, after: cursors[0]}});

    const articles = data?.articles?.edges ?? [];

    const hasNextPage = data?.articles?.pageInfo?.hasNextPage
    const hasPreviousPage = data?.articles?.pageInfo?.hasPreviousPage

    function goForward(){
        if(hasNextPage){
            let c = Array.from(cursors);
            c.unshift(articles[articles.length - 1].cursor);
            setCursors(c);
        }
    }

    function goBack(){
        if(hasPreviousPage){
            let c = Array.from(cursors);
            c.shift();
            setCursors(c);
        }
    }
    
    return <>
        {selectedArticle 
        ? <section className="Article">
            <div className="back" onClick={() => dispatch(setSelectedArticle(null))}>&larr; {t("Blog.Gjithë artikujt")}</div>
            <img src={selectedArticle.image.originalSrc} alt="" />
            <h1>{selectedArticle.title}</h1>
            <main dangerouslySetInnerHTML={{__html: selectedArticle.contentHtml}}></main>
        </section>
        : <section className="Blog">
            {articles.map(({node}) => {
                const {id, handle, title, excerpt, image} = node;
                return <div onClick={() => dispatch(setSelectedArticle(node))} key={id} className="article">
                    <img src={image?.transformedSrc ?? ""} />
                    <h1>{title}</h1>
                    <p>{excerpt}</p>
                </div>
            })}
            {articles.length ? <div className="pagination">
                <div onClick={goBack} className={`arrow ${hasPreviousPage ? "active" : ""}`}><span>&larr;</span> {t("Blog.Përpara")}</div>
                <div onClick={goForward} className={`arrow ${hasNextPage ? "active" : ""}`}>{t("Blog.Pas")} <span>&rarr;</span></div>
            </div> : null}
        </section>}
    </>
}

export default withNamespaces()(Blog);