import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import ComponentWrapper from '../../../components/ComponentWrapper';
import { useNavigation } from '@react-navigation/native';
import PrimaryButton from '../../../components/PrimaryButton';
import CustomCalendar from '../../../components/CustomCalendar';

const TimeSelector = () => {
  const [selectedTime, setSelectedTime] = useState('10:00 am');
  const navigation = useNavigation()

  const timeSlots = [
    '9:00 am',
    '10:00 am', 
    '11:00 am',
    '1:00 am',
    '2:00 am',
    '3:00 am'
  ];

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const TimeButton = ({ time, isSelected }) => (
    <TouchableOpacity
      className={`px-6 py-3 rounded-full mr-3 mb-3 ${
        isSelected 
          ? 'bg-indigo-600' 
          : 'bg-gray-100'
      }`}
      onPress={() => handleTimeSelect(time)}
    >
      <Text 
        className={`text-base font-medium ${
          isSelected 
            ? 'text-white' 
            : 'text-gray-800'
        }`}
      >
        {time}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ComponentWrapper title='Book Appointment' bg_color='bg-[#5055ba]'>

        <ScrollView className="flex-1">
            <Text className="text-xl font-semibold text-gray-900 mb-4">
                Select Date
            </Text>
            <CustomCalendar/>

            <View className="mb-5">
                <Text className="text-xl font-semibold text-gray-900 mb-4">
                    Select Time
                </Text>
            
                <View className="flex-row flex-wrap">
                    {timeSlots.map((time, index) => (
                    <TimeButton 
                        key={index}
                        time={time}
                        isSelected={selectedTime === time}
                    />
                    ))}
                </View>
            </View>
            <PrimaryButton 
                text='Submit'
                bgColor='bg-[#5055ba]'
            />
        </ScrollView>
        
    </ComponentWrapper>
  );
};

export default TimeSelector;