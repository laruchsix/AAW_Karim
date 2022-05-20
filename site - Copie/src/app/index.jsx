import React from "react"
import ReactDOM from "react-dom"
import EventAdd from "./components/EventAdd"

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            events: [],
            loading: false,
            name:"Unknown name",
            date:""
        }
    }

    componentDidMount() {
        this.loadEvents()
    }

    loadEvents() {
        this.setState({loading: true});
        fetch("/api/event", {method : "GET"})
            .then((response) => response.json())
            .then((events)=> {
                this.setState({loading: false, events: events});
            });
    }

    deleteEvent(id){
        this.setState({loading: true});
        fetch("/api/event/" + id, {method : "DELETE"})
            .then((response) => response.json())
            .then((events)=>{
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
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.events.map((event) => {
                            return <tr>
                                <td>{event.id}</td>
                                <td>{event.title}</td>
                                <td>{event.date}</td>
                                <td>
                                    <button onClick = {() => this.deleteEvent(event.id)}>x</button>
                                </td>
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