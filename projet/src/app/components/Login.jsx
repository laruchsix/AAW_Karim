import React, {useState} from "react";

const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const validate = (e) => {
        e.preventDefault();
        const body = JSON.stringify({"title":name, "date" : date});
        fetch('api/event', {
            method: "POST",
            body: body,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then((response) => response.json())
            .then((events)=> {
            });
    }

    return (
        <form onSubmit={(e) => validate(e)}>
            <input type={"text"} value = {name} onChange={(e)=>setName(e.currentTarget.value)} />
            <input type={"password"} value = {password} onChange={(e)=>setPassword(e.currentTarget.value)} />
            <button>Login</button>
        </form>
    )


}

export default Login;


