import React,{useState} from "react"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import Events from "./Events"
import Persons from "./Persons"

const Navigation = (props) => {

    function Home() {
        return <h2>Home</h2>;
    }

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/persons">Persons</Link>
                        </li>
                        <li>
                            <Link to="/events">Events</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route path="/persons">
                        <Persons />
                    </Route>
                    <Route path="/events">
                        <Events />
                    </Route>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default Navigation;

