import Nav from "../components/Nav";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ProductView from "../components/ProductView";

const Product = () => {
  const { id } = useParams();

  const { data, loading } = useFetch({
    url: id ? `/product/get_product/${id}` : "/product",
    method: "GET",
  });

  return (
    <div>
      <Nav />
      {id && data != null ? <ProductView data={data} /> : ""}
    </div>
  );
};

export default Product;
