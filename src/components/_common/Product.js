import React from 'react';
import { Link } from 'react-router-dom';
import './Product.sass';

function Product({id, title, handle, image, price, compareAtPrice, i}){
    return(
        <Link to={`/produkte/${handle}`} className="Product" style={{animationDelay: `${i*0.1}s`}} key={id}>
            <img src={image} alt={title} />
            <div className="title">{title}</div>
            <div className="prices">
                <span className="price">{new Intl.NumberFormat('sq-AL', { style: 'currency', currency: 'ALL' }).format(price)}</span>
                {compareAtPrice !== "0.0" ? <span className="compare">{new Intl.NumberFormat('sq-AL', { style: 'currency', currency: 'ALL' }).format(compareAtPrice)}</span> : null}
            </div>
        </Link>
    )
}

export default Product;