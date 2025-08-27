import React from 'react';
import { View, Text, Image } from 'react-native';
import { Lightbulb } from 'lucide-react-native';
import CommponentWrapper from '../../../../components/ComponentWrapper';

const FutureValueProjection = () => {
  return (
    <CommponentWrapper title='Inflation Calculator Results'>
        <View className="flex-1 bg-gray-50 p-4">
            {/* Main Card */}
            <View className="bg-white rounded-2xl p-6 mb-4 shadow-sm">
                {/* Header */}
                <Text className="text-gray-700 text-lg font-medium text-center mb-4">
                Future Value Projection
                </Text>
                
                {/* Amount */}
                <Text className="text-red-500 text-4xl font-bold text-center mb-6">
                £132.27
                </Text>
                
                {/* Description */}
                <Text className="text-gray-500 text-sm text-center leading-5 mb-8">
                This is the estimated cost of an item{'\n'}
                currently worth $1,000.00 in 5{'\n'}
                years, assuming an average annual{'\n'}
                inflation rate of 3%.
                </Text>
                
                {/* Icons Row */}
                <View className="flex-row justify-center items-center space-x-6">
                {/* Pound Icon Container */}
                <View className="w-10 h-10 border-2 border-red-500 rounded-md flex items-center justify-center">
                    <Text className="text-red-500 text-lg font-bold">£</Text>
                </View>
                
                {/* Coin Image */}
                <View className="w-10 h-10">
                    <View className="w-full h-full bg-yellow-600 rounded-full border-2 border-yellow-700 flex items-center justify-center">
                    <Text className="text-yellow-100 text-xs font-bold">£</Text>
                    </View>
                </View>
                </View>
            </View>
            
            {/* Information Card */}
            <View className="bg-white rounded-2xl p-4 shadow-sm">
                {/* Header with Icon */}
                <View className="flex-row items-center mb-3">
                <Lightbulb size={18} color="#ef4444" fill="#ef4444" />
                <Text className="text-red-500 text-base font-semibold ml-2">
                    Understanding Inflation
                </Text>
                </View>
                
                {/* Description */}
                <Text className="text-gray-700 text-sm leading-5">
                Inflation erodes purchasing power over time.{'\n'}
                A small annual rate can have a significant{'\n'}
                impact on future costs.
                </Text>
            </View>
            </View>
    </CommponentWrapper>
  );
};

export default FutureValueProjection;