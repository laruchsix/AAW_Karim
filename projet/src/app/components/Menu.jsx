import React, {useState} from "react";
import {useHistory} from "react-router-dom";

import {
    BrowserRouter,
    Switch,
    Route,
    Link, useHistory
} from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login";
import Register  from "./Register";

import "../style/Menu.css";
import Manage from "./admin/Manage";

const Menu = () => {

    const history = useHistory();
    const [token, setToken] = useState();

    const [titlePage, setTitlePage] = useState("Home");

    const updateToken = (value) => {
        setToken(value);
    }

    const userElems = () => {
        if (token === undefined) {
            return (
                <>
                    <Link to="/login" >Login</Link>
                    <Link to="/register">Register</Link>
                </>)
        }
        else {
           return (
               <>
                <h1 className={"user-name"}>{token.name}</h1>
                {(token.admin === true) ? <Link to="/admin">Admin</Link> : ""}
                <button onClick={logout}>Logout</button>

                <div className={"user-container"}>
                    <Link  to="/profile">
                        <img
                            className={"user-img"}
                            src="/basic_user_image.png"
                            alt="User Image"/>
                    </Link>
                </div>
            </>)
        }
    }

    const logout = () => {
        let options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        };

        fetch('/api/logout', options)
            .then(response => response.json())
            .then( async (data) => {
                await alert("your are disconnected (" + token.name + ")");
                setToken();
                history.push("/");
            });

    }

    return (
        <BrowserRouter>
            <header>
                <div className={"title-container"}>
                    <h1 className={"title"}>{titlePage}</h1>
                </div>
                <div className={"user-info"}>
                    {userElems()}
                </div>
            </header>
            <div className={"center"}>
                <aside>
                    <Link to="/">Home</Link>
                    {
                        (token && token.admin) ?
                            <Link to="/manage">Manage User</Link>
                            : <></>
                    }
                </aside>
                <div className={"page-content"}>
                    <Switch>
                        <Route path="/login">
                            <Login updateToken={updateToken} token={token}/>
                        </Route>
                        <Route path="/register">
                            <Register updateToken={updateToken} token={token}/>
                        </Route>
                        <Route path="/manage">
                            <Manage token={token} />
                        </Route>
                        <Route path="/">
                            <Home token={token} updateToken={updateToken}/>
                        </Route>

                    </Switch>
                </div>
            </div>
            <footer>
                <p>
                    By EUR and almost EUR company
                </p>
            </footer>
        </BrowserRouter>

    );


}

export default Menu;