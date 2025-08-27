import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const DebtRecentList = () => {
    const navigation = useNavigation()
  return (
    <View className="">
      {/* Header with Add New Debt Button */}
      <View className="flex-row justify-end mb-4">
        <TouchableOpacity onPress={()=>navigation.navigate("AddDebtScreen")} className="bg-orange-400 rounded-xl px-4 py-3 flex-row items-center">
          <View className="w-5 h-5 bg-white rounded-full mr-2 items-center justify-center">
            <Text className="text-orange-400 text-lg font-bold h-7">+</Text>
          </View>
          <Text className="text-white font-medium">Add New Debt</Text>
        </TouchableOpacity>
      </View>

      {/* Debt List Header */}
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-gray-900 text-xl font-semibold">Debt List</Text>
        <TouchableOpacity onPress={()=> navigation.navigate("DebtListComponent")}>
          <Text className="text-orange-400 font-medium underline">All</Text>
        </TouchableOpacity>
      </View>

      {/* Student Loan Card */}
      <View className="bg-white rounded-2xl p-5 shadow-sm">
        {/* Header with Icon */}
        <View className="flex-row items-center mb-5">
          <View className="w-8 h-8 bg-orange-100 rounded-lg mr-3 items-center justify-center">
            <View className="w-5 h-4 bg-orange-400 rounded-sm" />
          </View>
          <Text className="text-gray-900 text-lg font-semibold">Student Loan</Text>
        </View>

        {/* Debt Details */}
        <View className="space-y-4">
          {/* Amount */}
          <View className="flex-row justify-between">
            <Text className="text-gray-500">Amount</Text>
            <Text className="text-gray-900 font-semibold">£50000</Text>
          </View>

          {/* Monthly Payment */}
          <View className="flex-row justify-between">
            <Text className="text-gray-500">Monthly Payment</Text>
            <Text className="text-gray-900 font-semibold">£2000</Text>
          </View>

          {/* Interest Rate */}
          <View className="flex-row justify-between">
            <Text className="text-gray-500">Interest Rate</Text>
            <Text className="text-gray-900 font-semibold">8.5%</Text>
          </View>

          {/* Ad-Hoc Payment */}
          <View className="flex-row justify-between">
            <Text className="text-gray-500">Ad-Hoc Payment</Text>
            <Text className="text-gray-900 font-semibold">£100</Text>
          </View>

          {/* Due Date */}
          <View className="flex-row justify-between">
            <Text className="text-gray-500">Due Date</Text>
            <Text className="text-gray-900 font-semibold">27 July 2026</Text>
          </View>
        </View>

        {/* Breakdown Section */}
        <View className="mt-6">
          <Text className="text-gray-900 font-semibold mb-4">Breakdown</Text>
          
          <View className="space-y-3">
            {/* Capital Repayment */}
            <View className="flex-row justify-between">
              <Text className="text-gray-500">Capital Repayment</Text>
              <Text className="text-gray-900 font-semibold">£500</Text>
            </View>

            {/* Interest Repayment */}
            <View className="flex-row justify-between">
              <Text className="text-gray-500">Interest Repayment</Text>
              <Text className="text-gray-900 font-semibold">£1500</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DebtRecentList;