import React from 'react';
import style from './someComponent.scss'
const textComponent = ({text})=>{
    return(
        <>
            <h3 className='title' style={style.title}>{text}</h3>
           
        </>
    )
}

export default textComponent