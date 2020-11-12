import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../_common/Button';
import Product from '../../_common/Product';
import { useDispatch } from 'react-redux';
import { setSelectedCategory } from '../../../state/actions/productsActions';
import { useQuery } from '@apollo/client';
import { GET_COLLECTION_PRODUCTS } from '../../../graphql/queries';
import { transformProducts } from '../../helpers';
import './Four.sass';

function Four({title, handle, image, description}){
    const dispatch = useDispatch();
    const { data: collectionData } = useQuery(GET_COLLECTION_PRODUCTS, {variables: {handle, first: 4}});
    
    const products = transformProducts(collectionData?.collectionByHandle?.products?.edges ?? []);
    const productOne = products.length ? products[0] : {};
    const threeProducts = products.length > 1 ? products.slice(1) : [];

    return(
        <div className="Four">
            <div className="advertised" style={{backgroundImage: `url(${image})`}}>
                <div className="overlay"></div>
                <h1>{description}</h1>
                <Link to="/produkte" onClick={() => dispatch(setSelectedCategory({handle, title}))}><Button variant="skeleton">Bli tani</Button></Link>
            </div>
            <div className="four">
                <Link to={`/produkte/${productOne.handle}`} className="one" style={{backgroundImage: products.length ? `url("${productOne.image}")` : undefined}}>
                    {products.length ? <div className="info">
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

export default Four;