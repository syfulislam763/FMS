import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BudgetScreen from "../../screens/main_tab_screens/budget_screen/BudgetScreen";

const Stack = createNativeStackNavigator();


export default function BudgetStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="BudgetScreen"
                component={BudgetScreen}
            />
        </Stack.Navigator>
    )


}