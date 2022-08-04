import spinner from '..//../resources/bars.svg'
import './spinner.scss'
const Spinner = () => {
    return (
        <div className="spinner-container">
            <img src={spinner} alt='spinner'/>
        </div>
        
    )
}

export default Spinner