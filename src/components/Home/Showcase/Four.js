import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../_common/Button';
import Product from '../../_common/Product';
import Slider from 'react-id-swiper';
import { useDispatch } from 'react-redux';
import { setSelectedCategory } from '../../../state/actions/productsActions';
import { useQuery } from '@apollo/client';
import { GET_COLLECTION_PRODUCTS } from '../../../graphql/queries';
import { transformProducts, useWindowSize } from '../../helpers';
import './Four.sass';

function Four({title, handle, image, description}){
    const dispatch = useDispatch();
    const { width } = useWindowSize();
    const { data: collectionData } = useQuery(GET_COLLECTION_PRODUCTS, {variables: {handle, first: 4}});
    
    const products = transformProducts(collectionData?.collectionByHandle?.products?.edges ?? []);
    const productOne = products.length ? products[0] : {};
    const threeProducts = products.length > 1 ? products.slice(1) : [];

    const parameters = {
        slidesPerView: 3,
        centeredSlides: true,
        freeMode: true,
        loop: true,
        wrapperClass: "three"
    }

    const someProducts = width > 900 ? threeProducts : [productOne, ...threeProducts];

    return(
        <div className="Four">
            <div className="advertised" style={{backgroundImage: `url(${image})`}}>
                <div className="overlay"></div>
                <h1>{description}</h1>
                <Link to="/produkte" onClick={() => dispatch(setSelectedCategory({handle, title}))}><Button variant="skeleton">Bli tani</Button></Link>
            </div>
            {products.length ? <div className="four">
                {width > 900 ? <Link to={`/produkte/${productOne.handle}`} className="one" style={{backgroundImage: products.length ? `url("${productOne.image}")` : undefined}}>
                    {products.length ? <div className="info">
                        <div className="title">{productOne.title}</div>
                        <div className="prices">
                            <span className="price">{new Intl.NumberFormat('sq-AL', { style: 'currency', currency: 'ALL' }).format(productOne.price)}</span>
                            {productOne.compareAtPrice !== "0.0" ? <span className="compare">{new Intl.NumberFormat('sq-AL', { style: 'currency', currency: 'ALL' }).format(productOne.compareAtPrice)}</span> : null}
                        </div>
                    </div> : null}
                </Link> : null}
                <Slider {...parameters}>
                    {someProducts.map((product, i) => <Product key={product.id} {...product} i={i} />)}
                </Slider>
            </div> : null}
        </div>
    )
}

export default Four;