import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import BudgetStack from "./tabs/BudgetStack";
import CalculatorStack from "./tabs/CalculatorStack";
import FinadateStack from "./tabs/FinadateStack";
import ProfileStack from "./tabs/ProfileStack";
import HomeStack from "./tabs/HomeStack";

const Tab = createBottomTabNavigator();


export default function MainTabs() {
    return (
        <Tab.Navigator>
            <Tab.Screen 
                name="HomeStack"
                component={HomeStack}
            />
            <Tab.Screen 
                name="ProfileStack"
                component={ProfileStack}
            />
            <Tab.Screen 
                name="FindateStack"
                component={FinadateStack}
            />
            <Tab.Screen 
                name="CalculatorStack"
                component={CalculatorStack}
            />
            <Tab.Screen 
                name="BudgetStack"
                component={BudgetStack}
            />
        </Tab.Navigator>
    )
}