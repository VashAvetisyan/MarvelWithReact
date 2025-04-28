import { Component } from "react";
import Spinner from "../spinner/Spinner";
import Error from "../error/Error"

import "./charList.scss";

import MarvelServices from "../../services/MarvelServices";

export default class ComicsList extends Component {
    state = {
        charList: [],
        loading: true,
        onRequestLoading: false,
        error: false,
        offset: 120, // max limit 1560
        charEnded: false
    }

    marvelService = new MarvelServices()

    componentDidMount() {
        this.onRequest()
    }

    componentDidUpdate() {

    }

    onRequest = (offset) => {
        this.onCharListLoading()
        this.marvelService.getAllCharacters(offset)
            .then(this.onCharListLoaded)
            .catch(this.onError)
    }

    onCharListLoading = () => {
        this.setState({
            onRequestLoading: true
        })
    }

    onCharListLoaded = (newCharList) => {
        let ended = false

        if (newCharList.length < 9) {
            ended = true
        }
        this.setState(({ charList, offset }) => {
            return (
                {
                    charList: [...charList, ...newCharList],
                    loading: false,
                    onRequestLoading: false,
                    offset: offset + 9,
                    charEnded: ended
                }
            )
        })
    }

    onError = () => {
        this.setState({
            error: true,
            loading: false
        })
    }

    


    getMore = () => {
        const data = this.marvelService.getAllCharacters(this.state.charList.length)
            .then()
            .catch()

        console.log(data.data)
    }

    refItems = []

    setRef = (ref) => {
        this.refItems.push(ref)
    } 

    focumOnItem = (id) => {
        this.refItems.forEach(item => item.classList.remove("char__item__selected"))
        this.refItems[id].classList.add("char__item__selected")
        this.refItems[id].focus()
    }

    renderItems(arr) {
        const items = arr.map((item, index) => {
            let imgStyle = { "objectFit": "cover" }
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = { "objectFit": "contain" }
            }

            return (
                <li
                    className="char__item"
                    tabIndex={0}
                    ref={this.setRef}
                    key={item.id}
                    onClick={() => {
                        this.props.onCharSelected(item.id)
                        this.focumOnItem(index)
                    }}
                >
                    <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                    <div className="char__name">{item.name}</div>
                </li>
            )
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }


    render() {
        const { charList, loading, error, onRequestLoading, offset, charEnded } = this.state
        const items = this.renderItems(charList)

        const isError = error ? <Error /> : null
        const isLoading = loading ? <Spinner /> : null
        const isContent = !(loading || error) ? items : null

        return (
            <div className="chat__list">
                {isError}
                {isLoading}
                {isContent}

                {charEnded ? null
                    :
                    <button
                        className="button button__main button__long"
                        disabled={onRequestLoading}
                        onClick={() => this.onRequest(offset)}
                    >
                        <div className="inner">
                            {onRequestLoading ? "Loading..." :  "load more"}
                        </div>
                    </button>}

            </div>
        );
    }
}