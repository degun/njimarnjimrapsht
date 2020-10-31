import React from 'react';
import Button from '../../_common/Button';
import Product from '../../_common/Product';
import { useQuery } from '@apollo/client';
import { GET_COLLECTION_PRODUCTS } from '../../../graphql/queries';
import './Four.sass';

function Four({handle}){
    const { data: collectionData } = useQuery(GET_COLLECTION_PRODUCTS, {variables: {handle, first: 4}});
    
    const products = collectionData?.collectionByHandle?.products?.edges?.map(({node}) => {
        const {id, title, priceRange, images} = node;
        return {
            id, 
            title,
            price: priceRange.minVariantPrice.amount,
            image: images.edges[0].node.transformedSrc
        }
    }) ?? [];

    return(
        <div className="Four">
            <div className="advertised">
                <div className="overlay"></div>
                <h1>Produkte unike shqiptare dhe të huaja</h1>
                <Button variant="skeleton">Bli tani</Button>
            </div>
            <div className="four">
                <div className="one" style={{backgroundImage: products.length ? `url("${products[0].image}")` : undefined}}></div>
                <div className="three">
                    {products.length > 1 ? products.slice(1).map((product, i) => <Product key={product.id} {...product} i={i} />) : null}
                </div>
            </div>
        </div>
    )
}

export default Four;