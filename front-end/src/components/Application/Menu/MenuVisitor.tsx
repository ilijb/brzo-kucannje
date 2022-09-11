import { NavLink } from "react-router-dom"

export default function MenuVisitor() {
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to='/'>Home</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="navbar-nav">
                        <NavLink className="nav-item nav-link" to='/login'>Login</NavLink>
                        <NavLink className="nav-item nav-link" to='/register'>Registracija</NavLink>
                    </div>
                </div>
            </nav>
        </>

    );
}