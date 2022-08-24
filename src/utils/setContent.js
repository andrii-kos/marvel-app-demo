import Skeleton from '../components/skeleton/Skeleton';
import Spinner from '../components/spinner/Spinner'
import ErrorMessage from '../components/errorMessage/ErrorMessage';

const setContent = (Component, data = null, state, newItemLoading = false) => {
    switch (state) {
        case 'waiting':
            return <Skeleton />
        case 'loading':
            return newItemLoading ? <><Component /><Spinner /></> : <Spinner />  
        case 'error':
            return <ErrorMessage />
        case 'loaded':
            return <Component data={data}/>
        default:
            return null
    }
}

export default setContent