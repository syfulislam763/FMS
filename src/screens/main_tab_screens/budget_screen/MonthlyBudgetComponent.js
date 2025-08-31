import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Globe, Truck, Building2, Trash2 } from 'lucide-react-native';
import ComponentWrapper from '../../../components/ComponentWrapper';


const MonthlyBudgetComponent = () => {
  const [selectedTab, setSelectedTab] = useState('All');
  
  const tabs = ['All', 'Personal', 'Household'];
  
  const budgetItems = [
    {
      id: 1,
      icon: Globe,
      iconBg: 'bg-blue-100',
      iconColor: '#3B82F6',
      title: 'Internet & Mobile Bills',
      amount: '£350',
      category: 'Household'
    },
    {
      id: 2,
      icon: Truck,
      iconBg: 'bg-orange-100',
      iconColor: '#F97316',
      title: 'Transportation',
      amount: '£250',
      category: 'Personal'
    },
    {
      id: 3,
      icon: Building2,
      iconBg: 'bg-yellow-100',
      iconColor: '#EAB308',
      title: 'Bank Loan Installments',
      amount: '£2000',
      category: 'Personal'
    },
    {
      id: 4,
      icon: Building2,
      iconBg: 'bg-yellow-100',
      iconColor: '#EAB308',
      title: 'Bank Loan Installments',
      amount: '£2000',
      category: 'Personal',
      showDelete: true
    }
  ];

  const BudgetItem = ({ item }) => (
    <View className="bg-white rounded-[5px] mb-3  ">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1 p-3">
          <View className={`w-10 h-10 ${item.iconBg} rounded-full items-center justify-center mr-4`}>
            <item.icon size={20} color={item.iconColor} />
          </View>
          <Text className="text-base font-medium text-gray-900 flex-1">
            {item.title}
          </Text>
        </View>
        
        <View className="flex-row items-center">
          <Text className="text-base font-semibold text-gray-900 mr-3">
            {item.amount}
          </Text>
          
          {item.showDelete && (
            <TouchableOpacity className="w-12 h-16 bg-red-500 rounded-tr-[5px] rounded-br-[5px] items-center justify-center">
              <Trash2 size={16} color="#FFFFFF" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  const TabButton = ({ title, isActive }) => (
    <TouchableOpacity
      onPress={() => setSelectedTab(title)}
      className={`px-6 py-2 rounded-[7px] mr-3 ${
        isActive 
          ? 'bg-blue-500' 
          : 'bg-gray-100 border border-blue-500'
      }`}
    >
      <Text className={`text-sm font-medium ${
        isActive 
          ? 'text-white' 
          : 'text-blue-500'
      }`}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ComponentWrapper bg_color='bg-[#1976D2]' title=' Budget List'>
        <View className="flex-1 ">
    
            {/* Monthly Budget Header */}
            <View className="items-center pt-8 pb-6">
            <Text className="text-gray-500 text-lg font-archivo-regular mb-2">
                Monthly Budget
            </Text>
            <Text className="text-3xl font-archivo-extra-bold text-blue-500">
                £5000.00
            </Text>
            </View>

            {/* Tab Buttons */}
            <View className="flex-row mb-6">
            {tabs.map((tab) => (
                <TabButton 
                key={tab} 
                title={tab} 
                isActive={selectedTab === tab} 
                />
            ))}
            </View>

            {/* Budget Items List */}
            <FlatList 
                data={budgetItems}
                keyExtractor={(_,idx) => idx.toString()}
                renderItem={BudgetItem}
            />
            

            {/* Bottom spacing */}
            <View className="h-8" />

        </View>
    </ComponentWrapper>
  );
};

export default MonthlyBudgetComponent;