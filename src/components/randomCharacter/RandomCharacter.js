import './RandomCharacter.scss';
import mjolnirIMG from '..//../resources/mjolnir.png';
import { CSSTransition } from 'react-transition-group';
import { useState, useEffect } from 'react';
import useMarvelService from '..//../services/MarvelService';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const RandomCharacter = ({onCharSelected}) => {
    const [character, setCharacterState] = useState(null);
    const {process, getCharacterById, clearError} = useMarvelService()

    const setCharacter = (character) => {
        setCharacterState(character);
        
    }
    useEffect(() => {
        clearError()
        updateChart();
    }, [])

    const updateChart = () => {
        clearError()
        const id = Math.floor(Math.random() * (1011400 - 1011000)) + 1011000;
        getCharacterById(id)
            .then(setCharacter)
    
    }
    const errorMessage = process === 'error' ? <ErrorMessage/> : null;
    const spinner = process === 'loading' ? <Spinner/> : null;
    const content = !(process === 'loading' || process === 'error' || !character) ? 
        <RandomCharacterView 
            onCharSelected={onCharSelected}  
            character={character} 
        /> : null;

    return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                <CSSTransition in={process !== 'loading'} timeout={100} classNames={'randomchar__block'}>
                   <>{content}</>
                </CSSTransition>
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button 
                    className="button button__main"
                    onClick={() => updateChart()}
                    tabIndex={6}>
                    <div className="inner">
                        try it
                    </div>
                </button>
                <img src={mjolnirIMG} alt="mjolnir" className="randomchar__decoration" />
            </div>
        </div>
        
    )
}

export default RandomCharacter;

const RandomCharacterView = ({character, isError, onCharSelected}) => {
    const {name, description, thumbnail, homePage, wiki, id} = character;
    const descriptionToDisplay = (description) => {
        if (!description) {
            return 'Sorry, Description not found'
        }
        if (description.length >= 100) {
            return description.slice(100) + '...'
        }
        return description
    };
    const isImageNotFound = thumbnail.indexOf('image_not_available') === -1
    const imageStyle = isImageNotFound  ? null : {objectFit: 'unset'};
    return (
        
            <div onClick={() => onCharSelected(id)} className="randomchar__block">
                <img src={thumbnail} 
                    alt="Random character" 
                    className="randomchar__img" 
                    style={imageStyle}
                />
                <div className="randomchar__info">
                    <p className="randomchar__name">{isError ? 'No Character' : name}</p>
                    <p className="randomchar__descr">
                        {descriptionToDisplay(description)}
                    </p>
                    <div className="randomchar__btns">
                        <a href={homePage} tabIndex={4} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} tabIndex={5} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>       
            </div> 
        
    )
}
