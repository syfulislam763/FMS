import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import AppHeader from '../../../../components/AppHeader';
import BackButtion from '../../../../components/BackButtion';
import { useNavigation } from '@react-navigation/native';
import PrimaryButton from '../../../../components/PrimaryButton';

const AddExpenseForm = () => {
  const [incomeSource, setIncomeSource] = useState('Salary');
  const [amount, setAmount] = useState('£5000');
  const [frequency, setFrequency] = useState('Monthly');
  const [dateReceived, setDateReceived] = useState('July 15, 2025');

  const navigation = useNavigation();

  const frequencies = ['Weekly', 'Monthly', 'Yearly', 'One-off'];

  const RadioButton = ({ selected, onPress, label }) => (
    <TouchableOpacity onPress={onPress} className="flex-row items-center mr-5">
      <View className="w-5 h-5 rounded-full border-2 border-gray-400 mr-2 items-center justify-center">
        {selected && (
          <View className="w-3 h-3 rounded-full bg-[#4F55BA]" />
        )}
      </View>
      <Text className="text-gray-800 text-base">{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-red-500">
        <View className="px-5 pb-3">
            <AppHeader
                left={()=> <BackButtion/>}
                middle={() => <Text className="text-white font-archivo-semi-bold text-2xl">Add Expense</Text>}
            />
        </View>



      <View className="flex-1 px-6 py-8 bg-[##e7eaef]">
        {/* Income Source */}
        <View className="mb-6">
          <Text className="text-gray-900 text-base font-medium mb-3">
            Expanses name
          </Text>
          <TextInput
            value={incomeSource}
            onChangeText={setIncomeSource}
            className="bg-white rounded-xl px-4 py-4 text-gray-900 text-base border border-gray-300"
            placeholder="Enter income source"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Amount */}
        <View className="mb-6">
          <Text className="text-gray-900 text-base font-medium mb-3">
            Amount
          </Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            className="bg-white rounded-xl px-4 py-4 text-gray-900 text-base border border-gray-300"
            placeholder="Enter amount"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
          />
        </View>

        {/* Frequency */}
        <View className="mb-6">
          <Text className="text-gray-900 text-base font-medium mb-4">
            Frequency
          </Text>
          <View className="flex-row">
            {frequencies.map((freq) => (
                <RadioButton
                key={freq}
                selected={frequency === freq}
                onPress={() => setFrequency(freq)}
                label={freq}
                />
            ))}
          </View>
        </View>

        {/* Date Received */}
        <View className="mb-8">
          <Text className="text-gray-900 text-base font-medium mb-3">
            Date Received
          </Text>
          <TouchableOpacity className="bg-white rounded-xl px-4 py-4 border border-gray-300 flex-row items-center">
            <View className="mr-3">
              <Text className="text-gray-600 text-lg">📅</Text>
            </View>
            <Text className="text-gray-900 text-base flex-1">
              {dateReceived}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <PrimaryButton 
          bgColor='bg-red-500'
          text='Save'
          onPress={()=>navigation.goBack()}
        />
      </View>
    </SafeAreaView>
  );
};

export default AddExpenseForm;