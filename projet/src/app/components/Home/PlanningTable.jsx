import React, {useState} from "react";
import "../../style/planningTable.css"

const addPlanning = (e) => {
    e.preventDefault();
    const body = JSON.stringify({"name":name, "date" : date});
    fetch('api/planning', {
        method: "POST",
        body: body,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    })
        .then((response) => response.json())
        .then((events)=> {
            loadPlannings();
        });
}

const loadPlannings = () => {
    const [planning, setPlanning] = useState();
    if (planning === undefined) {
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
}

const PlanningTable = ({updateSelectedPlanning}) => {
    const [planning, setPlanning] = useState();
    const [name, setName] = useState("");
    const [date, setDate] = useState("");

    // TODO : the planning request
    if (planning === undefined) {
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

    return (
        <div className={"planning-container"}>
            <h1>Planning</h1>
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
                        </tr>
                        </thead>
                        <tbody>
                        {
                            planning.data.map((p) => {
                                return <tr key={p.id}>
                                    <td>{p.name}</td>
                                    <td>{p.date}</td>
                                    <td><button onClick={() => updateSelectedPlanning(p)}>View</button></td>
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>
            }
            <div className={"planning-add"}>
                <form onSubmit={(e) => addPlanning(e)}>
                    <input type={"text"} value = {name} onChange={(e)=>setName(e.currentTarget.value)} />
                    <input type={"text"} value = {date} onChange={(e)=>setDate(e.currentTarget.value)} />
                    <button>Ajouter</button>
                </form>
            </div>
        </div>
    )
}

export default PlanningTable;