import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Platform, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { CheckCircle } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import Purchases, { LOG_LEVEL, PURCHASES_ERROR_CODE, PACKAGE_TYPE } from 'react-native-purchases';
import ComponentWrapper from '../../../components/ComponentWrapper'; // Assuming this is your wrapper
import PrimaryButton from '../../../components/PrimaryButton'; // Assuming this is your button
import { ROOT_URL } from '../../../constants/Paths';

// --- CONSTANTS AND CONFIGURATION ---
const REVENUECAT_IOS_API_KEY = "appl_uiclOCoavDbvXvmuhpQAGkmqbCu";
const SERVER_SUBSCRIPTION_ENDPOINT = ROOT_URL+'/subscriptions/'; 

// Define your Entitlement ID and Package/Offering IDs from RevenueCat
const ENTITLEMENT_ID = 'monthly_subscription'; // <-- **CRITICAL: Must match your RevenueCat Entitlement**
const TARGET_PACKAGE_ID = 'monthly_subscription'; 
const TARGET_OFFERING_ID = 'monthly_subscription';

// --- FEATURE LIST ---
const features = [
    "Ask financial planners questions via AI chat",
    "Financial Book Appointment With Planner",
    "Access Exclusive tips, insights, and market analysis", 
    "Priority support for all your financial queries"
];



// --- COMPONENT DEFINITIONS ---

const FeatureItem = React.memo(({ text }) => (
    <View className="flex-row items-start mb-4">
        <View className="mr-3 mt-0.5">
            <CheckCircle size={20} color="#8B5CF6" />
        </View>
        <Text className="text-gray-800 text-base flex-1 leading-6">
            {text}
        </Text>
    </View>
));

const PremiumFinancialAdvice = () => {
    const [currentPackage, setCurrentPackage] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubscribed, setIsSubscribed] = useState(false);
    const navigation = useNavigation();

  

    useEffect(() => {
        // 1. Configure RevenueCat
        if (Platform.OS === "ios") {
            Purchases.setLogLevel(LOG_LEVEL.VERBOSE); // Use LOG_LEVEL.INFO for production
            Purchases.configure({ apiKey: REVENUECAT_IOS_API_KEY });
        }
        
        // 2. Fetch data
        const loadData = async () => {
            const customerInfor = await Purchases.getCustomerInfo()
            console.log(JSON.stringify(customerInfor, null, 2), "customer Info")
            const offering = await Purchases.getOfferings();
            console.log(JSON.stringify(offering, null, 2), "Offerings")
        };
        loadData();


        
    }, []);


    // --- Purchase Handler ---
    const handleSubscribe = async () => {
        
    }

    // --- UI Rendering ---
    const priceDisplay = currentPackage 
        ? `${currentPackage.product.priceString}/${currentPackage.product.subscriptionPeriod.unit.toLowerCase()}` 
        : "Loading Price...";

    if (isLoading && !currentPackage && !isSubscribed) {
        return (
            <ComponentWrapper title='Subscription Plan'>
                <View className="flex-1 justify-center items-center h-40">
                    <ActivityIndicator size="large" color="#8B5CF6" />
                    <Text className="text-gray-600 mt-4">Loading plans...</Text>
                </View>
            </ComponentWrapper>
        );
    }

    return (
        <ComponentWrapper bg_color='bg-[#5055ba]' title='Subscription Plan'>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                <Text className="text-gray-900 text-2xl font-bold mb-2">
                    {isSubscribed ? "You're all set! ✅" : "Premium Financial Advice"}
                </Text>
                
                {/* Price Display and Loading State */}
                <Text className={`text-indigo-600 font-bold mb-6 ${isSubscribed ? 'text-xl' : 'text-4xl'}`}>
                    {isSubscribed ? "Active Subscription" : priceDisplay}
                </Text>

                <View className="mb-5">
                    {features.map((feature, index) => (
                        <FeatureItem key={index} text={feature} />
                    ))}
                </View>

                {/* Purchase Button / Subscribed Message */}
                {!isSubscribed ? (
                    <PrimaryButton 
                        text={isLoading ? <ActivityIndicator color="#FFFFFF" /> : 'Subscribe Now'}
                        onPress={handleSubscribe}
                        disabled={isLoading || !currentPackage}
                    />
                ) : (
                    <View className="p-4 bg-green-100 border border-green-300 rounded-lg">
                        <Text className="text-green-800 font-semibold text-center">
                            Your Premium access is active. Enjoy!
                        </Text>
                    </View>
                )}
            </ScrollView>
        </ComponentWrapper>
    );
};

export default PremiumFinancialAdvice;