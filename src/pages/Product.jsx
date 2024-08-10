import Nav from "../components/Nav";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ProductView from "../components/ProductView";
import { LoadingOutlined } from "@ant-design/icons";

const Product = () => {
  const { id } = useParams();

  const { data, loading } = useFetch({
    url: id ? `/product/get_product/${id}` : "/product",
    method: "GET",
  });

  return (
    <div>
      <Nav />
      {id ? (
        loading ? (
          <div className="flex_center" style={{ minHeight: "70dvh" }}>
            <LoadingOutlined style={{ fontSize: "3rem" }} />
          </div>
        ) : data != null ? (
          <ProductView data={data} />
        ) : (
          ""
        )
      ) : (
        ""
      )}
    </div>
  );
};

export default Product;
