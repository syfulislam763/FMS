import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const FinancialForm = () => {
  const [amount, setAmount] = useState('');
  const [frequency, setFrequency] = useState('Monthly');
  const [returnRate, setReturnRate] = useState('5%');
  const [inflationRate, setInflationRate] = useState('');
  const [taxationRate, setTaxationRate] = useState('20% BRT');

  const frequencyOptions = ['Monthly', 'Weekly', 'Yearly', 'Daily'];
  const taxationOptions = ['20% BRT', '40% HRT', '45% ART', 'Tax-Free'];

  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <ScrollView className="flex-1 px-4 py-6">
        
        {/* Amount Field */}
        <View className="mb-6">
          <Text className="text-gray-900 text-lg font-semibold mb-3">
            Amount
          </Text>
          <TextInput
            className="bg-white rounded-2xl px-4 py-4 text-gray-900 text-base"
            placeholder=""
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Frequency Field */}
        <View className="mb-6">
          <Text className="text-gray-900 text-lg font-semibold mb-3">
            Frequency:
          </Text>
          <TouchableOpacity className="bg-white rounded-2xl px-4 py-4 flex-row items-center justify-between">
            <Text className="text-gray-900 text-base">{frequency}</Text>
            <Text className="text-gray-500 text-lg">▼</Text>
          </TouchableOpacity>
        </View>

        {/* Return Rate Field */}
        <View className="mb-6">
          <Text className="text-gray-900 text-lg font-semibold mb-3">
            Return Rate(%)
          </Text>
          <TextInput
            className="bg-white rounded-2xl px-4 py-4 text-gray-900 text-base"
            placeholder="5%"
            value={returnRate}
            onChangeText={setReturnRate}
            keyboardType="numeric"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Inflation Rate Field */}
        <View className="mb-6">
          <Text className="text-gray-900 text-lg font-semibold mb-3">
            Inflation Rate (Years):
          </Text>
          <TextInput
            className="bg-white rounded-2xl px-4 py-4 text-gray-900 text-base"
            placeholder=""
            value={inflationRate}
            onChangeText={setInflationRate}
            keyboardType="numeric"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Taxation Rate Field */}
        <View className="mb-6">
          <Text className="text-gray-900 text-lg font-semibold mb-3">
            Taxation Rate
          </Text>
          <TouchableOpacity className="bg-white rounded-2xl px-4 py-4 flex-row items-center justify-between">
            <Text className="text-gray-900 text-base">{taxationRate}</Text>
            <Text className="text-gray-500 text-lg">▼</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default FinancialForm;