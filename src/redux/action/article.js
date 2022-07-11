import {
  getArticles,
  getMostViewedArticles,
  getMostRecentArticles,
  AddView,
} from '../../api/getArticle'
import Constants from './constants'

export const getAllArticles = (query, offset) => async (dispatch) => {
  dispatch({ type: Constants.GET_ARTICLES_LOADING })
  try {
    const articles = await getArticles(query, offset)
    dispatch({ type: Constants.GET_ALL_ARTICLES, payload: articles.data })
  } catch (error) {
    dispatch({ type: Constants.GET_ARTICLES_ERROR, payload: error })
  }
}

export const getMostViewedArticlesAction = (offset) => async (dispatch) => {
  dispatch({ type: Constants.GET_ARTICLES_LOADING })
  try {
    const articles = await getMostViewedArticles(offset)
    dispatch({ type: Constants.GET_MOST_VIEWED_ARTICLES, payload: articles.data })
  } catch (error) {
    dispatch({ type: Constants.GET_ARTICLES_ERROR, payload: error })
  }
}

export const getMostRecentArticlesAction = (offset) => async (dispatch) => {
  dispatch({ type: Constants.GET_ARTICLES_LOADING })
  try {
    const articles = await getMostRecentArticles(offset)
    dispatch({ type: Constants.GET_MOST_RECENT_ARTICLES, payload: articles.data })
  } catch (error) {
    dispatch({ type: Constants.GET_ARTICLES_ERROR, payload: error })
  }
}

export const resetArticles = () => {
  return dispatch => {
    dispatch({
      type: Constants.RESET_ARTICLES,
    })
  }
}

export const getArticleQuery = (query) => {
  return dispatch => {
    dispatch({
      type: Constants.GET_ARTICLES_QUERY,
      payload: query,
    })
  }
}

export const updateOffset = (offset) => {
  return dispatch => {
    dispatch({
      type: Constants.UPDATE_OFFSET,
      payload: offset,
    })
  }
}

export const addViewCount = (id) => async (dispatch) => {
  try {
    const article = await AddView(id)
    dispatch({ type: Constants.ADD_VIEW_COUNT, payload: article.data })
  } catch (error) {
    dispatch({ type: Constants.GET_ARTICLES_ERROR, payload: error })
  }
}

export const showDiscover = () => {
  return dispatch => {
    dispatch({
      type: Constants.SHOW_DISCOVER,
    })
  }
}