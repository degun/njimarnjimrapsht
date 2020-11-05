import React, { useState, useEffect } from 'react';
import Container from '../_common/Container';
import Button from '../_common/Button';
import { withRouter } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { setMenuOpen } from '../../state/actions/appActions';
import { GET_PRODUCT, GET_PRODUCT_RECOMMENDATIONS } from '../../graphql/queries';
import './SingleProduct.sass';

function SingleProduct({match}){
    const dispatch = useDispatch();
    const { handle } = match.params;
    const [ selectedImage, setSelectedImage ] = useState(0);
    const [ selectedVariant, setSelectedVariant ] = useState(0);
    const { data: productData } = useQuery(GET_PRODUCT, {variables: {handle}});
    const { id: productId, title, description, images: imgs, variants } = productData?.productByHandle ?? {};
    const { data: recommendationsData } = useQuery(GET_PRODUCT_RECOMMENDATIONS, {variables: {productId}});
    const images = imgs?.edges?.map(({node}) => node.transformedSrc) ?? [];

    useEffect(() => {
        dispatch(setMenuOpen(false));
        setSelectedImage(0)
    }, [handle])

    const variantsShown = variants?.edges?.filter(({node}) => node.title !== "Default Title") ?? [];
    const thisVariant = variants?.edges[selectedVariant] ?? {};

    console.log(thisVariant)

    return(
        <Container>
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
                            <span className="price">{new Intl.NumberFormat('sq-AL', { style: 'currency', currency: 'ALL' }).format(0)}</span>
                            {0 !== "0.0" ? <span className="compare">{new Intl.NumberFormat('sq-AL', { style: 'currency', currency: 'ALL' }).format(0)}</span> : null}
                        </div>
                        <Button variant="primary">Shto në Shportë</Button>
                    </div> 
                </div>
            </div>
        </Container>
    )
}

export default withRouter(SingleProduct);