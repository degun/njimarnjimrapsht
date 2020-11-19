import React, { useState } from 'react';
import { withNamespaces } from 'react-i18next';
import { Icon } from '@shopify/polaris';
import { PhoneMajor, EmailMajor, ChevronRightMinor, HorizontalDotsMinor } from '@shopify/polaris-icons';
import Product from './Product';
import { hamburger } from '../icons';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { setMenuOpen } from '../../state/actions/appActions';
import { setSelectedCategory } from '../../state/actions/productsActions';
import { GET_COLLECTION_PRODUCTS } from '../../graphql/queries';
import { useWindowSize } from '../helpers';
import './Menu.sass';

function Menu({ t }){
    const dispatch = useDispatch();
    const { width } = useWindowSize();
    const [handle, setHandle] = useState("");
    const { customCategories, smartCategories, menuOpen } = useSelector(state => state.app);
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
            <div className="navigation">
                <div className={`all ${menuOpen ? "open" : ""}`} onClick={() => dispatch(setMenuOpen(!menuOpen))} >
                    {hamburger} {t("Menu.Të gjitha kategoritë")}
                </div>
                {width > 860 ? <nav>
                    {smartCategories.map(({handle, title}) => <Link key={handle} to="/produkte" onClick={() => dispatch(setSelectedCategory({handle, title}))} className="link">{title}</Link>)}
                    <Link to="/rrethnesh" className="link">{t("Menu.Rreth nesh")}</Link>
                    <Link to="/blog" className="link">{t("Menu.Blog")}</Link>
                </nav> : <div className="more">
                    <HorizontalDotsMinor />
                </div>}
            </div>
            <div className="contact">
                <div className="contact-item">
                    <Icon source={PhoneMajor} />
                    <span className="text">(+355) 69 83 43 334</span>
                </div>
                <div className="contact-item">
                    <Icon source={EmailMajor} />
                    <span className="text">pyetje@1m1w.al</span>
                </div>
            </div>
            <ul className="collections">
                {menuOpen ? categories.map(({handle, title},i) => <li key={handle} onClick={() => dispatch(setSelectedCategory({handle, title}))} style={{animationDelay: `${i * 0.1}s`}} onMouseEnter={() => setHandle(handle)}  onMouseLeave={() => setHandle("")} key={`collection-${i}`}>{title} <Icon source={ChevronRightMinor} /></li>) : null}
            </ul>
            {(handle && menuOpen) ? <div className="products" onMouseEnter={() => setHandle(handle)}  onMouseLeave={() => setHandle("")}>
               {products.map((product, i) => <Product key={product.id} {...product}  i={i} />)}
            </div> : null}
        </div>
    )
}

export default withNamespaces()(Menu);