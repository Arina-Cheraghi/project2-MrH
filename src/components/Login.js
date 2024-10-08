import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GiHouse } from "react-icons/gi";
import "../assets/css/signup.css";
import myLogo from "../assets/img/logo.8ea9ff34.png";


const SignIn = () => {
  const navigateTo = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const submitLogin = () => {
    console.log("Submitting login...");
    axios
      .post("https://api.mrh-store.com/api/authorize/login", {
        login: phoneNumber,
      })
      .then((res) => {
        console.log(res.data.data.status);
        setAuthToken(res.data.data.token);
        navigateTo("/Verify", {
          state: {
            token: res.data.data.token,
            status: res.data.data.status,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg(err.message);
      });
  };

  return (



    <div className="background">
      <div className="main-box">
        <div className="card">
          <div className="card-title">
            <Link to="/">
              <GiHouse />
              <h6>صفحه اصلی</h6>
            </Link>
            <div className="myLogo">
              <img src={myLogo} alt="Logo" />
            </div>
          </div>
          <form className="card-get">

            <label htmlFor="phone">شماره تماس خود را وارد کنید</label>
            <div className="card-get">
              <input
                id="phone"
                type="text"
                value={phoneNumber}
                placeholder="شماره تماس..."
                onChange={(e) => setPhoneNumber(e.target.value)}
                dir="rtl"
              />
            </div>

            <button type="button" onClick={submitLogin}>
              بررسی
            </button>
          </form>
          {errorMsg && <p>{errorMsg}</p>}
        </div>
      </div>
    </div>
  );
};

export default SignIn;
