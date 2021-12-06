import React from "react";
import leftskull from './flameskull_left.png';
import rightskull from './flameskull_right.png';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {username: "", password: ""}
    }
    
    handleSubmit(e) {
        if (this.state.username === "Kurgulak" && this.state.password === "Sephy4Eva") {
            this.props.login();
        }
    }

	render() {
		return (
            <div className="login-container">
                <img src={leftskull} alt="leftskull" className="leftskull"/>
                <div className="login-wrapper">
                    <h1>Prove that you know the secrets...</h1>
                    <p>Master's name</p>
                    <input type="text" placeholder="Name" onChange={(e) => this.setState({username: e.target.value})}/>
                    <p>Master's passphrase</p>
                    <input type="password" placeholder="Passphrase" onChange={(e) => this.setState({password: e.target.value})}/>
                    <button className="loginButton" onClick={this.handleSubmit}>Enter!</button>
                </div>
                <img src={rightskull} alt="rightkull" className="rightkull"/>
            </div>
		);
	}
}