import './errorMessage.scss'
import image from './404.svg'

const ErrorMessage = () => {
    return (
        <div className="error-container">
           <img src={image} alt="" />
        </div>
    )
}

export default ErrorMessage