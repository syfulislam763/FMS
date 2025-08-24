import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FinadateScreen from "../../screens/main_tab_screens/finadate_screen/FinadateScreen";

const Stack = createNativeStackNavigator();

export default function FinadateStack (){
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen 
                name="FindateScreen"
                component={FinadateScreen}
            />
        </Stack.Navigator>
    )
}