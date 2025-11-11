import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { logoutUser, loadAuthToken, setAuthToken as setTokens } from "../constants/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SOCKET_URL } from "../constants/Paths";
import { get_formated_time } from "../screens/main_tab_screens/ScreensAPI";



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
    const [financialForecast, setFinancialForecast] = useState({})
    const [notifications, setNotifications] = useState([])
    const notificationRef = useRef(null);
    const [isNotificationSocketConnected, setIsNotificationSocketConnected] = useState(false);


    const initiateNotificationSocket = (token) => {
        if(!token)return;
        const wsURL = SOCKET_URL;
        notificationRef.current = new WebSocket(wsURL+`/?token=${token}`);

        notificationRef.current.onopen = () => {
        console.log("notification socket connected");
            setIsNotificationSocketConnected(true);
        }

        notificationRef.current.onmessage = (e) => {
        try{
            const data = JSON.parse(e.data);
            // const d = get_formated_time(item.createdAt)
            // const temp = {
            //                 id: data._id,
            //                 type: data.type,
            //                 icon: 'bell',
            //                 title: data.title,
            //                 description: data.message,
            //                 time: d.time + " - " + d.month + " " + d.year, 
            //                 section: new Date(data.createdAt).getDate() == new Date().getDate()?"Recent":"Old"
            //             }
                           
            // setNotifications(prev => [temp, ...prev])
            console.log("re^&", JSON.stringify(data, null, 2))
        }catch(e){
            console.error("Notificatio webSocket parse error", e);
        }
        }

        notificationRef.current.onclose = (e) =>{
            console.log("Notification socket disconnected");
            console.log("CLOSED", e.code, e.reason);
            setIsNotificationSocketConnected(false);
        }
    }

    const disconnectNotificationSocket = () => {
        notificationRef.current.close();
        notificationRef.current = null;
    }

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
                setUserProfile,
                financialForecast,
                setFinancialForecast,

                initiateNotificationSocket,
                isNotificationSocketConnected,
                disconnectNotificationSocket,
                notifications,
                setNotifications
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