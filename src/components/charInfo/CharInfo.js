import { Component } from "react";
// import Spinner from "../spinner/Spinner";
// import Error from "../error/Error";
// import MarvelService from "../../services/MarvelService";
import thor from "../../resources/img/thor.jpeg"
import "./charInfo.scss";

export default class CharList extends Component {
	render() {
		return (
			<div className="char__info">
				<div className="char__basics">
					<img src={thor} alt="Thor" />
					<div>
						<div className="char__info-name">Thor</div>
						<div className="char__btns">
							<a
								href="#"
								className="button button__main"
								target="_blank"
								rel="noreferrer"
							>
								<div className="inner">homepage</div>
							</a>
							<a
								href="#"
								className="button button__secondary"
								target="_blank"
								rel="noreferrer"
							>
								<div className="inner">wiki</div>
							</a>
						</div>
					</div>
				</div>
				<div className="char__descr">
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic fuga aperiam accusantium natus fugiat saepe perferendis, repellat aut nisi veritatis eos! Iusto porro repellat quas doloribus quod numquam beatae aliquid, corporis ut, quo quisquam! Laboriosam iste, voluptas quas natus cumque necessitatibus accusamus facilis rerum perferendis ut quos dolore amet eius?
				</div>
				<div className="char__comics">Comics:</div>
				<ul className="char__comics-list">
					<li className="char__comics-item">
						Lorem ipsum dolor, sit amet consectetur adipisicing elit.
					</li>
					<li className="char__comics-item">
						Lorem ipsum dolor sit.
					</li>
					<li className="char__comics-item">
						Lorem ipsum dolor sit, amet consectetur adipisicing.
					</li>
					<li className="char__comics-item">
						Lorem ipsum dolor, sit amet consectetur adipisicing elit.
					</li>
					<li className="char__comics-item">
						Lorem ipsum dolor sit.
					</li>
					<li className="char__comics-item">
						Lorem ipsum dolor sit, amet consectetur adipisicing.
					</li>
					<li className="char__comics-item">
						Lorem ipsum dolor sit.
					</li>
					<li className="char__comics-item">
						Lorem ipsum dolor sit, amet consectetur adipisicing.
					</li>
				</ul>
			</div>
		)
	}
}