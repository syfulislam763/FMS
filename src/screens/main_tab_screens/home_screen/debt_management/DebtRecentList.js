import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Card from './Card';

const DebtRecentList = () => {
    const navigation = useNavigation()
  return (
    <View className="">
      {/* Header with Add New Debt Button */}
      <View className="flex-row justify-end mb-4">
        <TouchableOpacity onPress={()=>navigation.navigate("AddDebtScreen")} className="bg-orange-400 rounded-[5px] px-4 py-3 flex-row items-center">
          <View className="w-5 h-5 bg-white rounded-full mr-2 items-center justify-center">
            <Text className="text-orange-400 text-lg font-bold h-7">+</Text>
          </View>
          <Text className="text-white font-medium">Add New Debt</Text>
        </TouchableOpacity>
      </View>

      {/* Debt List Header */}
      <View className="flex-row items-center justify-between mb-6">
        <Text className="text-gray-900 text-xl font-semibold">Debt List</Text>
        <TouchableOpacity onPress={()=> navigation.navigate("DebtListComponent")}>
          <Text className="text-orange-400 font-medium underline">All</Text>
        </TouchableOpacity>
      </View>

      {/* Student Loan Card */}

      <Card/>
      <Card/>
    </View>
  );
};

export default DebtRecentList;