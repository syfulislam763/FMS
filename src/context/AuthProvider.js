import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { logoutUser, loadAuthToken, setAuthToken as setTokens } from "../constants/api";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SOCKET_URL } from "../constants/Paths";
import { get_formated_time } from "../screens/main_tab_screens/ScreensAPI";
import { Token } from "@stripe/stripe-react-native";
import { io } from "socket.io-client";
import { endEvent } from "react-native/Libraries/Performance/Systrace";



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
        if(!token || notificationRef.current)return;
        const wsURL = "ws://10.10.10.32:5000?token="+token;
        notificationRef.current = io(wsURL);
        notificationRef.current.on('connect', (msg) => {
            console.log("notifidation connected")
            console.log("test", notifications)
        })
        notificationRef.current.on('notification', (msg) => {
            console.log('nt', JSON.stringify(msg, null, 2))
            const d = get_formated_time(msg?.createdAt);
            let temp = {
                id: msg?._id,
                type: msg?.type,
                icon: 'bell',
                title: msg?.title,
                description: msg?.message,
                time: d.time + " - " + d.month + " " + d.year, 
                section: new Date(msg?.createdAt).getDate() == new Date().getDate()?"Recent":"Old"
            }

            console.log(temp);
            console.log("is have", notifications)
            const arr = [...JSON.parse(JSON.stringify(notifications)), temp]
            setNotifications(arr);
        })

        notificationRef.current.onAny((eventName) => {
            console.log(eventName)
        })

        

       
    }

    //console.log("notifor put", JSON.stringify(notifications, null, 2))


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
            //initiateNotificationSocket(data.accessToken)
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
                //initiateNotificationSocket(data.accessToken)
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