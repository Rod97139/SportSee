import "./Header.scss"
import {Link} from "react-router-dom";
import logo from "../../../assets/icons/logo.svg";

const Header = () => {
    return (

        <header className="header">
            <nav className="header-nav">
                <ul className="header-nav-wrapper">
                    <li>
                        <Link to={"/"} className="header-nav-logo">
                            <img className="header-nav-logo-svg" src={logo}></img>
                        </Link>
                    </li>
                    <li className="hamburger"
                    onClick={
                        () => {
                            const links = document.querySelector('.header-nav-links');
                            links.classList.toggle('responsive');
                        }
                    }
                    ></li>
                    <ul className="header-nav-links">
                        <li className="header-nav-link">
                            <Link to={"/"} >
                                Accueil
                            </Link>
                        </li>
                        <li className="header-nav-link">
                            Profil
                        </li>
                        <li className="header-nav-link">
                            Réglages
                        </li>
                        <li className="header-nav-link">
                            Communauté
                        </li>
                    </ul>
                </ul>
            </nav>
        </header>
    );

}

export default Header;