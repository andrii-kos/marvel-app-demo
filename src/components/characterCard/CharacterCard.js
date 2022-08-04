import './CharacterCard.scss';
import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import useMarvelService from '../../services/MarvelService';

import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';

const CharacterCard = ({ charId }) => {
    const [character, setCharacterState] = useState(null);
    const {isLoading, isError, getCharacterById, clearError} = useMarvelService()

    const setCharacter = (character) => {
        setCharacterState(character)
    }

    const updateChart = (id) => {
        clearError()
        getCharacterById(id)
            .then(setCharacter)
    }

    useEffect(() => {
        updateChart(1011334)
    }, [])
  
    const prevProp = useRef(charId)

    useEffect(() => {
        if (prevProp.current !== charId) {
            updateChart(charId)
        }
    },[charId])

    const skeleton = isLoading ? <Skeleton /> : null;
    const errorMessage = isError ? <ErrorMessage /> : null;
    const content =  character && !isLoading && !isError ? <CharBasis character={character}/> : null;

    return (
        <div className="char__info">
            { skeleton }
            { errorMessage }
            { content }
        </div>
    )
}

const CharBasis = ({character}) => {
    const {name, description, thumbnail, homePage, wiki, comics} = character;
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