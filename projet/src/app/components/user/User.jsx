import React, {useState} from "react";
import "../../style/User.css"

const User = ({token}) => {
    const [subs, setSubs] = useState();

    //load manches in plannings
    if (!subs && token) {
        setSubs({
            loading: true,
        })
        fetch("/api/user/manches/" + token.id)
            .then((res) => res.json())
            .then((data) => {
                setSubs({
                    loading: false,
                    data: data
                });
            });
    }

    /**
     * delete all subscription on a planning
     */
    const deleteSubscription = (id, id2, id3) => {
        fetch(`/api/user/${id}/${id2}/${id3}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then(setSubs());
    }

    /**
     * get the date in appropriate form
     * @param string of date
     */
    const getDate = (s) => {
        var date = new Date(s);
        return date.toLocaleString("fr");
    }

    if(subs === undefined || subs.loading === true || subs.data === undefined ){
        return (<div>Unable to found any subscription...</div>)
    }
    else{
        return (
            <div className={"user-container"}>
                <div className={"user-table"}>
                    <h1>Your subscriptions</h1>
                    {
                        <div className={"user-tables"}>
                                <table>
                                    <thead>
                                    <tr className={"table-line"}>
                                        <th>Planning Name</th>
                                        <th>Planning Date</th>
                                        <th>Manche Name</th>
                                        <th>Unsubscribe</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        subs.data.map((p) => {
                                            return <tr key={p.person_id}>
                                                <td>{p.name_p}</td>
                                                <td>{getDate(p.date)}</td>
                                                <td>{p.name_m}</td>
                                                <td>
                                                    <div className={"center-content"}>
                                                        <img className={"bin-img"}
                                                             onClick={() => deleteSubscription(p.manche_id, p.planning_id, token.id)}
                                                             src="bin.png"
                                                             alt="delete planning" />
                                                    </div>
                                                </td>
                                            </tr>
                                        })

                                    }
                                    </tbody>
                                </table>
                            </div>
                    }
                </div>
            </div>
        )
    }
}

export default User;