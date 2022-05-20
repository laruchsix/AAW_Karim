import React, {useState} from "react";
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
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/login">login</Link>
                        </li>

                        <li>
                            <Link to="/about/2">About2</Link>
                        </li>
                        <li>
                            <Link to="/toto">Toto</Link>
                        </li>
                    </ul>

                    <Switch>
                        <Route path="/about/2">
                            <About2 />
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