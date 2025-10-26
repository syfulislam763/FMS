import React, { useEffect, useState } from 'react';
import { View, Text , Pressable} from 'react-native';
import { CircleArrowDown, CircleArrowUp, PoundSterling, CreditCard, DollarSign, CirclePoundSterling, } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../context/AuthProvider';

const Cards = () => {


  const {userProfile} = useAuth();

  console.log(JSON.stringify(userProfile, null, 2), "usr")

  const income = userProfile?.analytics?.totalIncome? "£"+userProfile?.analytics?.totalIncome:"£00"
  const expense = userProfile?.analytics?.totalExpenses? "£"+userProfile?.analytics?.totalExpenses:"£00"
  const budget = userProfile?.analytics?.totalBudget? "£"+userProfile?.analytics?.totalBudget: "£00"
  const disposal = userProfile?.analytics?.disposal? "£"+userProfile?.analytics?.disposal: "£00"


  const cards = [
    {
      title: 'Income',
      amount: income,
      icon: CircleArrowDown,
      iconColor: '#10B981',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-100',
      textColor: 'text-gray-800',
      amountColor: 'text-green-600',
      route:"IncomeTracker"
    },
    {
      title: 'Expenses',
      amount: expense,
      icon: CircleArrowUp,
      iconColor: '#EF4444',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-100',
      textColor: 'text-gray-800',
      amountColor: 'text-red-600',
      route:"ExpenseItem",
    },
    {
      title: 'Disposable',
      amount: disposal,
      icon: PoundSterling,
      iconColor: '#6366F1',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-100',
      textColor: 'text-gray-800',
      amountColor: 'text-gray-800',
      route:"IncomeTracker"
    },
    {
      title: 'Budget',
      amount: budget,
      icon: CreditCard,
      iconColor: '#10B981',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-100',
      textColor: 'text-gray-800',
      amountColor: 'text-green-600',
      route:"IncomeTracker"
    }
  ];

  const navigation = useNavigation()

  const renderCard = (card, index) => {
    const IconComponent = card.icon;
    
    return (
      <Pressable 
        key={index}
        className={`${card.bgColor} ${card.borderColor} border-[1px] rounded-2xl p-6 flex-1 m-2 shadow-sm relative overflow-hidden`}
        style={{ minHeight: 140 }}
        onPress={()=> navigation.navigate(card.route)}
      >
        {/* Background Shadow Dollar Icons */}
        <View className="absolute inset-0 opacity-5">
          <CirclePoundSterling 
            size={80} 
            color="#000000"
            style={{
              position: 'absolute',
              top: -15,
              right: -15,
            }}
          />
        </View>

        {/* Icon Container */}
        <View className="mb-4 relative z-10">
          <View 
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: `${card.iconColor}15` }}
          >
            <IconComponent 
              size={20} 
              color={card.iconColor}
              strokeWidth={2.5}
            />
          </View>
        </View>

        {/* Title */}
        <Text className={`text-sm font-inter-regular ${card.textColor} mb-2 relative z-10`}>
          {card.title}
        </Text>

        {/* Amount */}
        <Text className={`text-2xl font-archivo-semi-bold ${card.amountColor} relative z-10`}>
          {card.amount}
        </Text>
      </Pressable>
    );
  };

  return (
    <View className="bg-white px-4 py-1">
      {/* First Row */}
      <View className="flex-row">
        {renderCard(cards[0], 0)}
        {renderCard(cards[1], 1)}
      </View>

      {/* Second Row */}
      <View className="flex-row">
        {renderCard(cards[2], 2)}
        {renderCard(cards[3], 3)}
      </View>



    </View>
  );
};

export default Cards;