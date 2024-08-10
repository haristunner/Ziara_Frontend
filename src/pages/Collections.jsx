import React from "react";
import { useParams } from "react-router-dom";
import Nav from "../components/Nav";
import useFetch from "../hooks/useFetch";
import ProductsList from "../components/ProductsList";
import { LoadingOutlined } from "@ant-design/icons";

const Collections = () => {
  const { type } = useParams();

  const { data, loading } = useFetch({
    url: `/product/get_products_by_type/${type}`,
    method: "GET",
  });

  console.log(data);

  return (
    <div>
      <Nav />
      {type ? (
        loading ? (
          <div className="flex_center" style={{ minHeight: "70dvh" }}>
            <LoadingOutlined style={{ fontSize: "3rem" }} />
          </div>
        ) : data ? (
          <ProductsList products={data?.data?.products} />
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default Collections;
