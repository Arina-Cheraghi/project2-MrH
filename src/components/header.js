import React, { useState, useEffect } from "react";
import { FiUser } from "react-icons/fi";
import { HiShoppingCart } from "react-icons/hi";
import logo from '../assets/img/logo.8ea9ff34.png';
import { IoSearch } from "react-icons/io5";
import '../assets/css/header.css';
import MenuWrapper from "./menuWrapper";
import { Link, useNavigate } from "react-router-dom";
import { FaPowerOff } from "react-icons/fa";

const Header = ({ cartItems, setName, setLastName }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();
    const [name, setNameLocal] = useState(localStorage.getItem("name") || "");
    const [lastname, setLastNameLocal] = useState(localStorage.getItem("lastName") || "");

    useEffect(() => {
        localStorage.setItem("name", name);
        localStorage.setItem("lastName", lastname);
    }, [name, lastname]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleAccountClick = () => {
        if (!name || !lastname) {
            navigate("/Login");
        } else {
            toggleSidebar();
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("name");
        localStorage.removeItem("lastName");
        localStorage.removeItem("cartItems");
        localStorage.removeItem("favorites");
        navigate("/Login");
    };

    return (
        <div className="col-12">
            <div className="header">
                <div className="col-3">
                    <div className="rightSide">
                        <div className="account" onClick={handleAccountClick}>
                            <FiUser />
                            <h5>{name && lastname ? `${name} ${lastname}` : "حساب کاربری"}</h5>
                        </div>
                        <div className={`sidebar ${isSidebarOpen ? 'show' : ''}`}>
                            <Link to="/panel" className="sidebar-link"><FiUser />پنل</Link>
                            <hr />
                            <span onClick={handleLogout} className="sidebar-link" style={{ cursor: 'pointer' }}>
                                <FaPowerOff />خروج
                            </span>
                        </div>
                        <Link to="/ShoppingCart" className="shoppingCart">
                            <HiShoppingCart />
                            <span className="cart-count">
                                {new Set(cartItems.map(item => item.id)).size}
                            </span>
                            <div className="Hdetails">
                                <h5>سبد خرید</h5>
                                <h6>
                                    {Number(cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)).toLocaleString()}
                                    تومان
                                </h6>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-6">
                    <div className="logo">
                        <img src={logo} alt="Logo" />
                    </div>
                </div>
                <div className="col-3">
                    <div className="leftSide">
                        <div className="searchBox">
                            <input className="input" type="text" placeholder="جستجو..." />
                            <span className="icon"><IoSearch /></span>
                        </div>
                    </div>
                </div>
            </div>
            <MenuWrapper />
        </div>
    );
}

export default Header;
