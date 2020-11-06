import React from 'react';
import './Button.sass'

function Button({children, variant, onClick}){
    return(
        <button className={variant} onClick={onClick}>{children}</button>
    )
}

export default Button;