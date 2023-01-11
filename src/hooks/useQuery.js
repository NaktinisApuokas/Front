import { useEffect, useState } from "react";
import { apiService } from "../services/apiService";

export default function useQuery(url) {
  if (!url) { throw new Error('url cannot be empty'); }

  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  const getData = async () =>{
      setIsLoading(true);
      const response = await apiService.get(url);
      setData(response);
      setIsLoading(false);
  }

  useEffect(() => {
      getData();
  }, [])

  return { data, isLoading };
  
}
