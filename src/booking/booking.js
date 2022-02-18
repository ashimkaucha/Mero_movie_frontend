import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function Booking() {
  const [errors, setErrors] = useState(null);
  const [movieData, setMovieData] = useState();
  const [seat, setSeat] = useState();
  const [showTimeData, setShowTimeData] = useState({});
  const movId = useParams();
  const movieId = movId.movId;

  const config = {
    headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  useEffect(async () => {
    await axios
      .get("http://localhost:90/movieShowtime/" + movieId, config)
      .then((res) => {
        setMovieData(res.data.data);
        setShowTimeData(res.data.showTime);
        // console.log(movieData);
        // console.log(showTimeData);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  const bookHandler = async (e) => {
    e.preventDefault();

    try {
      const showtimeId = showTimeData[0]?._id;
      console.log(showtimeId, seat, config);
      await axios
        .post(
          `http://localhost:90/showtime/book/${showtimeId}/${seat}`,
          {},
          config
        )
        .then((res) => {
          console.log(res);
          Swal.fire({
            title: "Booked",
            text: "Ticket Booked Successfully",
            icon: "success",
            showCancelButton: false,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "OK",
          }).then((res) => {
            if (res.isConfirmed) {
              Swal.fire("Ticket Booked Successfully", "Go to the dashboard");
            }
            window.location.href = "/";
          });
        });
      //   setSuccess(res.data);
    } catch (error) {
      console.log(error.response.data);
      window.location.href = "/";
    }
  };

  return (
    <div>
      <div className="tm-search-form-container">
        <form className="form-inline tm-search-form">
          <div className="text-uppercase tm-new-release">
            <NavLink to="/" className="tm-text-white">
              Home
            </NavLink>
          </div>
          {/* <div className="text-uppercase tm-new-release">New Release</div> */}
          <div className="form-group tm-search-box"></div>
        </form>
      </div>
      <div className="row tm-mb-big tm-subscribe-row">
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 tm-bg-gray tm-subscribe-form">
          <h3 className="tm-text-pink tm-mb-30">{movieData?.mname}</h3>
          <p className="tm-mb-30">{movieData?.mdesc}</p>
          <p className="tm-mb-30">{movieData?.releasedate}</p>
          <p className="tm-mb-30">{movieData?.mcategories}</p>
          <p className="tm-mb-30">{showTimeData[0]?.price}</p>
          <p className="tm-mb-30">{showTimeData[0]?.datetime}</p>

          <label for="seat" className="label">
            <i className=""></i>
          </label>
          <input
            type="text"
            name="seat"
            id="seat"
            value={seat}
            onChange={(e) => {
              setSeat(e.target.value);
            }}
            placeholder="Seat"
          />

          <div className="form-group mb-0 mt-2">
            <input
              type="submit"
              value="Submit"
              onClick={bookHandler}
              className="tm-bg-pink tm-text-white d-block ml-auto tm-subscribe-btn"
            />
          </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 img-fluid pl-0 tm-subscribe-img"></div>
      </div>
    </div>
  );
}
