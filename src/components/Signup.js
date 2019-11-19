import React from "react";
import axios from "axios";

class Signup extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			passwordField1: "",
			passwordField2: "",
			userId: ""
		};
	}

	signup = () => {
		const username = this.state.username;
		const password = this.state.passwordField1;
		const passwordCheck = this.state.passwordField2;
		if (password !== passwordCheck) {
			throw new Error("Passwords are not identical! Please retype!");
		}
		const payload = { username: username, password: password };
		const url = `${process.env.REACT_APP_URL}/users/new`;
		console.log(url)
		axios
			.post(url, payload, { withCredentials: true })
			.then(res => {
				this.setState({
					userId: res.data._id
				});
			})
			.catch(err => {
				console.error(err);
			});
	};

	signupHandler = async () => {
		try {
			this.signup();
			return (
				<div>
					"Login to start cooking!"
					<a href="/login">Login here!</a>
				</div>
			);
		} catch (err) {
			console.error(err);
		}
	};

	render() {
		return (
			<div className={"signupForm"}>
				<h3>
					Create your own personal cookbook today and never lose a recipe again!
				</h3>
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
					onChange={event =>
						this.setState({ passwordField1: event.target.value })
					}
				></input>
				<input
					className={"userInput"}
					placeholder="Type password again"
					type="password"
					name={"password"}
					onChange={event =>
						this.setState({ passwordField2: event.target.value })
					}
				></input>
				<button onClick={this.signupHandler}>Signup!</button>
				<h3>
					Have an account? Login{" "}
					<a href="/login" className={"userLink"}>
						here!
					</a>
				</h3>
			</div>
		);
	}
}

export default Signup;
