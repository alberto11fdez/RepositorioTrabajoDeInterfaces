import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createSession, dropSession, getSession } from '../utils/db';

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
    const [user, setUser] = useState(null);
    
    useEffect(() => {
        getSession().then(session => {
            if(session){
                setUser(session.user);
            }
        })
    }, [])
 
    function isUserLogged(){
        const user  = useUser()
        return  user !== null;
    }

    function logout(){

        dropSession().then(deleted => {
        })
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
