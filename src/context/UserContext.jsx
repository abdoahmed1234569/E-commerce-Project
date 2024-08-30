/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


// eslint-disable-next-line react-refresh/only-export-components
export let userContext = createContext()

export default function UserContextProvider({children}) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isLogin, setLogin] = useState(null)
    const [token, setToken] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (token) {
            setLogin(token);
            const decoded = jwtDecode(token)
            console.log(decoded.id);
            setToken(decoded.id)
        }
    }, [])

    return <userContext.Provider value={{isLogin, setLogin, token}}>
        {children}
    </userContext.Provider>
}