import React from 'react';
import { View, Text } from 'react-native';
import { CircleArrowDown, CircleArrowUp, PoundSterling, CreditCard, DollarSign, CirclePoundSterling } from 'lucide-react-native';

const Cards = () => {
  const cards = [
    {
      title: 'Income',
      amount: '£5000',
      icon: CircleArrowDown,
      iconColor: '#10B981',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-100',
      textColor: 'text-gray-800',
      amountColor: 'text-green-600'
    },
    {
      title: 'Expenses',
      amount: '£3500',
      icon: CircleArrowUp,
      iconColor: '#EF4444',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-100',
      textColor: 'text-gray-800',
      amountColor: 'text-red-600'
    },
    {
      title: 'Disposable',
      amount: '£1500',
      icon: PoundSterling,
      iconColor: '#6366F1',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-100',
      textColor: 'text-gray-800',
      amountColor: 'text-gray-800'
    },
    {
      title: 'Budget',
      amount: '£4000',
      icon: CreditCard,
      iconColor: '#10B981',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-100',
      textColor: 'text-gray-800',
      amountColor: 'text-green-600'
    }
  ];

  const renderCard = (card, index) => {
    const IconComponent = card.icon;
    
    return (
      <View 
        key={index}
        className={`${card.bgColor} ${card.borderColor} border-[1px] rounded-2xl p-6 flex-1 m-2 shadow-sm relative overflow-hidden`}
        style={{ minHeight: 140 }}
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
      </View>
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