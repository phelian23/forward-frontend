import { useState } from 'react';
import { addViewCount } from '../redux/action/article';
import { useDispatch } from 'react-redux';

const Article = ({ article }) => {
  const [readMore, setReadMore] = useState(false);
  const dispatch = useDispatch();

  const handleReadMoreView = (id) => {
    dispatch(addViewCount(id));
    setReadMore(!readMore);
  }

  const getDay = (date) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[new Date(date).getDay()];
  }

  const getMonth = (date) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return months[new Date(date).getMonth()];
  }

  const dateHandler = (date) => {
    const dateObj = new Date(date);
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    return `${getDay(date)} ${day} ${getMonth(date)} ${year}`;
  }

  return (
    <div>
      <h1 className="article-title">{article.title}</h1>
      <div className="d-flex author-cont">
        <p>{article.author}</p>
        <span>&#8226;</span>
        <p>{dateHandler(article.created_at)}</p>
      </div>
      <div>
        <img src={article.image} alt={article.title} className="article-image" />
      </div>
      <div className="article-content">
        <p>{readMore ? article.content : article.content.slice(0, 300)}&nbsp;
        </p>
        <button className="readmore-btn" onClick={() => handleReadMoreView(article.id)}>{readMore ? 'Read less' : 'Read more'} &#62;</button>
      </div>
    </div>
  )
}

export default Article