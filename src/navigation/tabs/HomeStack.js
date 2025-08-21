import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/main_tab_screens/home_screen/HomeScreen";

const Stack = createNativeStackNavigator();



export default function HomeStack(){
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="HomeScreen"
                component={HomeScreen}
            />
        </Stack.Navigator>
    )
}