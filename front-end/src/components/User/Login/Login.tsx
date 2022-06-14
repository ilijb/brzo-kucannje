import { useState } from "react";


function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const doLogin = () => {
        console.log(email, password);
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