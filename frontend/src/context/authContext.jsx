import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";

// Create the auth context
export const AuthContext = createContext();

// Create the auth provider component
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check if user is already logged in on initial load
    useEffect(() => {
        const checkCurrentUser = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/auth/current-user", {
                    withCredentials: true // Important for sending cookies
                });
                
                if (response.data.success) {
                    setUser(response.data.user);
                }
            } catch (error) {
                console.error("Error checking current user:", error);
                // If error, user is not authenticated
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkCurrentUser();
    }, []);

    // Login function
    const login = async (username) => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                { username },
                { withCredentials: true } // Important for receiving cookies
            );
            
            if (response.data.success) {
                setUser(response.data.user);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Login error:", error);
            return false;
        }
    };

    // Logout function
    const logout = async () => {
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/logout",
                {},
                { withCredentials: true } // Important for sending cookies
            );
            
            if (response.data.success) {
                setUser(null);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Logout error:", error);
            return false;
        }
    };

    // Provide the auth context value
    const value = {
        user,
        loading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// PropTypes validation
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export default AuthProvider;