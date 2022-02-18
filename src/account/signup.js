import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "../account/signup.css";
import axios from "axios";
import Swal from "sweetalert2";

class Signup extends Component {
  state = {
    fname: "",
    lname: "",
    email: "",
    password: "",
    phoneNumber: "",
    userType: "",
    errors: null,
  };

  RegisterUser = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  selectHandler = (e) => {
    this.setState({
      userType: e.target.value,
    });
  };

  btnRegister = (e) => {
    e.preventDefault();

    if (
      !this.state.fname ||
      !this.state.lname ||
      !this.state.email ||
      !this.state.password ||
      !this.state.phoneNumber ||
      !this.state.userType
    ) {
      this.setState({
        errors: "Please Insert Every Data to register successfully.",
      });
      //   this.setState({
      //     fname: "",
      //     lname: "",
      //     email: "",
      //     password: "",
      //     phoneNumber: "",
      //   });
      setTimeout(() => {
        this.setState({
          errors: "",
        });
      }, 2000);
    } else {
      const data = {
        fname: this.state.fname,
        lname: this.state.lname,
        email: this.state.email,
        password: this.state.password,
        phoneNumber: this.state.phoneNumber,
        userType: this.state.userType,
      };
      console.log(data);

      axios
        .post("http://localhost:90/user/register", data)
        .then((res) => {
          Swal.fire({
            title: "Custom animation with Animate.css",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
          window.location.href = "/signin";

          alert("Register sucessfull");
        })
        .catch((err) => {
          console.log(err);
          alert("not register");
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
            <div className="text-uppercase tm-new-release">
              <NavLink to="/" className="tm-text-white">
                Home
              </NavLink>
            </div>
            {/* <div className="text-uppercase tm-new-release">New Release</div> */}
            <div className="form-group tm-search-box"></div>
          </form>
        </div>
        <section className="signup">
          <div className="container-account">
            <div className="signup-content">
              <div className="signup-form">
                <h2 className="form-title ">Sign up</h2>
                {this.state.errors && (
                  <span
                    style={{
                      padding: "2px",
                      paddingBottom: "10px",
                      color: "red",
                    }}
                  >
                    {this.state.errors}
                  </span>
                )}
                <form
                  method="POST"
                  className="register-form"
                  id="register-form"
                >
                  <div className="form-group">
                    <label for="fname" className="label">
                      <i className="fas fa-user-circle material-icons-name"></i>
                    </label>
                    <input
                      type="text"
                      name="fname"
                      id="fname"
                      value={this.state.fname}
                      onChange={this.RegisterUser}
                      placeholder="First Name"
                    />
                  </div>

                  <div className="form-group">
                    <label for="lname" className="label">
                      <i className="fas fa-user-circle"></i>
                    </label>
                    <input
                      type="text"
                      name="lname"
                      id="lname"
                      value={this.state.lname}
                      onChange={this.RegisterUser}
                      placeholder="Last name"
                    />
                  </div>

                  <div className="form-group">
                    <label for="email" className="label">
                      <i className="fas fa-envelope"></i>
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={this.state.email}
                      onChange={this.RegisterUser}
                      placeholder="Your Email Address"
                    />
                  </div>

                  <div className="form-group">
                    <label for="password" className="label">
                      <i className="fas fa-unlock-alt"></i>
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={this.state.password}
                      onChange={this.RegisterUser}
                      placeholder="Password"
                    />
                  </div>

                  <div className="form-group">
                    <label for="phoneNumber" className="label">
                      <i className="fas fa-phone"></i>
                    </label>
                    <input
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      value={this.state.phoneNumber}
                      onChange={this.RegisterUser}
                      placeholder="Enter your number"
                    />
                  </div>

                  <div className="form-group">
                    <label for="userType" className="label">
                      <i className="fas fa-phone"></i>
                    </label>
                    <select
                      className="form-group"
                      name="userType"
                      id="userType"
                      required="required"
                      value={this.state.userType}
                      onChange={this.selectHandler}
                    >
                      <option>UserType</option>
                      <option value="Customer">Customer</option>
                      {/* <option>Doctor</option> */}
                      <option value="Admin">Admin</option>
                    </select>
                  </div>

                  <div className="form-group ">
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
                      I agree all statements in
                      <a href="#" className="term-service text-primary">
                        Terms of service
                      </a>
                    </label>
                  </div>

                  <div className="form-group">
                    Already Registered?
                    <NavLink
                      to="/signin"
                      className="form-group text-primary ps-1"
                    >
                      Sign-in
                    </NavLink>
                  </div>

                  <div className="">
                    <input
                      type="submit"
                      name="signup"
                      id="signup"
                      className="form-submit"
                      onClick={this.btnRegister}
                    />
                  </div>
                </form>
              </div>
              <div className="signup-image">
                <figure>
                  <img src="/img/signin.jpg" alt="Image Error" />
                </figure>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Signup;
