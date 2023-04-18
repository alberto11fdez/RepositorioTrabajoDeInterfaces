import React, { useContext, useState } from 'react'

const userContext = React.createContext();
const userHelpersContext = React.createContext();


export function useUser(){
    return useContext(userContext)
}

export function useAuthHelpers(){
    return useContext(userHelpersContext)
}


export default function AuthContext({children}) {

    /** @type {[import('../utils/db').User, React.Dispatch<import('../utils/db').User>]} */
    // const [user, setUser] = useState(null);
    const [user, setUser] = useState({
        id: 11,
        username: "Oasu"
    });

    function isUserLogged(){
        const user  = useUser()
        return  user !== null;
    }

    function logout(){
        setUser(null);
    }
    const helpers = {
        isUserLogged,
        setUser,
        logout,
    }

  return (
    <userContext.Provider value={user}>
        <userHelpersContext.Provider value={helpers}>
            {children}
        </userHelpersContext.Provider>
    </userContext.Provider>
  )
}
