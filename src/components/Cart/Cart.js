import React from 'react';
import Button from '../_common/Button';
import { useSelector } from 'react-redux';
import { priced } from '../helpers';
import './Cart.sass';


function Cart(){
    const { id, lineItems, subtotalPrice, totalPrice, totalTax, webUrl } = useSelector(state => state.checkout);

    return(
        <section className="Cart">
            <div className="line-items">
                {lineItems.edges?.map(({node}) => {
                    const { id, quantity, title, variant } = node;
                    const { image, price } = variant;
                    return <div className="line-item">
                        <img src={image ? image.src : ""} alt="" />
                        <h2>{title}</h2>
                        <div className="price">{priced(price)}</div>
                        <div className="quantity"><text label="Number" type="number" value={quantity} InputLabelProps={{shrink: true}} /></div>
                        <input type="number" value={quantity} />
                        <div className="close">X</div>
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
                <a href={webUrl}><Button variant="checkout">Vazhdo me pagesën</Button></a>
            </div>
        </section>
    )
}

export default Cart;