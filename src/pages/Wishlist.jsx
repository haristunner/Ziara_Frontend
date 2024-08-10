import Nav from "../components/Nav";
import { Empty } from "antd";
import { useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ProductsList from "../components/ProductsList";

const Wishlist = () => {
  const user_id = window.localStorage.getItem("user_id");
  const navigate = useNavigate();

  return (
    <div>
      <Nav />
      {!user_id ? (
        <div className="flex_center">
          <Empty description="Please login to view your wishlist!" />

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
        <WishlistView />
      )}
    </div>
  );
};

export default Wishlist;

const WishlistView = () => {
  const user_id = window.localStorage.getItem("user_id");
  const { data, loading } = useFetch({
    url: `/user/get_wishlists?user_id=${user_id}`,
    method: "GET",
  });

  return (
    <div>
      <h2 style={{ marginTop: "2rem", textAlign: "center" }}>Wishlist</h2>
      <ProductsList products={data?.data?.wishlist} />
    </div>
  );
};
