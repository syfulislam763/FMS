import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import ComponentWrapper from '../../../../components/ComponentWrapper';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const FinancialSummary = () => {
  const route = useRoute();

  const financialData = {
    totalSaved: route.params.totalSavedBeforeTax,
    afterTax: route.params.afterTax,
    inflationAdjusted: route.params.inflationAdjustedValue,
    netGain: route.params.netGain,
    monthlyDecrease: 5060.00
  };

  const navigation = useNavigation()

  const SummaryRow = ({ label, amount, isLast = false }) => (
    <View className={`flex-row justify-between items-center ${!isLast ? 'mb-4' : ''}`}>
      <Text className="text-gray-900 text-base font-normal">{label}</Text>
      <Text className="text-gray-900 text-base font-medium">
        £{typeof amount === 'number' ? amount.toLocaleString() : amount}
      </Text>
    </View>
  );

  return (
    <ComponentWrapper  title='Calculator Results' bg_color='bg-[#2E7D32]' >
      <ScrollView className="flex-1 py-6">
        {/* Financial Summary Card */}
        <View className="bg-white rounded-[7px] p-6 mb-4">
          <SummaryRow 
            label="Total Saved(Before Tax)" 
            amount={financialData.totalSaved} 
          />
          <SummaryRow 
            label="After Tax:" 
            amount={financialData.afterTax} 
          />
          <SummaryRow 
            label="Inflation Adjusted Value:" 
            amount={financialData.inflationAdjusted} 
          />
          <SummaryRow 
            label="Net Gain:" 
            amount={financialData.netGain} 
            isLast={true}
          />
        </View>

        {/* Financial Tip Card */}
        <View className="bg-white rounded-[7px] p-6 mb-4">
          <View className="flex-row items-center mb-3">
            <Text className="text-green-600 text-lg mr-2">💡</Text>
            <Text className="text-green-600 text-lg font-semibold">Financial Tip</Text>
          </View>
          <Text className="text-gray-500 text-sm leading-6">
            Your monthly disposable Income will decrease by %{financialData.monthlyDecrease.toFixed(2)} due to this loan. Plan accordingly!
          </Text>
        </View>

        {/* Ads Section */}
        <View className="bg-gray-300 rounded-[7px] h-52 items-center justify-center">
          <Text className="text-gray-700 text-xl font-medium">Ads</Text>
        </View>
      </ScrollView>
    </ComponentWrapper>
  );
};

export default FinancialSummary;