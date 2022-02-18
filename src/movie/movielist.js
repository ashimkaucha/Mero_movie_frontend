import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

class Movielist extends Component {
  state = {
    Movie: [],
    con : {
        headers : {'authorization' : `Bearer ${localStorage.getItem('token')}`}
    }
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

  deleteMovie = (_id) => {
    console.log("Delete is Hit");
    window.location.reload(false);
    axios
      .delete("http://localhost:90/movies/delete/" + _id, this.state.con)
      .then((res) => {
        alert(res.data.data.message);
        window.location.href = "/movielist";
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  render() {
    return (
      <>
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
        <div>
          <h3 className="py-2">Movies List</h3>
          <hr class="solid" />
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Movie name</th>
                <th scope="col">Movie Description</th>

                <th scope="col">Release Date</th>
                <th scope="col">Categories</th>
                {/* <th scope="col">Address</th>
                <th scope="col">Age</th>
                <th scope="col">User Type</th>
                <th scope="col">Phone Number</th> */}

                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {this.state.Movie.map((movie) => {
                return (
                  <tr>
                    <td>{movie.mname}</td>
                    <td>{movie.mdesc}</td>
                    <td>{movie.releasedate}</td>
                    <td>{movie.mcategories}</td>
                    {/* <td>{user.address}</td>
                    <td>{user.age}</td>
                    <td>{user.userType}</td>
                    <td>{user.phone}</td> */}
                    <td>
                      <button className="btn btn-sm btn-success m-1">
                        <NavLink
                          to={"/showtime/" + movie._id}
                          className="text-white"
                        >
                          Add Showtime
                        </NavLink>
                      </button>
                      <button className="btn btn-sm btn-success m-1">
                        <NavLink
                          to={"/mupdate/" + movie._id}
                          className="text-white"
                        >
                          Update
                        </NavLink>
                      </button>
                      <button
                        className="btn btn-sm btn-danger m-1"
                        onClick={() => this.deleteMovie(movie._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
          
      </>
    );
  }
}

export default Movielist;
