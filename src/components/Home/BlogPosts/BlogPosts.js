import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ARTICLES } from '../../../graphql/queries';
import { arrow_left, arrow_right } from '../../icons';
import blog1 from '../../../images/blog1.png';
import blog2 from '../../../images/blog2.png';
import Button from '../../_common/Button';
import './BlogPosts.sass';

function BlogPosts(){

    const { data } = useQuery(GET_ARTICLES, {variables: {first: 2}});

    const articles = data?.articles?.edges?.map(({node}) => {
        const { id, handle, title, publishedAt, excerpt, image } = node;
        return { id, handle, title, publishedAt, excerpt, image: image.transformedSrc }
    }) ?? [];

    return(
        <div className="BlogPosts">
            <div className="head">
                <div className="left">
                    <div className="title">Blogu ynë</div>
                    <div className="all">Të gjitha shkrimet</div>
                </div>
                <div className="arrows">
                    <span>{arrow_left}</span>
                    <span>{arrow_right}</span>
                </div>
            </div>
            <div className="posts">
                {articles.map(({id, handle, title, publishedAt, excerpt, image }) => <div key={id} className="post">
                    <img src={image} alt="" />
                    <div className="post-content">
                        <div className="data">{dayjs(publishedAt).format("DD MMM, YYYY")}</div>
                        <h1>{title}</h1>
                        <p>{excerpt}</p>
                        <Link to={`/blog/${handle}`}><Button variant="primary">Më shumë</Button></Link>
                    </div>
                </div>)}
            </div>
        </div>
    )
}

export default BlogPosts;