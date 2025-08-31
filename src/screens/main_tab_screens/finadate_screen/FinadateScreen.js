import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { ChevronDown, Calendar, Clock, MapPin } from 'lucide-react-native';
import AppHeader from '../../../components/AppHeader';
import ComponentWrapper from '../../../components/ComponentWrapper';
import { useNavigation } from '@react-navigation/native';

const FinadateScreen = () => {
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
    <ComponentWrapper title='Date Night' bg_color='bg-[#1976D2]' >
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="">
            
            {/* Header */}
            <Text className="text-2xl font-archivo-extra-bold text-gray-900 mb-8">
            Set Your Reminder
            </Text>

            {/* Plan Field */}
            <View className="mb-6">
            <Text className="text-lg font-archivo-semi-bold text-gray-900 mb-3">
                Plan
            </Text>
            <TextInput
                className="bg-white rounded-[5px] px-4 py-4 text-lg text-gray-900 "
                placeholder="name"
                placeholderTextColor="#9CA3AF"
                value={planName}
                onChangeText={setPlanName}
            />
            </View>

            {/* Budget Field */}
            <View className="mb-6">
            <Text className="text-lg font-archivo-semi-bold text-gray-900 mb-3">
                Budget
            </Text>
            <TextInput
                className="bg-white rounded-[5px] px-4 py-4 text-lg text-gray-900"
                placeholder="£85"
                placeholderTextColor="#9CA3AF"
                value={budget}
                onChangeText={setBudget}
                keyboardType="numeric"
            />
            </View>

            {/* Repeat Every Dropdown */}
            <View className="mb-6">
            <Text className="text-lg font-archivo-semi-bold text-gray-900 mb-3">
                Repeat Every
            </Text>
            <TouchableOpacity
                className="bg-white rounded-[5px] px-4 py-4 flex-row items-center justify-between"
                onPress={() => setShowDropdown(!showDropdown)}
            >
                <Text className="text-lg text-gray-900">{repeatEvery}</Text>
                <ChevronDown size={20} color="#6B7280" />
            </TouchableOpacity>
            
            {showDropdown && (
                <View className="bg-white rounded-[5px] mt-2 shadow-sm">
                {repeatOptions.map((option, index) => (
                    <TouchableOpacity
                    key={index}
                    className="px-4 py-3 border-b border-gray-100 last:border-b-0"
                    onPress={() => {
                        setRepeatEvery(option);
                        setShowDropdown(false);
                    }}
                    >
                    <Text className="text-lg text-gray-900">{option}</Text>
                    </TouchableOpacity>
                ))}
                </View>
            )}
            </View>

            {/* Select Date or Time */}
            <View className="mb-6">
            <Text className="text-lg font-archivo-semi-bold text-gray-900 mb-3">
                Select Date or Time
            </Text>
            <View className="flex-row space-x-3">
                {/* Date Input */}
                <View className="flex-1">
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
                
                {/* Time Input */}
                <View className="flex-1 ml-3">
                <View className="bg-white rounded-[5px] px-4 py-4 flex-row items-center">
                    <Clock size={20} color="#9CA3AF" className="mr-3" />
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
                Location
            </Text>
            <View className="bg-white rounded-[5px] px-4 py-4 flex-row items-center">
                <MapPin size={20} color="#9CA3AF" className="mr-3" />
                <TextInput
                className="flex-1 text-lg text-gray-900 ml-3"
                placeholder="Location name"
                placeholderTextColor="#9CA3AF"
                value={location}
                onChangeText={setLocation}
                />
            </View>
            </View>

            {/* Enable Notification Toggle */}
            <View className="mb-8">
            <View className="flex-row items-center justify-between">
                <Text className="text-lg font-archivo-semi-bold text-gray-900">
                Enable Notification
                </Text>
                <Switch
                value={notificationEnabled}
                onValueChange={setNotificationEnabled}
                trackColor={{ false: '#E5E7EB', true: '#3B82F6' }}
                thumbColor={notificationEnabled ? '#FFFFFF' : '#FFFFFF'}
                ios_backgroundColor="#E5E7EB"
                />
            </View>
            </View>

            {/* Save Button */}
            <TouchableOpacity onPress={() => navigation.goBack()} className="bg-blue-500 rounded-[5px] py-3 items-center ">
            <Text className="text-white text-lg font-semibold">
                Save Date Night
            </Text>
            </TouchableOpacity>

        </View>
        </ScrollView>
    </ComponentWrapper>
  );
};

export default FinadateScreen
;