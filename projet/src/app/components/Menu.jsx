import React, {useState} from "react";
import Connexion from "./Connexion";
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login";

import "../style/Menu.css";

const Menu = () => {

    const [token, setToken] = useState();

    const [titlePage, setTitlePage] = useState("Home");

    const updateToken = (value) => {
        setToken(value);
    }

    const userElems = () => {
        if (token === undefined) {
            return (
                /*<>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>
                </>*/
                <>
                    <button onClick={Mylogin}>Login</button>
                </>)
        }
        else {
           return (
               <>
                <h1 className={"user-name"}>{token.name}</h1>
                {(token.admin === true) ? <Link to="/admin">Admin</Link> : ""}
                <Link to="/logout">Logout</Link>
                <button onClick={Mylogout}>MyLogout</button>

                <div className={"user-container"}>
                    <Link to="/profile">
                        <img
                            className={"user-img"}
                            src="/basic_user_image.png"
                            alt="User Image"/>
                    </Link>
                </div>
            </>)
        }
    }


    const Mylogin = () => {
        setToken({
            name: "John Doe",
            admin: false
        });
    }
    const Mylogout = () => {
        setToken()
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
                            (token !== undefined) ?
                                <Link to="/subscribe">Plan Sub</Link>
                                : <></>
                        }
                </aside>
                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
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