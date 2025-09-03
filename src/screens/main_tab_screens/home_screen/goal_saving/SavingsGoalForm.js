import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { ChevronDown, Calendar, Clock, MapPin } from 'lucide-react-native';
import AppHeader from '../../../../components/AppHeader';
import ComponentWrapper from '../../../../components/ComponentWrapper';
import { useNavigation } from '@react-navigation/native';

const SavingsGoalForm = () => {
  const [planName, setPlanName] = useState('');
  const [budget, setBudget] = useState('');
  const [repeatEvery, setRepeatEvery] = useState('Monthly');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [location, setLocation] = useState('');
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const repeatOptions = ['Daily', 'Weekly', 'Monthly', 'Yearly'];
  const navigation = useNavigation()

  return (
    <ComponentWrapper title='Add Savings Goal' bg_color='bg-[#2E7D32]' >
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="">
            

            {/* Budget Field */}
            <View className="mb-6">
            <Text className="text-lg font-archivo-semi-bold text-gray-900 mb-3">
                Goal Name
            </Text>
            <TextInput
                className="bg-white rounded-[5px] px-4 py-4 text-lg text-gray-900"
                placeholder=""
                placeholderTextColor="#9CA3AF"
                value={budget}
                onChangeText={setBudget}
                keyboardType="numeric"
            />
            </View>


            <View className="mb-6">
            <Text className="text-lg font-archivo-semi-bold text-gray-900 mb-3">
                Total Goal Amount
            </Text>
            <TextInput
                className="bg-white rounded-[5px] px-4 py-4 text-lg text-gray-900"
                placeholder=""
                placeholderTextColor="#9CA3AF"
                value={budget}
                onChangeText={setBudget}
                keyboardType="numeric"
            />
            </View>


            {/* Select Date or Time */}
            <View className="mb-6">
            <Text className="text-lg font-archivo-semi-bold text-gray-900 mb-3">
                Monthly Saving Target
            </Text>
            <View className="flex-row space-x-3">
                {/* Date Input */}
                <View className="flex-1">
                <View className="bg-white rounded-[5px] px-4 py-4 flex-row items-center">
                    
                    <TextInput
                    className="flex-1 text-lg text-gray-900 ml-3"
                    placeholder=""
                    placeholderTextColor="#9CA3AF"
                    value={selectedDate}
                    onChangeText={setSelectedDate}
                    />
                </View>
                </View>
                
                {/* Time Input */}
                <View className="flex-1 ml-3">
                <View className="bg-white rounded-[5px] px-4 py-4 flex-row items-center">
                    <Calendar size={20} color="#9CA3AF" className="mr-3" />
                    <TextInput
                    className="flex-1 text-lg text-gray-900 ml-3"
                    placeholder="date"
                    placeholderTextColor="#9CA3AF"
                    value={selectedTime}
                    onChangeText={setSelectedTime}
                    />
                </View>
                </View>
            </View>
            </View>

            {/* Location Field */}
            <View className="mb-6">
              <Text className="text-lg font-archivo-semi-bold text-gray-900 mb-3">
                Target Completion Date
              </Text>
              <View className="bg-white rounded-[5px] px-4 py-4 flex-row items-center">
                  <Calendar size={20} color="#9CA3AF" className="mr-3" />
                  <TextInput
                  className="flex-1 text-lg text-gray-900 ml-3"
                  placeholder="date"
                  placeholderTextColor="#9CA3AF"
                  value={selectedDate}
                  onChangeText={setSelectedDate}
                  />
              </View>
            </View>


            {/* Save Button */}
            <TouchableOpacity onPress={() => navigation.goBack()} className="bg-[#2E7D32] rounded-[5px] py-3 items-center ">
            <Text className="text-white text-lg font-semibold">
                Save
            </Text>
            </TouchableOpacity>

        </View>
        </ScrollView>
    </ComponentWrapper>
  );
};

export default SavingsGoalForm
;