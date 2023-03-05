import { onAuthStateChanged } from "firebase/auth";
import {createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const UserContext = createContext()


const UserProvider = ({children}) => {

    const [user, setUser] = useState(false);

    useEffect(()=>{
        console.log('useEffect')
          const unsuscribe =  onAuthStateChanged(auth, (user)=>{
                setUser(user)
            })
            return unsuscribe
    },[])

    if(user === false) return <p>Loading App...</p>


    return(
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;

export const useUserContext  = () => useContext(UserContext)