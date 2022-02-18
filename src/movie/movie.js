import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

class Movie extends Component {
  state = {
    mname: "",
    mdesc: "",
    mcategories: "",
    releasedate: "",

    con: {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    },
  };

  AddMovie = (e) => {
    e.preventDefault();

    const data = {
      mname: this.state.mname,
      mdesc: this.state.mdesc,
      mcategories: this.state.mcategories,
      releasedate: this.state.releasedate,
    };

    axios
      .post("http://localhost:90/movies/insert", data, this.state.con)
      .then((result) => {
        console.log(result);
        Swal.fire({
          title: "Movie",
          text: "Movie Inserted Successfully",
          icon: "success",
          showCancelButton: false,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Movie Inserted Successfully", "Go to the dashboard");
          }
          window.location.href = "/";
        });
      })
      .catch((e) => {
        alert("Login first");
        window.location.href = "/";
      });
  };
  selectHandler = (e) => {
    this.setState({
      mcategories: e.target.value,
    });
  };

  textChangeHandler = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
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
                <h2 className="form-title ">Add Movie</h2>
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
                    <label for="mname" className="label">
                      <i className=""></i>
                    </label>
                    <input
                      type="text"
                      name="mname"
                      id="mname"
                      value={this.state.mname}
                      onChange={this.textChangeHandler}
                      placeholder="Movie Name"
                    />
                  </div>

                  <div className="form-group">
                    <label for="mdesc" className="label">
                      <i className=""></i>
                    </label>
                    <input
                      type="text"
                      name="mdesc"
                      id="mdesc"
                      value={this.state.mdesc}
                      onChange={this.textChangeHandler}
                      placeholder="Movie Description"
                    />
                  </div>

                  <div className="form-group">
                    <label for="releasedate" className="label">
                      <i className=""></i>
                    </label>
                    <input
                      type="date"
                      name="releasedate"
                      id="releasedate"
                      value={this.state.releasedate}
                      onChange={this.textChangeHandler}
                      placeholder="Enter Release Date"
                    />
                  </div>

                  <div className="form-group">Add catogories</div>

                  <div className="form-group">
                    <label for="mcategories" className="label">
                      <i className=""></i>
                    </label>
                    <select
                      className="form-group"
                      name="mcategories"
                      id="mcategories"
                      required="required"
                      value={this.state.mcategories}
                      onChange={this.selectHandler}
                    >
                      <option>Select Below</option>
                      <option value="Action">Action</option>
                      <option value="Horror">Horror</option>
                      <option value="Romance">Romance</option>
                      <option value="Adventure">Adventure</option>
                    </select>
                  </div>

                  <div className="">
                    <input
                      type="submit"
                      name="signup"
                      id="signup"
                      className="form-submit"
                      onClick={this.AddMovie}
                    />
                  </div>
                </form>
              </div>
              <div className="signup-image">
                <figure>
                  <img src="img/signin.jpg" alt="Image Error" />
                </figure>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Movie;
