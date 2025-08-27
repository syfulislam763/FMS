import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ComponentWrapper from '../../../../components/ComponentWrapper';

const LoanDetailComponent = () => {
    const navigation = useNavigation()
  return (
    <ComponentWrapper title='Debt Management' bg_color='bg-[#FFA950]' >
        <View className="flex-1">
        {/* Student Loan Card */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
            {/* Header with Icon */}
            <View className="flex-row items-center justify-center mb-8">
            <View className="w-8 h-8 bg-blue-100 rounded-lg mr-3 items-center justify-center">
                <View className="w-5 h-4 bg-blue-500 rounded-sm" />
            </View>
            <Text className="text-gray-900 text-xl font-semibold">Student Loan</Text>
            </View>

            {/* Loan Details */}
            <View className="space-y-6">
            {/* Amount */}
            <View className="flex-row justify-between items-center">
                <Text className="text-gray-500 text-base">Amount</Text>
                <Text className="text-gray-900 text-base font-semibold">£50000</Text>
            </View>

            {/* Monthly Payment */}
            <View className="flex-row justify-between items-center">
                <Text className="text-gray-500 text-base">Monthly Payment</Text>
                <Text className="text-gray-900 text-base font-semibold">£2000</Text>
            </View>

            {/* Interest Rate */}
            <View className="flex-row justify-between items-center">
                <Text className="text-gray-500 text-base">Interest Rate</Text>
                <Text className="text-gray-900 text-base font-semibold">8.5%</Text>
            </View>

            {/* Due Date */}
            <View className="flex-row justify-between items-center">
                <Text className="text-gray-500 text-base">Due Date</Text>
                <Text className="text-gray-900 text-base font-semibold">27 July 2026</Text>
            </View>
            </View>

            {/* Monthly Breakdown Section */}
            <View className="mt-8">
            <Text className="text-gray-900 text-lg font-semibold mb-6">Monthly Breakdown</Text>
            
            <View className="space-y-4">
                {/* Capital Repayment */}
                <View className="flex-row justify-between items-center">
                <Text className="text-gray-500 text-base">Capital Repayment</Text>
                <Text className="text-gray-900 text-base font-semibold">£500</Text>
                </View>

                {/* Interest Repayment */}
                <View className="flex-row justify-between items-center">
                <Text className="text-gray-500 text-base">Interest Repayment</Text>
                <Text className="text-gray-900 text-base font-semibold">£1500</Text>
                </View>
            </View>
            </View>
        </View>

        {/* Optimize Button */}
        <TouchableOpacity onPress={() => navigation.navigate("AISuggestionsComponent")} className="bg-orange-400 rounded-2xl py-4 px-6 shadow-sm">
            <Text className="text-white text-lg font-semibold text-center">
            Optimize debt with AI
            </Text>
        </TouchableOpacity>
        </View>
    </ComponentWrapper>
  );
};

export default LoanDetailComponent;