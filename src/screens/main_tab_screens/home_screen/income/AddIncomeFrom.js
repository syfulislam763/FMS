import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import AppHeader from '../../../../components/AppHeader';
import BackButtion from '../../../../components/BackButtion';
import { useNavigation } from '@react-navigation/native';
import { post_incomes } from '../../ScreensAPI';
import Indicator from '../../../../components/Indicator';
import { ActivityIndicator } from 'react-native';
import DateTimePicker from 'react-native-ui-datepicker';
import dayjs from 'dayjs';


const AddIncomeForm = () => {
  const [incomeSource, setIncomeSource] = useState('Salary');
  const [amount, setAmount] = useState('5000');
  const [frequency, setFrequency] = useState('Monthly');
  const [date, setDate] = useState(dayjs());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showIncomeDropdown, setShowIncomeDropdown] = useState(false);


  const navigation = useNavigation();

  const frequencies = ['Monthly', 'Yearly', 'On-off'];
  
  const incomeSources = [
    'Salary',
    'Bonus',
    'Overtime Pay',
    'Rental income',
    'Investment Income',
    'Gift',
    'Other income'
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

  const handleIncomeSourceSelect = (source) => {
    setIncomeSource(source);
    setShowIncomeDropdown(false);
  };

  const handleCreateIncome = () => {
    const payload = {
      name: incomeSource,
      amount: Number(amount),
      receiveDate: formatDateForPayload(date),
      frequency: frequency.toLowerCase()
    } 

    console.log(payload)

    setVisible(true);

    post_incomes(payload, (res) => {
      if(res){
        //success
        console.log("created", JSON.stringify(res, null, 2))
        navigation.goBack();
      }else{
        //failed
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
    <SafeAreaView className="flex-1 bg-[#2E7D32]">
        <View className="px-5 pb-3">
            <AppHeader
                left={()=> <BackButtion/>}
                middle={() => <Text className="text-white font-archivo-semi-bold text-2xl">Add Income</Text>}
            />
        </View>



      <View className="flex-1 px-6 py-8 bg-[##e7eaef]">
        {/* Income Source Dropdown */}
        <View className="mb-6">
          <Text className="text-gray-900 text-base font-medium mb-3">
            Income Source
          </Text>
          <TouchableOpacity
            onPress={() => setShowIncomeDropdown(true)}
            className="bg-white rounded-xl px-4 py-4 border border-gray-300 flex-row items-center justify-between"
          >
            <Text className="text-gray-900 text-base flex-1">
              {incomeSource}
            </Text>
            <Text className="text-gray-600 text-lg">▼</Text>
          </TouchableOpacity>
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
        <TouchableOpacity onPress={handleCreateIncome} className="bg-[#2E7D32] rounded-[5px] py-3 px-6 ">
          <Text className="text-white text-center text-lg font-semibold">
            Save
          </Text>
        </TouchableOpacity>
      </View>

      {/* Income Source Dropdown Modal */}
      {showIncomeDropdown && (
        <Indicator visible={showIncomeDropdown} onClose={() => setShowIncomeDropdown(false)}>
          <View className="bg-white rounded-2xl mx-4 w-full max-h-96">
            <View className="px-4 py-4 border-b border-gray-200">
              <Text className="text-gray-900 text-lg font-semibold">Select Income Source</Text>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} className="max-h-80">
              {incomeSources.map((source, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => handleIncomeSourceSelect(source)}
                  className={`px-4 py-4 border-b border-gray-100 ${
                    incomeSource === source ? 'bg-green-50' : ''
                  }`}
                >
                  <Text className={`text-base ${
                    incomeSource === source ? 'text-[#2E7D32] font-semibold' : 'text-gray-900'
                  }`}>
                    {source}
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
              className="bg-[#2E7D32] rounded-lg py-3 mt-4"
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
    </SafeAreaView>
  );
};

export default AddIncomeForm;