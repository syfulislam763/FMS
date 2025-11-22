import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Lightbulb } from 'lucide-react-native';

const DebtSummaryComponent = ({paymentOrder, debtSummary}) => {
  // const paymentOrder = [
  //   {
  //     id: 1,
  //     name: 'Credit Card',
  //     interestRate: '22%',
  //     isPriority: true
  //   },
  //   {
  //     id: 2,
  //     name: 'Student Loan',
  //     interestRate: '6.5%',
  //     isPriority: false
  //   },
  //   {
  //     id: 3,
  //     name: 'Car Loan',
  //     interestRate: '4%',
  //     isPriority: false
  //   }
  // ];

  // const debtSummary = {
  //   totalDebt: '£150000',
  //   averageInterestRate: '8.5%',
  //   monthlyPayment: '£2500'
  // };

  const PaymentOrderItem = ({ item, showPayFirst = false }) => (
    <View className="flex-row items-center justify-between py-4 px-4 border-b border-gray-100">
      <View className="flex-1">
        <Text className="text-gray-900 text-base font-semibold">
          {item.name}
        </Text>
        <Text className="text-gray-500 text-sm mt-1">
          - {item.interestRate}%
        </Text>
      </View>
      
      {showPayFirst && (
        <TouchableOpacity className="bg-orange-400 px-4 py-2 rounded-full">
          <Text className="text-white text-sm font-medium">
            Pay First
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const SummaryRow = ({ label, value, isHighlighted = false }) => (
    <View className="flex-row justify-between items-center py-3 px-4">
      <Text className="text-gray-500 text-base">
        {label}
      </Text>
      <Text className={`text-base font-semibold ${
        isHighlighted ? 'text-orange-500' : 'text-gray-900'
      }`}>
        £{value || '0'}
      </Text>
    </View>
  );

  return (
    <View className="">
      {/* Suggested Payment Order Card */}
      <View className="bg-white rounded-[5px]  mb-4">
        {/* Header */}
        <View className="flex-row items-center px-4 py-4 border-b border-gray-100">
          <Lightbulb size={24} color="#F59E0B" className="mr-3" />
          <Text className="text-gray-900 text-lg font-semibold">
            Suggested Payment Order
          </Text>
        </View>

        {/* Payment Order List */}
        <View>
          {paymentOrder?.map((item, index) => (
            <PaymentOrderItem 
              key={item.id} 
              item={item} 
              showPayFirst={false}
            />
          ))}
        </View>
      </View>

      {/* Debt Summary Card */}
      <View className="bg-white rounded-[5px]">
        {/* Header */}
        <View className="flex-row items-center px-4 py-4 border-b border-gray-100">
          <Lightbulb size={24} color="#F59E0B" className="mr-3" />
          <Text className="text-gray-900 text-lg font-semibold">
            Debt Summary
          </Text>
        </View>

        {/* Summary Details */}
        <View>
          <SummaryRow 
            label="Total Debt" 
            value={debtSummary?.totalDebt}
          />
          
          <SummaryRow 
            label="Average Interest Rate" 
            value={debtSummary?.avgInterestRate}
          />
          
          <SummaryRow 
            label="Monthly Payment" 
            value={debtSummary?.monthlyPayment}
            isHighlighted={true}
          />
        </View>
      </View>
    </View>
  );
};

export default DebtSummaryComponent;