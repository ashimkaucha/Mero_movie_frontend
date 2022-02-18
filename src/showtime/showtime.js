import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function Showtime() {
  const [errors, setErrors] = useState(null);
  const [movieData, setMovieData] = useState();
  const [datetime, setDatetime] = useState();
  const [price, setPrice] = useState();
  const mid = useParams();
  const movieId = mid.movId;

  const config = {
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  useEffect(async () => {
    console.log(movieId.movieId);
    await axios
      .get("http://localhost:90/movie/single/" + movieId, config)
      .then((res) => {
        console.log(res.data.data);
        setMovieData(res.data.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const showTimeHandler = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:90/showtime/insert",
          { movieId, datetime, price },
          config
        )
        .then((res) => {
          console.log(res);
          Swal.fire({
            title: "Movie",
            text: "Movie Inserted Successfully",
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
            window.location.href = "/";
          });
        })
        .catch((err) => {
          console.log(err.response.data);
          window.location.href = "/";
        });
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <div className="tm-search-form-container">
        <form action="index.html" className="form-inline tm-search-form">
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
              <h2
                className="form-title "
                style={{ color: "black", fontWeight: "bold" }}
              >
                {movieData?.mname}
              </h2>
              <p style={{ color: "black", fontSize: "30px" }}>
                {movieData?.mdesc}
              </p>
              <h2 className="form-title ">Add Show Time</h2>
              {errors && (
                <span
                  style={{
                    padding: "2px",
                    paddingBottom: "10px",
                    color: "red",
                  }}
                >
                  {errors}
                </span>
              )}
              <form method="POST" className="register-form" id="register-form">
                <div className="form-group">
                  <label for="datetime" className="label">
                    <i className=""></i>
                  </label>
                  <input
                    type="text"
                    name="datetime"
                    id="datetime"
                    value={datetime}
                    onChange={(e) => {
                      setDatetime(e.target.value);
                    }}
                    placeholder="Date Time"
                  />
                </div>

                <div className="form-group">
                  <label for="price" className="label">
                    <i className=""></i>
                  </label>
                  <input
                    type="text"
                    name="price"
                    id="price"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                    }}
                    placeholder="Price"
                  />
                </div>

                <div>
                  <input
                    type="submit"
                    name="signup"
                    id="signup"
                    onClick={showTimeHandler}
                    className="form-submit"
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
    </>
  );
}

export default Showtime;
