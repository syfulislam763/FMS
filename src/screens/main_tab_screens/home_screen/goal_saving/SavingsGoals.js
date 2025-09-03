import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import ComponentWrapper from '../../../../components/ComponentWrapper';
import SavingsGoalCard from '../SavingsGoalCard';
import PrimaryButton from '../../../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';


const SavingsGoals = () => {
  const savingsData = [
    {
      id: '1',
      title: 'Housing',
      date: 'July 15, 2025',
      currentAmount: 20.00,
      targetAmount: 20000,
      icon: '🏠',
      progress:  20
    },
    {
      id: '2',
      title: 'Laptop',
      date: 'July 15, 2025',
      currentAmount: 2000,
      targetAmount: 20000,
      icon: '💻',
      progress: 2000/20000,
    },
    {
      id: '3',
      title: 'Car Buy',
      date: 'July 15, 2025',
      currentAmount: 1000,
      targetAmount: 20000,
      icon: '🚗',
      progress: 1000/20000,
    },
  ];

  const navigation = useNavigation()

  const renderSavingItem = ({ item }) => (
    <View className="bg-white rounded-[7px] p-4  mb-3 ">
      {/* Header with icon and title */}
      <View className="flex-row items-center mb-2">
        <View className="w-10 h-10 rounded-lg bg-orange-100 items-center justify-center mr-3">
          <Text className="text-lg">{item.icon}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-gray-900 text-lg font-semibold">{item.title}</Text>
          <Text className="text-gray-500 text-sm">{item.date}</Text>
        </View>
      </View>

      {/* Progress Bar */}
      <View className="mb-3">
        <View className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <View 
            className="h-full bg-green-600 rounded-full"
            style={{ width: `${50}%` }}
          />
        </View>
      </View>

      {/* Amount Display */}
      <View className="flex-row justify-between items-center">
        <Text className="text-gray-900 text-base font-medium">
          £{item.currentAmount.toFixed(2)}
        </Text>
        <Text className="text-gray-900 text-base font-medium">
          £{item.targetAmount.toLocaleString()}
        </Text>
      </View>
    </View>
  );

  return (
    <ComponentWrapper title='Saving Goal' bg_color='bg-[#2E7D32]'>
      <SavingsGoalCard container_style='bg-green-50 rounded-[7px] p-3 border-[1px] border-green-100'/>
      <FlatList
        data={savingsData}
        renderItem={renderSavingItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      />
      
      {/* Add Saving Goal Button */}
      <View className="flex-row justify-end">
          <TouchableOpacity onPress={()=> navigation.navigate("SavingsGoalForm")} className="bg-[#2E7D32] w-1/2 rounded-[5px] p-3 mt-4 mb-6 flex-row items-center justify-center ">
          <View className="w-6 h-6 bg-white rounded-full mr-3 flex-col items-center justify-center">
            <Text className="text-[#2E7D32] font-bold text-lg h-7">+</Text>
          </View>
          <Text className="text-white font-semibold text-lg">
            Add Saving Goal
          </Text>
        </TouchableOpacity>
      </View>

      <PrimaryButton 
        text='Calculate Savings'
        bgColor='bg-[#2E7D32]'
        onPress={() => navigation.navigate("FinancialForm")}
      />

    </ComponentWrapper>
  );
};

export default SavingsGoals;