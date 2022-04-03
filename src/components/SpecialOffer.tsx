import React from 'react';
import { Pizza } from '../types';
import { WithAddToCartProps } from './AddtoCart';
import SpecialOfferCss from './SpecialOffer.module.css';

interface Props {
    pizza: Pizza
}

const SpecialOffer: React.FC<Props> = ({ pizza }) => {

    return <div className={SpecialOfferCss.container}>
        <h2>{pizza.name}</h2>
        <p>{pizza.description}</p>
        <p>{pizza.price}</p>
        <WithAddToCartProps>{({addToCart}) => {
        return (
            <button onClick={() => {
                addToCart({id: pizza.id, name: pizza.name, price: pizza.price})
            }} type="button">Add to Cart</button>
        ) 

        }}</WithAddToCartProps>
    </div>
}

export default SpecialOffer;
