import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AppHeader from '../../../components/AppHeader';
import { BellDot } from 'lucide-react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import Cards from './Cards';
import SavingsGoalCard from './SavingsGoalCard';
import QuickCalculators from './QuickCalculators';
import FinancialCalendar from './FinancialCalendar';
import { useNavigation } from '@react-navigation/native';
import { get_analytics, get_formated_time, get_last_analytics, get_notifications } from '../ScreensAPI';
import { ActivityIndicator } from 'react-native';
import Indicator from '../../../components/Indicator';
import { useAuth } from '../../../context/AuthProvider';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';


const HomeScreen = () => {

    const navigation = useNavigation()
    const {setNotifications, initiateNotificationSocket, authToken, notifications} = useAuth()

    const [history, setHistory] = useState({});
    const [visible, setVisible] = useState(false);
    const {setFinancialForecast, setUserProfile, userProfile} = useAuth()

    const handleGetHistory = () => {
        setVisible(true);
        get_analytics((res) => {
            if(res){
                
                setUserProfile(res?.data);
                
            }else{

            }
            setVisible(false);
        })
        get_last_analytics((res) => {
            if(res){
                //console.log(JSON.stringify(res, null, 2), "dfd")
                setFinancialForecast(res?.data)
            }
        })
    }

    const handleGetNotifications = () => {
        get_notifications(res => {
            if(res){
                const temp = res?.data?.result?.map(item => {
                    const d = get_formated_time(item.createdAt)
                    return {
                        id: item._id,
                        type: item.type,
                        icon: 'bell',
                        title: item.title,
                        description: item.message,
                        time: d.time + " - " + d.month + " " + d.year, 
                        section: new Date(item.createdAt).getDate() == new Date().getDate()?"Recent":"Old"
                    }
                })
                setNotifications(temp)
                
            }
        })
    }


    useFocusEffect(
        useCallback(() => {
            handleGetHistory()
        }, [])
    )

    useEffect(() => {
       handleGetNotifications()
    }, [])

    useEffect(() => {
        if(authToken?.accessToken && notifications.length>0){
            initiateNotificationSocket(authToken?.accessToken)
        }
        
    },[authToken?.accessToken, authToken, notifications])

    return (
        <SafeAreaView  className="flex-1 bg-[#4F55BA]">
            <StatusBar style="light" backgroundColor="#4F55BA" />
            <View className="px-5 pb-4">
                <AppHeader 
                    left={() => {
                        return <View className="flex-row justify-between items-start"> 

                            <Image
                                className="h-[30] w-[30] rounded-full"
                                source={{uri:userProfile?.user?.image}}
                            />

                            <View className="ml-3">
                                <Text className="text-white font-inter-regular text-lg">Welcome Back</Text>
                                <Text className="text-white text-sm font-inter-regular">{userProfile?.user?.name}</Text>
                            </View>

                        </View>
                    }}
                    right={() => <BellDot size={24} color={"white"}/>}
                />
            </View>
            <View className="h-full bg-white ">
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text className="text-center font-archivo-regular text-2xl my-2">Dashboard</Text>
                    <Cards/>
                    <SavingsGoalCard 
                        onPress={() => navigation.navigate("SavingsGoals", {goals_rate:parseInt(userProfile?.savingGoalCompletionRate)})}
                        progress={parseInt(userProfile?.savingGoalCompletionRate) || 0}
                        amount='£0'
                    />
                    <QuickCalculators/>
                    <FinancialCalendar/>

                </ScrollView>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default HomeScreen;
