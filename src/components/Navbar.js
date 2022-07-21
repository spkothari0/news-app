import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export class Navbar extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img src="./news.svg" alt="" width="30" height="24" className="d-inline-block align-text-right mx-1" />
              News Today
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/home">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/about">About</Link>
                </li>
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="/" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    Category
                  </a>
                  <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="navbarDropdown">
                    <li><Link className='dropdown-item' to="/business">Business</Link></li>
                    <li><Link className='dropdown-item' to="/entertainment">Entertainment</Link></li>
                    <li><Link className='dropdown-item' to="/general">General</Link></li>
                    <li><Link className='dropdown-item' to="/health">Health</Link></li>
                    <li><Link className='dropdown-item' to="/science">Science</Link></li>
                    <li><Link className='dropdown-item' to="/sports">Sports</Link></li>
                    <li><Link className='dropdown-item' to="/technology">Technology</Link></li>
                  </ul>
                </li>
              </ul>
              <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-success" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    )
  }
}

export default Navbar
