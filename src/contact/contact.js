import React, { Component } from "react";
import { NavLink } from "react-router-dom";

export class Contact extends Component {
  render() {
    return <div> 
  
      <div className="tm-search-form-container">
        <form
          action="index.html"
          method="GET"
          className="form-inline tm-search-form"
        >
          {/* <div classNameName="text-uppercase tm-new-release">New Release</div> */}
          <div className="text-uppercase tm-new-release">
            <NavLink to="/" className="tm-text-white">
              Home
            </NavLink>
          </div>
          <div className="form-group tm-advanced-box">
            <a href="#" className="tm-text-white">
              Movies List
            </a>
          </div>
        
        </form>
        
      </div>
      <div className="row tm-mb-big tm-subscribe-row">
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 tm-bg-gray tm-subscribe-form">
          <h3 className="tm-text-pink tm-mb-30">
            Subscribe our updates!
          </h3>
          <p className="tm-mb-30">
            Vestibulum ante ipsum primis in faucibus orci luctus et
            ultrices posuere cubilia Curae; Morbi semper, ligula et
            pretium porttitor, leo orci accumsan ligula.
          </p>
          <form action="index.html" method="POST">
            <div className="form-group mb-0">
              <input
                type="text"
                className="form-control tm-subscribe-input"
                placeholder="Your Email"
              />
              <input
                type="submit"
                value="Submit"
                className="tm-bg-pink tm-text-white d-block ml-auto tm-subscribe-btn"
              />
            </div>
          </form>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 img-fluid pl-0 tm-subscribe-img"></div>
      </div>
    </div>;
  }
}

export default Contact;
