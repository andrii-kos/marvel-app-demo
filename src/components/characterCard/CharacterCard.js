import './CharacterCard.scss';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';



const CharacterCard = ({ charId, isSeparatePage }) => {
    const {characterId} = useParams();
    const [character, setCharacterState] = useState(null);
    const {process, setProcess, getCharacterById, clearError} = useMarvelService();

    const setCharacter = (character) => {
        setCharacterState(character)
    }

    const updateChart = (id) => {
        clearError()
        getCharacterById(id)
            .then(setCharacter)
            .then(() => setProcess('loaded'))
    }

    useEffect(() => {
        isSeparatePage 
            ? updateChart(characterId) 
            : updateChart(1011334)
    }, [])
  
    const prevProp = useRef(charId)

    useEffect(() => {
        if (prevProp.current !== charId) {
            updateChart(charId)
        }
    },[charId])


    return (
        <div className={isSeparatePage ? 'char__page' : 'char__info'}>
            {setContent((isSeparatePage ? CharViewPage : CharView), character, process)}
        </div>
    )
}
const CharViewPage = ({data}) => {
    const {name, description, thumbnail} = data;
    const isImageNotFound = thumbnail.indexOf('image_not_available') === -1;
    const imageStyle = isImageNotFound ? null : {objectFit: 'unset'};
    return (
        <>
            <div className="char__page__basics">
                <img src={thumbnail} 
                     alt={thumbnail} 
                     style={imageStyle}/>
            </div>
            <div className="char__page__info">
                <div className="char__page__info-name">{name}</div>
                <div className="char__page__info-descr">
                    {!description ? 'Sorry, Description not found': description}
                </div>
            </div>
            
        </>
    )
}

const CharView = ({data}) => {
    const {name, description, thumbnail, homePage, wiki, comics} = data;
    const isImageNotFound = thumbnail.indexOf('image_not_available') === -1;
    const imageStyle = isImageNotFound  ? null : {objectFit: 'unset'};
    const comicsArr = comics.map((item, index) => {
        const comicId = item.resourceURI.slice(item.resourceURI.lastIndexOf('/') + 1)
        if (index > 9) {
            return null
        } else {
            return (
                <li className="char__comics-item"
                    key={index}>
                    <Link to={`/comics/${comicId}`}>{item.name}</Link>
                </li>
            )
        }
    });
    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} 
                     alt={thumbnail} 
                     style={imageStyle}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homePage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {!description ? 'Sorry, Description not found' : description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsArr.length > 0 ? null : 'There are no comics to display :/'}
                {comicsArr}
            </ul>
        </>
    )
}

export default CharacterCard;