import { useEffect, useState } from 'https://cdn.pika.dev/haunted';

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';



export const useCocktailSearch = (query = "") => {
  const [cocktails, setCocktails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${BASE_URL}${query}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCocktails(data.drinks || []); // It uses an empty array if no drinks are found
      } catch (error) {
        setError(`There has been a problem with your fetch operation: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchData();
    }
  }, [query]);

  return { cocktails, loading, error };
};
