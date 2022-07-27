import { useRef, useCallback } from "react";
import Article from "./Article";
import { useDispatch, useSelector } from "react-redux";
import useArticleQuery from "../custom/useArticleQuery";
import {
  updateOffset
} from "../redux/action/article";
import BackToTop from "../custom/BackToTop";
import DiscoverGrid from "./DiscoverGrid";

const ArticleList = () => {
  const dispatch = useDispatch();
  const articles = useSelector((state) => state.article.articles);
  const query = useSelector((state) => state.article.query);
  const offset = useSelector((state) => state.article.offset);
  const loading = useSelector((state) => state.article.loading);
  const error = useSelector((state) => state.article.error);
  const hasMore = useSelector((state) => state.article.hasMore);

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
    [loading, hasMore, offset, dispatch]
  );

  const curScreen = "desktop";

  return (
    <div>
      <DiscoverGrid curScreen={curScreen} />
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
      <BackToTop />
      <div>{loading && "Loading"}</div>
      <div>{error && "Error"}</div>
    </div>
  );
};

export default ArticleList;
