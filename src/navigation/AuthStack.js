import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "../screens/auth_screens/welcome_screen/WelcomeScreen";
import SignInScreen from "../screens/auth_screens/signin_screen/SignInScreen";
import SignUpScreen from "../screens/auth_screens/sign_up_screen/SignUpScreen";
import OTPVerification from "../screens/auth_screens/otp_verification/OTPVerification";
import ForgetPassword from "../screens/auth_screens/forget_pass/ForgetPassword";

const Stack = createNativeStackNavigator();

export default function AuthStack () {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="WelcomeScreen"
                component={WelcomeScreen}
            />
            <Stack.Screen 
                name="SignInScreen"
                component={SignInScreen}
            />
            <Stack.Screen 
                name="SignUpScreen"
                component={SignUpScreen}
            />
            <Stack.Screen 
                name="OTPVerification"
                component={OTPVerification}
            />
            <Stack.Screen 
                name="ForgetPassword"
                component={ForgetPassword}
            />


        </Stack.Navigator>
    )
}
