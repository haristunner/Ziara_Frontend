import Nav from "../components/Nav";
import { Empty, Flex } from "antd";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import DeleteIcon from "@mui/icons-material/Delete";
import { API_BASE_URL } from "../config/api";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const Carts = ({ cartOpen }) => {
  const user_id = window.localStorage.getItem("user_id");
  const navigate = useNavigate();

  return (
    <div>
      {!user_id ? (
        <div className="flex_center">
          <Empty description="Please login to view your cart!" />

          <div className="register_btns">
            <button
              className="primary_btn"
              onClick={() => {
                navigate(`/user?redirect_url=${window.location.pathname}`);
              }}
            >
              Login
            </button>
          </div>
        </div>
      ) : (
        <CartsView cartOpen={cartOpen} />
      )}
    </div>
  );
};

export default Carts;

const CartsView = ({ cartOpen }) => {
  const user_id = window.localStorage.getItem("user_id");
  const [refresh, setRefresh] = useState(true);

  const { data: cart, loading } = useFetch({
    url: `/user/get_carts?user_id=${user_id}`,
    method: "GET",
    dependencies: [refresh, cartOpen],
  });

  const [data, setData] = useState({});

  useEffect(() => {
    if (cart != null) {
      setData(cart?.data?.cart);
    }
  }, [loading]);

  const [btnLoading, setBtnLoading] = useState(false);

  const checkout = async () => {
    setBtnLoading(() => true);
    await axios
      .post(`${API_BASE_URL}/payment/create_payment`, {
        user_id,
      })
      .then((res) => {
        console.log(res);

        window.open(res?.data?.data?.url, "_self");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setBtnLoading(false);
      });
  };

  const deleteItem = async (product_id) => {
    await axios
      .post(`${API_BASE_URL}/user/delete_product_in_cart`, {
        user_id,
        product_id,
      })
      .then((res) => {
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {loading ? (
        <div className="flex_center" style={{ minHeight: "70dvh" }}>
          <LoadingOutlined style={{ fontSize: "3rem" }} />
        </div>
      ) : (
        <div className="cart_products">
          {data.length ? (
            <div className="cart_container">
              {data.map((item) => {
                return (
                  <CartProduct
                    key={item?.name}
                    product={item}
                    deleteItem={deleteItem}
                  />
                );
              })}
            </div>
          ) : (
            <div className="flex_center" style={{ minHeight: "70dvh" }}>
              <Empty description="Please add products to fashion!" />
            </div>
          )}
          {data.length ? (
            <Flex justify="center" className="proceed_btn">
              <button
                className="primary_btn"
                onClick={checkout}
                disabled={btnLoading}
              >
                Proceed {btnLoading ? <LoadingOutlined /> : ""}
              </button>
            </Flex>
          ) : (
            ""
          )}
        </div>
      )}
    </>
  );
};

const CartProduct = ({ product, deleteItem }) => {
  return (
    <div className="cart_product">
      <Link to={`/product/${product.link}`}>
        <img src={product?.image} alt="" />
      </Link>

      <div>
        <p className="fw_700">{product?.name}</p>
        <div className="mb_8"></div>
        <p>INR {product?.price * product?.quantity}</p>
        <p>Size - {product?.size} </p>
        <p>Qty - {product?.quantity} </p>
        <div className="mb_16"></div>

        <DeleteIcon
          onClick={() => {
            deleteItem(product?.product_id);
          }}
          style={{
            fontSize: "1rem",
            color: "#FF7377",
            cursor: "pointer",
          }}
        />
      </div>
    </div>
  );
};
