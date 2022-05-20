import React from "react";
import Connexion from "./Connexion";
import {
    BrowserRouter,
    Switch,
    Route,
    Link
} from "react-router-dom";

const Menu = () => {

        return (
            <BrowserRouter>
                <div>
                    <ul>
                        <li>
                            <Link to="/Connexion">Connexion</Link>
                        </li>
                        <li>
                            <Link to="/">Inscription</Link>
                        </li>
                        <li>
                            <Link to="/">Accueil</Link>
                        </li>
                    </ul>
                    <ul>
                        <li>
                            <Link to="/">Planning</Link>
                        </li>
                        <li>
                            <Link to="/">Profil</Link>
                        </li>
                        <li>
                            <Link to="/">Deconnexion</Link>
                        </li>
                    </ul>

                    <Switch>
                        <Route path="/Connexion">
                            <Connexion />
                        </Route>
                        <Route path="/about">
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
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function About2() {
    return <h2>About2</h2>;
}

function Toto() {
    return <h2>Toto</h2>;
}

export default Menu;