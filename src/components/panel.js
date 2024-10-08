import React, { useState } from "react";
import { BsHouseDoor } from "react-icons/bs";
import "../assets/css/panel.css";
import { Link } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { GrFavorite } from "react-icons/gr";
import { FaTrash } from "react-icons/fa6";
import Modal from "react-modal";
import { IoCloseOutline } from "react-icons/io5";
import myLogo from "../assets/img/logo.8ea9ff34.png";


const Panel = ({
    name: initialName,
    lastname: initialLastname,
    favorites,
    handleAddFavorite,
    setName,
    setLastName
}) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [name, setNameLocal] = useState(initialName);
    const [lastname, setLastname] = useState(initialLastname);

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const handleRemoveFavorite = (productId) => {
        handleAddFavorite(null, productId);
    };

    const handleApplyChanges = () => {
        localStorage.setItem("name", name);
        localStorage.setItem("lastName", lastname);
        setName(name);
        setLastName(lastname);
        closeModal();
    };

    return (
        <div className="Panel">
            <div className="head">
                <div className="head-in">
                    <div className="home">
                        <Link to="/" className="home">
                            <BsHouseDoor />
                        </Link>
                    </div>
                    <div className="information">
                        <div className="account" onClick={openModal} style={{ cursor: 'pointer' }}>
                            <FiUser />
                            <h5>{name && lastname ? `${name} ${lastname}` : " "}</h5>
                        </div>
                    </div>
                </div>
            </div>
            <div className="favorites">
                <div className="empty">
                    {favorites.length === 0 ? (
                        <>
                            <GrFavorite />
                            <h5>لیست علاقه مندی ها خالی است.</h5>
                        </>
                    ) : (
                        <h5>محصولات علاقه‌مندی:</h5>
                    )}
                </div>
                <div className="prods">
                    {favorites.map(product => (
                        <div className="prodd" key={product.id}>
                            <img src={product.img} alt={product.name} />
                            <h6>{product.name}</h6>
                            <FaTrash onClick={() => handleRemoveFavorite(product.id)} style={{ cursor: 'pointer' }} />
                        </div>
                    ))}
                </div>
            </div>
            <Modal
                className="modal"
                overlayClassName="custom-overlay"
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="User Info"
            >

                <div className="modalhead">
                    <button className="modalBtn" onClick={closeModal}>
                        <IoCloseOutline />
                    </button>
                    <h4>اطلاعات کاربر</h4>
                </div>
                <div className="myLogo">
                    <img src={myLogo} alt="Logo" />
                </div>
                <div className="desc">
                    <p>نام: <input type="text" value={name || " "} onChange={(e) => setNameLocal(e.target.value)} /></p>
                    <p>نام خانوادگی: <input type="text" value={lastname || " "} onChange={(e) => setLastname(e.target.value)} /></p>
                </div>
                <div className="submit">
                    <button onClick={handleApplyChanges}>
                        اعمال
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default Panel;
