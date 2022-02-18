import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../home/home";
import Signin from "../account/signin";
import Signup from "../account/signup";
import Contact from "../contact/contact";
import Movie from "../movie/movie";
import Showtime from "../showtime/showtime";
import Movielist from "../movie/movielist";
import Booking from "../booking/booking";
import Profile from "../account/profile";
import Mupdate from "../movie/mupdate";

class Mid extends Component {
  render() {
    return (
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/movie" element={<Movie />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mupdate/:movId" element={<Mupdate />} />
          <Route path="/showtime/:movId" element={<Showtime />} />
          <Route path="/movielist" element={<Movielist />} />
          <Route path="/booking/:movId" element={<Booking />} />
        </Routes>
      </div>
    );
  }
}

export default Mid;
