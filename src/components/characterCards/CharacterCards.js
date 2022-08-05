import './CharacterCards.scss';

import PropTypes from 'prop-types';

import { useState, useEffect, useRef } from 'react';
import useMarvelService from '..//../services/MarvelService';
// import LoadMoreBtn from '../loadMoreBtn/LoadMoreBtn';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';


const CharacterCards = (props) => {
    const [characters, setCharactersState] = useState([]);
    const [offset, setOffset] = useState(0)

    const { isLoading, isError, getAllCharacters } = useMarvelService();

    const liElem = useRef([])
  
    const setInitialChar = () => {
        setOffset((offset) => offset + 9);
    }
    const setCharacters = (data) => {
        setCharactersState(characters => characters.concat(data))
        
    }

    const onLoadMore = () => {
        setInitialChar()
        getAllCharacters('9', offset)
            .then(setCharacters)
        
    }

    const showModalByScroll = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= 
        document.documentElement.scrollHeight - 100) {
            onLoadMore();
       } 
    }


    // show more character cards when sroll to the end of the page
    useEffect(() => {
        window.addEventListener('scroll', showModalByScroll);
        return () => {
          window.removeEventListener('scroll', showModalByScroll);
        }
      },) 

    useEffect(() => {
        onLoadMore();
    }, [])

    


    const onCardClick = (id,index) => {
        props.onCharSelected(id);
        liElem.current[index].focus();
    }

    const charItem = characters.map(({name, thumbnail, id},index) => {
        const isImageNotFound = thumbnail.indexOf('image_not_available') === -1
        const imageStyle = isImageNotFound  ? null : {objectFit: 'unset'};
        return (
            <li className="char__item"
                key={id}
                onClick={() => onCardClick(id, index)}
                onKeyPress={() => onCardClick(id, index)}
                ref={(elem) => liElem.current[index] = elem}
                tabIndex={index + 7}>
                <img src={thumbnail} 
                        alt="abyss" 
                        style={imageStyle}/>
                <div className="char__name">{name}</div>
            </li>
        )
    });

    const error = isError ? <ErrorMessage /> : null;
    const loading = isLoading ? <Spinner /> : null;
    const content = charItem;

    return (
        <div className="char__list">
            <ul className="char__grid">
                { content }
            </ul>
            { error }
            { loading }
            {/* button to load more items */}
            {/* <LoadMoreBtn  isLoading={isLoading}  onLoadMore={onLoadMore}/> */}
        </div>
    )
}



CharacterCards.propTypes = {
    onCharSelected: PropTypes.func.isRequired,
}

export default CharacterCards;