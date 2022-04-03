import React from 'react';
import PizzaCss from './Pizza.module.css';
import { useStateDispatch } from './AppState';
import { Pizza } from '../types';
import { UseAddToCart } from './AddtoCart';

interface Props{
    pizza: Pizza
}

const PizzaItem: React.FC<Props> = ({ pizza }) => {
    const addToCart = UseAddToCart();
    const handleAddtoCartClick = () => {
        addToCart({id: pizza.id, name: pizza.name, price: pizza.price})
    }

    return (
        <li className={PizzaCss.container}>
            <h2>{pizza.name}</h2>
            <p>{pizza.description}</p>
            <p>{pizza.price}</p>
            <button onClick={handleAddtoCartClick} type="button">Add to Cart</button>
        </li>
    );
}

export default PizzaItem;