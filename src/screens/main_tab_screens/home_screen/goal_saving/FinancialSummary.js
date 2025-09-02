import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const FinancialSummary = () => {
  const financialData = {
    totalSaved: 50000,
    afterTax: 1000,
    inflationAdjusted: 80,
    netGain: 30,
    monthlyDecrease: 5060.00
  };

  const SummaryRow = ({ label, amount, isLast = false }) => (
    <View className={`flex-row justify-between items-center ${!isLast ? 'mb-4' : ''}`}>
      <Text className="text-gray-900 text-base font-normal">{label}</Text>
      <Text className="text-gray-900 text-base font-medium">
        £{typeof amount === 'number' ? amount.toLocaleString() : amount}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <ScrollView className="flex-1 px-4 py-6">
        {/* Financial Summary Card */}
        <View className="bg-white rounded-2xl p-6 mb-4">
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
        <View className="bg-white rounded-2xl p-6 mb-4">
          <View className="flex-row items-center mb-3">
            <Text className="text-green-600 text-lg mr-2">💡</Text>
            <Text className="text-green-600 text-lg font-semibold">Financial Tip</Text>
          </View>
          <Text className="text-gray-500 text-base leading-6">
            Your monthly disposable Income will decrease by %{financialData.monthlyDecrease.toFixed(2)} due to this loan. Plan accordingly!
          </Text>
        </View>

        {/* Ads Section */}
        <View className="bg-gray-300 rounded-2xl h-32 items-center justify-center">
          <Text className="text-gray-700 text-xl font-medium">Ads</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FinancialSummary;