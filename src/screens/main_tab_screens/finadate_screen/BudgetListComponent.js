import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Calendar, RotateCcw, MapPin, Plus } from 'lucide-react-native';
import AppHeader from '../../../components/AppHeader';
import ComponentWrapper from '../../../components/ComponentWrapper';
import { useNavigation } from '@react-navigation/native';

const BudgetListComponent = () => {
  const budgetData = [
    {
      id: 1,
      title: 'Family Budget Plan',
      amount: '£85',
      date: 'Mar 16,2025',
      time: '8:00 PM',
      frequency: 'monthly',
      frequencyIcon: RotateCcw
    },
    {
      id: 2,
      title: 'Family Budget Plan',
      amount: '£25',
      date: 'May 11,2025',
      time: '7:00 PM',
      frequency: 'yearly',
      frequencyIcon: RotateCcw
    },
    {
      id: 3,
      title: 'Family Budget Plan',
      amount: '£60',
      date: 'Jun 12,2025',
      time: '5:00 PM',
      frequency: 'weekly',
      frequencyIcon: RotateCcw
    },
    {
      id: 4,
      title: 'Family Budget Plan',
      amount: '£100',
      date: 'July 5,2025',
      time: '9:00 PM',
      frequency: 'yearly',
      frequencyIcon: RotateCcw
    }
  ];

  const navigation = useNavigation()

  const BudgetCard = ({ item }) => (
    <View className="bg-white rounded-2xl mb-4 p-4">
      <View className="flex-row justify-between items-start mb-3">
        <Text className="text-lg font-semibold text-gray-900 flex-1">
          {item.title}
        </Text>
        <Text className="text-lg font-semibold text-gray-900">
          {item.amount}
        </Text>
      </View>
      
      <View className="flex-row items-center mb-3">
        <View className="w-6 h-6 bg-blue-100 rounded-md items-center justify-center mr-3">
          <Calendar size={16} color="#3B82F6" />
        </View>
        <Text className="text-gray-600 text-sm">
          {item.date}
        </Text>
        <Text className="text-gray-400 text-sm ml-2">
          {item.time}
        </Text>
      </View>

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <item.frequencyIcon size={14} color="#9CA3AF" className="mr-2" />
          <Text className="text-gray-400 text-sm ml-2">
            {item.frequency}
          </Text>
        </View>
        
        <TouchableOpacity className="flex-row items-center">
          <MapPin size={16} color="#3B82F6" className="mr-1" />
          <Text className="text-blue-500 text-sm ml-1">
            Location
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ComponentWrapper headerComponent={() => <AppHeader middle={()=><Text className="text-white font-archivo-semi-bold text-2xl">{"Date Night"}</Text>}/>} bg_color='bg-[#1976D2]'>
        <View className="flex-1">
            <FlatList
                data={budgetData}
                renderItem={({ item }) => <BudgetCard item={item} />}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={{ paddingTop: 16, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            />
            
            {/* Add New Budget Button */}
            <View className="flex-row justify-end">
                <TouchableOpacity onPress={()=> navigation.navigate("FinadateScreen")} className="bg-[#1976D2] w-1/2 rounded-xl p-4 mt-4 mb-6 flex-row items-center justify-center shadow-sm">
                    <View className="w-6 h-6 bg-white rounded-full mr-3 flex-col items-center justify-center">
                        <Text className="text-[#2E7D32] font-bold text-lg h-7">+</Text>
                    </View>
                    <Text className="text-white font-semibold text-lg">
                        Add New Income
                    </Text>
                </TouchableOpacity>
            </View>
            </View>
    </ComponentWrapper>
  );
};

export default BudgetListComponent;