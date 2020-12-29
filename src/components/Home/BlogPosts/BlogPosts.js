import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ARTICLES } from '../../../graphql/queries';
import { useDispatch } from 'react-redux';
import { setSelectedArticle } from '../../../state/actions/blogActions';
import { arrow_left, arrow_right } from '../../icons';
import Button from '../../_common/Button';
import './BlogPosts.sass';

function BlogPosts(){

    const dispatch = useDispatch();

    const { data } = useQuery(GET_ARTICLES, {variables: {first: 2}});

    const articles = data?.articles?.edges ?? [];

    return(
        <div className="BlogPosts">
            <div className="head">
                <div className="left">
                    <div className="title">Blogu ynë</div>
                    <Link to="/blog" className="all">Të gjitha shkrimet</Link>
                </div>
                <div className="arrows">
                    <span>{arrow_left}</span>
                    <span>{arrow_right}</span>
                </div>
            </div>
            <div className="posts">
                {articles.map(({node}) => {
                    const {id, handle, title, publishedAt, excerpt, image } = node;
                    return <div key={id} className="post">
                        <img src={image.transformedSrc} alt="" />
                        <div className="post-content">
                            <div className="data">{dayjs(publishedAt).format("DD MMM, YYYY")}</div>
                            <h1>{title}</h1>
                            <p>{excerpt}</p>
                            <Link to={`/blog`} onClick={() => dispatch(setSelectedArticle(node))}><Button variant="primary">Më shumë</Button></Link>
                        </div>
                    </div>
                })}
            </div>
        </div>
    )
}

export default BlogPosts;