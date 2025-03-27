import { useContext } from "react";
import { AuthContext } from "../context/authContext";

function Navbar() {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav>
            {user ? (
                <>
                    <span>Welcome, {user}</span>
                    <button onClick={logout}>Logout</button>
                </>
            ) : (
                <a href="/login">Login</a>
            )}
        </nav>
    );
}

export default Navbar;
