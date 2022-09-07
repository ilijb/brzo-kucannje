import { useState } from "react";
import AppStore from "../../../stores/AppStore";
import { api } from "../../../api/api";
import { useNavigate } from "react-router-dom";


function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate();

    const doLogin = () => {
        api("post", "/api/auth/user/login", "user", { email, password })
        .then(res => {
            if (res.status !== "ok") {
                throw new Error("Could not log in. Reason: " + JSON.stringify(res.data));
            }

            return res.data;
        })
        .then(data => {
            AppStore.dispatch( { type: "auth.update", key: "authToken", value: data?.authToken } );
            AppStore.dispatch( { type: "auth.update", key: "refreshToken", value: data?.refreshToken } );
            AppStore.dispatch( { type: "auth.update", key: "identity", value: email } );
            AppStore.dispatch( { type: "auth.update", key: "id", value: +(data?.id) } );
            AppStore.dispatch( { type: "auth.update", key: "role", value: "user" } );
            navigate("/");

        }).catch(error => {
            alert("Username or password is not correct");
        });
    }

    return (
        <div className="row">
        <div className="form-group mt-3">
            <h1>Login</h1>
                <label>Username</label><br></br>
                <input type="username" value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                    /> <br></br>
                <label>Password</label><br></br>
                <input type="password" value={password} 
                onChange={(e) => setPassword(e.target.value)}/><br></br>
                <button className="btn btn-primary"
                onClick = { doLogin }
                >Login</button>
        </div>
        </div>
    );
}

export default Login;