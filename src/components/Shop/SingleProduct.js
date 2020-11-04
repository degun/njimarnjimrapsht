import React, { useState, useEffect } from 'react';
import Container from '../_common/Container';
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
    const { data: productData } = useQuery(GET_PRODUCT, {variables: {handle}});
    const { id: productId, title, description, images: imgs, variants } = productData?.productByHandle ?? {};
    const { data: recommendationsData } = useQuery(GET_PRODUCT_RECOMMENDATIONS, {variables: {productId}});
    const images = imgs?.edges?.map(({node}) => node.transformedSrc) ?? [];

    console.log(recommendationsData, productId);

    useEffect(() => {
        dispatch(setMenuOpen(false));
        setSelectedImage(0)
    }, [handle])

    return(
        <Container>
            <div className="Producto">
                <div className="images">
                    <div className="images-list">{images.map((src, i) => <img onClick={() => setSelectedImage(i)} src={src} alt="" className={selectedImage === i ? "selected" : ""} key={`product-image-${i}`} />)}</div>
                    <img className="image" src={images[selectedImage]} alt="" />
                </div>
                <div className="information">
                    <h1>{title}</h1>

                </div>
            </div>
        </Container>
    )
}

export default withRouter(SingleProduct);