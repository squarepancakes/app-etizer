import React from "react";
import axios from "axios";

class Login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedin: false,
			username: "",
			password: "",
			id: ""
		};
	}

	loginHandler = () => {
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
	render() {
		return (
			<div className={"loginForm"}>
				{this.state.isLoggedIn ? (
					<p>"Hello"</p>
				) : (
					<div>
						<input
							placeholder="Username"
							name={"username"}
							onChange={event =>
								this.setState({ username: event.target.value })
							}
						></input>
						<input
							placeholder="Password"
							type="password"
							name={"password"}
							onChange={event =>
								this.setState({ password: event.target.value })
							}
						></input>
						<button onClick={this.loginHandler}>Login</button>
					</div>
				)}
			</div>
		);
	}
}

export default Login;
