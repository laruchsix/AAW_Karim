import React from "react"
import ReactDOM from "react-dom"
import Menu from "./components/Menu"
import Welcome from "./components/Welcome"

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="app-container">
                <Menu />
            </div>
        );
    }

}

ReactDOM.render(<App/>, document.getElementById("root"));
