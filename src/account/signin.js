import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

class Signin extends Component {
  state = {
    email: "",
    password: "",
    errors: null,
  };

  loginChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  loginUser = async (e) => {
    e.preventDefault();
    if (!this.state.email || !this.state.password) {
      this.setState({
        errors: "Please Insert all Credentials",
      });
      this.setState({
        email: "",
        password: "",
      });
      setTimeout(() => {
        this.setState({
          errors: "",
        });
      }, 2000);
    } else {
      const data = {
        email: this.state.email,
        password: this.state.password,
      };
      await axios
        .post("http://localhost:90/user/login", data)
        .then((res) => {
          if (res.data.success === true) {
            //To save token to use in every pages
            localStorage.setItem("token", res.data.accessToken);
            localStorage.setItem("D_id", res.data.data._id);
            localStorage.setItem("firstname", res.data.data.fname);
            localStorage.setItem("userType", res.data.data.userType);
            localStorage.setItem("lastname", res.data.data.lname);
            window.location.href = "/";
          }
        })
        .catch((error) => {
          console.log(error.response.data.msg);
          this.setState({
            errors: error.response.data.msg,
          });
        });
    }
  };

  render() {
    return (
      <div>
        <div className="tm-search-form-container">
          <form
            action="index.html"
            method="GET"
            className="form-inline tm-search-form"
          >
            {/* <div className="text-uppercase tm-new-release">New Release</div> */}
            <div className="text-uppercase tm-new-release">
              <NavLink to="/" className="tm-text-white">
                Home
              </NavLink>
            </div>
            <div className="form-group tm-search-box"></div>
          </form>
        </div>
        <section className="sign-in">
          <div className="container-account">
            <div className="signin-content">
              <div className="signin-image">
                <figure>
                  <img src="img/signin.jpg" alt="Image Error" />
                </figure>
              </div>

              <div className="signin-form">
                <h2 className="form-title">Sign In</h2>
                {this.state.errors && (
                  <span style={{ padding: "2px", color: "red" }}>
                    {this.state.errors}
                  </span>
                )}
                <form method="POST" className="register-form" id="login-form">
                  <div className="form-group">
                    <label for="your_name" className="label">
                      <i className="fas fa-user-circle material-icons-name"></i>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="your_name"
                      value={this.state.email}
                      onChange={this.loginChangeHandler}
                      placeholder="Email"
                    />
                  </div>
                  <div className="form-group">
                    <label for="your_pass" className="label">
                      <i className="fas fa-lock"></i>
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="your_pass"
                      value={this.state.password}
                      onChange={this.loginChangeHandler}
                      placeholder="Password"
                    />
                  </div>
                  <div className="form-group my-0">
                    <input
                      type="checkbox"
                      name="remember-me"
                      id="remember-me"
                      className="agree-term me-2"
                    />
                    <label for="remember-me" className="label-agree-term">
                      <span>
                        <span></span>
                      </span>
                      Remember me
                    </label>
                  </div>
                  <div className="form-group my-1">
                    <NavLink to="/signup" className="form-group text-primary">
                      Create an account
                    </NavLink>
                  </div>
                  <div className="form-group form-button">
                    <input
                      type="submit"
                      name="signin"
                      id="signin"
                      className="form-submit"
                      onClick={this.loginUser}
                      value="Log in"
                    />
                  </div>
                </form>
                <div className="social-login">
                  <span className="social-label">Or login with</span>
                  <ul className="socials">
                    <li>
                      <a href="#">
                        <i className="fab fa-facebook-square"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-twitter-square"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-google"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Signin;
