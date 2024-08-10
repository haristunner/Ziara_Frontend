import { useState } from "react";
import Nav from "../components/Nav";
import TextField from "../components/TextField";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { Input, message, notification } from "antd";
import UserInfo from "../components/UserInfo";
import { MdEdit } from "react-icons/md";
import validator from "validator";

const Account = () => {
  const user = window.localStorage.getItem("user_id");
  const [view, setView] = useState("register");

  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    district: "",
    state: "",
    postal_code: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    otp: "",
    email_sent: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });
  };

  const register = async () => {
    if (!validator.isEmail(data.email)) {
      message.error("Please enter valid email");

      return;
    } else if (!validator.isMobilePhone(data.phone, "any")) {
      message.error("Please enter valid phone");

      return;
    }

    await axios
      .post(`${API_BASE_URL}/user/create`, {
        first_name: data?.first_name,
        last_name: data?.last_name,
        email: data?.email,
        phone: data?.phone,
        address: [
          {
            street: data.street,
            city: data.city,
            district: data.district,
            state: data.state,
            postal_code: data.postal_code,
          },
        ],
      })
      .then((res) => {
        if (res.data.success) {
          window.localStorage.setItem("user", JSON.stringify(res?.data?.data));
          window.location.reload();
        }
      })
      .catch((err) => {
        if (err?.response) {
          console.log(err?.response);
          message.error({
            message: err?.response?.data?.message,
          });
        }
      });
  };

  const login = async () => {
    if (loginData.email_sent) {
      if (!loginData.otp) {
        message.error("Please enter the otp");
        return;
      }
    } else {
      if (!validator.isEmail(loginData.email)) {
        message.error("Please enter valid email");
        return;
      }
    }

    if (loginData.email_sent && loginData.otp) {
      await axios
        .post(`${API_BASE_URL}/user/validate_user_by_email_otp`, {
          email: loginData.email,
          otp: Number(loginData.otp),
        })
        .then((res) => {
          if (res.data.success) {
            window.localStorage.setItem("user_id", res.data?.data?.user_id);
            window.location.reload();
            setLoginData({
              email: "",
              otp: "",
              email_sent: false,
            });
          } else {
            notification.error(res.data?.message);
          }
        })
        .catch((err) => {
          if (err?.response) {
            console.log(err?.response);
            notification.error({
              message: err?.response?.data?.message,
            });
          }
        });
    } else {
      await axios
        .post(`${API_BASE_URL}/user/login`, {
          email: loginData.email,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            message.success(res.data?.message);
            setLoginData({
              ...loginData,
              email_sent: true,
            });
          } else {
            message.error(res.data?.message);
          }
        })
        .catch((err) => {
          if (err?.response) {
            console.log(err?.response);
            notification.error({
              message: err?.response?.data?.message,
            });
          }
        });
    }
  };

  return (
    <div>
      <Nav />

      <div className="login">
        <div style={{ textAlign: "center", padding: "2rem" }}>
          <img
            src="https://www.svgrepo.com/show/508195/user.svg"
            style={{ height: "3rem" }}
          />
        </div>

        <>
          {user ? (
            <>
              <UserInfo user_id={user} />
            </>
          ) : view === "register" ? (
            <>
              <p className="form_title mb_16">Contact</p>

              <div className="grid_col2 mb_32">
                <TextField
                  label="First name"
                  name="first_name"
                  value={data.first_name}
                  onChange={handleChange}
                />
                <TextField
                  label="Last name"
                  name="last_name"
                  value={data.last_name}
                  onChange={handleChange}
                />
                <TextField
                  label="Email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                />
                <TextField
                  label="Phone"
                  name="phone"
                  value={data.phone}
                  onChange={handleChange}
                />
              </div>

              <p className="form_title mb_16"> Address</p>
              <div className="grid_col2 mb_32">
                <TextField
                  label="Street"
                  name="street"
                  value={data.street}
                  onChange={handleChange}
                />
                <TextField
                  label="City"
                  name="city"
                  value={data.city}
                  onChange={handleChange}
                />
                <TextField
                  label="District"
                  name="district"
                  value={data.district}
                  onChange={handleChange}
                />
                <TextField
                  label="State"
                  name="state"
                  value={data.state}
                  onChange={handleChange}
                />{" "}
                <TextField
                  label="Pin code"
                  name="postal_code"
                  value={data.postal_code}
                  onChange={handleChange}
                />
              </div>

              <div className="register_btns">
                <button className="primary_btn" onClick={register}>
                  Register
                </button>
                <button
                  className="secondary_btn"
                  onClick={() => {
                    setView("login");
                  }}
                >
                  Login
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="form_title mb_16" style={{ textAlign: "center" }}>
                Login
              </p>

              <div style={{ textAlign: "center" }} className="mt_32 mb_32">
                <TextField
                  width={300}
                  placeholder="Enter your email to login"
                  value={loginData.email}
                  onChange={(e) => {
                    setLoginData({ ...loginData, email: e.target.value });
                  }}
                  readonly={loginData.email_sent}
                  addonAfter={
                    loginData.email_sent ? (
                      <MdEdit
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setLoginData({
                            ...loginData,
                            email_sent: false,
                            otp: "",
                          });
                        }}
                      />
                    ) : (
                      ""
                    )
                  }
                />
                <div className="mt_32"></div>
                {loginData.email_sent ? (
                  <Input.OTP
                    length={4}
                    onChange={(value) => {
                      setLoginData({
                        ...loginData,
                        otp: value,
                      });
                    }}
                  />
                ) : (
                  ""
                )}
              </div>

              <div className="register_btns mt_32">
                <button className="primary_btn" onClick={login}>
                  {loginData?.email_sent ? "Verify" : "Login"}
                </button>
                <button
                  className="secondary_btn"
                  onClick={() => {
                    setView("register");
                  }}
                >
                  Register
                </button>
              </div>
            </>
          )}
        </>
      </div>
    </div>
  );
};

export default Account;
