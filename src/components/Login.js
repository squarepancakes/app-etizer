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
		const url = `http://localhost:4000/users/login`;
		axios
			.post(url, payload, { withCredentials: true })
			.then(res => {
				this.setState({
					isLoggedIn: true,
					username: res.data.username,
					id: res.data._id
				});
				this.props.setUserId(res.data._id);
			})
			.catch(err => {
				console.error(err);
				this.setState({ isLoggedIn: false });
			});
		return "/cookbook";
	};

	loginHandler = () => {
		this.login();
		return (
			<div>
				<p>Start cooking!</p>
			</div>
		);
	};

	render() {
		return (
			<div className={"loginPage"}>
				{this.state.isLoggedIn ? (
					<p>"Hello"</p>
				) : (
					<div className={"loginForm"}>
							<input className={"userInput"}
								placeholder="Username"
								name={"username"}
								onChange={event =>
									this.setState({ username: event.target.value })
								}
							></input>
							<input className={"userInput"}
								placeholder="Password"
								type="password"
								name={"password"}
								onChange={event =>
									this.setState({ password: event.target.value })
								}
							></input>
						<button onClick={this.loginHandler}>Login</button>
						<h3>
							Don't have an account? Sign up <a href="/signup" className={"userLink"}>here!</a>
						</h3>
					</div>
				)}
			</div>
		);
	}
}

export default Login;
