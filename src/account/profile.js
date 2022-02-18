import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Profile() {
  const [errors, setErrors] = useState(null);
  const [profile, setProfile] = useState();
  const [fname, setFname] = useState();
  const [lname, setLname] = useState();
  const [phoneNumber, setPhoneNumber] = useState();
  const _id = localStorage.getItem("D_id");

  const config = {
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  useEffect(() => {
    axios
      .get("http://localhost:90/user/" + _id, config)
      .then((res) => {
        console.log(res.data.data);
        setFname(res.data.data.fname);
        setProfile(res.data.data.profile);
        setLname(res.data.data.lname);
        setPhoneNumber(res.data.data.phoneNumber);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const filehandler = (e) => {
    setProfile(e.target.files[0]);
  };

  const updateImageHandler = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();

      data.append("profile", profile);
      await axios
        .put("http://localhost:90/user/update-profile/", data, config)
        .then((res) => {
          console.log(res);
          Swal.fire({
            title: "Profile picture Updated",
            text: "Profile picture Updated Successfully",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
          }).then((res) => {
            if (res.isConfirmed) {
              Swal.fire("Profile Inserted Successfully", "Go to the dashboard");
            }
            window.location.href = "/profile";
          });
        })
        .catch((e) => {
          alert("Unauthorized");
          window.location.href = "/profile";
        });
    } catch (error) {
      console.log(error.response);
    }
  };

  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      await axios
        .put(
          "http://localhost:90/user/update/",
          { fname, lname, phoneNumber },
          config
        )
        .then((res) => {
          console.log(res);
          Swal.fire({
            title: "Profile",
            text: "Profile Updated Successfully",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
          }).then((res) => {
            if (res.isConfirmed) {
              Swal.fire("Profile Inserted Successfully", "Go to the dashboard");
            }
            window.location.href = "/profile";
          });
        })
        .catch((e) => {
          alert("Unauthorized");
          window.location.href = "/profile";
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
                <h2 className="form-title ">Profile Details</h2>
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
                            src={profile}
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
                              <i className="fas fa-upload "></i> Upload
                            </span>
                            <input
                              type="submit"
                              className="upload"
                              onClick={updateImageHandler}
                            ></input>
                          </div>
                        </div>
                        <small className="form-text text-muted">
                          Allowed JPG, GIF or PNG. Max size of 2MB
                        </small>
                      </div>
                    </div>
                  </div>
                  <div className="form-group">
                    <label for="fname" className="label">
                      <i className="fas fa-user-circle material-icons-name"></i>
                    </label>
                    <input
                      type="text"
                      name="fname"
                      id="fname"
                      value={fname}
                      onChange={(e) => {
                        setFname(e.target.value);
                      }}
                      placeholder="First Name"
                    />
                  </div>

                  <div className="form-group">
                    <label for="lname" className="label">
                      <i className="fas fa-user-circle material-icons-name"></i>
                    </label>
                    <input
                      type="text"
                      name="lname"
                      id="lname"
                      value={lname}
                      onChange={(e) => {
                        setLname(e.target.value);
                      }}
                      placeholder="Last name"
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
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value);
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
                      onClick={updateHandler}
                      className="form-submit"
                      //   onClick={this.btnRegister}
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
    </div>
  );
}
