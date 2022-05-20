import React from "react"
import ReactDOM from "react-dom"
import Navigation from "./components/Navigation"

class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="container">
                <Navigation />
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("root"));