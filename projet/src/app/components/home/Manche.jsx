import React, {useState} from "react";
import "../../style/manche.css"

const Manche = ({planning, manche, updateSelectedPlanning, token, updateSelectedManche}) => {
    const [handle, setHandle] = useState();

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

    // load
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

    /**
     * show button to join the event
     */
    const joinButton = (idM, idP, idT) => {
        if (token) {
            fetch(`/api/user/subscribe/${idM}/${idP}/${idT}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then(setHandle());
        } else
            return null;
    }

    const deleteFromManche = (idP, idM, id) => {
        fetch(`/api/admin/subscribe/${idP}/${idM}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then(setHandle());
    }

    if (handle === undefined || handle.loading === true) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className={"subscribe-container"}>
                <div className={"subscribe-titles"}><h1>{planning.name} :: &emsp; </h1> <h1 className={"subscribe-titles-manche"} onClick={() => updateSelectedManche()}>{manche.name}</h1></div>
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
                    (token) ? <div className={"subscribe-join"}> <button onClick={() => joinButton(manche.id, planning.id, token.id)}>JOIN</button></div> : null
                }

            </div>

        )
    }

}

export default Manche;