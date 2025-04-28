import { Component } from "react";
import Error from "../error/Error";

export default class ErrorBaoundary extends Component {
	state = {
		error: false
	}
	componentDidCatch(error, errorInfo) {
		console.log(error)
		console.log(errorInfo)
		this.setState({
			error: true
		})
	}

	render() {
		if (this.state.error) {
			return (
				<div>
					<h2>Now we have some problems</h2>
					<p>please try again later</p>
					<Error />
				</div>
			)
		}

		return this.props.children
	}
}