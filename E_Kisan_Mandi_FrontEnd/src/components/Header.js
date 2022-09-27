import logo from "./logo.png";
import { Link } from "react-router-dom";
import Clock from 'react-live-clock';

function Header() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark navbar-bg">
                <div className="container-fluid">
                    <img src={logo} className="img-fluid logo_name" alt="Kisan Mandi" width="40px" height="40px" />
                    <Link className="logo_name" aria-current="page" to="/">E-Kisan Mandi</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ fontSize: '18px' }}>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>

                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/aboutus">AboutUs</Link>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    StakeHolders
                                </a>
                                <ul className="dropdown-menu">
                                    <li><Link className="dropdown-item" aria-current="page" to="/farmerfaq">Farmer</Link></li>

                                    <li><hr className="dropdown-divider" /></li>
                                    <li><Link className="dropdown-item" aria-current="page" to="/traderfaq">Trader</Link></li>
                                </ul>
                            </li>

                        </ul>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{ fontSize: '18px' }}>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/login">Login here</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/signup">Registration</Link>
                            </li>
                        </ul>
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                             <li className="nav-item">
                             <h5 style={{ color: 'white' }}> <Clock format={'DD MMMM YYYY,    HH:mm:ss'} ticking={true} /></h5>
                            </li>
                        </ul>




                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header;