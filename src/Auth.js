import React, {useState, createContext} from "react";

export const AuthContext = createContext();

export function AuthProvider(props){
    const [authState, setAuthState] = useState({
        userName: '',
        role: 0
    })
    return (
        <AuthContext.Provider value={[authState, setAuthState]}>
            {props.children}
        </AuthContext.Provider>
    )
}
