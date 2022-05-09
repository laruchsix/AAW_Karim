import React from "react"
import ReactDOM from "react-dom"

const elem = <h1>hello you</h1>

function Welcome(props){
    return <h1>Bonjour, {props.name}</h1>
}

class WelcomeClass extends React.Component{
    constructor(props) {
        super(props);
        this.state = {date:new Date()}
    }

    render() {
        return <h1>Bonjour, {this.props.name}, il est {this.state.date.toLocaleTimeString()}</h1>
    }
}

function App(props){
    return (
        <div>
            <WelcomeClass name="Bibo" />
            <WelcomeClass name="Mousse"/>
            <WelcomeClass name="Jo"/>
        </div>
    )
}

Class

ReactDOM.render(
    <App/>,
    document.getElementById("root")
);