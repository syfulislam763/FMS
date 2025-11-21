import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import AppHeader from '../../../../components/AppHeader';
import BackButtion from '../../../../components/BackButtion';
import { useNavigation } from '@react-navigation/native';
import PrimaryButton from '../../../../components/PrimaryButton';
import { post_expence } from '../../ScreensAPI';
import Indicator from '../../../../components/Indicator';
import { ActivityIndicator } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';
import ToastMessage from '../../../../constants/ToastMessage';
import ComponentWrapper from '../../../../components/ComponentWrapper';

const AddExpenseForm = () => {
  const [expenseName, setExpenseName] = useState('Mortgage or Rent');
  const [amount, setAmount] = useState('5000');
  const [frequency, setFrequency] = useState('Monthly');
  const [date, setDate] = useState(dayjs());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showExpenseDropdown, setShowExpenseDropdown] = useState(false);

  const navigation = useNavigation();

  const frequencies = ['Weekly', 'Monthly', 'Yearly', 'On-off'];
  
  const expenseNames = [
    'Mortgage or Rent',
    'Building or Home insurance',
    'Travel expenses',
    'Car insurance',
    'Food and grocery shopping',
    'Childcare cost',
    'Clothing',
    'Gas Bill',
    'Electricity Bill',
    'Water Bill',
    'Broadband cost',
    'Mobile phone bill',
    'Entertainment',
    'Credit card',
    'Student Loan',
    'Loans',
    'Personal Upkeep',
    'Health Insurance',
    'Gym Membership',
    'Sport Membership',
    'Life insurance',
    'TV Licence',
    'Council Tax',
    'Subscription i.e. TV packages, netflix',
    'Other'
  ];

  const [visible, setVisible] = useState(false);

  // Format date to YYYY-MM-DD for payload
  const formatDateForPayload = (date) => {
    return dayjs(date).format('YYYY-MM-DD');
  };

  // Format date for display
  const formatDateForDisplay = (date) => {
    return dayjs(date).format('MMMM D, YYYY');
  };

  const handleDateSelect = (params) => {
    setDate(dayjs(params.date));
    setShowDatePicker(false);
  };

  const handleExpenseNameSelect = (name) => {
    setExpenseName(name);
    setShowExpenseDropdown(false);
  };

  const handleCreateExpense = () => {
    const payload = {
      name: expenseName,
      amount: Number(amount),
      endDate: formatDateForPayload(date),
      frequency: frequency.toLowerCase()
    }

    console.log(payload);

    setVisible(true);

    post_expence(payload, (res) => {
      if(res){
        //success
        console.log("created", JSON.stringify(res, null, 2));
        ToastMessage("success", "Expense added successfully!", 2000);
        navigation.goBack();
      }else{
        //failed
        ToastMessage("error", "Failed to add expense", 2000);
      }
      setVisible(false);
    })
  }

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
    <ComponentWrapper bg_color="bg-red-500" title='Add Expense'>
    

      <View className="flex-1 py-2 bg-[##e7eaef]">
        {/* Expense Name Dropdown */}
        <View className="mb-6">
          <Text className="text-gray-900 text-base font-archivo-semi-bold mb-3">
            Expense Name
          </Text>
          <TouchableOpacity
            onPress={() => setShowExpenseDropdown(true)}
            className="bg-white rounded-xl px-4 py-4 border border-gray-300 flex-row items-center justify-between"
          >
            <Text className="text-gray-900 text-base flex-1 font-archivo-semi-bold">
              {expenseName}
            </Text>
            <Text className="text-gray-600 text-lg">▼</Text>
          </TouchableOpacity>
        </View>

        {/* Amount */}
        <View className="mb-6">
          <Text className="text-gray-900 font-archivo-semi-bold mb-3">
            Amount
          </Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            className="bg-white rounded-xl px-4 py-4 text-gray-900 font-archivo-semi-bold border border-gray-300"
            placeholder="Enter amount"
            placeholderTextColor="#9CA3AF"
            keyboardType="numeric"
          />
        </View>

        {/* Frequency */}
        <View className="mb-6">
          <Text className="text-gray-900 font-archivo-semi-bold mb-4">
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
          <Text className="text-gray-900 font-archivo-semi-bold mb-3">
            Date Received
          </Text>
          <TouchableOpacity 
            onPress={() => setShowDatePicker(true)}
            className="bg-white rounded-xl px-4 py-4 border border-gray-300 flex-row items-center"
          >
            <View className="mr-3">
              <Text className="text-gray-600 text-lg">📅</Text>
            </View>
            <Text className="text-gray-900 text-base flex-1">
              {formatDateForDisplay(date)}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Save Button */}
        <PrimaryButton 
          bgColor='bg-red-500'
          text='Save'
          onPress={handleCreateExpense}
        />
      </View>

      {/* Expense Name Dropdown Modal */}
      {showExpenseDropdown && (
        <Indicator visible={showExpenseDropdown} onClose={() => setShowExpenseDropdown(false)}>
          <View className="bg-white rounded-2xl mx-4 w-full max-h-96">
            <View className="px-4 py-4 border-b border-gray-200">
              <Text className="text-gray-900 text-lg font-semibold">Select Expense Name</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} className="max-h-80">
              {expenseNames.map((name, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleExpenseNameSelect(name)}
                  className={`px-4 py-4 border-b border-gray-100 ${
                    expenseName === name ? 'bg-red-50' : ''
                  }`}
                >
                  <Text className={`text-base ${
                    expenseName === name ? 'text-red-500 font-semibold' : 'text-gray-900'
                  }`}>
                    {name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </Indicator>
      )}

      {/* Date Picker Modal */}
      {showDatePicker && (
        <Indicator visible={showDatePicker} onClose={() => setShowDatePicker(false)}>
          <View className="bg-white rounded-2xl p-4 mx-4">
            <DateTimePicker
              mode="single"
              date={date}
              onChange={handleDateSelect}
            />
            <TouchableOpacity 
              onPress={() => setShowDatePicker(false)}
              className="bg-red-500 rounded-lg py-3 mt-4"
            >
              <Text className="text-white text-center text-base font-semibold">
                Done
              </Text>
            </TouchableOpacity>
          </View>
        </Indicator>
      )}

      {visible && <Indicator visible={visible} onClose={() => setVisible(false)}>
          <ActivityIndicator size={"large"}/>
        </Indicator>}
    </ComponentWrapper>
  );
};

export default AddExpenseForm;