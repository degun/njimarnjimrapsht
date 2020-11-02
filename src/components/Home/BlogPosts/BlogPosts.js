import React from 'react';
import { arrow_left, arrow_right } from '../../icons';
import blog1 from '../../../images/blog1.png';
import blog2 from '../../../images/blog2.png';
import Button from '../../_common/Button';
import './BlogPosts.sass';

function BlogPosts(){
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
                <div className="post">
                    <img src={blog1} alt="" />
                    <div className="post-content">
                        <div className="data">19 Jan, 2020</div>
                        <h1>Tradita shqiptare e rruazave dhe punimit artizanal</h1>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>
                        <Button variant="primary">Më shumë</Button>
                    </div>
                </div>
                <div className="post">
                    <img src={blog2} alt="" />
                    <div className="post-content">
                        <div className="data">10 Jan, 2020</div>
                        <h1>Byzylyke handmade te realizuara ne Shqiperi qe bejne xhiron e botes</h1>
                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.</p>
                        <Button variant="primary">Më shumë</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogPosts;