import React from 'react';
import { View, Text } from 'react-native';
import { PiggyBank } from 'lucide-react-native';
import Svg, { Circle } from 'react-native-svg';

const SavingsGoalCard = ({ 
  title = "Savings Goals", 
  amount = "£300", 
  progress = 60
}) => {
  // Circle properties
  const radius = 28;
  const strokeWidth = 6;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <View className="bg-green-50 rounded-2xl p-3 mx-6 border-[1px] border-green-100 ">
      {/* Header with Icon and Progress Circle */}
      <View className="flex-row justify-between items-center">
        {/* Left Side - Icon and Title */}
        <View className="flex-1">
          {/* Icon Container */}
          <View className="mb-1">
            <View 
              className="w-10 h-10 rounded-full items-center justify-center"
              style={{ backgroundColor: '#10B98115' }}
            >
              <PiggyBank 
                size={20} 
                color="#10B981"
                strokeWidth={2}
              />
            </View>
          </View>
          
          {/* Title */}
          <Text className="text-gray-700 text-sm font-inter-regular">
            {title}
          </Text>

            <Text className="text-2xl font-archivo-regular text-gray-800">
                {amount}
            </Text>
        </View>

        {/* Right Side - Progress Circle */}
        <View className="items-center justify-center">
          <View style={{ width: 70, height: 70 }}>
            <Svg width="70" height="70" style={{ position: 'absolute' }}>
              {/* Background Circle */}
              <Circle
                cx="35"
                cy="35"
                r={radius}
                stroke="#E5E7EB"
                strokeWidth={strokeWidth}
                fill="none"
              />
              {/* Progress Circle */}
              <Circle
                cx="35"
                cy="35"
                r={radius}
                stroke="#10B981"
                strokeWidth={strokeWidth}
                fill="none"
                strokeDasharray={strokeDasharray}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 35 35)"
              />
            </Svg>
            {/* Percentage Text */}
            <View 
              className="absolute inset-0 items-center justify-center"
              style={{ width: 70, height: 70 }}
            >
              <Text className="text-gray-800 text-sm font-semibold">
                {progress}%
              </Text>
            </View>
          </View>
        </View>
      </View>

    </View>
  );
};

export default SavingsGoalCard;