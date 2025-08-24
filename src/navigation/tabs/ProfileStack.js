import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProfileScreen from "../../screens/main_tab_screens/profile_screen/ProfileScreen";

const Stack = createNativeStackNavigator();

export default function ProfileStack(){
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen
                name="ProfileScreen"
                component={ProfileScreen}
            />
        </Stack.Navigator>
    )
}