import { Link } from 'react-router-dom';
import { IoIosArrowDroprightCircle, IoIosArrowDropdownCircle } from 'react-icons/io';
import { AiOutlineSearch } from 'react-icons/ai';
import { getArticleQuery, showDiscover } from '../redux/action/article';
import { useDispatch, useSelector } from 'react-redux';
import scrollUp from '../custom/scrollUp';
import DiscoverGrid from './DiscoverGrid';

const Navbar = () => {
  const dispatch = useDispatch();
  const show = useSelector(state => state.article.show);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(getArticleQuery(e.target.value));
  }

  const showInput = () => {
    const input = document.getElementById('search-input');
    if (input.style.display === 'none') {
      input.style.display = 'block';
    } else {
      input.style.display = 'none';
    }
  }

  const handleDiscover = () => {
    dispatch(showDiscover());
  }

  const curScreen = "mobile";

  return (
    <div className="navbar">
      <header className="app-header d-flex align-items-center justify-content-between">
        <h2 className="logo-link" onClick={() => scrollUp()}>FORW&#62;RD</h2>
        <nav className="nav-items d-flex align-items-center justify-content-center">
          <button className="discover-btn" onClick={handleDiscover}>
            <div className="discover-btn-div d-flex justify-content-center align-items-center">
              {show ? <IoIosArrowDropdownCircle className="discover-icon" /> : <IoIosArrowDroprightCircle className="discover-icon" />}
              <span className="discover-span">Discover</span>
            </div>
          </button>
          <input type="text" placeholder="Search" className="nav-search" id="search-input" onChange={handleSearch} />
          <button className="search-btn" onClick={showInput}>
            <AiOutlineSearch />
          </button>
        </nav>
      </header>
      <DiscoverGrid curScreen={curScreen} />
    </div>
  )
}

export default Navbar