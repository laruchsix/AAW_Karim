import React, {useState} from "react";

const Planning = ({planning, updateSelectedPlanning}) => {
    const [handle, setHandle] = useState();

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
                            {
                                // TODO : add a subscribe button if connected
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {
                            handle.data.map((h) => {
                                return <tr key={h.id}>
                                    <td>{h.ordre}</td>
                                    <td>{h.name}</td>
                                    {
                                        // TODO : add a subscribe button if connected
                                    }
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

}

export default Planning;