import React from "react";
import "../assets/css/footer.css"
import { MdOutlineLink } from "react-icons/md";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaMobileAlt } from "react-icons/fa";
import { IoMdShare } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import { LiaTelegramPlane } from "react-icons/lia";
import { FaInstagram } from "react-icons/fa";
import logo from '../assets/img/logo.8ea9ff34.png';
import zarin from '../assets/img/1.svg';
import etemad from '../assets/img/t.png';


const Footer = () => {
    return (
        <div id="footer">
            <div className="col-12">
                <div className="footer">
                    <div className="box">
                        <div className="title">
                            <h4 className="icons"><MdOutlineLink /></h4>
                            <h4>لینک های سریع</h4>
                        </div>
                        <div className="options">
                            <a href="#">
                                صفحه اصلی</a>
                            <a href="#">اکشن فیگور</a>
                            <a href="#"> انیمه</a>
                            <a href="#">تماس با ما</a>
                            <a href="#">قوانین</a>
                        </div>
                    </div>
                    <div className="box contact">
                        <div className="title">
                            <h4 className="icons"><FaPhoneVolume /></h4>
                            <h4>ارتباط با ما</h4>
                        </div>
                        <div className="options">
                            <a href="#">
                                <p><FaMobileAlt /></p>
                                <p>09010313531</p>
                            </a>
                            <a href="#">
                                <p><FaMobileAlt /></p>
                                <p>09010313531</p>
                            </a>
                        </div>
                        <div className="address">
                            <p>استان البرز ، کرج-عظیمیه-میدان مهران-برج ماندگار-طبقه منفی 3 واحد 13</p>
                        </div>
                    </div>
                    <div className="box media">
                        <div className="title">
                            <h4 className="icons"><IoMdShare /></h4>
                            <h4>شبکه های اجتماعی</h4>
                        </div>
                        <div className="options">
                            <a href="#">
                                <p><FaWhatsapp /></p>
                            </a>
                            <a href="#">
                                <p><LiaTelegramPlane /></p>
                            </a>
                            <a href="#">
                                <p><FaInstagram /></p>
                            </a>
                        </div>
                    </div>
                    <div className="box about">
                        <div className="logo">
                            <div>
                                <img src={logo}></img>
                            </div>

                        </div>
                        <div className="pay">
                            <img src={zarin}></img>
                            <img src={etemad}></img>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Footer;