
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GiHouse } from "react-icons/gi";
import "../assets/css/signup.css";
import myLogo from "../assets/img/logo.8ea9ff34.png";

const Verify = ({ isFirstTime, setIsFirstTime, setName, setLastName }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [code, setCode] = useState("");
  const [name, setNameLocal] = useState("");
  const [lastname, setLastNameLocal] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (location.state && location.state.token) {
      setToken(location.state.token);
    }
    const storedName = localStorage.getItem("name");
    const storedLastName = localStorage.getItem("lastName");
    if (storedName && storedLastName) {
      setNameLocal(storedName);
      setLastNameLocal(storedLastName);
      setIsFirstTime(false);
    } else {
      setIsFirstTime(true);
    }
  }, [location, setIsFirstTime]);

  const handleVerify = () => {
    axios
        .post(`https://api.mrh-store.com/api/authorize/verify`, {
            name,
            lastname,
            token,
            code,
        })
        .then((response) => {
            const { data } = response.data;
            setToken(data);
            localStorage.setItem("token", data);
            localStorage.setItem("name", name);
            localStorage.setItem("lastName", lastname);
            localStorage.setItem("isLoggedIn", true);
            setName(name);
            setLastName(lastname);
            navigate("/", { state: { name, lastname } });
        })
        .catch((error) => {
            console.error(error);
            setError("تایید ناموفق، لطفاً اطلاعات را بررسی کنید.");
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
          <div className="card-get">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleVerify();
              }}
            >
              {isFirstTime && (
                <>
                  <label style={{ direction: "rtl" }}>
                    نام
                    <input
                      className="x"
                      type="text"
                      value={name}
                      onChange={(e) => setNameLocal(e.target.value)}
                      required
                    />
                  </label>
                  <label style={{ direction: "rtl" }}>
                    فامیل
                    <input
                      className="x"
                      type="text"
                      value={lastname}
                      onChange={(e) => setLastNameLocal(e.target.value)}
                      required
                    />
                  </label>
                </>
              )}
              <label style={{ direction: "rtl" }}>
                کد ارسال شده
                <input
                  className="x"
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                />
              </label>
              {error && <p className="error">{error}</p>} 
              <button type="submit">تایید</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Verify;
