import React from "react"
import ReactDOM from "react-dom"
import EventAdd from "./components/EventAdd"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            events: [],
            loading: false
        }
    }

    componentDidMount() {
        this.loadEvents()
    }

    loadEvents() {
        this.setState({loading: true});
        fetch("/api/event", {metod : "GET"})
            .then((response) => response.json())
            .then((events)=> {
                this.setState({loading: false, events: events});
            });
    }

    render() {
        return (
            <div className="container">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.events.map((event) => {
                            return <tr>
                                <td>{event.id}</td>
                                <td>{event.title}</td>
                                <td>{event.date}</td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>

                <EventAdd onAdd={() => this.loadEvents()}/>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById("root"));