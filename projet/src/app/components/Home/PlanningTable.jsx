import React, {useState} from "react";
import "../../style/planningTable.css"

const PlanningTable = ({updateSelectedPlanning, token}) => {
    const [planning, setPlanning] = useState();
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    if (!planning) {
        setPlanning({
            loading: true,
        })
        fetch("/api/planning")
            .then((res) => res.json())
            .then((data) => {
                setPlanning({
                    loading: false,
                    data: data
                });
            });
    }

    /**
     * function to submit the planning into the database
     * @param e the event
     */
    const addPlanning = (e) => {
        e.preventDefault();
        const body = JSON.stringify({"name":name, "date" : date});
        fetch('api/admin/planning', {
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
            .then(setPlanning());
    }

    /**
     * display a form to add an planning if the user is logged in
     * @returns {JSX.Element|null} the form to add a planning or null elem
     */
    const displayForm = () => {
        if (token && token.admin) {
            return (<div className={"planning-add"}>
                <form onSubmit={(e) => addPlanning(e)}>
                    <p>Name</p>
                    <input type={"text"} value = {name} onChange={(e)=>setName(e.currentTarget.value)} />
                    <p>Date</p>
                    <input type={"text"} value = {date} onChange={(e)=>setDate(e.currentTarget.value)} />
                    {errorMessage !== "" ? <p className={"error-message"}>{errorMessage}</p> : null}
                    <button>ADD</button>
                </form>
            </div>)
        } else
            return null;
    }

    const deletePlanning = (id) => {
        fetch(`/api/admin/planning/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then(setPlanning());
    }

    return (
        <div className={"planning-container"}>
            <h1>PlanningHMA</h1>
            {
            (planning === undefined || planning.loading === true) ?
                <p>Loading...</p>
                : <div className={"planning-table"}>
                    <table>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>date</th>
                            <th>view</th>
                            {
                                (token && token.admin) ? <th>delete</th> : null
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            planning.data.map((p) => {
                                return <tr key={p.id}>
                                    <td>{p.name}</td>
                                    <td>{p.date}</td>
                                    <td><button onClick={() => updateSelectedPlanning(p)}>View</button></td>
                                    {
                                        (token && token.admin) ? <td><button onClick={() => deletePlanning(p.id)}>Delete</button></td> : null
                                    }
                                </tr>
                            })

                        }
                        </tbody>
                    </table>
                </div>
            }
            {displayForm()}
        </div>
    )
}

export default PlanningTable;