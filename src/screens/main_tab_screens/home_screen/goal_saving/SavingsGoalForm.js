import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

const SavingsGoalForm = () => {
  const [goalName, setGoalName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [monthlySaving, setMonthlySaving] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [completionDate, setCompletionDate] = useState('');

  const handleSave = () => {
    // Handle save functionality
    console.log('Saving goal:', {
      goalName,
      totalAmount,
      monthlySaving,
      targetDate,
      completionDate
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-200">
      <ScrollView className="flex-1 px-4 py-6">
        {/* Goal Name */}
        <View className="mb-4">
          <Text className="text-gray-900 text-base font-medium mb-2">
            Goal Name
          </Text>
          <TextInput
            className="bg-white rounded-2xl px-4 py-4 text-gray-900 text-base"
            placeholder=""
            value={goalName}
            onChangeText={setGoalName}
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Total Goal Amount */}
        <View className="mb-4">
          <Text className="text-gray-900 text-base font-medium mb-2">
            Total Goal Amount
          </Text>
          <TextInput
            className="bg-white rounded-2xl px-4 py-4 text-gray-900 text-base"
            placeholder=""
            value={totalAmount}
            onChangeText={setTotalAmount}
            keyboardType="numeric"
            placeholderTextColor="#9CA3AF"
          />
        </View>

        {/* Monthly Saving Target */}
        <View className="mb-4">
          <Text className="text-gray-900 text-base font-medium mb-2">
            Monthly Saving Target
          </Text>
          <View className="flex-row space-x-3">
            <TextInput
              className="flex-1 bg-white rounded-2xl px-4 py-4 text-gray-900 text-base"
              placeholder=""
              value={monthlySaving}
              onChangeText={setMonthlySaving}
              keyboardType="numeric"
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity className="bg-white rounded-2xl px-4 py-4 flex-row items-center justify-center min-w-[100px]">
              <Text className="text-gray-500 text-base mr-2">📅</Text>
              <Text className="text-gray-500 text-base">Date</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Target Completion Date */}
        <View className="mb-8">
          <Text className="text-gray-900 text-base font-medium mb-2">
            Target Completion Date
          </Text>
          <TouchableOpacity className="bg-white rounded-2xl px-4 py-4 flex-row items-center">
            <Text className="text-gray-500 text-base mr-2">📅</Text>
            <Text className="text-gray-500 text-base">Date</Text>
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <TouchableOpacity
          className="bg-green-600 rounded-2xl py-4 items-center justify-center"
          onPress={handleSave}
        >
          <Text className="text-white text-lg font-semibold">Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SavingsGoalForm;