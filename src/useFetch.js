import { useState, useEffect} from "react";

export function useFetch(url) {

  const [data, setData] = useState(null); //Creamos un estado
  const [loading, setLoading] = useState(true); //Creamos un nuevo estado 
 
  useEffect(() => {
    setLoading(true);
    fetch(url)
    .then((response) => response.json())
    .then((data) => setData(data))
    .finally(() => setLoading(false));
    
  }, []);

  return { data , loading };
}