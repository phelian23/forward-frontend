import { useRef, useCallback } from "react";
import Article from "./Article";
import { useDispatch, useSelector } from "react-redux";
import useArticleQuery from "../custom/useArticleQuery";
import {
  updateOffset,
  getArticleQuery,
  getMostRecentArticlesAction,
  getMostViewedArticlesAction,
  resetArticles,
} from "../redux/action/article";
import discoverTags from "./DiscoverTags";

const ArticleList = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.article.articles);
  const query = useSelector((state) => state.article.query);
  const offset = useSelector((state) => state.article.offset);
  const loading = useSelector((state) => state.article.loading);
  const error = useSelector((state) => state.article.error);
  const hasMore = useSelector((state) => state.article.hasMore);
  const show = useSelector((state) => state.article.show);

  useArticleQuery(query, offset);

  const observer = useRef();
  const lastArticleElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          dispatch(updateOffset(offset + 5));
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const handleMostRecent = () => {
    dispatch(resetArticles());
    dispatch(getMostRecentArticlesAction(offset));
  }

  const handleMostViewed = () => {
    dispatch(resetArticles());
    dispatch(getMostViewedArticlesAction(offset));
  }

  const handleDiscoverClick = (e) => {
    dispatch(getArticleQuery(e.target.innerText));
  };

  return (
    <div>
      {show ? (
        <div className="discover-cont">
          {discoverTags.map((tag, index) => {
            return (
              <p
                key={index}
                onClick={(e) => handleDiscoverClick(e)}
                className="discover-item"
              >
                {tag}
              </p>
            );
          })}
          <p className="most-items" onClick={handleMostViewed}>Most Viewed</p>
          <p className="most-items2" onClick={handleMostRecent}>Most Recent</p>
        </div>
      ) : null}
      <ul className="list">
        {articles.map((article, index) => {
          if (index === articles.length - 1) {
            return (
              <li ref={lastArticleElementRef} key={article.id}>
                <Article article={article} />
              </li>
            );
          } else {
            return (
              <li key={article.id}>
                <Article article={article} />
              </li>
            );
          }
        })}
      </ul>
      <div>{loading && "Loading"}</div>
      <div>{error && "Error"}</div>
    </div>
  );
};

export default ArticleList;
