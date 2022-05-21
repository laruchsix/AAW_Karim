import React, {useState} from "react";

const PlanningTable = ({updateSelectedPlanning}) => {
    const [planning, setPlanning] = useState();

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
        </div>
    )
}

export default PlanningTable;