import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import AppHeader from '../../../../components/AppHeader';
import BackButtion from '../../../../components/BackButtion';
import { useNavigation } from '@react-navigation/native';

const IncomeTracker = () => {
  const [activeTab, setActiveTab] = useState('All');
  const navigation = useNavigation()

  const incomeEntries = [
    {
      id: 1,
      title: 'Monthly Paycheck',
      date: 'July 15, 2025',
      amount: '+£20,000',
      icon: '🏛️',
      bgColor: 'bg-pink-100'
    },
    {
      id: 2,
      title: 'Side Project Payment',
      date: 'July 15, 2025',
      amount: '+£5200',
      icon: '💰',
      bgColor: 'bg-orange-100'
    },
    {
      id: 3,
      title: 'Father gift',
      date: 'July 15, 2025',
      amount: '+£5200',
      icon: '🎁',
      bgColor: 'bg-yellow-100'
    },
    {
      id: 4,
      title: 'Freelance',
      date: 'July 15, 2025',
      amount: '+£5200',
      icon: '👨‍💼',
      bgColor: 'bg-red-100'
    }
  ];

  const tabs = ['All', 'Monthly', 'Yearly', 'One-off'];

  return (
    <SafeAreaView className="flex-1 bg-[#2E7D32]">
      <View className="px-5 pb-3">
        <AppHeader
          left={()=> <BackButtion/>}
          middle={() => <Text className="text-white font-archivo-semi-bold text-2xl">Income List</Text>}
        />
      </View>

      <View className="flex-1 px-5 pt-4 bg-[##e7eaef]">
        {/* Monthly Income Header */}
        <View className="bg-[#2E7D32] rounded-2xl p-6 mb-6">
          <Text className="text-white text-center text-lg font-medium mb-2">
            Monthly Income
          </Text>
          <Text className="text-white text-center text-3xl font-bold">
            £5000.00
          </Text>
        </View>

        {/* Filter Tabs */}
        <View className="flex-row mb-6 rounded-xl p-1 shadow-sm">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              className={`flex-1 py-3 px-3 border-[1px] border-[#2E7D32] m-1 rounded-lg ${
                activeTab === tab 
                  ? 'bg-[#2E7D32]' 
                  : 'bg-transparent'
              }`}
            >
              <Text className={`text-center font-inter-regular text-xs  ${
                activeTab === tab 
                  ? 'text-white' 
                  : 'text-[#2E7D32]'
              }`}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Income Entries */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {incomeEntries.map((entry) => (
            <View key={entry.id} className="bg-[#ffffff] rounded-xl p-4 mb-4 ">
              <View className="flex-row items-center">
                {/* Icon Container */}
                <View className={`w-12 h-12 ${entry.bgColor} rounded-xl items-center justify-center mr-4`}>
                  <Text className="text-xl">{entry.icon}</Text>
                </View>
                
                {/* Content */}
                <View className="flex-1">
                  <Text className="text-gray-900 font-semibold text-lg mb-1">
                    {entry.title}
                  </Text>
                  <Text className="text-gray-500 text-sm">
                    {entry.date}
                  </Text>
                </View>
                
                {/* Amount */}
                <Text className="text-[#2E7D32] font-bold text-lg">
                  {entry.amount}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Add New Income Button */}
        <View className="flex-row justify-end">
            <TouchableOpacity onPress={()=> navigation.navigate("AddIncomeForm")} className="bg-[#2E7D32] w-1/2 rounded-xl p-4 mt-4 mb-6 flex-row items-center justify-center shadow-sm">
            <View className="w-6 h-6 bg-white rounded-full mr-3 flex-col items-center justify-center">
              <Text className="text-[#2E7D32] font-bold text-lg h-7">+</Text>
            </View>
            <Text className="text-white font-semibold text-lg">
              Add New Income
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default IncomeTracker;