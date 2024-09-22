import React, { useEffect, useState } from "react";
import ReactFacebookLogin from "react-facebook-login";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { loginAPI, loginFacebookAPI } from "../utils/fetchFromAPI";

const Login = ({ setUserLogin }) => {
   const [channelDetail, setChannelDetail] = useState();
   const [videos, setVideos] = useState(null);
   const navigate = useNavigate();
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [userData, setUserData] = useState(null);

   const { id } = useParams();

   useEffect(() => {}, []);

   const handleLogin = () => {
      const email = document.querySelector(`#email`).value;
      const pass = document.querySelector(`#pass`).value;

      const payload = { email, pass };

      console.log({ payload });

      loginAPI(payload)
         .then((data) => {
            console.log(data);
            localStorage.setItem(`LOGIN_USER`, true);
            setUserLogin(true);
            toast.success(data.message);
            navigate(`/`);
         })
         .catch((error) => {
            console.log(error);
            const message = error.response.data.message;
            toast.success(message);
         });
   };

   const responseFacebook = (response) => {
      console.log(response);
      loginFacebookAPI(response)
         .then((data) => {
            console.log(data);
            localStorage.setItem(`LOGIN_USER`, true);
            setUserLogin(true);
            toast.success(data.message);
            navigate(`/`);
         })
         .catch((error) => {
            console.log(error);
            const message = error.response.data.message;
            toast.success(message);
         });
   };

   return (
      <div className="p-5 " style={{ minHeight: "100vh" }}>
         <div className=" d-flex justify-content-center">
            <form className="row g-3 text-white">
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
                  <button onClick={handleLogin} type="button" className="btn btn-primary">
                     Login
                  </button>
               </div>

               <ReactFacebookLogin
                  appId="515310684555647"
                  // autoLoad={true}
                  fields="name,email,picture"
                  // onClick={componentClicked}
                  callback={responseFacebook}
               />
            </form>
         </div>
      </div>
   );
};

export default Login;
