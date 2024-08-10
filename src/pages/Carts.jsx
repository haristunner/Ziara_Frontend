import Nav from "../components/Nav";
import { Empty } from "antd";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import DeleteIcon from "@mui/icons-material/Delete";

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

  return (
    <div>
      {/* <ProductsList products={data?.data?.cart} /> */}
      <div className="cart_products">
        {data?.data?.cart.length
          ? data?.data?.cart.map((item) => {
              return <CartProduct key={item?.name} product={item} />;
            })
          : ""}
      </div>
    </div>
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
