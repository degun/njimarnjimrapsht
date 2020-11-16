import React from 'react';
import { Link } from 'react-router-dom';
import './SearchProduct.sass';

function SearchProduct({id, title, handle, image, price, compareAtPrice, i, onClick}){
    return(
        <Link to={`/produkte/${handle}`} className="SearchProduct" onClick={onClick} style={{animationDelay: `${i*0.1}s`}} key={id}>
            <img src={image} alt={title} />
            <div className="details">
                <div className="title">{title}</div>
                <div className="prices">
                    {parseInt(compareAtPrice) !== 0 ? <span className="compare">{new Intl.NumberFormat('sq-AL', { style: 'currency', currency: 'ALL' }).format(compareAtPrice)}</span> : null}
                    <span className="price">{new Intl.NumberFormat('sq-AL', { style: 'currency', currency: 'ALL' }).format(price)}</span>
                </div>
            </div>
        </Link>
    )
}

export default SearchProduct;