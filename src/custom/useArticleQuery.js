import { useEffect } from 'react'
import { getAllArticles, resetArticles, getMostRecentArticlesAction, getMostViewedArticlesAction } from '../redux/action/article'
import { useDispatch, useSelector } from 'react-redux'
import useDebounce from './useDebounce'

export default function useArticleQuery(query, offset) {
  const dispatch = useDispatch()
  
  const isAll = useSelector((state) => state.article.isAll);
  const isViewed = useSelector((state) => state.article.isViewed);
  const isRecent = useSelector((state) => state.article.isRecent);

  const debouncedQuery = useDebounce(query, 500)
  useEffect(() => {
    dispatch(resetArticles())
  }, [debouncedQuery])

  useEffect(() => {
    if (isAll) {
    dispatch(getAllArticles(debouncedQuery, offset))
    } else if (isViewed) {
      dispatch(getMostViewedArticlesAction(offset))
    } else if (isRecent) {
      dispatch(getMostRecentArticlesAction(offset))
    }
  }, [debouncedQuery, offset])

}
