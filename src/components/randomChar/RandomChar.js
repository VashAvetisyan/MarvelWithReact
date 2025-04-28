import { Component } from "react";
import MarvelService from "../../services/MarvelServices";
import Spinner from "../spinner/Spinner";
import "./randomChar.scss";

import mjolnir from "../../resources/img/mjolnir.png"
import Error from "../error/Error";

export default class RandomChar extends Component {
    constructor(props) {
        super(props);
    }
    state = {
        char: {},
        loading: true,
        error: false
    }

    marvelServices = new MarvelService()

    componentDidMount() {
        this.updateChar()
        //this.timerID = setInterval(this.updateChar, 3000)
    }

    componentWillUnmount() {
        //clearInterval(this.timerID)
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

    updateChar = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        console.log(id)
        this.onCharLoading()
        // this.setState({ loading: true })
        this.marvelServices
            .getCharacter(id)
            .then(char => { this.onCharLoaded(char) })
            .catch(this.onError)
    }
    render() {
        const { char, loading, error } = this.state

        const isError = error ? <Error /> : null
        const isLoading = loading ? <Spinner /> : null
        const isContent = !(loading || error) ? <View char={char} /> : null

        return (
            <div className="randomchar">
                {isError}
                {isLoading}
                {isContent}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button
                        className="button button__main"
                        onClick={this.updateChar}
                    >
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
                </div>
            </div>
        );
    }
}

const View = ({ char }) => {
    const { name, descrition, thumbnail, homePage, wiki } = char
    let imgStyle = { "objectFit": "cover" }
    if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = { "objectFit": "contain" }
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt={name} className="randomchar__img" style={imgStyle} />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {descrition}
                </p>
                <div className="randomchar__btns">
                    <a href={homePage} className="button button__main" target="_blank" rel="noreferrer">
                        <div className="inner">homePage</div>
                    </a>
                    <a href={wiki} className="button button__secondary" target="_blank" rel="noreferrer">
                        <div className="inner">wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}