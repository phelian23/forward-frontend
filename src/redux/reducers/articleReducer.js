import Constants from "../action/constants";

const initialState = {
  articles: [],
  loading: false,
  error: null,
  hasMore: false,
  offset: 0,
  query: "",
  show: false,
  isAll: true,
  isViewed: false,
  isRecent: false,
};

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case Constants.GET_ARTICLES_LOADING:
      return {
        ...state,
        loading: true,
      };
    case Constants.GET_ALL_ARTICLES:
      return {
        ...state,
        articles: [...state.articles, ...action.payload],
        loading: false,
        hasMore: action.payload.length === 5,
        isAll: true,
        isViewed: false,
        isRecent: false,
      };
    case Constants.GET_MOST_VIEWED_ARTICLES:
      return {
        ...state,
        articles: [...state.articles, ...action.payload],
        loading: false,
        hasMore: action.payload.length === 5,
        isAll: false,
        isViewed: true,
        isRecent: false,
      };
    case Constants.GET_MOST_RECENT_ARTICLES:
      return {
        ...state,
        articles: [...state.articles, ...action.payload],
        loading: false,
        hasMore: action.payload.length === 5,
        isAll: false,
        isViewed: false,
        isRecent: true,
      };
    case Constants.GET_ARTICLES_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case Constants.GET_ARTICLES_QUERY:
      return {
        ...state,
        query: action.payload,
        show: false,
      };
    case Constants.RESET_ARTICLES:
      return {
        ...state,
        articles: [],
        offset: 0,
      };
    case Constants.UPDATE_OFFSET:
      return {
        ...state,
        offset: action.payload,
      };
    case Constants.SHOW_DISCOVER:
      return {
        ...state,
        show: !state.show,
      };
    case Constants.ADD_VIEW_COUNT:
      return {
        ...state,
        articles: state.articles.map((article) => {
          if (article.id === action.payload.id) {
            return action.payload;
          }
          return article;
        }),
      };
    default:
      return state;
  }
}

  export default articleReducer;