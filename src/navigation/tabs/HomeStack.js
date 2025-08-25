import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../../screens/main_tab_screens/home_screen/HomeScreen";
import IncomeTracker from "../../screens/main_tab_screens/home_screen/income/IncomeTracker";
import AddIncomeForm from "../../screens/main_tab_screens/home_screen/income/AddIncomeFrom";
import ExpenseItem from "../../screens/main_tab_screens/home_screen/expences/ExpenseItem";
import AddExpenseForm from "../../screens/main_tab_screens/home_screen/expences/AddExpenseFrom";
import ExpenseAnalytics from "../../screens/main_tab_screens/home_screen/expences/ExpenseAnalytics";

const Stack = createNativeStackNavigator();



export default function HomeStack(){
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen 
                name="HomeScreen"
                component={HomeScreen}
            />

            <Stack.Screen 
                name="IncomeTracker"
                component={IncomeTracker}
            />

            <Stack.Screen 
                name="AddIncomeForm"
                component={AddIncomeForm}
            />

            <Stack.Screen 
                name="ExpenseItem"
                component={ExpenseItem}
            
            />

            <Stack.Screen
                name="AddExpenseForm"
                component={AddExpenseForm}
            />

            <Stack.Screen
                name="ExpenseAnalytics"
                component={ExpenseAnalytics}
            />


        </Stack.Navigator>
    )
}