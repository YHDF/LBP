import React from 'react';
import {
    Link
} from "react-router-dom";

export default function Navbar(props) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Acceuil</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/category">Catégories</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/provider">Fournisseurs</Link>
                        </li>
                    </ul>
                    <form className="d-flex" method="post" action="http://localhost:5000/auth/logout" style={{marginLeft : "72%"}}> 
                        <button className="btn btn-outline-dark" type="submit">Se déconnecter</button>
                    </form>
                </div>
            </div>
        </nav>

    )

}
