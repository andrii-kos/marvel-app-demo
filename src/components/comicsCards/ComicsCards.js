import './ComicsCards.scss';
import { Link } from 'react-router-dom';
import LoadMoreBtn from '../loadMoreBtn/LoadMoreBtn';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react'
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const ComicsCards = () => {

    const [comics, setComicsState] = useState([])
    const [offset, setOffsetState] = useState(0)
    const {getAllComics, isError, isLoading} = useMarvelService()

    const getComics = () => {
        getAllComics(offset).then(setComics)
        setOffsetState(offset => offset + 8)
    }

    useEffect(() => {
        getComics()
    }, [])

    const onLoadMore = () => {
        getComics()
    }

    const setComics = (data) => {
        setComicsState(comics => comics.concat(data))
    }

    const comicsList = comics.map(({thumbnail, title ,price, id}, index) => {
        const isImageNotFound = thumbnail.indexOf('image_not_available') === -1
        const imageStyle = isImageNotFound  ? null : {objectFit: 'unset'};
        return (
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
        )
    })

    const error = isError ? <ErrorMessage /> : null;
    const loading = isLoading ? <Spinner /> : null;

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                { comicsList }
            </ul>
            { loading }
            { error }
            <LoadMoreBtn onLoadMore={onLoadMore} isLoading={isLoading} />
        </div>
    )
}

export default ComicsCards;