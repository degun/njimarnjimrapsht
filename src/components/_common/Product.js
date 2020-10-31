import React from 'react';
import './Product.sass';

function Product({id, title, image, price, i}){
    return(
        <div className="Product" style={{animationDelay: `${i*0.1}s`}} key={id}>
            <img src={image} alt={title} />
            <div className="title">{title}</div>
            <div className="price">{new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(price)}</div>
        </div>
    )
}

export default Product;