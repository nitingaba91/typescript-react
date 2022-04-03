import React, { createRef } from 'react';
import { render } from 'react-dom';
import CartCss from './Cart.module.css';
import { FiShoppingCart } from 'react-icons/fi';
import { AppStateContext } from './AppState';

interface Props {

}

interface State {
    isOpen: boolean;
}

class Cart extends React.Component<Props, State> {
    #containerRef: React.RefObject<HTMLDivElement>;
    constructor(props: Props) {
        super(props);
        // this.handleClick = this.handleClick.bind(this);
        this.state = {
            isOpen: false
        }

        this.#containerRef = createRef();
    }

    handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.setState((prevState) => ({ isOpen: !prevState.isOpen }))
    }

    handleOutsideClick= (e: MouseEvent) => {
        if (this.#containerRef.current && !this.#containerRef.current.contains(e.target as Node)) {
            this.setState({ isOpen: false });
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleOutsideClick)
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleOutsideClick)
    }

    render() {
        return (
            <AppStateContext.Consumer>{(state) => {
                const ItemCount = state.cart.items.reduce((sum, item) => {
                    return sum + item.qty
                }, 0);
                return (
                    <div className={CartCss.cartContainer} ref={this.#containerRef}>
                        <button className={CartCss.button} onClick={this.handleClick} type="button">
                            <FiShoppingCart />
                            <span>{ItemCount} Pizzas</span>
                        </button>
                        <div className={CartCss.cartDropDown} style={{
                            display: this.state.isOpen ? 'block' : 'none'
                        }}>
                            <ul>
                                {state.cart.items.map(item => {
                                    return <li key={item.id}>{item.name} &times; {item.qty}</li>
                                })}
                            </ul>
                        </div>
                    </div>
                )
            }}</AppStateContext.Consumer>

        )
    }
}

export default Cart;