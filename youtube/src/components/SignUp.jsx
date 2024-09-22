import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, CardMedia } from "@mui/material";

import { Videos, ChannelCard } from ".";
import { registerAPI } from "../utils/fetchFromAPI";
import { toast } from "react-toastify";

const SignUp = () => {
   const [channelDetail, setChannelDetail] = useState();
   const [videos, setVideos] = useState(null);
   const navigate = useNavigate()

   const { id } = useParams();

   useEffect(() => {}, []);

   const handleRegister = () => {
      const fullName = document.querySelector(`#fullName`).value;
      const email = document.querySelector(`#email`).value;
      const pass = document.querySelector(`#pass`).value;

      const payload = { fullName, email, pass };

      registerAPI(payload)
         .then((data) => {
            console.log(data);
            toast(data.message);
            navigate(`/login`)
         })
         .catch((error) => {
            const message = error.response.data.message;
            console.log(error.response.data.message);
            toast(message);
         });
   };

   return (
      <div className="p-5 " style={{ minHeight: "100vh" }}>
         <div className=" d-flex justify-content-center">
            <form className="row g-3 text-white">
               <div className="col-md-12">
                  <label htmlFor="inputEmail4" className="form-label">
                     Full name
                  </label>
                  <input className="form-control" id="fullName" />
               </div>
               <div className="col-md-12">
                  <label htmlFor="inputEmail4" className="form-label">
                     Email
                  </label>
                  <input type="email" className="form-control" id="email" />
               </div>

               <div className="col-md-12">
                  <label htmlFor="inputEmail4" className="form-label">
                     Password
                  </label>
                  <input className="form-control" id="pass" />
               </div>
               <div className="col-12">
                  <button onClick={handleRegister} type="button" className="btn btn-primary">
                     Sign Up
                  </button>
               </div>
            </form>
         </div>
      </div>
   );
};

export default SignUp;
