import { useDispatch, useSelector } from "react-redux";
import discoverTags from "./DiscoverTags";
import {
  getArticleQuery,
  getMostRecentArticlesAction,
  getMostViewedArticlesAction,
  resetArticles,
} from "../redux/action/article";

const DiscoverGrid = ({ curScreen }) => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.article.show);
  const offset = useSelector((state) => state.article.offset);

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
    <div className={`discover-${curScreen}`}>
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
    </div>
  )
}

export default DiscoverGrid