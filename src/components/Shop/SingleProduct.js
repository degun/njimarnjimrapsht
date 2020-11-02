import React from 'react';
import Container from '../_common/Container';
import { withRouter } from 'react-router-dom';

function SingleProduct({match}){
    const { handle } = match.params;
    
    return(
        <div className="SingleProduct">
            <Container>
                <div className="Producto">

                </div>
            </Container>
        </div>
    )
}

export default withRouter(SingleProduct);