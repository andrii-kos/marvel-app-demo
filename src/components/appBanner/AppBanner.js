import './AppBanner.scss';
import Avengers from '..//../resources/Avengers.svg'
import Avengers_logo from '..//../resources/Avengerslogo.svg'

const AppBanner = () => {
    return (
        <div className="app__banner">
            <img src={Avengers} alt="Avengers" />
            <div className="app__banner-text">
                New comics every week!<br />
                Stay tuned!
            </div>
            <img src={Avengers_logo} alt="Avengers logo" />
        </div>
    )
}

export default AppBanner;