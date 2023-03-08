import React from 'react'
import { useOutletContext } from 'react-router-dom';
import Mypost from '../MyPost/Mypost';

const Initial = (context) => {
    const { width } = useOutletContext();
    return (
        <>
            <Mypost itemWidth={width} />
        </>
    )
}

export default Initial