import React from 'react';
import Product from '../../_common/Product';
import { useQuery } from '@apollo/client';
import { GET_PRODUCTS } from '../../../graphql/queries';
import { more } from '../../icons';
import './ByTag.sass';

function ByTag({tag}){
    const { data } = useQuery(GET_PRODUCTS, {variables: {first: 12, query: `tag:${tag}`}});
    const products = data?.products?.edges?.map(({node}) => {
        const {id, title, priceRange, compareAtPriceRange, images} = node;
        return {
            id, 
            title,
            price: priceRange.minVariantPrice.amount,
            compareAtPrice: compareAtPriceRange?.minVariantPrice?.amount,
            image: images.edges[0].node.transformedSrc
        }
    }) ?? [];
 
    return(
        <React.Fragment>
        <div className="products-by-tag">
            {products.map((product, i) => <Product key={product.id} {...product}  i={i} />)}
        </div>
        <div className="more">{more} &nbsp;&nbsp;&nbsp; Më trego më shumë</div>
        </React.Fragment>
    )
}

export default ByTag;