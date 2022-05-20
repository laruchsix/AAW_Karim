import React from "react"
import PersonAdd from "./PersonAdd"

class Persons extends React.Component {

    constructor(props) {
        super(props);
        this.state= {
            persons: [],
            loading: false,
            firstName:"",
            lastName:"",
            event:""
        }
    }

    componentDidMount() {
        this.loadPersons()
    }

    loadPersons () {
        this.setState({loading: true});
        fetch("/api/person", {method : "GET"})
            .then((response) => response.json())
            .then((persons)=> {
                this.setState({loading: false, persons: persons});
            });
    }

    deletePerson (id) {
        this.setState({loading: true});
        fetch("/api/person/" + id, {method : "DELETE"})
            .then((response) => response.json())
            .then((persons)=>{
                this.setState({loading: false, persons: persons});
            });
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>FirstName</th>
                        <th>LastName</th>
                        <th>Event</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.persons.map((person) => {
                            return <tr key={person.id}>
                                <td>{person.id}</td>
                                <td>{person.firstName}</td>
                                <td>{person.lastName}</td>
                                <td>{person.event}</td>
                                <td>
                                    <button onClick={() => this.deletePerson(person.id)}>x</button>
                                </td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>

                <PersonAdd onAdd={() => this.loadPersons()}/>
            </div>
        )
    }
}

export default Persons;