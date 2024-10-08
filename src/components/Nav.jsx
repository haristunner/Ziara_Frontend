import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Drawer, Flex } from "antd";
import { useState } from "react";
import Carts from "../pages/Carts";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

const Nav = () => {
  const user_id = window.localStorage.getItem("user_id");

  const [cartOpen, setCartOpen] = useState(false);

  return (
    <nav>
      <Drawer
        open={cartOpen}
        onClose={() => {
          setCartOpen(false);
        }}
        title="CART"
      >
        <Carts cartOpen={cartOpen} />
      </Drawer>

      <Link className="nav_logo" to={"/"}>
        <img src={Logo} alt="" />
      </Link>

      <div className="nav_list">
        <Link to={"/user"}>
          <PersonIcon className="nav_icons" />
        </Link>
        {/* <Link to={"/"}>
          <SearchIcon className="nav_icons" />
        </Link>
        <Link to={"/wishlist"}>
          <FavoriteBorderIcon className="nav_icons" />
        </Link> */}
        <div
          onClick={() => {
            setCartOpen(true);
          }}
          style={{ cursor: "pointer" }}
        >
          <ShoppingCartIcon className="nav_icons" />
        </div>
      </div>
    </nav>
  );
};

export default Nav;
