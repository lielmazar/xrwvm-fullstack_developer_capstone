import React from 'react';
import "../assets/style.css";
import "../assets/bootstrap.min.css";

const Header = () => {
    const logout = async (e) => {
    e.preventDefault();
    let logout_url = window.location.origin+"/djangoapp/logout";
    const res = await fetch(logout_url, {
      method: "GET",
    });
  
    const json = await res.json();
    if (json) {
      let username = sessionStorage.getItem('username');
      sessionStorage.removeItem('username');
      window.location.href = window.location.origin;
      window.location.reload();
      alert("Logging out "+username+"...")
    }
    else {
      alert("The user could not be logged out.")
    }
  };
    
//The default home page items are the login details panel
let home_page_items =  <div></div>

//Gets the username in the current session
let curr_user = sessionStorage.getItem('username')

//If the user is logged in, show the username and logout option on home page
if ( curr_user !== null &&  curr_user !== "") {
    home_page_items = <>
      <span className="homepage_links">{curr_user}</span>
      <a className="homepage_links" href="/djangoapp/logout" onClick={logout}>Logout</a>
    </>
} else {
    home_page_items = <>
      <a className="homepage_links" href="/login">Login</a>
      <a className="homepage_links" href="/register">Register</a>
    </>
}
    return (
        <div>
          <nav className="navbar navbar-expand-lg navbar-light" style={{height: '1in', backgroundColor: 'rgb(97, 64, 128)'}}>
            <div className="container-fluid">
              <h2 style={{paddingRight: "5%", color: "white", fontFamily: 'Segoe UI, Arial, sans-serif', fontWeight: 600, fontSize: '2rem', marginBottom: 0, display: 'flex', alignItems: 'center', height: '100%'}}>dealerships</h2>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" style={{fontSize: "larger", color: "white", textDecoration: "underline"}} aria-current="page" href="/">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" style={{fontSize: "larger", color: "white"}} href="/about">About Us</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" style={{fontSize: "larger", color: "white"}} href="/contact">Contact Us</a>
                  </li>
                </ul>
                <span className="navbar-text">
                  <div className="loginlink" id="loginlogout">
                    {home_page_items}
                  </div>
                </span>
              </div>
            </div>
          </nav>
        </div>
    )
}

export default Header
