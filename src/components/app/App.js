import { Component } from "react";

import decoration from "../../resources/img/vision.png";
import AppHeader from "../appHeader/appHeader";
import RandomChar from "../randomChar/RandomChar"
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import SingleComic from "../singleComic/SingleComic";


export default class App extends Component {
	render() {
		return (
			<div className="app">
				{/* <AppBanner /> */}
				<AppHeader />
				<main>
					<RandomChar />
					<div className="char__content">
						<CharList />
						<CharInfo />
					</div>
					<img src={decoration} alt="vision" className="bg-decoration" />
				</main>
				{/* <ComicsList /> */}
				<SingleComic />
			</div>
		)
	}
}