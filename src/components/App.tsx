
import React from 'react';
import pizzas from '../data/pizzas.json';
import Pizza from './Pizzas';
import Cart from './cart';
import AppCSS from './App.module.css';
import PizzaSVG from '../svg/pizza.svg';
import APPStateProvider from './AppState';
import SpecialOffer from './SpecialOffer';

const App = () => {
    const specialOffer = pizzas.find((pizza)=> pizza.specialOffer)
    return (
        <APPStateProvider>
            <div className={AppCSS.container}>
                <div className={AppCSS.header}>
                    <PizzaSVG width={120} height={120}></PizzaSVG>
                    <div>Delicious Pizza</div>
                    <Cart />
                </div>
                {specialOffer && <SpecialOffer pizza={specialOffer} />}
                <ul className={AppCSS.pizzaList}>
                    {pizzas.map((pizza) => {
                        return <Pizza key={pizza.id} pizza={pizza} />;
                    })}
                </ul>
            </div>
        </APPStateProvider>
    );
}

export default App;
