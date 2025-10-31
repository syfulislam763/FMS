import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Globe, Building2, Plus } from 'lucide-react-native';
import {ShoppingBasket, Truck , Theater, Ambulance, GraduationCap, BrickWall} from 'lucide-react-native'
import AppHeader from '../../../components/AppHeader';    
import ComponentWrapper from '../../../components/ComponentWrapper';
import { useNavigation } from '@react-navigation/native';
import PrimaryButton from '../../../components/PrimaryButton';
import { get_monthly_budget } from '../ScreensAPI';

const BudgetScreen = () => {
  const budgetItems = [
    {
      id: 1,
      icon: Globe,
      iconBg: 'bg-blue-100',
      iconColor: '#3B82F6',
      title: 'Internet & Mobile Bills',
      amount: '£350'
    },
    {
      id: 2,
      icon: Truck,
      iconBg: 'bg-orange-100',
      iconColor: '#F97316',
      title: 'Transportation',
      amount: '£250'
    },
    {
      id: 3,
      icon: Building2,
      iconBg: 'bg-yellow-100',
      iconColor: '#EAB308',
      title: 'Bank Loan Installments',
      amount: '£2000'
    }
  ];
  const navigation = useNavigation()
  const BudgetItem = ({ item }) => (
    <TouchableOpacity className="bg-white rounded-[7px] mb-3 p-3 ">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <View className={`w-10 h-10 ${item.iconBg} rounded-full items-center justify-center mr-4`}>
            <item.icon size={20} color={item.iconColor} />
          </View>
          <Text className="text-base font-medium text-gray-900 flex-1">
            {item.title}
          </Text>
        </View>
        <Text className="text-base font-semibold text-gray-900">
          {item.amount}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <ComponentWrapper headerComponent={() => <AppHeader middle={()=><Text className="text-white font-archivo-semi-bold text-2xl">{"Budget"}</Text>}/>} bg_color='bg-[#1976D2]'>
        <View className="flex-1">

        <View className="flex-row items-center justify-between pt-6 pb-4">
            <Text className="text-2xl font-archivo-semi-bold text-gray-900">
                Budget Plan
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("MonthlyBudgetComponent")}>
                <Text className="text-blue-500 text-base font-archivo-semi-bold">
                All
                </Text>
            </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
    
            {/* Budget Items List */}
            <View className="mt-2 mb-3">
            {budgetItems.map((item) => (
                <BudgetItem key={item.id} item={item} />
            ))}
            </View>

        </ScrollView>
            
            <View className="mx-4 mt-8 mb-6">
                <Text className="text-xl font-archivo-semi-bold text-gray-900 mb-4 text-center">
                    Optimize Your Budget with AI
                </Text>
                
                <Text className="text-gray-600 font-inter-regular text-center text-sm leading-6 mb-6 px-2">
                    Let our AI analyze your budget and suggest personalized improvements to help you achieve your financial goals.
                </Text>
            </View>
            <PrimaryButton
                bgColor='bg-[#1976D2]'
                text='Start Budget Review'
                onPress={()=> navigation.navigate("BudgetAnalytics")}
            />
            <View className="flex-row justify-end">
                <TouchableOpacity onPress={()=> navigation.navigate("BudgetFormComponent")} className="bg-[#1976D2] w-1/2 rounded-[5px] p-3 mt-4 mb-6 flex-row items-center justify-center ">
                    <View className="w-5 h-5 bg-white rounded-full mr-3 flex-col items-center justify-center">
                        <Text className="text-[#2E7D32] font-bold text-lg h-7">+</Text>
                    </View>
                    <Text className="text-white font-archivo-semi-bold text-lg">
                        Add New Income
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    </ComponentWrapper>
  );
};

export default BudgetScreen;