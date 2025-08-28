import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BudgetScreen from "../../screens/main_tab_screens/budget_screen/BudgetScreen";
import MonthlyBudgetComponent from "../../screens/main_tab_screens/budget_screen/MonthlyBudgetComponent";   
import BudgetFormComponent from "../../screens/main_tab_screens/budget_screen/BudgetFormComponent";
import BudgetAnalytics from "../../screens/main_tab_screens/budget_screen/BudgetAnalytics";

const Stack = createNativeStackNavigator();


export default function BudgetStack() {

    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen 
                name="BudgetScreen"
                component={BudgetScreen}
            />
            <Stack.Screen 
                name="MonthlyBudgetComponent"
                component={MonthlyBudgetComponent}
            />
            <Stack.Screen 
                name="BudgetFormComponent"
                component={BudgetFormComponent}
            />
            <Stack.Screen 
                name="BudgetAnalytics"
                component={BudgetAnalytics}
            />
        </Stack.Navigator>
    )


}