import React, {useState} from "react";
import Connexion from "./Connexion";
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import "../style/Menu.css";

const Menu = () => {

    const [token, setToken] = useState({name : "user1", admin : false});

    const [titlePage, setTitlePage] = useState("Home");

    const updateToken = (value) => {
        setToken(value);
    }


    return (
        <BrowserRouter>
            <header>
                <nav className={"menu"}>
                    <Link to="/">Home</Link>
                    <Link to="/planning">Planning</Link>

                </nav>
                <div className={"title-container"}>
                    <h1 className={"title"}>{titlePage}</h1>
                </div>
                <div className={"user-info"}>
                    {
                        (token === undefined) ?
                            <>
                                <Link to="/login">Login</Link>
                                <Link to="/register">Register</Link>
                            </>
                            : <>
                                <h1 className={"user-name"}>{token.name}</h1>
                                {(token.admin === true) ? <Link to="/admin">Admin</Link> : ""}
                                <Link to="/logout">Logout</Link>
                                <div className={"user-container"}>
                                    <Link to="/profile">
                                        <img
                                            className={"user-img"}
                                            src="/basic_user_image.png"
                                            alt="User Image"/>
                                    </Link>
                                </div>
                            </>
                    }
                </div>
            </header>
                <Switch>
                    <Route path="/login">
                        <Connexion />
                    </Route>
                    <Route path="/login">
                        <About />
                    </Route>
                    <Route path="/toto">
                        <Toto />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
        </BrowserRouter>

    );


}

function Home() {
    const [cookie, setCookie] = useState({
        loading : true
    });

    fetch('/api/cookie')
        .then(response => response.json())
        .then(data =>  setCookie({
            date : data,
            loading : false
        }));
    
    if (cookie.loading) {
        return (<div>Loading...</div>);
    } else {
        return (<div>{cookie.date}</div>);
    }
}

function About() {
    const [identification, setIdentification] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    

    return <h2>About</h2>;
}

function About2() {
    return <h2>About2</h2>;
}

function Toto() {
    return <h2>Toto</h2>;
}

export default Menu;