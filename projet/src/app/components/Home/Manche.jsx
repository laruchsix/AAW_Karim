import React, {useState} from "react";
import "../../style/manche.css"

const Manche = ({planning, manche, updateSelectedPlanning, token, updateSelectedManche}) => {
    const [handle, setHandle] = useState();
    const [errorMessage, setErrorMessage] = useState("");

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

        fetch("/api/subscribe/")
            .then((res) => res.json())
            .then((data) => {
                setHandle({
                    loading: false,
                    data: data
                })
            });
    }

    if (handle === undefined || handle.loading === true) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className={"manche-container"}>
                <h1 onClick={() => updateSelectedPlanning()}>{planning.name}</h1>
                <h1 onClick={() => updateSelectedManche()}>{manche.name}</h1>
                <div className={"manche-table"}>
                    <table>
                        <thead>
                        <tr>
                            <th>Users first name</th>
                            <th>Users last name</th>
                            {
                                (token && token.admin) ? <th>delete</th> : null
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                           // TODO get users name and firstName
                        }
                        </tbody>
                    </table>
                </div>

            </div>

        )
    }

}

export default Manche;