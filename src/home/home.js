import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

class Home extends Component {
  state = {
    Movie: [],
    // con : {
    //     headers : {'authorization' : `Bearer ${localStorage.getItem('token')}`}
    // }
  };

  componentDidMount() {
    axios
      .get("http://localhost:90/movies")
      .then((res) => {
        console.log(res.data.data);
        this.setState({
          Movie: res.data.data,
        });
      })
      .catch((err) => {
        // error area
      });
  }
  logoutUser = (e) => {
    localStorage.clear();
    window.location.href = "/signin";
  };
  render() {
    {
      if (
        localStorage.getItem("token") &&
        localStorage.getItem("userType") === "Admin"
      ) {
        var navbar = (
          <>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <NavLink
                  to="/"
                  className="nav-link tm-nav-link tm-text-white active"
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="movie"
                  className="nav-link tm-nav-link tm-text-white"
                >
                  Add Movie
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="movielist"
                  className="nav-link tm-nav-link tm-text-white"
                >
                  Movie List
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="profile"
                  className="nav-link tm-nav-link tm-text-white"
                >
                  Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="#!"
                  onClick={this.logoutUser}
                  className="nav-link tm-nav-link tm-text-white"
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </>
        );
      } else if (
        localStorage.getItem("token") &&
        localStorage.getItem("userType") === "Customer"
      ) {
        var navbar = (
          <>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <NavLink
                  to="/"
                  className="nav-link tm-nav-link tm-text-white active"
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/contact"
                  className="nav-link tm-nav-link tm-text-white"
                >
                  Contact
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="profile"
                  className="nav-link tm-nav-link tm-text-white"
                >
                  Profile
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="#!"
                  onClick={this.logoutUser}
                  className="nav-link tm-nav-link tm-text-white"
                >
                  Logout
                </NavLink>
              </li>
            </ul>
          </>
        );
      } else {
        var navbar = (
          <>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <NavLink
                  to="/"
                  className="nav-link tm-nav-link tm-text-white active"
                >
                  Home
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/contact"
                  className="nav-link tm-nav-link tm-text-white"
                >
                  Contact
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/signin"
                  className="nav-link tm-nav-link tm-text-white"
                >
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/signup"
                  className="nav-link tm-nav-link tm-text-white"
                >
                  Register
                </NavLink>
              </li>
            </ul>
          </>
        );
      }
    }
    return (
      <div>
        <div className="">
          <div id="loader-wrapper">
            <div id="loader"></div>
            <div className="loader-section section-left"></div>
            <div className="loader-section section-right"></div>
          </div>
          <div className="tm-welcome-section">
            <div className="container tm-navbar-container">
              <div className="row">
                <div className="col-xl-12">
                  <nav className="navbar navbar-expand-sm">{navbar}</nav>
                </div>
              </div>
            </div>
            <div className="container text-center tm-welcome-container">
              <div className="tm-welcome">
                <i className="fas tm-fa-big fa-camera-movie tm-fa-mb-big"></i>
                <h1 className="text-uppercase mb-3 tm-site-name">Mero Movie</h1>
                <p className="tm-site-description">
                  Online Ticket Booking Available
                </p>
              </div>
            </div>
          </div>
          <div className="tm-search-form-container">
            <form
              action="index.html"
              method="GET"
              className="form-inline tm-search-form"
            >
              <div className="text-uppercase tm-new-release">New Release</div>
              <div className="form-group tm-search-box">
                <input
                  type="text"
                  name="keyword"
                  className="form-control tm-search-input"
                  placeholder="Type your keyword ..."
                />
                <input
                  type="submit"
                  value="Search"
                  className="form-control tm-search-submit"
                />
              </div>
              <div className="form-group tm-advanced-box">
                <a href="#" className="tm-text-white">
                  Go Advanced ...
                </a>
              </div>
            </form>
          </div>

          <body>
            <div className="tm-main">
              <div className="container">
                <div className="row tm-albums-container grid">
                  {this.state.Movie.map((movie) => {
                    return (
                      <div className="col-sm-6 col-12 col-md-6 col-lg-3 col-xl-3 tm-album-col">
                        <figure className="effect-sadie">
                          <NavLink to={"/booking/" + movie._id}>
                            <img
                              src={movie.cover}
                              width={260}
                              height={390}
                              alt="Image"
                              className="img-fluid"
                            />
                            <figcaption>
                              <h2>{movie.mname}</h2>
                              <p>{movie.mdesc}</p>
                            </figcaption>
                          </NavLink>
                        </figure>
                      </div>
                    );
                  })}
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="tm-tag-line">
                      <h2 className="tm-tag-line-title">Upcomming Movies</h2>
                    </div>
                  </div>
                </div>

                <div className="row mb-5">
                  <div className="col-xl-12">
                    <div className="media-boxes">
                      <div className="media">
                        <img
                          src="img/rrr.jpg"
                          width={140}
                          height={140}
                          alt="Image"
                          className="mr-3"
                        />
                        <div className="media-body tm-bg-gray">
                          <div className="tm-description-box">
                            <h5 className="tm-text-blue">RRR</h5>
                            <p className="mb-0">
                              A tale of two legendary revolutionaries and their
                              journey far away from home. After their journey
                              they return home to start fighting back against
                              British colonialists in the 1920s.
                              <a
                                href="https://plus.google.com/+tooplate"
                                target="_parent"
                              >
                                Tooplate
                              </a>
                              . Thank you.
                            </p>
                          </div>
                          <div className="tm-buy-box">
                            <a
                              href="#"
                              className="tm-bg-blue tm-text-white tm-buy"
                            >
                              Book
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="media">
                        <img
                          src="img/kgf.jpeg"
                          alt="Image"
                          width={140}
                          height={140}
                          className="mr-3"
                        />
                        <div className="media-body tm-bg-gray">
                          <div className="tm-description-box">
                            <h5 className="tm-text-blue">K.G.F: Chapter 2</h5>
                            <p className="mb-0">
                              K.G.F: Chapter 2 is an upcoming Indian
                              Kannada-language period action film written and
                              directed by Prashanth Neel, and produced by Vijay
                              Kiragandur under the banner Hombale Films. The
                              second installment of the two-part series, it is a
                              sequel to the 2018 film K.G.F: Chapter 1.
                            </p>
                          </div>
                          <div className="tm-buy-box">
                            <a
                              href="#"
                              className="tm-bg-blue tm-text-white tm-buy"
                            >
                              Book
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </body>
          <div className="row tm-mb-medium">
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 mb-4">
              <h4 className="mb-4 tm-font-300">Latest Albums</h4>
              <a href="#" className="tm-text-blue-dark d-block mb-2">
                Sed fringilla consectetur
              </a>
              <a href="#" className="tm-text-blue-dark d-block mb-2">
                Mauris porta nisl quis
              </a>
              <a href="#" className="tm-text-blue-dark d-block mb-2">
                Quisque maximus quam nec
              </a>
              <a href="#" className="tm-text-blue-dark d-block">
                className aptent taciti sociosqu ad
              </a>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 mb-4">
              <h4 className="mb-4 tm-font-300">Our Pages</h4>
              <a href="#" className="tm-text-blue-dark d-block mb-2">
                Nam dapibus imperdiet
              </a>
              <a href="#" className="tm-text-blue-dark d-block mb-2">
                Primis in faucibus orci
              </a>
              <a href="#" className="tm-text-blue-dark d-block mb-2">
                Sed interdum blandit dictum
              </a>
              <a href="#" className="tm-text-blue-dark d-block">
                Donec non blandit nisl
              </a>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6">
              <h4 className="mb-4 tm-font-300">Quick Links</h4>
              <a href="#" className="tm-text-blue-dark d-block mb-2">
                Nullam scelerisque mauris
              </a>
              <a href="#" className="tm-text-blue-dark d-block mb-2">
                Vivamus tristique enim non orci
              </a>
              <a href="#" className="tm-text-blue-dark d-block mb-2">
                Luctus et ultrices posuere
              </a>
              <a href="#" className="tm-text-blue-dark d-block">
                Cubilia Curae
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
