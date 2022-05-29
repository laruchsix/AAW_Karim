import React, {useState} from "react";
import {useHistory} from "react-router-dom";

const Manage = ({token}) => {
    const history = useHistory();

    if (!token) {
        history.push("/");
    } else if (!token.admin) {
        return (<h1>Your are not an admin !</h1>)
    }

    const [persons, setPersons] = useState();

    // load the table
    const loadTable = () => {
        fetch("/api/admin/person/")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setPersons({
                    loading: false,
                    data: data
                })
            });
    }

    // the function to disconnect all
    const disconnectAll = () => {
        let options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }

        fetch("/api/admin/token/all", options)
            .catch((err) => console.log(err))
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                loadTable()
            });
    }

    const disconnectAdmins = () => {
        let options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }

        fetch("/api/admin/token/admins", options)
            .catch((err) => console.log(err))
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                loadTable()
            });
    }

    const disconnectBasicUsers = () => {
        let options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        }

        fetch("/api/admin/token/users", options)
            .catch((err) => console.log(err))
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                loadTable()
            });
    }

    // load
    if (!persons) {
        setPersons({loading: true});

        loadTable();
    }


    if (!persons || persons.loading) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className={"persons-container"}>
                <h1>Manage</h1>
                <div className={"manager-buttons-container"}>
                    <button onClick={disconnectAll}>Disconnect All</button>
                    <button onClick={disconnectAdmins}>Disconnect admins</button>
                    <button onClick={disconnectBasicUsers}>Disconnect Basic Users</button>
                </div>
                <div className={"persons-table"}>
                    <table>
                        <thead>
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Email</th>
                            <th>Admin</th>
                            <th>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            persons.data.map((h) => {
                                return (<tr key={h.id}>
                                    <td>{h.first_name}</td>
                                    <td>{h.last_name}</td>
                                    <td>{h.email}</td>
                                    <td>{h.admin ? "true" : "false"}</td>
                                    {h.connections
                                        ? <td><p style={{color : "#43a900"}}> connected</p></td>
                                        : <td><p style={{color : "#ff0000"}}> disconnected </p></td>}
                                </tr>)
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
};

export default Manage;