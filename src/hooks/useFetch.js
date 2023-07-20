import { useState, useEffect } from "react";
import { fetchAllContent} from "../utils/api";
const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    setData(null);
    setIsLoading(true);
    setError(null);
    fetchAllContent(url)
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [url]);
  return { data, isLoading, error };
}
export default useFetch;
