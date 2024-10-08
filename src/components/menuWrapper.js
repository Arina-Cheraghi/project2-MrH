import React from "react";
import '../assets/css/header.css'
import { BsHouseDoor } from "react-icons/bs";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { MdOutlineSmartToy } from "react-icons/md";
import { LuPhoneCall } from "react-icons/lu";
import { GoLaw } from "react-icons/go";
import { FaUsers } from "react-icons/fa";
import { Link } from "react-router-dom";




const MenuWrapper = () => {
    return (
        <div className="col-12">
            <div className="Wrap-out">
                <div className="wrapper">
                    <div className="col-2">
                        <div className="box-item">
                            <Link to="/">
                                <BsHouseDoor />
                                <h6>صفحه اصلی</h6>
                            </Link>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="box-item">
                            <a href="#">
                                <HiOutlineShoppingBag />
                                <h6> فروشکاه</h6>
                            </a>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="box-item">
                            <a href="#">
                                <MdOutlineSmartToy />
                                <h6>محصولات</h6>
                            </a>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="box-item">
                            <a href="#">
                                <FaUsers />
                                <h6> ارتباط با ما</h6>
                            </a>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="box-item">
                            <a href="#">
                                <LuPhoneCall />
                                <h6>تماس با ما </h6>
                            </a>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="box-item">
                            <a href="#">
                                <GoLaw />
                                <h6>قوانین و مقررات</h6>
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default MenuWrapper;