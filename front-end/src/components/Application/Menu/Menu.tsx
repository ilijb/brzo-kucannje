import { BrowserRouter, Link } from "react-router-dom"

export default function Menu() {
    return (
        <BrowserRouter>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to='/'>Home</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="navbar-nav">
                        <Link className="nav-item nav-link" to='/login'>Login</Link>
                        <Link className="nav-item nav-link" to='/app'>Brzo Kucanje!</Link>
                    </div>
                </div>
            </nav>
        </BrowserRouter>

    );
}