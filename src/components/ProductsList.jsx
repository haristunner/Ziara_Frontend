import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";

const ProductsList = ({ products = [] }) => {
  const { type } = useParams();

  return (
    <div className="products_list">
      <div
        className="primary_title mb_32 mt_16"
        style={{
          textAlign: "center",
          textTransform: "uppercase",
          fontWeight: "600",
        }}
      >
        {type}
      </div>
      <div className="products_grid">
        {products.map((product) => {
          return <ProductGrid product={product} key={product.name} />;
        })}
      </div>
    </div>
  );
};

export default ProductsList;
