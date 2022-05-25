import React, {useState} from "react";
import {useHistory} from "react-router-dom";

const Login = ({updateToken, token}) => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();
    const [errorMessage, setErrorMessage] = useState("");

    const validate = (e) => {
        e.preventDefault();
        const body = JSON.stringify({"name":name, "password" : password});
        let options = {
            method: "POST",
            body: body,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        fetch('api/login', options)
            .then(response => response.json())
            .then((data) => {
                if (data.error) {
                    setErrorMessage(data.error);
                } else {
                    updateToken(data);
                    history.push("/");
                } })
    }

    return (
        <form onSubmit={(e) => validate(e)}>
            <p>Email :</p>
            <input type={"text"} value = {name} onChange={(e)=>setName(e.currentTarget.value)} />
            <p>Password :</p>
            <input type={"password"} value = {password} onChange={(e)=>setPassword(e.currentTarget.value)} />
            <div><p>{errorMessage}</p></div>
            <button>Login</button>
        </form>
    )
}

export default Login;


