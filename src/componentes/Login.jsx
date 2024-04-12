import React, { useEffect } from "react";
import { logo_icon, auth_bg } from "./baseDatos/baseDatos";
import { width } from "@fortawesome/free-regular-svg-icons/faAddressBook";
import { login } from "../firebaseConfig/firebase";
import { useContext } from 'react';
import { UserContext } from './context/UserContext';
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

export const Login = () => {

  const { user } = useContext(UserContext);

  const notify = (texto) => toast.error(texto);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user]);

  
  const onSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if(!email.trim() && !password.trim()){
      notify('El Correo y el password no deben estar vacios');
      return;
    }

    if(!email.trim()){
      notify('El correo no debe estar vacio');
      return;
    }
    if(!password.trim()){
      notify('El password no debe estar vacio');
      return;
    }
    try {
      const credentialUser = await login({ email, password });
      console.log(credentialUser);
    } catch (error) {
      console.log("error");
      notify('Correo o password invalidos');
    } 
} 


  return (
    <>
      <div
        className="auth-wrapper d-flex no-block justify-content-around align-item-center"
      >
      <Toaster />
      <div className="auth-box">
        <div id="loginform">
          <div className="logo">
            <span className="db">
              <img src={logo_icon} style={{width: '200px'}} alt="logo" />
            </span>
            <h5 classname="font-medium mb-3">Log In</h5>
          </div>
          <div className="row">
            <div className="col-12">
              <form onSubmit={onSubmit} className="form-horizontal mt-3">
                <div className="form-group">
                  <label>Correo electronico</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="prueba@mail.com"
                    name="email"
                  />
                </div>
                <div className="form-group">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleDropdownFormPassword2"
                    placeholder="Password"
                    name="password"
                  />
                </div>

                <button type="submit" className="btn btn-primary mt-2">
                  Log in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};
