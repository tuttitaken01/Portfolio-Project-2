import { createContext, useState } from "react";

export const UserContext = createContext()
export const UserProvider = ({ children }) => {
    const [ loggedUser, setLoggedUser] = useState({
        username: null,
        avatar_url: null,
    })

    return (
        <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
            { children }
        </UserContext.Provider>
    )
}