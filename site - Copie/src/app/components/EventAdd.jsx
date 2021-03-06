import React,{useState} from "react"

const EventAdd = (props)=>{
    const [name, setName] = useState("");

    const validate = (e) => {
        e.preventDefault();
        const date = new Date();
        const body = JSON.stringify({"title":name, "date" : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()});
        fetch('api/event', {
            method: "POST",
            body: body,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        .then((response) => response.json())
        .then((events)=> {
            props.onAdd();
        });
    }

    return (
        <form onSubmit={(e) => validate(e)}>
            <input type={"text"} value = {name} onChange={(e)=>setName(e.currentTarget.value)} />
            <button>Valider</button>
        </form>
    );
}

export default EventAdd;