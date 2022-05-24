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
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.plannings.map((planning) => {
                            return <tr>
                                <td>{planning.id}</td>
                                <td>{planning.name}</td>
                                <td>{planning.date}</td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    }

}

ReactDOM.render(<App/>, document.getElementById("root"));
