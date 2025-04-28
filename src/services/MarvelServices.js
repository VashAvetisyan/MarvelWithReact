export default class MarvelServices {

	_API_URL = "https://gateway.marvel.com:443/v1/public";
	_API_KEY = "apikey=66481779fcf0f4e826a053aba237d554";
	_LIMIT = 9;
	_CHAR_OFFSET = 1;

	getRecource = async (url) => {
		let res = await fetch(url)

		if (!res.ok) {
			throw new Error(`Could not fetch:${res.status}`)
		}

		return await res.json()
	}

	getAllCharacters = async (offset = this._CHAR_OFFSET) => {
		const res = await this.getRecource(`${this._API_URL}/characters?limit=${this._LIMIT}&offset=${offset}&${this._API_KEY}`);
		return res.data.results.map(char => this._tranformCharacter(char))
	}

	getCharacter = async (id = 1010699) => {
		const res = await this.getRecource(`${this._API_URL}/characters/${id}?${this._API_KEY}`)
		return this._tranformCharacter(res.data.results[0])
	}

	_tranformCharacter = (char) => {
		return {
			id: char.id,
			name: char.name,
			descrition: char.descrition ? `${char.descrition.slice(0, 210)}...` : "There is no descrition for this this character",
			thumbnail: char.thumbnail.path + "." + char.thumbnail.extension,
			homePage: char.urls[0].url,
			wiki: char.urls[1].url,
			comics: char.comics.items
		}
	}
} 