import React, { useState, useEffect } from 'react';
import { withNamespaces } from 'react-i18next';
import { Icon, Popover, ActionList } from '@shopify/polaris';
import { ChevronRightMinor, HorizontalDotsMinor } from '@shopify/polaris-icons';
import Product from './Product';
import { hamburger, phone, mail } from '../icons';
import { Link, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { setSelectedCategory } from '../../state/actions/productsActions';
import { GET_COLLECTION_PRODUCTS } from '../../graphql/queries';
import { useWindowSize } from '../helpers';
import './Menu.sass';

function Menu({ t }){
    const dispatch = useDispatch();
    const history = useHistory();
    const { width } = useWindowSize();
    const [handle, setHandle] = useState("");
    const [openActions, setOpenActions] = useState(false);
    const { customCategories, smartCategories, menuOpen } = useSelector(state => state.app);

    let first = 10;

    if(width < 1366){
        first = 8;
    }else if(width < 1290){
        first = 6;
    }else if(width < 1060){
        first = 4;
    }else if(width < 828){
        first = 2;
    }

    const { data: collectionData } = useQuery(GET_COLLECTION_PRODUCTS, {variables: {handle, first}});
    
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

    const actions = [
        ...smartCategories.map(({handle, title}) => {
            return {
                content: title,
                onAction: () => {
                    dispatch(setSelectedCategory({handle, title}));
                    history.push("/produkte");
                    setOpenActions(false);
                }
            }
        }), 
        {
            content: t("Menu.Rreth nesh"),
            onAction: () => {
                history.push("/rrethnesh");
                setOpenActions(false);
            }
        },
        {
            content: t("Menu.Blog"),
            onAction: () => {
                history.push("/blog");
                setOpenActions(false);
            }
        }
    ]

    const activator = <div onClick={() => setOpenActions(!openActions)} className="contact-item">
        <Icon source={HorizontalDotsMinor} />
        <span className="text">Menu</span>
    </div>

    return(
        <div className="Menu">
            <div className="navigation">
                <Link key={handle} to="/produkte" className="all" >
                    {hamburger} {t("Menu.Të gjitha kategoritë")}
                </Link>
                {width > 1160 ? <nav>
                    {smartCategories.map(({handle, title}) => <Link key={handle} to="/produkte" onClick={() => dispatch(setSelectedCategory({handle, title}))} className="link">{title}</Link>)}
                    <Link to="/rrethnesh" className="link">{t("Menu.Rreth nesh")}</Link>
                    <Link to="/blog" className="link">{t("Menu.Blog")}</Link>
                </nav> : null}
            </div>
            <div className="contact">
                {width > 1160 ? null : <Popover preferredAlignment="left" active={openActions} activator={activator} onClose={() => setOpenActions(false)}>
                    <ActionList items={actions} />
                </Popover>}
                <div className="contact-item">
                    {phone}
                    <span className="text">(+355) 69 83 43 334</span>
                </div>
                <div className="contact-item">
                    {mail}
                    <span className="text">pyetje@1m1w.al</span>
                </div>
            </div>
            <div className="collections">
                {menuOpen ? categories.map(({handle, title},i) => <Link to="/produkte" key={handle} onClick={() => dispatch(setSelectedCategory({handle, title}))} style={{animationDelay: `${i * 0.1}s`}} onMouseEnter={() => setHandle(handle)}  onMouseLeave={() => setHandle("")}>{title} <Icon source={ChevronRightMinor} /></Link>) : null}
            </div>
            {(handle && menuOpen) ? <div className="products" onMouseEnter={() => setHandle(handle)}  onMouseLeave={() => setHandle("")}>
               {products.map((product, i) => <Product key={product.id} {...product}  i={i} />)}
            </div> : null}
        </div>
    )
}

export default withNamespaces()(Menu);