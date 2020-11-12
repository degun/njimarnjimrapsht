import React, { useState, useEffect } from 'react';
import Button from '../_common/Button';
import Product from '../_common/Product';
import { withRouter } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuOpen, setRecentlyViewed } from '../../state/actions/appActions';
import { setCheckoutValues } from '../../state/actions/checkoutActions';
import { GET_PRODUCT, GET_PRODUCT_RECOMMENDATIONS } from '../../graphql/queries';
import { CHECKOUT_CREATE, ADD_LINE_ITEM } from '../../graphql/mutations';
import './SingleProduct.sass';


function SingleProduct({match}){
    const dispatch = useDispatch();
    const { recentlyViewed } = useSelector(state => state.app);
    const { id: checkoutId } = useSelector(state => state.checkout);
    const { handle } = match.params;
    const [ selectedImage, setSelectedImage ] = useState(0);
    const [ selectedVariant, setSelectedVariant ] = useState(0);
    const [ checkoutCreate, checkoutCreated ] = useMutation(CHECKOUT_CREATE);
    const [ checkoutLineItemAdd, checkoutLineItemAdded ] = useMutation(ADD_LINE_ITEM);
    const { data: productData } = useQuery(GET_PRODUCT, {variables: {handle}});
    const { id: productId, title, description, images: imgs, variants } = productData?.productByHandle ?? {};
    const { data: recommendationsData } = useQuery(GET_PRODUCT_RECOMMENDATIONS, {variables: {productId}});
    const images = imgs?.edges?.map(({node}) => node.transformedSrc) ?? [];  
    const rvIds = recentlyViewed.map(({handle}) => handle);

    const products = recommendationsData?.productRecommendations?.map(({id, title, handle, priceRange, compareAtPriceRange, images}) => {
        return {
            id, 
            title,
            handle,
            price: priceRange.minVariantPrice.amount,
            compareAtPrice: compareAtPriceRange?.minVariantPrice?.amount,
            image: images.edges[0].node.transformedSrc
        }
    }) ?? [];

    function createCheckout(variantId){
        checkoutCreate({variables: {
            input: {
                lineItems: [{ variantId, quantity: 1 }]
            }
        }})
    }

    function addLineItem(variantId){
        checkoutLineItemAdd({variables: {lineItems: [{ variantId, quantity: 1 }], checkoutId}})
    }

    function addToCart(){
        if(checkoutId){
            addLineItem(id)
        }else{
            createCheckout(id)
        }
    }

    useEffect(() => {
        window.scrollTo(0,0);
        dispatch(setMenuOpen(false));
        setSelectedImage(0);
        if(!(rvIds.includes(handle)) && productData?.productByHandle){
            let recentlyViewedCopy = Array.from(recentlyViewed);
            recentlyViewedCopy.unshift({...productData.productByHandle, handle});
            const r = recentlyViewedCopy.filter((_, i) => i < 4);
            dispatch(setRecentlyViewed(r))
        }
        
    }, [handle, productData])

    useEffect(() => {
        if(!checkoutId && checkoutCreated.data && !checkoutCreated.loading && checkoutCreated.called){
            dispatch(setCheckoutValues(checkoutCreated?.data?.checkoutCreate?.checkout ?? {}))
        }
    }, [checkoutCreated.data, checkoutCreated.loading, checkoutCreated.called])

    useEffect(() => {
        if(checkoutId && checkoutLineItemAdded.data && !checkoutLineItemAdded.loading && checkoutLineItemAdded.called){
            dispatch(setCheckoutValues(checkoutLineItemAdded?.data?.checkoutLineItemsAdd?.checkout ?? {}))
        }
    }, [checkoutLineItemAdded.data, checkoutLineItemAdded.loading, checkoutLineItemAdded.called])

    const variantsShown = variants?.edges?.filter(({node}) => node.title !== "Default Title") ?? [];
    const thisVariant = variants?.edges[selectedVariant]?.node ?? {};
    const { priceV2, compareAtPriceV2, id } = thisVariant;

    return(
        <section className="SingleProduct">
        <div className="Producto">
            <div className="images">
                <div className="images-list">
                    {images.map((src, i) => <img onClick={() => {
                        setSelectedImage(i);
                        if(i > (images.length - variantsShown.length - 1)){
                            setSelectedVariant(i - (images.length - variantsShown.length))
                        }
                    }} src={src} alt="" className={selectedImage === i ? "selected" : ""} key={`product-image-${i}`} />)}
                </div>
                <img className="image" src={images[selectedImage]} alt="" />
            </div>
            <div className="information">
                <h1>{title}</h1>
                {variantsShown.length ? <div className="variants">
                    <h4>Variante: </h4>{variantsShown.map(({node}, i) => <div key={node.title} onClick={() => {setSelectedVariant(i);setSelectedImage(i + (images.length - variantsShown.length))}} className={`variant ${selectedVariant === i ? "selected" : ""}`}>{node.title}</div>)}
                </div> : null} 
                <div className="buy">
                    <div className="buy-prices">
                        <span className="price">{new Intl.NumberFormat('sq-AL', { style: 'currency', currency: 'ALL' }).format(priceV2 ? priceV2.amount : 0)}</span>
                        {compareAtPriceV2 ? <span className="compare">{new Intl.NumberFormat('sq-AL', { style: 'currency', currency: 'ALL' }).format(compareAtPriceV2.amount)}</span> : null}
                    </div>
                    <Button variant="primary" onClick={addToCart}>Shto në Shportë</Button>
                </div> 
            </div>
            
        </div>
        <div className="product-description">
            <div className="categories">
                <ul className="list">
                    <li>Përshkrimi i produktit</li>
                </ul>
            </div>
            <div className="description">{description}</div>
        </div>
        <div className="recommended-products">
            <h2>Produkte të ngjashme</h2>
            <div className="products">
                {products.map((product, i) => <Product key={product.id} {...product}  i={i} />)}
            </div>
        </div>
    </section>
    )
}

export default withRouter(SingleProduct);