import axios from 'axios'

const BASE_URL = 'http://localhost:3000/api/v1/articles'
const VIEW_URL = 'http://localhost:3000/api/v1/views/create'

const getArticles = async (query, offset) => {
  if (query.length > 0) {
  const response = await axios.get(BASE_URL, {
    params: { query, limit: 5, offset }
  })
  return response.data
} else {
  const response = await axios.get(BASE_URL, {
    params: {limit: 5, offset}
  })
  return response.data
}
}

const getMostViewedArticles = async (offset) => {
  const response = await axios.get(`${BASE_URL}/most_viewed`, {
    params: { limit: 5, offset},
  })
  return response.data
}

const getMostRecentArticles = async (offset) => {
  const response = await axios.get(`${BASE_URL}/most_recent`, {
    params: { limit: 5, offset},
  })
  return response.data
}

const AddView = async (id) => {
  const response = await axios.post(VIEW_URL, {
    article_id: id,
  })
  return response.data
}

export { getArticles, getMostViewedArticles, getMostRecentArticles, AddView }