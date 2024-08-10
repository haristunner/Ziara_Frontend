import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import { message, notification } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

const AddToCart = ({ data, setData }) => {
  const user_id = window.localStorage.getItem("user_id");
  const navigate = useNavigate();
  const [loading, setLoading] = useState({
    loader: false,
    type: "",
  });

  const add_to_cart = async () => {
    if (!data?.selected_size) {
      notification.error({
        message: "Select the size",
      });
      return;
    }

    if (user_id) {
      setLoading({ loader: true, type: "cart" });

      await axios
        .post(`${API_BASE_URL}/user/add_to_cart`, {
          quantity: data?.quantity,
          size: data?.selected_size,
          product_id: data?.product_id,
          user_id,
        })
        .then((res) => {
          console.log(res);
          if (res.data.success)
            notification.success({
              message: "Product added to cart!",
            });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading({ loader: false, type: "" });
        });
    } else {
      navigate(`/user?redirect_url=${window.location.pathname}`);
    }
  };

  const add_to_wishlist = async () => {
    if (user_id) {
      setLoading({ loader: true, type: "wishlist" });

      await axios
        .post(`${API_BASE_URL}/user/add_to_wishlist`, {
          product_id: data?.product_id,
          user_id,
        })
        .then((res) => {
          console.log(res);
          if (res.data.success)
            notification.success({
              message: "Product added to wishlist!",
            });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading({ loader: false, type: "" });
        });
    } else {
      navigate(`/user?redirect_url=${window.location.pathname}`);
    }
  };

  return (
    <div className="cart_btns mt_32">
      <div className="add_to_cart">
        <button onClick={add_to_cart} disabled={loading.loader}>
          ADD TO BAG{" "}
          {loading.loader && loading.type === "cart" ? <LoadingOutlined /> : ""}
        </button>
      </div>

      <div className="add_to_wishlist">
        <button onClick={add_to_wishlist} disabled={loading.loader}>
          <FavoriteBorderIcon style={{ fontSize: "20px" }} />
          ADD TO WISHLIST{" "}
          {loading.loader && loading.type === "wishlist" ? (
            <LoadingOutlined />
          ) : (
            ""
          )}
        </button>
      </div>
    </div>
  );
};

export default AddToCart;
