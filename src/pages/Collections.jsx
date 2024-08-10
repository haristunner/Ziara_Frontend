import React from "react";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import useFetch from "../hooks/useFetch";
import ProductsList from "../components/ProductsList";

const Collections = () => {
  const { type } = useParams();

  console.log(type);

  const { data, loading } = useFetch({
    url: `/product/get_products_by_type/${type}`,
    method: "GET",
  });

  console.log(data);

  return (
    <div>
      <Nav />
      {type && data ? <ProductsList products={data?.data?.products} /> : ""}
    </div>
  );
};

export default Collections;
