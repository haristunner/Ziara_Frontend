import { Link } from "react-router-dom";

const ProductGrid = ({ product }) => {
  return (
    <Link to={`/product/${product?.link}`} className="product_grid">
      <img src={product?.image} alt="" />

      <p className="product_grid_name">{product.name}</p>

      <p className="product_grid_price">Rs. {product.price}</p>
    </Link>
  );
};

export default ProductGrid;
