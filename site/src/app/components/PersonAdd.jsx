import React,{useState} from "react"

const PersonAdd = (props)=>{
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const validate = (e) => {
        e.preventDefault();
        const body = JSON.stringify({"firstName":firstName, "lastName" : lastName});
        fetch('api/person', {
            method: "POST",
            body: body,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
            .then((response) => response.json())
            .then((persons)=> {
                props.onAdd();
            });
    }

    return (
        <form onSubmit={(e) => validate(e)}>
            <input type={"text"} value = {firstName} onChange={(e)=>setFirstName(e.currentTarget.value)} />
            <input type={"text"} value = {lastName} onChange={(e)=>setLastName(e.currentTarget.value)} />
            <button>Valider</button>
        </form>
    );
}

export default PersonAdd;