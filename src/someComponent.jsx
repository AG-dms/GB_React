import React from 'react';
import style from './someComponent.scss'
import { Button } from 'reactstrap';
const textComponent = (props)=>{
    return(
        <>
        
            <h3 className='title' style={style.title}>Hello</h3>
           
        </>
    )
}

export default textComponent