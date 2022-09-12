import { NavLink } from "react-router-dom"
import AppStore from "../../../stores/AppStore";

export default function MenuUser() {

    const logout = () => {
        AppStore.dispatch( { type: "auth.update", key: "authToken", value: null } );
        AppStore.dispatch( { type: "auth.update", key: "refreshToken", value: null } );
        AppStore.dispatch( { type: "auth.update", key: "identity", value: null } );
        AppStore.dispatch( { type: "auth.update", key: "id", value: null } );
        AppStore.dispatch( { type: "auth.update", key: "role", value: "visitor" } );
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <NavLink className="navbar-brand" to='/'>Home</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <div className="navbar-nav">
                        <NavLink className="nav-item nav-link" to='/app'>Brzo Kucanje!</NavLink>
                    </div>
                    <div className="navbar-nav">
                        <NavLink className="nav-item nav-link" to='/stats'>Statistika po kategoriji</NavLink>
                    </div>
                    <div className="navbar-nav">
                        <button className="btn" onClick={logout}>Logout!</button>
                    </div>
                </div>
            </nav>
        </>

    );
}