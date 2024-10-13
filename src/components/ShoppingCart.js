import React, { useState, useEffect } from "react";
import "../assets/css/basket.css";
import { FaShoppingBasket, FaPlus, FaMinus } from "react-icons/fa";
import { BsFillTrash3Fill } from "react-icons/bs";

const ShoppingCart = ({ cartItems, setCartItems }) => {
    const updateLocalStorage = (items) => {
        localStorage.setItem("cartItems", JSON.stringify(items));
    };

    const handleRemoveProduct = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        updateLocalStorage(updatedCart);
    };

    const handleIncreaseQuantity = (id) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === id) {
                return { ...item, quantity: item.quantity + 1 };
            }
            return item;
        });
        setCartItems(updatedCart);
        updateLocalStorage(updatedCart);
    };

    const handleDecreaseQuantity = (id) => {
        const updatedCart = cartItems.map(item => {
            if (item.id === id) {
                if (item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                } else {
                    return null;
                }
            }
            return item;
        }).filter(item => item !== null);

        setCartItems(updatedCart);
        updateLocalStorage(updatedCart);
    };

    const handleClearCart = () => {
        setCartItems([]);
        updateLocalStorage([]);
    };

    return (
        <div className="basket">
            <div className="cart-items">
                <div className="cart-items-header">
                    <h3>سبد خرید</h3>
                    <button onClick={handleClearCart}><BsFillTrash3Fill /></button>
                </div>
                {cartItems.length === 0 ? (
                    <div className="col-12">
                        <div className="myBasket">
                            <div className="col-9">
                                <div className="prods">
                                    <p className="basketIcon"><FaShoppingBasket /></p>
                                    <p>سبد خرید شما خالی است.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="all-items">
                        <div className="col-9">
                            {cartItems.map((item) => (
                                <div key={item.id} className="cart-items-list" id={item.id}>
                                    <div className="image">
                                        <img className="cart-items-image" src={item.img} alt={item.name} />
                                    </div>
                                    <div className="about">
                                        <div className="price-name">
                                            <h4 className='product-title'>{item.name}</h4>
                                            <h6 className='product-price'>
                                                قیمت: {Number(item.price * item.quantity).toLocaleString()} تومان
                                            </h6>
                                        </div>
                                        <div className="details">
                                            <div className="numbers">
                                                <button onClick={() => handleDecreaseQuantity(item.id)}><FaMinus /></button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => handleIncreaseQuantity(item.id)}><FaPlus /></button>
                                            </div>
                                            <button onClick={() => handleRemoveProduct(item.id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-3">
                            <div className="manage-price">
                                <div className="m-p-header">
                                    <h6>
                                        جمع کل کالاها:
                                        {Number(cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)).toLocaleString()}
                                        تومان
                                    </h6>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShoppingCart;
