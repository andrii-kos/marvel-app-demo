import './ComicCard.scss';
import { useParams, useNavigate} from 'react-router-dom';
import { useState, useEffect} from 'react';
import setContent from '..//../utils/setContent';
import useMarvelService from '../../services/MarvelService';

const ComicCard = () => {
    const [comic, setComicState] = useState(null);
    const {process, setProcess, getComicById, clearError} = useMarvelService();
    const {comicId} = useParams();

    const setComic = (comic) => {
        setComicState(comic);
    }

    const updateComic = (id) => {
        clearError();
        getComicById(id)
            .then(setComic)
            .then(() => setProcess('loaded'))
    }

    useEffect(() => {
        updateComic(comicId);
    },[])

    return (
        <>
            {setContent(ComicView, comic, process)}
        </>
        
    )
}

const ComicView = ({data}) => {
    const {title, desription, pages, language, price, thumbnail} = data;
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