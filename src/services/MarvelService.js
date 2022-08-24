import {useHttp} from '../hooks/http.hook'

const useMarvelService = () => {
    const {request, process, setProcess, clearError} = useHttp();
    const urlCharacters = 'https://gateway.marvel.com:443/v1/public/characters';
    const urlComics = 'https://gateway.marvel.com:443/v1/public/comics'
    const _apiKey = '7b3967d3ffa11a65742d713c3914517c';

    const getCharacterByName = async (name) => {
        const character = await request(`${urlCharacters}?name=${name}&apikey=${_apiKey}`);
        return character.data.results.map(_tranformResponseCharacter)
                
    }

    const getAllCharacters = async (limit = 9, offset) => {
        const characters = await request(`${urlCharacters}?limit=${limit}&offset=${offset}&apikey=${_apiKey}`);
        return characters.data.results.map(_tranformResponseCharacter);
    }

    const getCharacterById = async (id) => {
        const transformedData = await request(`${urlCharacters}/${id}?apikey=${_apiKey}`);
        return _tranformResponseCharacter(transformedData.data.results[0]);
    }

    const getComicById = async (id) => {
        const responseData = await request(`${urlComics}/${id}?apikey=${_apiKey}`);
        return _transformResponseComics(responseData.data.results[0]);
    }

    const getAllComics = async (offset, limit = 8) => {
        const responseData = await request(`${urlComics}?limit=${limit}&offset=${offset}&apikey=${_apiKey}`);
        return responseData.data.results.map(_transformResponseComics);
    }

    const _transformResponseComics = (res) => {
        return {
            id: res.id,
            title: res.title,
            desription: res.description,
            series: res.series,
            language: res.textObjects.length ? res.textObjects[0].language : null,
            thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
            urls: res.urls[0].url,
            price: res.prices[0].price,
            pages: res.pageCount,
            characters: res.characters
        }
    }

    const _tranformResponseCharacter = (res) => {
        return {
            id: res.id,
            name: res.name,
            desription: res.desription,
            thumbnail: res.thumbnail.path + '.' + res.thumbnail.extension,
            homePage: res.urls[0].url,
            wiki: res.urls[1].url,
            comics: res.comics.items
        }
    }
    return { getAllCharacters, 
            getCharacterById, 
            getCharacterByName,
            getAllComics,
            getComicById, 
            process, 
            setProcess,
            clearError }
}

export default useMarvelService