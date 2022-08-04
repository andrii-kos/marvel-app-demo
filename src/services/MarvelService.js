import {useHttp} from '../hooks/http.hook'

const useMarvelService = () => {
    const {request, isLoading, isError, clearError} = useHttp();
    const urlCharacters = 'https://gateway.marvel.com:443/v1/public/characters';
    const urlComics = 'https://gateway.marvel.com:443/v1/public/comics'
    const _apiKey = '7b3967d3ffa11a65742d713c3914517c';

    const getAllCharacters = async (limit = 9, offset) => {
        const characters = await request(`${urlCharacters}?limit=${limit}&offset=${offset}&apikey=${_apiKey}`);
        return characters.data.results.map(elem => _tranformResponseCharacter(elem));
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
        return responseData.data.results.map(elem => _transformResponseComics(elem));
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
            getAllComics, 
            getComicById, 
            isLoading, 
            isError, 
            clearError }
}

export default useMarvelService