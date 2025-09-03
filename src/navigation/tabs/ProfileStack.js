import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../../screens/main_tab_screens/profile_screen/ProfileScreen";
import ContactFormScreen from "../../screens/main_tab_screens/profile_screen/ContactFormScreen";
import TimeSelector from "../../screens/main_tab_screens/profile_screen/TimeSelector";
import SendExpences from "../../screens/main_tab_screens/profile_screen/SendExpences";
import VideoTutorialsScreen from "../../screens/main_tab_screens/profile_screen/VideoTutorialsScreen";
import FinancialRemindersSettings from "../../screens/main_tab_screens/profile_screen/FInancialRemindersSettiings";
import NotificationsFeedScreen from "../../screens/main_tab_screens/profile_screen/NotificationsFeedScreen";
import PremiumFinancialAdvice from "../../screens/main_tab_screens/profile_screen/PremiumFinancialAdvice";
import PaymentMethodsSelector from "../../screens/main_tab_screens/profile_screen/PaymentMethodsSelector";
import CongratulationsScreen from "../../screens/main_tab_screens/profile_screen/CongratulationsScreen";






const Stack = createNativeStackNavigator();

export default function ProfileStack(){
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
            />
            <Stack.Screen 
                name="ContactFormScreen"
                component={ContactFormScreen}
            />
            <Stack.Screen 
                name="TimeSelector"
                component={TimeSelector}
            />
            <Stack.Screen name="SendExpences" component={SendExpences} />

            <Stack.Screen name="VideoTutorialsScreen" component={VideoTutorialsScreen} />

            <Stack.Screen name="FinancialRemindersSettings" component={FinancialRemindersSettings}  />

            <Stack.Screen name="NotificationsFeedScreen" component={NotificationsFeedScreen}  />

            <Stack.Screen name="PremiumFinancialAdvice" component={PremiumFinancialAdvice} />

            <Stack.Screen name="PaymentMethodsSelector" component={PaymentMethodsSelector}  />

            <Stack.Screen name="CongratulationsScreen" component={CongratulationsScreen} />




        </Stack.Navigator>
    )
}