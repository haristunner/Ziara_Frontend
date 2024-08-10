import Nav from "../components/Nav";
import { Empty, Flex } from "antd";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import DeleteIcon from "@mui/icons-material/Delete";
import { API_BASE_URL } from "../config/api";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";

const Carts = () => {
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
        <CartsView />
      )}
    </div>
  );
};

export default Carts;

const CartsView = () => {
  const user_id = window.localStorage.getItem("user_id");
  const { data, loading } = useFetch({
    url: `/user/get_carts?user_id=${user_id}`,
    method: "GET",
  });

  const checkout = async () => {
    await axios
      .post(`${API_BASE_URL}/payment/create_payment`, {
        user_id,
      })
      .then((res) => {
        console.log(res);

        window.open(res?.data?.data?.url, "_self");
      })
      .catch((err) => {});
  };

  return (
    <>
      {loading ? (
        <div className="flex_center" style={{ minHeight: "70dvh" }}>
          <LoadingOutlined style={{ fontSize: "3rem" }} />
        </div>
      ) : (
        <div className="cart_products">
          {data?.data?.cart.length ? (
            <div className="cart_container">
              {data?.data?.cart.map((item) => {
                return <CartProduct key={item?.name} product={item} />;
              })}
            </div>
          ) : (
            <div className="flex_center" style={{ minHeight: "70dvh" }}>
              <Empty description="Please add products to fashion!" />
            </div>
          )}
          {data?.data?.cart.length ? (
            <Flex justify="center" className="proceed_btn">
              <button className="primary_btn" onClick={checkout}>
                Proceed
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

const CartProduct = ({ product }) => {
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
