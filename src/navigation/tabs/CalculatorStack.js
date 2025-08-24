import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CalculatorScreen from "../../screens/main_tab_screens/calculator_screen/CalculatorScreen";


const Stack = createNativeStackNavigator();


export default function CalculatorStack (){


    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>

            <Stack.Screen 
                name="CalculatorScreen"
                component={CalculatorScreen}
            />


            
        </Stack.Navigator>
    )
}