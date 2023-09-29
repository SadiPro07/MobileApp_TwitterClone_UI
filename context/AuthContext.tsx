import { createContext, useState, PropsWithChildren, useContext } from "react";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }: PropsWithChildren) => {
    const [authToken, setAuthToken] = useState<string | null>(null)
    
    return (
        <AuthContext.Provider value={{ authToken, setAuthToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export default  AuthContextProvider


const useAuth = () => useContext(AuthContext)