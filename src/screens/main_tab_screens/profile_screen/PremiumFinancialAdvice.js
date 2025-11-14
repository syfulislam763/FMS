import React, { useEffect } from 'react';
import { View, Text, Platform } from 'react-native';
import { CheckCircle } from 'lucide-react-native';
import ComponentWrapper from '../../../components/ComponentWrapper';
import { useNavigation } from '@react-navigation/native';
import PrimaryButton from '../../../components/PrimaryButton';
import Purchases, {LOG_LEVEL} from 'react-native-purchases';

const PremiumFinancialAdvice = () => {
  const features = [
    "Ask financial planners questions via AI chat",
    "Financial Book Appointment With Planner",
    "Access Exclusive tips,insights,and market analysis", 
    "Priority support for all your financial queries"
  ];

  const navigation = useNavigation()

  const FeatureItem = ({ text }) => (
    <View className="flex-row items-start mb-4">
      <View className="mr-3 mt-0.5">
        <CheckCircle size={20} color="#8B5CF6" />
      </View>
      <Text className="text-gray-800 text-base flex-1 leading-6">
        {text}
      </Text>
    </View>
  );

  useEffect(() => {
    //Purchases.setLogLevel(LOG_LEVEL.VERBOSE)
    if(Platform.OS == "ios"){
      Purchases.configure({apiKey: "appl_knsnizrjdQhjBuCifwstuieKpFY"})
    }

    getCustomerInfo()
    getOfferings()
  }, [])

  const getCustomerInfo = async () => {
    const customerInfo = await Purchases.getCustomerInfo();
    console.log("customer Info", JSON.stringify(customerInfo, null, 2))
  }
  const getOfferings = async () => {
    const offerings = await Purchases.getOfferings();
    console.log("customer Info", JSON.stringify(offerings, null, 2))
  }

  return (
    <ComponentWrapper bg_color='bg-[#5055ba]' title='Subscription Plan' >
        <View className="">
        <Text className="text-gray-900 text-lg font-semibold mb-2">
            Premium Financial Advice
        </Text>
        
        <Text className="text-indigo-600 text-3xl font-bold mb-6">
            £4.99/month
        </Text>

        <View className="mb-5">
            {features.map((feature, index) => (
            <FeatureItem key={index} text={feature} />
            ))}
        </View>

        <PrimaryButton 
            text='Subscribe Now'
            onPress={() => navigation.navigate("PaymentMethodsSelector")}
        />
        </View>
    </ComponentWrapper>
  );
};

export default PremiumFinancialAdvice;