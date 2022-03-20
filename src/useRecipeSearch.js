import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useRecipeSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [recipes, setRecipes] = useState([])
  const [hasMore, setHasMore] = useState(false)

  useEffect(() => {
    setRecipes([])
  }, [query])

  useEffect(() => {
    setLoading(true)
    setError(false)

    let cancel

    axios({
      method: "GET",
      // FIXME: Test in local temporarily
      url: "http://localhost:3000/recipes",
      params: { query: query, page: pageNumber },
      cancelTOken: new axios.CancelToken((c) => (cancel = c)),
    })
      .then((res) => {
        setRecipes((prevRecipes) => {
          return [...new Set([...prevRecipes, ...res.data.recipes])];
        });

        setHasMore(res.data.recipes.length > 0);
        setLoading(false);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });

    return () => cancel()
  }, [query, pageNumber])

  return {
    loading, error, recipes, hasMore
  }
} 
