import React, { createContext, useContext, useEffect, useState } from "react";
import { logoutUser, loadAuthToken, setAuthToken as setTokens } from "../constants/api";
import AsyncStorage from '@react-native-async-storage/async-storage';



const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isPersonalized, setIsPersonalized] = useState(false);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [authToken, setAuthToken] = useState({
        accessToken: "",
        refreshToken: "",
    });
    const [userProfile, setUserProfile] = useState({})

    const handleLogout = () => {


        logoutUser(() => {
            setAuthToken({
                accessToken: "",
                refreshToken: "",
            })
            setIsAuthenticated(false);
        })

    }

    const handleLogin = (data) => {

        setTokens(data.accessToken, data.refreshToken, ()=>{
            setIsAuthenticated(true);
            setAuthToken({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken
            })
        })
    }



    useEffect(() => {
        loadAuthToken((data) => {

            if(data?.accessToken){
                setAuthToken({
                    accessToken: data.accessToken,
                    refreshToken: data.refreshToken
                })
                setIsAuthenticated(true);
            }else{
                setIsAuthenticated(false);
            }
            
        })
    }, [])

    




    return (
        <AuthContext.Provider
            value={{
                isAuthenticated, 
                setIsAuthenticated,
                authToken,
                setAuthToken,
                SignOutUser:handleLogout,
                SignInUser:handleLogin, 
                userProfile,
                setUserProfile
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => {
    const context= useContext(AuthContext);
    if(!context) throw new Error("useAuth must be used within an AuthProvider");

    return context;
}