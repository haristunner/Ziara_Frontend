import React from "react";
import ProductGrid from "./ProductGrid";

const ProductsList = ({ products = [] }) => {
  console.log(products);
  return (
    <div className="products_list">
      <div className="products_grid">
        {products.map((product) => {
          return <ProductGrid product={product} key={product.name} />;
        })}
      </div>
    </div>
  );
};

export default ProductsList;
