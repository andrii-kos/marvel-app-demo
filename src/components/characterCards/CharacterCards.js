import './CharacterCards.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { useState, useEffect, useRef, useMemo } from 'react';
import useMarvelService from '..//../services/MarvelService';
import setContent from '..//../utils/setContent'

// import LoadMoreBtn from '../loadMoreBtn/LoadMoreBtn';

const CharacterCards = (props) => {
    const [characters, setCharactersState] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(true)
    const [offset, setOffset] = useState(0)
    const {process, setProcess, getAllCharacters} = useMarvelService();
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
            .then(() => setProcess('loaded'))
    }

    const scrollDownload = () => {
        if (window.pageYOffset + document.documentElement.clientHeight > 
        document.documentElement.scrollHeight - 100 && process !== 'loading') {
            onLoadMore();
       } 
    }

    // show more character cards when sroll to the end of the page
    useEffect(() => {
        window.addEventListener('scroll', scrollDownload);
        return () => {
          window.removeEventListener('scroll', scrollDownload);
        }
      },) 

    useEffect(() => {
        onLoadMore();
    }, [])

    const onCardClick = (id,index) => {
        props.onCharSelected(id);
        liElem.current[index].focus();
    }

    const CharItem = (characters) => {
        const items = characters.map(({name, thumbnail, id},index) => {
            const isImageNotFound = thumbnail.indexOf('image_not_available') === -1
            const imageStyle = isImageNotFound  ? null : {objectFit: 'unset'};
            
            return (
                <CSSTransition key={id} timeout={300} classNames={"char__item"} >
                    <li className="char__item"
                        onClick={() => onCardClick(id, index)}
                        onKeyPress={() => onCardClick(id, index)}
                        ref={(elem) => liElem.current[index] = elem}
                        tabIndex={index + 7}>
                        <img src={thumbnail} 
                             alt="abyss" 
                             style={imageStyle}/>
                        <div className="char__name">{name}</div>
                    </li>
                </CSSTransition>
                
            )
        });

        return (
            <ul className="char__grid">
                <TransitionGroup  component={null}>
                    {items}
                </TransitionGroup>
            </ul>
            
            
        )
    } 
    
    const elements = useMemo(() => {
        return setContent((() => CharItem(characters)),undefined, process, newItemLoading)
    }, [process])

    return (
        <div className="char__list">
            {elements}
            {/* button to load more items */}
            {/* <LoadMoreBtn  isLoading={isLoading}  onLoadMore={onLoadMore}/> */}
        </div>
    )
}

export default CharacterCards;