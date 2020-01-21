import { useState, useEffect } from 'react';

export const useFetch = (url, initialValue) => {
  const [result, setResult] = useState(initialValue);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => setResult(json));
  }, []);

  return result;
};
