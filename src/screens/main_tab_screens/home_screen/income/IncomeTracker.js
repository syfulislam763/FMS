import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, SafeAreaView,ActivityIndicator } from 'react-native';
import AppHeader from '../../../../components/AppHeader';
import BackButtion from '../../../../components/BackButtion';
import { useNavigation } from '@react-navigation/native';
import { get_incomes, get_formated_time } from '../../ScreensAPI';
import Indicator from '../../../../components/Indicator';
import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

const IncomeTracker = () => {
  const [activeTab, setActiveTab] = useState('All');
  const navigation = useNavigation()

  const [incomeList, setIncomeList] = useState([]);
  const [filteredIncomeList, setFilteredIncomeList] = useState([])
  const [visible, setVisible] = useState(false);
  const [totalIncome, setTotalIncome] = useState(0)
  

  const handleGetIncomeList = () => {
    setVisible(true);
    get_incomes(res => {
      if(res){
      
        const temp = res.data.map(item => {
          const d = get_formated_time(item.createdAt)
          return {
            id: item._id,
            userId: item.userId,
            title: item.name,
            date: d.month+" "+d.day+", "+d.year,
            amount: '+£'+item.amount,
            icon: '🏛️',
            bgColor: 'bg-pink-100',
            frequency: item.frequency
          }
        })

        let totalIncome = 0;
        res.data.forEach(item => {
          totalIncome += Number(item.amount);
        });
        setTotalIncome(totalIncome)

        setIncomeList(temp)
        setFilteredIncomeList(temp)
      }else{
        setVisible([])
      }

      setVisible(false);

    })
  }


  useFocusEffect(
    useCallback(() => {
      handleGetIncomeList()
    }, [])
  )
  // useEffect(() => {
  //   handleGetIncomeList()
  // }, [])


  const handleTabFilter = (tab) => {
    if(tab.toLowerCase() == "all"){
      setFilteredIncomeList(incomeList)
    }else{
      const filtered = incomeList.filter(item => item.frequency == tab.toLowerCase())
      setFilteredIncomeList(filtered)
    }
    setActiveTab(tab)
    
  }

  


  const tabs = ['All', 'Monthly', 'Yearly', 'On-off'];

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
          <Text className="text-white font-inter-regular text-center text-lg font-medium mb-2">
            Monthly Income
          </Text>
          <Text className="text-white text-center text-3xl font-archivo-extra-bold">
            £{totalIncome}
          </Text>
        </View>

        {/* Filter Tabs */}
        <View className="flex-row mb-6 rounded-xl p-1 shadow-sm">
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => handleTabFilter(tab)}
              className={`flex-1 py-3 px-3 border-[1px] border-[#2E7D32] m-1 rounded-lg ${
                activeTab === tab 
                  ? 'bg-[#2E7D32]' 
                  : 'bg-transparent'
              }`}
            >
              <Text className={`text-center font-archivo-regular text-sm  ${
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
          {filteredIncomeList.map((entry) => (
            <View key={entry.id} className="bg-[#ffffff] rounded-[7px] p-3 mb-3 ">
              <View className="flex-row items-center">
                {/* Icon Container */}
                <View className={`w-12 h-12 ${entry.bgColor} rounded-xl items-center justify-center mr-4`}>
                  <Text className="text-xl">{entry.icon}</Text>
                </View>
                
                {/* Content */}
                <View className="flex-1">
                  <Text className="text-gray-900 font-inter-semi-bold text-lg mb-1">
                    {entry.title}
                  </Text>
                  <Text className="text-gray-500 font-inter-regular text-sm">
                    {entry.date}
                  </Text>
                </View>
                
                {/* Amount */}
                <Text className="text-[#2E7D32] font-inter-semi-bold text-lg">
                  {entry.amount}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Add New Income Button */}
        <View className="flex-row justify-end">
            <TouchableOpacity onPress={()=> navigation.navigate("AddIncomeForm")} className="bg-[#2E7D32] w-1/2 rounded-[5px] p-3 mt-4 mb-6 flex-row items-center justify-center ">
            <View className="w-6 h-6 bg-white rounded-full mr-3 flex-col items-center justify-center">
              <Text className="text-[#2E7D32] font-bold text-lg h-7">+</Text>
            </View>
            <Text className="text-white font-semibold text-lg">
              Add New Income
            </Text>
          </TouchableOpacity>
        </View>
      </View>


      {
        visible && <Indicator onClose={() => setVisible(false)} visible={visible}>
          <ActivityIndicator size={"large"}/>
        </Indicator>
      }
    </SafeAreaView>
  );
};

export default IncomeTracker;