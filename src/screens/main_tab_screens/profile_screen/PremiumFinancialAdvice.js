import React from 'react';
import { View, Text } from 'react-native';
import { CheckCircle } from 'lucide-react-native';
import ComponentWrapper from '../../../components/ComponentWrapper';
import { useNavigation } from '@react-navigation/native';
import PrimaryButton from '../../../components/PrimaryButton';

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