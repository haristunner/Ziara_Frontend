import useFetch from "../hooks/useFetch";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useEffect, useState } from "react";
import TextField from "./TextField";
import LogoutIcon from "@mui/icons-material/Logout";
import { Flex, Modal, notification } from "antd";

const UserInfo = ({ user_id = null }) => {
  const { data: user, loading } = useFetch({
    url: `/user/get_user/${user_id}`,
    method: "GET",
  });
  const [data, setData] = useState(null);
  const [addressModal, setAddressModal] = useState(false);
  const [address, setAddress] = useState({
    street: "",
    city: "",
    district: "",
    state: "",
    postal_code: "",
  });

  useEffect(() => {
    if (user?.data) {
      setData(user?.data);
    }
  }, [user]);

  const aside_lists = [
    {
      text: "My Profile",
      icon: <PersonIcon />,
    },
    {
      text: "Address",
      icon: <LocationOnIcon />,
    },
    // {
    //   text: "My orders",
    //   icon: <ShoppingBagIcon />,
    // },
    {
      text: "Log out",
      icon: <LogoutIcon />,
    },
  ];

  const [view, setView] = useState("My Profile");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value,
    });
  };

  return (
    <div className="user_info">
      <Modal
        open={addressModal}
        onCancel={() => {
          setAddressModal(false);
        }}
        footer={false}
        title="Add new address"
        centered
      >
        <Flex vertical gap={16} style={{ padding: "1rem 0" }}>
          <TextField
            label="Street"
            name="street"
            value={address?.street}
            onChange={handleChange}
          />
          <TextField
            label="City"
            name="city"
            value={address?.city}
            onChange={handleChange}
          />
          <TextField
            label="District"
            name="district"
            value={address?.district}
            onChange={handleChange}
          />
          <TextField
            label="State"
            name="state"
            value={address?.state}
            onChange={handleChange}
          />
          <TextField
            label="Postal code"
            name="postal_code"
            value={address?.postal_code}
            onChange={handleChange}
          />

          <div style={{ textAlign: "center" }}>
            <button className="primary_btn">submit</button>
          </div>
        </Flex>
      </Modal>
      <aside className="user_aside">
        {aside_lists.map((item) => {
          return (
            <div
              key={item.text}
              className={`user_side_list ${item.text === view ? "active" : ""}`}
              onClick={() => {
                setView(item.text);

                if (item.text === "Log out") {
                  window.localStorage.setItem("user_id", "");
                  notification.success({ message: "Log out successfully!" });
                  window.location.reload();
                }
              }}
            >
              <p> {item.icon}</p>
              <p>{item.text}</p>
            </div>
          );
        })}
      </aside>

      <main>
        {view === "My Profile" ? (
          <div className="my_profile_card">
            <div className="grid_col2">
              {/* <TextField
                label="First name"
                name="first_name"
                bordered={false}
                readonly
                value={data?.first_name}
                onChange={handleChange}
              />
              <TextField
                label="Last name"
                name="last_name"
                bordered={false}
                readonly
                value={data?.last_name}
                onChange={handleChange}
              />
              <TextField
                label="Email"
                name="email"
                bordered={false}
                readonly
                value={data?.email}
                onChange={handleChange}
              />
              <TextField
                label="Phone"
                name="phone"
                bordered={false}
                readonly
                value={data?.phone}
                onChange={handleChange}
              /> */}

              <div>
                <p className="fw_700">First Name</p>
                <p className="light_txt">{data?.first_name}</p>
              </div>

              <div>
                <p className="fw_700">Last Name</p>
                <p className="light_txt">{data?.last_name}</p>
              </div>
              <div>
                <p className="fw_700">Email</p>
                <p className="light_txt">{data?.email}</p>
              </div>
              <div>
                <p className="fw_700">Phone</p>
                <p className="light_txt">{data?.phone}</p>
              </div>
            </div>
          </div>
        ) : view === "Address" ? (
          <div className="my_profile_card address">
            {data?.address.map((address) => {
              return (
                <div className="address_card" key={address?.address_id}>
                  <span className="address_box">
                    <p>{address?.street}</p>
                    <p>{address?.city}</p>
                    <p>{address?.district}</p>
                    <p>{address?.state}</p>
                    <p>{address?.postal_code}</p>
                  </span>
                </div>
              );
            })}

            <div className="address_card">
              <div className="add_address_btn">
                <p>Add new address</p>
                <button
                  className="primary_btn"
                  style={{ padding: ".25rem .45rem" }}
                  onClick={() => {
                    setAddressModal(true);
                  }}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ) : view === "My orders" ? (
          <div className="my_profile_card"></div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
};

export default UserInfo;
