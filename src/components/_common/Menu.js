import React, { useState } from 'react';
import { Icon } from '@shopify/polaris';
import { PhoneMajor, EmailMajor, ChevronRightMinor } from '@shopify/polaris-icons';
import Product from './Product';
import { hamburger } from '../icons';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { setMenuOpen } from '../../state/actions/appActions';
import { GET_COLLECTION_PRODUCTS } from '../../graphql/queries';
import './Menu.sass';

function Menu(){
    const dispatch = useDispatch();
    const [handle, setHandle] = useState("");
    const { customCategories, menuOpen } = useSelector(state => state.app);
    
    const { data: collectionData } = useQuery(GET_COLLECTION_PRODUCTS, {variables: {handle, first: 8}});
    
    const products = collectionData?.collectionByHandle?.products?.edges?.map(({node}) => {
        const {id, title, handle, priceRange, compareAtPriceRange, images} = node;
        return {
            id, 
            title,
            handle,
            price: priceRange.minVariantPrice.amount,
            compareAtPrice: compareAtPriceRange?.minVariantPrice?.amount,
            image: images.edges[0].node.transformedSrc
        }
    }) ?? [];

    const categories = customCategories ?? [];

    return(
        <div className="Menu">
            <nav>
                <div className={`link ${menuOpen ? "open" : ""}`} onClick={() => dispatch(setMenuOpen(!menuOpen))} >
                    {hamburger} Të gjitha kategoritë
                </div>
                <Link to="/produkte" className="link">Produkte në ofertë</Link>
                <Link to="/produkte" className="link">Të reja</Link>
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
                {menuOpen ? categories.map(({handle, title},i) => <li style={{animationDelay: `${i * 0.1}s`}} onMouseEnter={() => setHandle(handle)}  onMouseLeave={() => setHandle("")} key={`collection-${i}`}>{title} <Icon source={ChevronRightMinor} /></li>) : null}
            </ul>
            {(handle && menuOpen) ? <div className="products" onMouseEnter={() => setHandle(handle)}  onMouseLeave={() => setHandle("")}>
               {products.map((product, i) => <Product key={product.id} {...product}  i={i} />)}
            </div> : null}
        </div>
    )
}

export default Menu;