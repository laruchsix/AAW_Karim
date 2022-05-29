import React, {useState} from "react";
import "../../style/manche.css"

const Manche = ({planning, manche, updateSelectedPlanning, token, updateSelectedManche}) => {
    const [handle, setHandle] = useState();
    const [users, setUsers] = useState();

    // verify if the planning is loaded
    if (planning === undefined || planning.id === undefined) {
        alert("No planning selected");
        return <div>No planning selected</div>;
    }

    // verify if the planning is loaded
    if (manche === undefined || manche.id === undefined) {
        alert("No manche selected");
        return <div>No manche selected</div>;
    }

    // load users in the manche
    if (handle === undefined) {
        setHandle({loading: true});

        fetch("/api/subscribe/" + manche.id + "/" + planning.id)
            .then((res) => res.json())
            .then((data) => {
                setHandle({
                    loading: false,
                    data: data
                })
            });
    }

    // load users
    if (users === undefined) {
        setUsers({loading: true});
        fetch("/api/subscribe/users/" + manche.id + "/" + planning.id)
            .then((result) => result.json())
            .then((persons) => {
                setUsers({
                    loading: false,
                    data: persons
                })
            });
    }

    /**
     * add a user in a specific manche in a planning
     * @param idP: id of planning, idM: id of manche, idT: id of person
     */
    const addUserAct = (idM, idP, idT) => {
        fetch(`/api/userBis/subscribe/${idM}/${idP}/${idT}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then(setHandle())
            .then(setUsers());
    }

    /**
     * show button to join the event
     * @param idP: id of planning, idM: id of manche, idT: id of token
     */
    const joinButton = (idM, idP, idT) => {
        fetch(`/api/user/subscribe/${idM}/${idP}/${idT}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then(setHandle());
    }

    /**
     * function to delete a user from a specific manche in a planning
     * @param idP: id of planning, idM: id of manche, id: id of person
     */
    const deleteFromManche = (idP, idM, id) => {
        fetch(`/api/admin/subscribe/${idP}/${idM}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then(setHandle())
            .then(setUsers());
    }

    /**
     * function to display the users for the admins
     */
    const displayUsers = () => {
        if (users === undefined || users.loading === true || users.data === undefined) {
            return <div>Unable to found users to add...</div>;
        } else {
            return (
                <table>
                    <thead>
                    <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Add to activity</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        users.data.map((u) => {
                            return <tr key={u.id}>
                                <td>{u.first_name}</td>
                                <td>{u.last_name}</td>
                                <td>
                                    <img className={"plus-img"}
                                         src="plus.png"
                                         onClick={() => addUserAct(manche.id, planning.id, u.id)}
                                         alt="plus user"/>
                                </td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            )
        }
    }

    if (handle === undefined || handle.loading === true) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className={"subscribe-container"}>
                <div className={"subscribe-titles"}><h1>{planning.name}==>&emsp;</h1> <h1 className={"titles-hover"} onClick={() => updateSelectedManche()}>{manche.name}</h1></div>
                <div className={"subscribe-table"}>
                    <table>
                        <thead>
                        <tr>
                            <th>First name</th>
                            <th>Last name</th>
                            {
                                (token && token.admin) ? <th>Remove</th> : null
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            handle.data.map((s) => {
                                return <tr key={s.person_id}>
                                    <td>{s.first_name}</td>
                                    <td>{s.last_name}</td>
                                    {
                                        (token && token.admin) ? <td>
                                            <img className={"bin-img"}
                                                 onClick={() => deleteFromManche(s.planning_id, s.manche_id, s.person_id)}
                                                 src="bin.png"
                                                 alt="remove user"/>
                                        </td> : null
                                    }
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>
                {
                    (token) ? <div className={"subscribe-join"}> <button className={"basic-button"} onClick={() => joinButton(manche.id, planning.id, token.id)}>JOIN</button></div> : null
                }

                {
                    (token && token.admin) ?
                        <div className={"subscribe-add-users-admin"}>
                            <h1>Select users to add</h1>
                            {displayUsers()}
                        </div>
                        : null
                }

            </div>

        )
    }

}

export default Manche;