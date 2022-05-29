import React, {useState} from "react";
import "../../style/PlanningTable.css"
import DateTimePicker from "react-datetime-picker";

const PlanningTable = ({updateSelectedPlanning, token, updateToken}) => {
    const [planning, setPlanning] = useState();
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    //load plannings
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
        if(name == ""){
            alert("Enter a name for your new planning !")
        }
        else {
            const body = JSON.stringify({"name": name, "date": date});
            fetch('api/admin/planning', {
                method: "POST",
                body: body,
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .catch(error => {
                    console.log(JSON.stringify(error));
                    return error;
                })
                .then((response) => {
                    if (response.status !== 200) {
                        if (response.status === 401)
                            updateToken();
                        else
                            setErrorMessage(response.statusText);
                    } else {
                        setPlanning();
                    }
                });
        }
    }

    /**
     * display a form to add an planning if the user is logged in
     * @returns {JSX.Element|null} the form to add a planning or null elem
     */
    const displayForm = () => {
        if (token && token.admin) {
            return (<>
                <h1>Add a planning</h1>
            <div className={"planning-add"}>
                <form onSubmit={(e) => addPlanning(e)}>
                    <p>Name</p>
                    <input type={"text"} value = {name} onChange={(e)=>setName(e.currentTarget.value)} />
                    <p>Date</p>
                    <DateTimePicker onChange={setDate} value={date}/>
                    {errorMessage !== "" ? <p className={"error-message"}>{errorMessage}</p> : null}
                    <button className={"basic-button"}>Add</button>
                </form>
            </div>
            </>)
        } else
            return null;
    }

    /**
     * delete a planning with his id
     */
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

    /**
     * get the date in appropriate form
     * @param string of date
     */
    const getDate = (s) => {
        var date = new Date(s);
        return date.toLocaleString("fr");
    }

    return (
        <div className={"planning-container"}>
            <div className={"planning-table"}>
                <h1>Plannings</h1>
                {
                (planning === undefined || planning.loading === true) ?
                    <p>Loading...</p>
                    : <div className={"planning-table"}>
                        <table>
                            <thead>
                            <tr className={"table-line"}>
                                <th>Name</th>
                                <th>Date</th>
                                <th>View</th>
                                {
                                    (token && token.admin) ? <th>Delete</th> : null
                                }
                            </tr>
                            </thead>
                            <tbody>
                            {
                                planning.data.map((p) => {
                                    return <tr key={p.id} className={"table-line"}>
                                        <td>{p.name}</td>
                                        <td>{getDate(p.date)}</td>
                                        <td>
                                            <div className={"center-content"}>
                                                <img className={"view-img"}
                                                          onClick={() => updateSelectedPlanning(p)}
                                                           src="eyes.png"
                                                           alt="view planning"/>
                                            </div>
                                        </td>
                                        {
                                            (token && token.admin) ?
                                                <td>
                                                    <div className={"center-content"}>
                                                        <img className={"bin-img"}
                                                              onClick={() => deletePlanning(p.id)}
                                                              src="bin.png"
                                                              alt="delete planning" />
                                                    </div>
                                                </td>
                                                : null
                                        }
                                    </tr>
                                })

                            }
                            </tbody>
                        </table>
                    </div>
                }
            </div>
            <div className={"planning-form"}>
                {displayForm()}
            </div>
        </div>
    )
}

export default PlanningTable;