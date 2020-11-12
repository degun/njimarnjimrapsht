import React, { useEffect } from 'react';
import Button from '../_common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { setCheckoutValues } from '../../state/actions/checkoutActions';
import { setMenuOpen } from '../../state/actions/appActions';
import { useMutation } from '@apollo/client';
import { REMOVE_LINE_ITEM,  UPDATE_LINE_ITEM } from '../../graphql/mutations';
import { priced } from '../helpers';
import './Cart.sass';


function Cart(){
    const dispatch = useDispatch();
    const { id: checkoutId, lineItems, subtotalPrice, totalPrice, totalTax, webUrl } = useSelector(state => state.checkout);
    const [removeLineItem, removedLineItem] = useMutation(REMOVE_LINE_ITEM);
    const [updateLineItem, updatedLineItem] = useMutation(UPDATE_LINE_ITEM);

    useEffect(() => {
        dispatch(setMenuOpen(false))
    }, []);

    useEffect(() => {
        if(updatedLineItem.data && !updatedLineItem.loading && updatedLineItem.called){
            dispatch(setCheckoutValues(updatedLineItem?.data?.checkoutLineItemsUpdate?.checkout))
        }
    }, [updatedLineItem.data, updatedLineItem.loading, updatedLineItem.called])

    useEffect(() => {
        if(removedLineItem.data && !removedLineItem.loading && removedLineItem.called){
            dispatch(setCheckoutValues(removedLineItem?.data?.checkoutLineItemsRemove?.checkout))
        }
    }, [removedLineItem.data, removedLineItem.loading, removedLineItem.called])

    return(
        <section className="Cart">
            <div className="line-items">
                {lineItems?.edges?.map(({node}) => {
                    const { id, quantity, title, variant } = node;
                    const { image, price } = variant;
                    return <div key={id} className="line-item">
                        <img src={image ? image.src : ""} alt="" />
                        <h2>{title}</h2>
                        <div className="price">{priced(price)}</div>
                        <input type="number" onChange={({target}) => updateLineItem({variables: {checkoutId, lineItems: [{id, quantity: parseInt(target.value)}]}})} value={quantity} />
                        <div onClick={() => removeLineItem({variables: {checkoutId, lineItemIds: [id]}})} className="close">x</div>
                    </div>
                }) ?? []}
            </div> 
            <div className="totals">
                <h1>Checkout</h1>
                <div className="subtotals">
                    <div className="row">
                        <h4>Nëntotali:</h4>
                        <div className="amount">{priced(subtotalPrice)}</div>
                    </div>
                    <div className="row">
                        <h4>Taksa:</h4>
                        <div className="amount">{priced(totalTax)}</div>
                    </div>
                    <hr />
                    <div className="row">
                        <h4>Totali:</h4>
                        <div className="amount">{priced(totalPrice)}</div>
                    </div>
                </div>
                <a className="checkout-button" href={webUrl}><Button variant="checkout">Vazhdo me pagesën</Button></a>
            </div>
        </section>
    )
}

export default Cart;