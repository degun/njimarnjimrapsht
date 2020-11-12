import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../_common/Button';
import Product from '../../_common/Product';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../../graphql/queries';
import { transformProducts } from '../../helpers';
import './Four.sass';

function FourReversed({type}){
    const { data: productsData } = useQuery(GET_PRODUCTS, {variables: {first: 5, query: `product_type:${type}`}});

    const products = transformProducts(productsData?.products?.edges ?? [])

    const productZero = products.length ? products[0] : {};
    const productOne = products.length > 1 ? products[1] : {};
    const threeProducts = products.length > 2 ? products.slice(2) : [];

    return(
        <div className="Four reversed">
            <div className="advertised" style={{backgroundImage: `url(${productZero.image})`}}>
                <div className="overlay"></div>
                <h1>{productZero.title}</h1>
                <Link to={`/produkte/${productZero.handle}`}><Button variant="skeleton">Bli tani</Button></Link>
            </div>
            <div className="four">
                <Link to={`/produkte/${productOne.handle}`} className="one" style={{backgroundImage: products.length ? `url("${productOne.image}")` : undefined}}>
                    {products.length > 1 ? <div className="info">
                        <div className="title">{productOne.title}</div>
                        <div className="prices">
                            <span className="price">{new Intl.NumberFormat('sq-AL', { style: 'currency', currency: 'ALL' }).format(productOne.price)}</span>
                            {productOne.compareAtPrice !== "0.0" ? <span className="compare">{new Intl.NumberFormat('sq-AL', { style: 'currency', currency: 'ALL' }).format(productOne.compareAtPrice)}</span> : null}
                        </div>
                    </div> : null}
                </Link>
                <div className="three" style={{justifyContent: threeProducts.length === 3 ? "space-between" : "flex-start"}}>
                    {threeProducts.map((product, i) => <Product key={product.id} {...product} i={i} />)}
                </div>
            </div>
        </div>
    )
}

export default FourReversed;