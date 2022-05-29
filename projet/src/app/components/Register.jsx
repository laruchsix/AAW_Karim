import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import "../style/Login.css";
import {useEffect} from "react";

const Register = ({updateToken, token, title, updateTitle}) => {
    useEffect(() => {
        if (title !== "Register"){
            updateTitle("Register");
        }
    }, [title])

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");

    const validate = (e) => {
        e.preventDefault();
        const body = JSON.stringify({"lastname":lastname, "firstname":firstname, "email": email, "password" : password});
        let options = {
            method: "POST",
            body: body,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        fetch('api/register', options)
            .then(response => response.json())
            .then((data) => {
                if (data.error) {
                    setErrorMessage(data.error);
                } else {
                    history.push("/login");
                } })
    }

    return (
        <div className={"middle panel"}>
            <h1 className={"title-signin"}>Register</h1>
            <form onSubmit={(e) => validate(e)}>
                <p>First Name :</p>
                <input type={"text"} value = {firstname} onChange={(e)=>setFirstname(e.currentTarget.value)} />
                <p>Last Name :</p>
                <input type={"text"} value = {lastname} onChange={(e)=>setLastname(e.currentTarget.value)} />
                <p>Email :</p>
                <input type={"email"} value = {email} onChange={(e)=>setEmail(e.currentTarget.value)} />
                <p>Password :</p>
                <input type={"password"} value = {password} onChange={(e)=>setPassword(e.currentTarget.value)} />
                <div><p className={"error-message"}>{errorMessage}</p></div>
                <div className={"center-content"}><button className={"basic-button"}>Register</button></div>
            </form>
        </div>
    )
}

export default Register;