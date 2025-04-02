import { useEffect, useState } from "react";

// Hook-ul useFetch este cel facut la sedinta Custom Hooks.
export function useFetch(url) {
    const [data, setData] = useState(null);
    useEffect(() => {
      fetch(url)
        .then((response) => response.json())
        .then((json) => {
          setData(json);
        });
    }, [url]);
  
    return data;
  }