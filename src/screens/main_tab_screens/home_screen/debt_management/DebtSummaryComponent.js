import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

const DebtSummaryComponent = () => {
  return (
    <View className="flex-1 ">
      {/* Suggested Payment Order Card */}
      <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm">
        <View className="flex-row items-center mb-6">
          <View className="w-4 h-4 bg-orange-400 rounded-full mr-3" />
          <Text className="text-gray-900 text-lg font-semibold">
            Suggested Payment Order
          </Text>
        </View>
        
        <View className="space-y-5">
          {/* Credit Card */}
          <View className="flex-row items-center justify-between">
            <View>
              <Text className="text-gray-900 text-base font-medium">Credit Card</Text>
              <Text className="text-gray-500 text-sm mt-1">- 22%</Text>
            </View>
            <TouchableOpacity className="bg-orange-400 px-4 py-2 rounded-full">
              <Text className="text-white text-sm font-medium">Pay First</Text>
            </TouchableOpacity>
          </View>
          
          {/* Student Loan */}
          <View className="border-t border-gray-100 pt-5">
            <Text className="text-gray-900 text-base font-medium">Student Loan</Text>
            <Text className="text-gray-500 text-sm mt-1">- 6.5%</Text>
          </View>
          
          {/* Car Loan */}
          <View className="border-t border-gray-100 pt-5">
            <Text className="text-gray-900 text-base font-medium">Car Loan</Text>
            <Text className="text-gray-500 text-sm mt-1">- 4%</Text>
          </View>
        </View>
      </View>

      {/* Debt Summary Card */}
      <View className="bg-white rounded-2xl p-5 shadow-sm">
        <View className="flex-row items-center mb-6">
          <View className="w-4 h-4 bg-orange-400 rounded-full mr-3" />
          <Text className="text-gray-900 text-lg font-semibold">
            Debt Summary
          </Text>
        </View>
        
        <View className="space-y-5">
          {/* Total Debt */}
          <View className="flex-row items-center justify-between">
            <Text className="text-gray-500 text-base">Total Debt</Text>
            <Text className="text-gray-900 text-lg font-semibold">£150000</Text>
          </View>
          
          {/* Average Interest Rate */}
          <View className="flex-row items-center justify-between border-t border-gray-100 pt-5">
            <Text className="text-gray-500 text-base">Average Interest Rate</Text>
            <Text className="text-gray-900 text-lg font-semibold">8.5%</Text>
          </View>
          
          {/* Monthly Payment */}
          <View className="flex-row items-center justify-between border-t border-gray-100 pt-5">
            <Text className="text-gray-500 text-base">Monthly Payment</Text>
            <Text className="text-orange-500 text-lg font-semibold">£2500</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DebtSummaryComponent;