import React from 'react';
import './Button.sass'

function Button({children, variant}){
    return(
        <button className={variant}>{children}</button>
    )
}

export default Button;