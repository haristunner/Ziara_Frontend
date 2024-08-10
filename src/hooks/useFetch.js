import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../config/api";

const useFetch = ({ url, method, dependencies = [] }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(() => true);
    async function fetch() {
      await axios
        .request({
          url: url,
          method: method,
          baseURL: API_BASE_URL,
        })
        .then((res) => {
          setData(res?.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }

    fetch();
  }, dependencies);

  return {
    data,
    loading,
  };
};

export default useFetch;
