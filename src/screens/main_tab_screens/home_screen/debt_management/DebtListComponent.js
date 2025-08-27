import React from 'react';
import { View, Text, TouchableOpacity, Pressable, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ComponentWrapper from '../../../../components/ComponentWrapper';

const DebtListComponent = () => {
    const navigation = useNavigation();

    const data = [
        {},
        {},
        {}
    ]



    const renderItem = (data) => {

        return <Pressable onPress={()=>navigation.navigate("LoanDetailComponent")} className="bg-white rounded-2xl p-5 mb-4">
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
        </Pressable>
    }
  return (
    <ComponentWrapper title='Debt Management' bg_color='bg-[#FFA950]' >
     

        {/* Debt List Header */}
        <View className="flex-row items-center justify-between mb-6">
            <Text className="text-gray-900 text-xl font-semibold">Debt List</Text>
            <TouchableOpacity>
            <Text className="text-orange-400 font-medium underline">All</Text>
            </TouchableOpacity>
        </View>

        <FlatList 
            data={data}
            keyExtractor={(it, idx) => idx.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
        />
        {/* Student Loan Card */}
        
    </ComponentWrapper>
  );
};




export default DebtListComponent;