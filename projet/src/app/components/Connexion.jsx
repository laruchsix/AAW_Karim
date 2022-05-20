import React,{useState} from "react"

const Connexion = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const validate = (e) => {
        e.preventDefault();
        fetch('/api/person/connexion', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
            });
    };

    return (
        <div>
            <h1>
                Connexion
            </h1>
            <form onSubmit={(e) => validate(e)}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Entrez votre email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <label htmlFor="password">Mot de passe</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button>
                    Connexion
                </button>
            </form>
        </div>
    )
}

export default Connexion;
