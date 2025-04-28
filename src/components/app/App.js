import { Component } from "react";

import decoration from "../../resources/img/vision.png";
import AppHeader from "../appHeader/appHeader";
import RandomChar from "../randomChar/RandomChar"
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
// import ComicsList from "../comicsList/ComicsList";
// import AppBanner from "../appBanner/AppBanner";
// import SingleComic from "../singleComic/SingleComic";

import ErrorBaoundary from "../errorBoundary/ErrorBaoundary";


export default class App extends Component {
	state = {
		selectedChar: null
	}

	onCharSelected = (id) => {
		console.log(id)
		this.setState({
			selectedChar: id
		})
	}
	render() {
		return (
			<div className="app">
				<AppHeader />
				<main>
					<ErrorBaoundary>
						<RandomChar />
					</ErrorBaoundary>
					<div className="char__content">
						<ErrorBaoundary>
							<CharList onCharSelected={this.onCharSelected} />
						</ErrorBaoundary>

						<ErrorBaoundary>
							<CharInfo charId={this.state.selectedChar} />
						</ErrorBaoundary>
					</div>
					<img src={decoration} alt="vision" className="bg-decoration" />
				</main>
			</div>
		)
	}
}