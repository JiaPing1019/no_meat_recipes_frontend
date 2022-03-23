import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useRecipeSearch(ingredientQuery, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [recipes, setRecipes] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setRecipes([])
  }, [ingredientQuery])

  useEffect(() => {
    setLoading(true)
    setError(false)

    let cancel

    const fetchRecipes = async () => {
      try {
        let res = await axios.get("http://localhost:3000/recipes", {
          params: {
            ingredientQuery: ingredientQuery,
            page: pageNumber,
          },
          cancelTOken: new axios.CancelToken((c) => (cancel = c)),
        });

        setRecipes((prevRecipes) => {
          return [...new Set([...prevRecipes, ...res.data.recipes])]
        });
        setHasMore(res.data.recipes.length > 0);
        setLoading(false);
      } catch (error) {
        if (axios.isCancel(error)) return;
        setError(true);
      }

      return () => cancel()
    }
    const timeOutId = setTimeout(() => {
      fetchRecipes();
    }, 500);

    return () => {
      clearTimeout(timeOutId);
    }
  }, [ingredientQuery, pageNumber])

  return {
    loading, error, recipes, hasMore
  }
} 
