import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Mupdate() {
  const [cover, setCover] = useState(null);
  const [mname, setMname] = useState();
  const [mdesc, setMdesc] = useState();
  const [releasedate, setReleaseDate] = useState();

  const mid = useParams();
  const movieId = mid.movId;

  const config = {
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  useEffect(() => {
    console.log(movieId);
    axios
      .get("http://localhost:90/movie/single/" + movieId, config)
      .then((res) => {
        console.log(res.data.data);
        setMname(res.data.data.mname);
        setMdesc(res.data.data.mdesc);
        setReleaseDate(res.data.data.releasedate);
        setCover(res.data.data.cover);
      });
  }, []);

  const filehandler = (e) => {
    setCover(e.target.files[0]);
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      await axios
        .put(
          "http://localhost:90/movies/update/" + movieId,
          { mname, mdesc, releasedate },
          config
        )
        .then((res) => {
          console.log(res);
          Swal.fire({
            title: "Movie",
            text: "Movie Updated Successfully",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
          }).then((res) => {
            if (res.isConfirmed) {
              Swal.fire(
                "Show Time Inserted Successfully",
                "Go to the dashboard"
              );
            }
            window.location.href = "/movielist";
          });
        })
        .catch((e) => {
          alert("Unauthorized");
          window.location.href = "/movielist";
        });
    } catch (error) {
      console.log(error.response);
    }
  };
  const updateImage = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();

      data.append("cover", cover);
      await axios
        .put("http://localhost:90/movies/upload-cover/" + movieId, data, config)
        .then((res) => {
          console.log(res);
          Swal.fire({
            title: "Picture Uploaded",
            text: "Movie Picture Uploaded Successfully",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
          }).then((res) => {
            if (res.isConfirmed) {
              Swal.fire("Picture Inserted Successfully", "Go to the dashboard");
            }
            window.location.href = "/movielist";
          });
        })
        .catch((e) => {
          alert("Unauthorized");
          window.location.href = "/movielist";
        });
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <div>
      {" "}
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
                <h2 className="form-title ">Movie Details</h2>
                {/* {this.state.errors && (
                              <span
                                  style={{
                                      padding: "2px",
                                      paddingBottom: "10px",
                                      color: "red",
                                  }}
                              >
                                  {this.state.errors}
                              </span>
                          )} */}
                <form
                  method="POST"
                  className="register-form"
                  id="register-form"
                >
                  <div className="col-12 col-md-12">
                    <div className="form-group">
                      <div className="change-avatar">
                        <div className="profile-img">
                          <img
                            src={cover}
                            width={100}
                            height={100}
                            alt="User Image"
                          />
                        </div>
                        <div className="upload-img">
                          <div className="change-photo-btn">
                            <span>
                              <i className="fas fa-upload"></i> Upload Photo
                            </span>
                            <input
                              type="file"
                              name="cover"
                              className="upload"
                              placeholder="cover"
                              onChange={filehandler}
                            ></input>
                          </div>
                        </div>
                        <div className="upload-img">
                          <div className="change-photo-btn mt-1">
                            <span>
                              <i className="fas fa-upload"></i> Upload
                            </span>
                            <input
                              type="submit"
                              className="upload"
                              onClick={updateImage}
                            ></input>
                          </div>
                          <small className="form-text text-muted">
                            Allowed JPG, GIF or PNG. Max size of 2MB
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="mname" className="label">
                      {/* <i className="fas fa-user-circle material-icons-name"></i> */}
                    </label>
                    <input
                      type="text"
                      name="mname"
                      id="mname"
                      value={mname}
                      onChange={(e) => {
                        setMname(e.target.value);
                      }}
                      placeholder="First Name"
                    />
                  </div>

                  <div className="form-group">
                    <label for="mdesc" className="label">
                      {/* <i className="fas fa-user-circle material-icons-name"></i> */}
                    </label>
                    <input
                      type="text"
                      name="mdesc"
                      id="mdesc"
                      value={mdesc}
                      onChange={(e) => {
                        setMdesc(e.target.value);
                      }}
                      placeholder="Last name"
                    />
                  </div>

                  <div className="form-group">
                    <label for="releasedate" className="label">
                      {/* <i className="fas fa-phone"></i> */}
                    </label>
                    <input
                      type="text"
                      name="releasedate"
                      id="releasedate"
                      value={releasedate}
                      onChange={(e) => {
                        setReleaseDate(e.target.value);
                      }}
                      placeholder="Enter your number"
                    />
                  </div>
                  <div className="">
                    <input
                      type="submit"
                      name="Update"
                      id="Update"
                      value="Update"
                      className="form-submit"
                      onClick={updateHandler}
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
    </div>
  );
}
