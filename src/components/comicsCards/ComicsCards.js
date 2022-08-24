import './ComicsCards.scss';
import { Link } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import useMarvelService from '../../services/MarvelService';
import setContent from '..//../utils/setContent';
import { useState, useEffect, useMemo } from 'react';
/* import LoadMoreBtn from '../loadMoreBtn/LoadMoreBtn'; */

const ComicsCards = () => {
    const [comics, setComicsState] = useState([]);
    const [offset, setOffsetState] = useState(0);
    const [newItemLoading, setNewItemLoading] = useState(true);
    const {process, setProcess, getAllComics, clearError} = useMarvelService();

    const getComics = () => {
        clearError();
        getAllComics(offset)
            .then(setComics)
            .then(() => setProcess('loaded'));
        setOffsetState(offset => offset + 8);
    }
    useEffect(() => {
        getComics();
    }, [])

    const onLoadMore = () => {
        getComics();
    }

    const setComics = (data) => {
        setComicsState(comics => comics.concat(data));
    }

    const showModalByScroll = () => {
        if (window.pageYOffset + document.documentElement.clientHeight >= 
        document.documentElement.scrollHeight - 100 && process !== 'loading') {
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

    const ComicsList = (comics) => {
        const items = comics.map(({thumbnail, title ,price, id}, index) => {
            const isImageNotFound = thumbnail.indexOf('image_not_available') === -1
            const imageStyle = isImageNotFound  ? null : {objectFit: 'unset'};
            return (
                <CSSTransition key={index} timeout={300} classNames="comics__item">
                    <li key={index} className="comics__item">
                        <Link to={`${id}`}>
                            <img 
                                src={thumbnail} 
                                alt={title} 
                                className="comics__item-img" 
                                style={imageStyle}
                            />
                            <div className="comics__item-name">{title}</div>
                            <div className="comics__item-price">{price} $</div>
                        </Link>
                    </li>
                </CSSTransition>
            )
        })
        return (
            <ul className="comics__grid">
                <TransitionGroup component={null} >
                    { items }
                </TransitionGroup>
            </ul>
        )
    }

    const elements = useMemo(() => {
        return setContent((() => ComicsList(comics)),undefined,process , newItemLoading)
    }, [process])

    return (
        <div className="comics__list">
            {elements}
            {/* <LoadMoreBtn onLoadMore={onLoadMore} isLoading={isLoading} /> */}
        </div>
    )
}

export default ComicsCards;