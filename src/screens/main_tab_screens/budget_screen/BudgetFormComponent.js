import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import ComponentWrapper from '../../../components/ComponentWrapper';

const BudgetFormComponent = () => {
  const [budgetName, setBudgetName] = useState('Transportation');
  const [budgetType, setBudgetType] = useState('Personal');
  const [amount, setAmount] = useState('£5000');
  const [category, setCategory] = useState('Groceries');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  const categories = ['Groceries', 'Transportation', 'Entertainment', 'Utilities', 'Healthcare', 'Education'];

  const RadioButton = ({ selected, onPress, label }) => (
    <TouchableOpacity 
      onPress={onPress}
      className="flex-row items-center mr-8"
    >
      <View className="w-5 h-5 rounded-full border-2 border-gray-400 items-center justify-center mr-2">
        {selected && (
          <View className="w-2.5 h-2.5 rounded-full bg-blue-500" />
        )}
      </View>
      <Text className="text-base text-gray-900">
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ComponentWrapper bg_color='bg-[#1976D2]' title='Add New Budget'>
        <View className="flex-1">
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1 py-6">
            
            {/* Budget Name Field */}
            <View className="mb-6">
            <Text className="text-base font-medium text-gray-900 mb-3">
                Budget
            </Text>
            <TextInput
                className="bg-white rounded-2xl px-4 py-4 text-base text-gray-900 "
                value={budgetName}
                onChangeText={setBudgetName}
                placeholder="Enter budget name"
                placeholderTextColor="#9CA3AF"
            />
            </View>

            {/* Budget Type Radio Buttons */}
            <View className="mb-6">
            <Text className="text-base font-medium text-gray-900 mb-4">
                Budget Type
            </Text>
            <View className="flex-row">
                <RadioButton
                selected={budgetType === 'Personal'}
                onPress={() => setBudgetType('Personal')}
                label="Personal"
                />
                <RadioButton
                selected={budgetType === 'Household'}
                onPress={() => setBudgetType('Household')}
                label="Household"
                />
            </View>
            </View>

            {/* Amount Field */}
            <View className="mb-6">
            <Text className="text-base font-medium text-gray-900 mb-3">
                Amount
            </Text>
            <TextInput
                className="bg-white rounded-2xl px-4 py-4 text-base text-gray-900 "
                value={amount}
                onChangeText={setAmount}
                placeholder="Enter amount"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
            />
            </View>

            {/* Budget Category Dropdown */}
            <View className="mb-8">
            <Text className="text-base font-medium text-gray-900 mb-3">
                Budget Category
            </Text>
            <TouchableOpacity
                className="bg-white rounded-2xl px-4 py-4 flex-row items-center justify-between"
                onPress={() => setShowCategoryDropdown(!showCategoryDropdown)}
            >
                <Text className="text-base text-gray-900">{category}</Text>
                <ChevronDown size={20} color="#6B7280" />
            </TouchableOpacity>
            
            {showCategoryDropdown && (
                <View className="bg-white rounded-2xl mt-2 shadow-sm">
                {categories.map((cat, index) => (
                    <TouchableOpacity
                    key={index}
                    className="px-4 py-3 border-b border-gray-100 last:border-b-0"
                    onPress={() => {
                        setCategory(cat);
                        setShowCategoryDropdown(false);
                    }}
                    >
                    <Text className="text-base text-gray-900">{cat}</Text>
                    </TouchableOpacity>
                ))}
                </View>
            )}
            </View>

            {/* Save Button */}
            <TouchableOpacity className="bg-blue-500 rounded-2xl py-4 items-center shadow-sm">
            <Text className="text-white text-lg font-semibold">
                Save
            </Text>
            </TouchableOpacity>

        </ScrollView>
        </View>
    </ComponentWrapper>
  );
};

export default BudgetFormComponent;