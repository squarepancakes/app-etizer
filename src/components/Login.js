import React from "react";
import axios from "axios";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false,
			username: "",
			password: "",
			id: ""
		};
	}

	login = () => {
		const username = this.state.username;
		const password = this.state.password;
		const payload = { username: username, password: password };
		const url = `${process.env.REACT_APP_URL}/users/login`;
		axios
			.post(url, payload, { withCredentials: true })
			.then(res => {
				this.setState({
					isLoggedIn: true,
					username: res.data.username,
					id: res.data._id
				});
				this.props.setUserId(res.data._id);
				this.props.setLoginStatus(this.state.isLoggedIn);
			})
			.catch(err => {
				console.error(err);
				this.setState({ isLoggedIn: false });
			});
	};

	render() {
		return (
			<div className={"loginPage"}>
				<div className={"loginForm"}>
					<input
						className={"userInput"}
						placeholder="Username"
						name={"username"}
						onChange={event => this.setState({ username: event.target.value })}
					></input>
					<input
						className={"userInput"}
						placeholder="Password"
						type="password"
						name={"password"}
						onChange={event => this.setState({ password: event.target.value })}
					></input>
					<button onClick={this.login}>Login</button>
					{this.state.isLoggedIn ? (
						<h3>Start cooking!</h3>
					) : (
						<h3>
							Don't have an account? Sign up{" "}
							<a href="/signup" className={"userLink"}>
								here!
							</a>
						</h3>
					)}
				</div>
			</div>
		);
	}
}

export default Login;
