import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CountrySelector from './CountrySelector';

function Navbar({ country, setCountry }) {
  const navigate = useNavigate();

  const handleCountryChange = (selectedCountry) => {
    setCountry(selectedCountry);
    navigate(`/news-app/${selectedCountry}`);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to={`/news-app/${country}`}>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMhhDKOxAg2Ie416aZsjRJZI0X_dZt1mLfMg&usqp=CAU" alt="news" width="30" height="24" className="d-inline-block align-text-right mx-1" />
            News Today
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to={`/news-app/${country}`}>Home</Link>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Category
                </a>
                <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
                  <li><Link className='dropdown-item' to={`/news-app/${country}/business`}>Business</Link></li>
                  <li><Link className='dropdown-item' to={`/news-app/${country}/entertainment`}>Entertainment</Link></li>
                  <li><Link className='dropdown-item' to={`/news-app/${country}/general`}>General</Link></li>
                  <li><Link className='dropdown-item' to={`/news-app/${country}/health`}>Health</Link></li>
                  <li><Link className='dropdown-item' to={`/news-app/${country}/science`}>Science</Link></li>
                  <li><Link className='dropdown-item' to={`/news-app/${country}/sports`}>Sports</Link></li>
                  <li><Link className='dropdown-item' to={`/news-app/${country}/technology`}>Technology</Link></li>
                </ul>
              </li>
              <CountrySelector country={country} setCountry={handleCountryChange} />
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
