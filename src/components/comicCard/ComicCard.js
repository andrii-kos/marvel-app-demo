import './ComicCard.scss';
import { useParams, useNavigate} from 'react-router-dom';
import { useState, useEffect} from 'react';
import useMarvelService from '../../services/MarvelService';

import Skeleton from '../skeleton/Skeleton';
import ErrorMessage from '../errorMessage/ErrorMessage';

    

const ComicCard = () => {

    const [comic, setComicState] = useState(null);
    const {isLoading, isError, getComicById, clearError} = useMarvelService()
    const {comicId} = useParams();

    const setComic = (comic) => {
        setComicState(comic)
    }

    const updateComic = (id) => {
        clearError()
        getComicById(id)
            .then(setComic)
    }

    useEffect(() => {
        updateComic(comicId)
    },[])

    const skeleton = isLoading ? <Skeleton /> : null;
    const errorMessage = isError ? <ErrorMessage /> : null;
    const content =  comic && !isLoading && !isError ? <ComicView comic={comic}/> : null;

    return (
        <>
            {content}
            {skeleton}
            {errorMessage}
        </>
        
    )
}

const ComicView = ({comic}) => {
    const {title, desription, pages, language, price, thumbnail} = comic
    const navigate = useNavigate();
    return (    
            <div className="single-comic">
                <img src={thumbnail} alt="x-men" className="single-comic__img" />
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{desription}</p>
                    <p className="single-comic__descr">Pages: {pages}</p>
                    <p className="single-comic__descr">Language: {language}</p>
                    <div className="single-comic__price">{price} $</div>
                </div>
                <button onClick={() => navigate(-1)} className="single-comic__back">Back to all</button>
            </div>
    )
}

export default ComicCard;