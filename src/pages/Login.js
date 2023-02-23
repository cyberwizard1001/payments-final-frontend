import {Link} from "react-router-dom";
import "../styles/Login.css";
import React, {useState} from "react";
import axios from "axios";


const Login = () => {
    // React States
    const [errorMessages, setErrorMessages] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false);


    const errors = {
        uname: "invalid username",
        pass: "invalid password"
    };

    const handleSubmit = (event) => {
        //Prevent page reload
        event.preventDefault();

        var {uname, pass} = document.forms[0];

        axios
            .post("http://localhost:3001/api/admin/login", {username: uname.value, password: pass.value})
            .then((res) => {
                if (res.status === 200) {
                    setIsSubmitted(true);
                }
            })
            .catch(err => console.log(err));
    };

    // Generate JSX code for error message
    const renderErrorMessage = (name) =>
        name === errorMessages.name && (
            <div className="error">{errorMessages.message}</div>
        );

    // JSX code for login form
    const renderForm = (
        <div className="form">
                <form onSubmit={handleSubmit}>

                    <div className="input-container">
                        <label>Username </label>
                        <input type="text" name="uname" required/>
                        {renderErrorMessage("uname")}
                    </div>
                    <div className="input-container">
                        <label>Password </label>
                        <input type="password" name="pass" required/>
                        {renderErrorMessage("pass")}
                    </div>
                    <div className="button-container">
                        <input type="submit"/>
                    </div>

                </form>
        </div>

    );

    return (
        <div className="app">
            <div className="login-form">
                <div className="title">
                    <center>ADMIN SIGN IN</center>
                </div>
                {isSubmitted ? <center>
                    <div className="buttonToProceed"><Link to="/home">Proceed to home page</Link></div>
                </center> : renderForm}
            </div>
        </div>
    );
}

export default Login;