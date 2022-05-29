import React, {useState} from "react";
import "../../style/planning.css"

const Planning = ({planning, updateSelectedPlanning, token, updateSelectedManche}) => {
    const [handle, setHandle] = useState();
    const [name, setName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // verify if the planning is loaded
    if (planning === undefined || planning.id === undefined) {
        alert("No planning selected");
        return <div>No planning selected</div>;
    }

    // load
    if (handle === undefined) {
        setHandle({loading: true});

        fetch("/api/manche/" + planning.id)
            .then((res) => res.json())
            .then((data) => {
               setHandle({
                    loading: false,
                    data: data
               })
            });
    }

    /**
     * function to submit the manche into the database
     * @param e the manche
     */
    const addManche = (e) => {
        e.preventDefault();
        const body = JSON.stringify({"name":name, "planning_id": planning.id});
        fetch('api/user/manche', {
            method: "POST",
            body: body,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .catch((err) => {
                console.log(err);
                setErrorMessage(err);
            })
            .then(setHandle());
    }

    /**
     * display a form to add a manche if the user is logged in
     * @returns {JSX.Element|null} the form to add a manche or null elem
     */
    const displayForm = () => {
        if (token) {
            return (
                <form className={"manche-add"} onSubmit={(e) => addManche(e)}>
                    <p>Name</p>
                    <input type={"text"} value = {name} onChange={(e)=>setName(e.currentTarget.value)} />
                    {errorMessage !== "" ? <p className={"error-message"}>{errorMessage}</p> : null}
                    <button>ADD</button>
                </form>
            )
        } else
            return null;
    }

    const deleteManche = (id, id2) => {
        fetch(`/api/admin/manche/${id}/${id2}`, {
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
            <div className={"handle-container"}>
                <h1 onClick={() => updateSelectedPlanning()}>{planning.name}</h1>
                <div className={"handle-table"}>
                    <table>
                        <thead>
                        <tr>
                            <th>Order</th>
                            <th>Name</th>
                            <th>View</th>
                            {
                                (token && token.admin) ? <th>delete</th> : null
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            handle.data.map((h) => {
                                return <tr key={h.id}>
                                    <td>{h.ordre}</td>
                                    <td>{h.name}</td>
                                    <td>
                                        <img className={"view-img"}
                                             onClick={() => updateSelectedManche(h)}
                                             src="eyes.png"
                                             alt="view manche"/>
                                    </td>
                                    {
                                        (token && token.admin) ? <td>
                                            <img className={"bin-img"}
                                                 onClick={() => deleteManche(h.id, h.planning_id)}
                                                 src="bin.png"
                                                 alt="delete manche"/>
                                        </td> : null
                                    }
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>

                {displayForm()}
            </div>

        )
    }

}

export default Planning;