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

    // load
    if (!persons) {
        setPersons({loading: true});

        fetch("/api/admin/person/")
            .then((res) => res.json())
            .then((data) => {
                setPersons({
                    loading: false,
                    data: data
                })
            });
    }


    if (!persons || persons.loading) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className={"persons-container"}>
                <h1>Manage</h1>
                <div className={"persons-table"}>
                    <table>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Email</th>
                            <th>Admin</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            persons.data.map((h) => {
                                return <tr key={h.id}>
                                    <td>{h.id}</td>
                                    <td>{h.first_name}</td>
                                    <td>{h.last_name}</td>
                                    <td>{h.email}</td>
                                    <td>{h.admin ? "true" : "false"}</td>
                                </tr>
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