import {createContext, useEffect, useState} from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext = createContext({})

const UserContextProvider=({children})=>{
    const [user,setUser] = useState(null)
    const [token,setToken]=useState(null)

    useEffect(() => {
        if (token) {
            try {
                const decodedToken = jwtDecode(token)
                setUser({
                    name: decodedToken.name,
                    phone: decodedToken.phone,
                    email: decodedToken.email,
                    userImage: decodedToken.userImage,
                    id:decodedToken.id,
                    role:decodedToken.role
                })
            } catch (error) {
                console.error("Error decoding token:", error)
            }
        }
    }, [token])

    return (
        <UserContext.Provider value={{user,setUser,token,setToken}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
