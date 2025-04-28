import { Component } from "react";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error";
import MarvelService from "../../services/MarvelServices";
import Skeleton from "../skeleton/Skeleton"

import "./charInfo.scss";

import thor from "../../resources/img/thor.jpeg"

export default class CharList extends Component {
	state = {
		char: null,
		loading: false,
		error: false
	}

	marvelServices = new MarvelService()

	componentDidMount() {
		this.updateChar()
	}

	componentDidUpdate(preveProps, preveState) {
		if (this.props.charId !== preveProps.charId) {
			this.updateChar()
		}
	}

	updateChar = () => {
		const { charId } = this.props

		if (!charId) return

		this.onCharLoading()

		this.marvelServices.
			getCharacter(charId)
			.then(this.onCharLoaded)
			.catch(this.onError)
	}

	onCharLoaded = (char) => {
		this.setState({ char, loading: false });
	}

	onError = () => {
		this.setState({ error: true, loading: false });
	}

	onCharLoading = () => {
		this.setState({
			loading: true
		})
	}

	// componentDidCatch(error, info){
	// 	console.log(error, info)
	// 	this.setState({
	// 		error:true
	// 	})
	// }

	render() {
		const { char, loading, error } = this.state

		const isSkeleton = char || loading || error ? null : <Skeleton />
		const isError = error ? <Error /> : null
		const isLoading = loading ? <Spinner /> : null
		const isContent = !(loading || error || !char) ? <View char={char} /> : null
		return (
			<div className="char__info">
				{isSkeleton}
				{isError}
				{isLoading}
				{isContent}
			</div>
		)
	}
}

const View = ({ char }) => {
	const { name, descrition, thumbnail, homePage, wiki, comics } = char


	let imgStyle = { "objectFit": "cover" }
	if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
		imgStyle = { "objectFit": "contain" }
	}

	return (
		<>
			<div className="char__basics">
				<img src={thumbnail} alt={name} style={imgStyle} />
				<div>
					<div className="char__info-name">{name}</div>
					<div className="char__btns">
						<a
							href={homePage}
							className="button button__main"
							target="_blank"
							rel="noreferrer"
						>
							<div className="inner">homepage</div>
						</a>
						<a
							href={wiki}
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
				{descrition}
			</div>
			{
				comics.length > 0 ?
					<>
						<div className="char__comics">Comics:</div>
						<ul className="char__comics-list">
							{comics.map((comic, index) => {
								if(index > 9){
									return;
								}
								return (
									<li className="char__comics-item" key={index}>
										<a
											href={`${comic.resourceURI}?apikey=f886cb3db7c49504cc7206fb26ead8c0`}
											target="_blank"
											rel="noreferrer"
										>
											{comic.name}
										</a>
									</li>
								)
							})}
						</ul>
					</>
					:
					<p style={{marginTop: 16, fontWeight:"bold"}}>
						"There is no comics with this character"
					</p>
			}
		</>
	)
}