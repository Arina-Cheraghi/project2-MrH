import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Body from "./components/body";
import Footer from "./components/footer";
import Page2 from "./components/page2";
import ShoppingCart from "./components/ShoppingCart";
import Login from "./components/Login.js";
import "./App.css";
import Verify from "./components/Verify.js";
import Panel from "./components/panel";
import { Toaster } from 'react-hot-toast';


const App = () => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCartItems = localStorage.getItem("cartItems");
        return savedCartItems ? JSON.parse(savedCartItems) : [];
    });

    const [favorites, setFavorites] = useState(() => {
        const savedFavorites = localStorage.getItem("favorites");
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    });

    const [name, setName] = useState(() => localStorage.getItem("name") || '');
    const [lastname, setLastName] = useState(() => localStorage.getItem("lastName") || '');
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const handleAddProduct = (product) => {
        const productExist = cartItems.find((item) => item.id === product.product_id);
        if (productExist) {
            setCartItems(cartItems.map((item) => item.id === product.product_id ? { ...productExist, quantity: productExist.quantity + 1 } : item));
        } else {
            setCartItems([...cartItems, { ...product, quantity: 1 }]);
        }
    };

    const handleAddFavorite = (product, productIdToRemove) => {
        if (productIdToRemove) {
            setFavorites(prevFavorites => prevFavorites.filter(item => item.id !== productIdToRemove));
        } else {
            setFavorites(prevFavorites => {
                const exists = prevFavorites.find(item => item.id === product.id);
                if (!exists) {
                    return [...prevFavorites, product];
                }
                return prevFavorites;
            });
        }
    };

    const [isFirstTime, setIsFirstTime] = useState(false);

    return (
        <BrowserRouter>
            <Toaster />
            <div className="all">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Header
                                    cartItems={cartItems}
                                    name={name}
                                    lastname={lastname}
                                    setSearchQuery={setSearchQuery}
                                />
                                <Body
                                    handleAddProduct={handleAddProduct}
                                    handleAddFavorite={handleAddFavorite}
                                    favorites={favorites}
                                    searchQuery={searchQuery}
                                />
                                <Footer />
                            </>
                        }
                    />
                    <Route
                        path="/page2"
                        element={
                            <>
                                <Header cartItems={cartItems} name={name} lastname={lastname} />
                                <Page2
                                    favorites={favorites}
                                    handleAddFavorite={handleAddFavorite}
                                    handleAddProduct={handleAddProduct} // پاس دادن تابع
                                />
                                <Footer />
                            </>
                        }
                    />

                    <Route
                        path="/ShoppingCart"
                        element={
                            <>
                                <Header cartItems={cartItems} name={name} lastname={lastname} />
                                <ShoppingCart cartItems={cartItems} />
                                <Footer />
                            </>
                        }
                    />
                    <Route
                        path="/panel"
                        element={
                            <Panel
                                name={name}
                                setName={setName}
                                lastname={lastname}
                                setLastName={setLastName}
                                favorites={favorites}
                                handleAddFavorite={handleAddFavorite}
                            />
                        }
                    />
                    <Route path="/Login" element={<Login />} />
                    <Route
                        path="/Verify"
                        element={
                            <Verify
                                setIsFirstTime={setIsFirstTime}
                                isFirstTime={isFirstTime}
                                setName={setName}
                                setLastName={setLastName}
                            />
                        }
                    />
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
