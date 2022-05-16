import React from "react"

class Welcome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        }
    }

    render() {
        return <h1>Bonjour, {this.props.name}, il est {this.state.date.toLocaleString()}!</h1>;
    }
}

export default Welcome;