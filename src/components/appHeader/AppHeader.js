import './AppHeader.scss';
import {Link, NavLink} from 'react-router-dom';

const AppHeader = () => {
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link to='/' tabIndex={1} href="#">
                    <span>Marvel</span>
                    information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li>
                        <NavLink 
                            style={({isActive}) => isActive ? {'color': '#9f0013'} : undefined} 
                            to='/' tabIndex={2} 
                            href="#">
                            Characters
                        </NavLink>
                    </li>
                    /
                    <li>
                        <NavLink 
                            style={({isActive}) => isActive ? {'color': '#9f0013'} : undefined} 
                            to='/comics' 
                            tabIndex={3} 
                            href="#">
                            Comics
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;