import React from "react"
import ReactDOM from "react-dom"
import Menu from "./components/Menu"
import "./style/index.css"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            plannings:[],
            id:"Unknown ID",
            name:"Unknown name",
            date:"Unknown date"
        }
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
