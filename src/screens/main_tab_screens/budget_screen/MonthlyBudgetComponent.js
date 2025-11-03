import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Globe, Building2, Trash2, InfoIcon, FileIcon } from 'lucide-react-native';
import ComponentWrapper from '../../../components/ComponentWrapper';
import { get_monthly_budget, delete_budget } from '../ScreensAPI';
import { ShoppingBasket, Truck, Theater, Ambulance, GraduationCap, BrickWall } from 'lucide-react-native';
import Indicator from '../../../components/Indicator';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import ToastMessage from '../../../constants/ToastMessage';

const category = {
  "Groceries": ShoppingBasket,
  "Transportation": Truck,
  "Entertainment": Theater,
  "Utilities": BrickWall,
  "Healthcare": Ambulance,
  "Education": GraduationCap
}

const MonthlyBudgetComponent = () => {
  const [selectedTab, setSelectedTab] = useState('All');

  const [budgetList, setBudgetList] = useState([]);
  const [filteredBudgetList, setFilteredBudgetList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [totalBudget, setTotalBudget] = useState(0);

  const handleGetBudgets = () => {
    setVisible(true);

    get_monthly_budget(res => {
      if(res){
        const temp = res.data.map(item => {
          return {
            id: item._id,
            icon: category[item.category] ? category[item.category] : null,
            iconBg: 'bg-blue-100',
            iconColor: '#3B82F6',
            title: item.name,
            amount: item.amount,
            category: item.category,
            type: item.type
          }
        })

        let sum = 0;
        temp.forEach(item => {
          sum += parseInt(item.amount);
        })

        setTotalBudget(sum);
        setFilteredBudgetList(temp);
        setBudgetList(temp);
      }

      setVisible(false);
    })
  }

  const handleTabFilter = (tab) => {
    if(tab.toLowerCase() == "all"){
      setFilteredBudgetList(budgetList)
    }else{
      const filtered = budgetList.filter(item => item.type == tab.toLowerCase())
      setFilteredBudgetList(filtered)
    }
    setSelectedTab(tab)
  }

  const handleDelete = (id) => {
    setVisible(true);

    delete_budget(id, res => {
      if(res){
        const updatedList = budgetList.filter(item => item.id !== id);
        const updatedFilteredList = filteredBudgetList.filter(item => item.id !== id);
        
        setBudgetList(updatedList);
        setFilteredBudgetList(updatedFilteredList);
        
        let newTotal = 0;
        updatedList.forEach(item => {
          newTotal += parseInt(item.amount);
        });
        setTotalBudget(newTotal);
        ToastMessage("success", "Deleted successfully!", 2000);
      }else{
        ToastMessage("error", "Failed to delete", 2000);
      }
      setVisible(false);
    })
  }

  const renderRightActions = (id) => {
    return (
      <TouchableOpacity
        onPress={() => handleDelete(id)}
        className="bg-red-500 justify-center items-center px-6 rounded-r-[7px] mb-3"
        style={{ opacity: 0.9 }}
      >
        <Trash2 color="white" />
      </TouchableOpacity>
    );
  };

  useFocusEffect(
    useCallback(() => {
      handleGetBudgets()
    }, [])
  )

  const tabs = ['All', 'Personal', 'Household'];

  return (
    <ComponentWrapper bg_color='bg-[#1976D2]' title='Budget List'>
      <View className="flex-1">
        {/* Monthly Budget Header */}
        <View className="bg-[#1976D2] rounded-2xl p-6 mb-6">
          <Text className="text-white font-inter-regular text-center text-lg font-medium mb-2">
            Monthly Budget
          </Text>
          <Text className="text-white text-center text-3xl font-archivo-extra-bold">
            £{totalBudget}
          </Text>
        </View>

        {/* Filter Tabs */}
        <View className="flex-row mb-6 rounded-xl p-1 shadow-sm">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => handleTabFilter(tab)}
              className={`flex-1 py-3 px-3 border-[1px] border-[#1976D2] m-1 rounded-lg ${
                selectedTab === tab 
                  ? 'bg-[#1976D2]' 
                  : 'bg-transparent'
              }`}
            >
              <Text className={`text-center font-archivo-regular text-sm ${
                selectedTab === tab 
                  ? 'text-white' 
                  : 'text-[#1976D2]'
              }`}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Budget Entries */}
        <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
          {filteredBudgetList.map((entry) => (
            <Swipeable
              key={entry.id}
              renderRightActions={() => renderRightActions(entry.id)}
              overshootRight={false}
              rightThreshold={40}
            >
              <View className="bg-[#ffffff] rounded-[7px] p-3 mb-3">
                <View className="flex-row items-center">
                  {/* Icon Container */}
                  <View className={`w-12 h-12 ${entry.iconBg} rounded-xl items-center justify-center mr-4`}>
                    {entry.icon && <entry.icon size={20} color={entry.iconColor} />}
                  </View>
                  
                  {/* Content */}
                  <View className="flex-1">
                    <Text className="text-gray-900 font-inter-semi-bold text-lg mb-1">
                      {entry.title}
                    </Text>
                    <Text className="text-gray-500 font-inter-regular text-sm">
                      {entry.category}
                    </Text>
                  </View>
                  
                  {/* Amount */}
                  <Text className="text-[#1976D2] font-inter-semi-bold text-lg">
                    £{entry.amount}
                  </Text>
                </View>
              </View>
            </Swipeable>
          ))}
        </ScrollView>

        {/* Bottom spacing */}
        <View className="h-8" />
      </View>

      {visible && <Indicator visible={visible} onClose={() => setVisible(false)}>
        <ActivityIndicator size={"large"}/>
      </Indicator>}
    </ComponentWrapper>
  );
};

export default MonthlyBudgetComponent;