import React, {useState} from "react";
import Connexion from "./Connexion";
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";
import "./Menu.css";

const Menu = () => {
a
    const [token, setToken] = useState();

    const updateToken = (value) => {
        setToken(value);
    }


    return (
        <BrowserRouter>
            <div>
                <nav className={"menu"}>
                    <Link to="/">Accueil</Link>
                    {
                        (token === undefined) ?
                            <>
                                <Link to="/Connexion">Connexion</Link>
                                <Link to="/">Inscription</Link>
                            </>
                            : <>
                                <h1>token.user</h1>
                            </>
                    }
                </nav>

                <Switch>
                    <Route path="/Connexion">
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
            </div>
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