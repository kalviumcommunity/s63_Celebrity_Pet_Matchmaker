import { useState, useContext } from "react";
import { AuthContext } from "../context/authContext";

function Login() {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(username);
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
