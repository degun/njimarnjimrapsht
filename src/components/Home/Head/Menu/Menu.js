import React, { useState } from 'react';
import { Icon } from '@shopify/polaris';
import { PhoneMajor, EmailMajor, ChevronRightMinor } from '@shopify/polaris-icons';
import Product from '../../../_common/Product';
import { hamburger } from '../../../icons';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_COLLECTION_PRODUCTS } from '../../../../graphql/queries';
import './Menu.sass';

function Menu({collections}){
    const [handle, setHandle] = useState("");
    
    const { data: collectionData } = useQuery(GET_COLLECTION_PRODUCTS, {variables: {handle, first: 8}});
    
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
        <div className="Menu">
            <nav>
                <div className="link" >
                    {hamburger} Të gjitha kategoritë
                </div>
                <Link to="/shop" className="link">Produkte në ofertë</Link>
                <Link to="/shop" className="link">Të reja</Link>
                <Link to="/rrethnesh" className="link">Rreth nesh</Link>
                <Link to="/blog" className="link">Blog</Link>
            </nav>
            <div className="contact">
                <div className="contact-item">
                    <Icon source={PhoneMajor} /> (+355) 69 83 43 334
                </div>
                <div className="contact-item">
                    <Icon source={EmailMajor} /> pyetje@1m1w.al
                </div>
            </div>
            <ul className="collections">
                {collections.map(({handle, title},i) => <li onMouseEnter={() => setHandle(handle)}  onMouseLeave={() => setHandle("")} key={`collection-${i}`}>{title} <Icon source={ChevronRightMinor} /></li>)}
            </ul>
            {handle ? <div className="products" onMouseEnter={() => setHandle(handle)}  onMouseLeave={() => setHandle("")}>
               {products.map((product, i) => <Product key={product.id} {...product}  i={i} />)}
            </div> : null}
        </div>
    )
}

export default Menu;