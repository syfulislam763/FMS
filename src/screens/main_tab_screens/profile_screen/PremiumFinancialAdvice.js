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

// --- SERVER INTEGRATION FUNCTION ---
/**
 * Verifies the purchase with your backend server.
 * @param {string} subscriptionId The purchase information (e.g., RevenueCat's latestTransactionId or product identifier)
 * @param {string} productId The product ID (e.g., currentPackage.product.identifier)
 * @param {string} purchaseToken The latest purchase token (can often be derived from customerInfo or receipt)
 */
const verifyPurchaseWithServer = async ({ subscriptionId, productId, purchaseToken }) => {
    try {
        // NOTE: In a *true* production environment, you might send the entire 
        // `customerInfo.originalData.latestReceipt` instead of the token for verification.
        const response = await fetch(SERVER_SUBSCRIPTION_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                // You MUST include an Authorization header for security in a real app
                // 'Authorization': `Bearer ${userAuthToken}`,
            },
            body: JSON.stringify({
                subscriptionId: subscriptionId,
                productId: productId,
                purchaseToken: purchaseToken,
            }),
        });

        if (!response.ok) {
            // Throw an error if the server verification fails
            const errorData = await response.json();
            throw new Error(errorData.message || "Server verification failed.");
        }

        // Assuming the server responds with a success status if the subscription is active/granted
        return true; 
    } catch (error) {
        console.error("Server Verification Error:", error);
        // Important: If server verification fails, you might need to revoke access 
        // or flag the account for manual review.
        throw new Error("Failed to verify purchase with server. Please contact support.");
    }
};

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

    // --- Entitlement & Navigation Logic ---
    const navigateToApp = useCallback(() => {
        // Replace 'MainAppScreen' with your actual post-subscription screen
        // navigation.replace("MainAppScreen"); 
        Alert.alert("Welcome!", "You now have premium access. Navigating to main content.");
    }, [navigation]);

    const handleEntitlementCheck = useCallback(async (customerInfo) => {
        const isUserActive = customerInfo.entitlements.active[ENTITLEMENT_ID];
        setIsSubscribed(!!isUserActive);

        if (isUserActive) {
            console.log("User is already subscribed to:", ENTITLEMENT_ID);
            // Optional: You could navigate the user immediately or just hide the purchase UI
            // navigateToApp(); 
        } else {
            console.log("User is not subscribed.");
        }
    }, [navigateToApp]);

    // --- Fetching Logic ---
    const getCustomerInfo = useCallback(async () => {
        try {
            const customerInfo = await Purchases.getCustomerInfo();
            // console.log("Customer Info", JSON.stringify(customerInfo, null, 2));
            await handleEntitlementCheck(customerInfo);
        } catch (e) {
            console.error("Error fetching customer info:", e);
        }
    }, [handleEntitlementCheck]);

    const getOfferings = useCallback(async () => {
        try {
            const offerings = await Purchases.getOfferings();
            
            // Prioritize the package from the specific offering, or fallback to default
            const offering = offerings.getOffering(TARGET_OFFERING_ID) || offerings.current;
            
            if (!offering) {
                console.warn("No offerings found. Check RevenueCat configuration.");
                return;
            }

            const pkg = offering.getPackage(TARGET_PACKAGE_ID) 
                || offering.availablePackages.find(p => p.packageType === PACKAGE_TYPE.MONTHLY);

            if (pkg) {
                setCurrentPackage(pkg);
            } else {
                console.warn(`Package ID '${TARGET_PACKAGE_ID}' not found.`);
            }

        } catch (e) {
            console.error("Error fetching offerings:", e);
            Alert.alert("Error", "Could not load subscription plans. Please check your configuration.");
        }
    }, []);

    // --- Initialization Effect ---
    useEffect(() => {
        // 1. Configure RevenueCat
        if (Platform.OS === "ios") {
            Purchases.setLogLevel(LOG_LEVEL.VERBOSE); // Use LOG_LEVEL.INFO for production
            Purchases.configure({ apiKey: REVENUECAT_IOS_API_KEY });
        }
        
        // 2. Fetch data
        const loadData = async () => {
            setIsLoading(true);
            await Promise.all([getOfferings(), getCustomerInfo()]);
            setIsLoading(false);
        };
        loadData();

        // 3. Listener for subscription changes (e.g., from an external purchase)
        Purchases.addCustomerInfoUpdateListener(handleEntitlementCheck);

        return () => {
            Purchases.removeCustomerInfoUpdateListener(handleEntitlementCheck);
        };
    }, [getOfferings, getCustomerInfo, handleEntitlementCheck]);


    // --- Purchase Handler ---
    const handleSubscribe = async () => {
        if (!currentPackage) {
            Alert.alert("Error", "Subscription plan not available.");
            return;
        }

        setIsLoading(true);
        try {
            const { customerInfo, productIdentifier } = await Purchases.purchasePackage(currentPackage);
            
            // ** 1. Check Entitlement via RevenueCat **
            const hasAccess = customerInfo.entitlements.active[ENTITLEMENT_ID];

            if (hasAccess) {
                
                // ** 2. Secure Server-Side Verification **
                // This step is crucial for production to prevent fraud and ensure your backend 
                // is aware of the subscription status.
                await verifyPurchaseWithServer({
                    // Use a unique ID for the transaction
                    subscriptionId: customerInfo.latestTransactionId, 
                    productId: productIdentifier,
                    // Use the latest receipt for verification
                    purchaseToken: customerInfo.originalData.latestReceipt, 
                });

                Alert.alert("Success!", "Subscription successful and verified.");
                navigateToApp();
            } else {
                // Should be rare if purchasePackage succeeds, but handle it.
                Alert.alert("Purchase Complete", "Thank you! Still checking subscription status...");
            }
        } catch (e) {
            if (e.code === PURCHASES_ERROR_CODE.PURCHASE_CANCELLED) {
                console.log("Purchase cancelled by user.");
            } else if (e.code === PURCHASES_ERROR_CODE.PURCHASE_NOT_ALLOWED) {
                 Alert.alert("Error", "Purchases are not allowed on this device.");
            } else {
                console.error("Purchase error:", e);
                Alert.alert("Purchase Failed", e.message || "An unexpected error occurred during purchase.");
            }
        } finally {
            setIsLoading(false);
        }
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