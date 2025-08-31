import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import AppHeader from '../../../../components/AppHeader';
import BackButtion from '../../../../components/BackButtion';
import { useNavigation } from '@react-navigation/native';

const BarChart = () => {
  // Function to get last 6 months including current month
  const getLast6Months = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    
    const last6Months = [];
    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      last6Months.push(months[monthIndex]);
    }
    
    return last6Months;
  };

  // Sample expense data - you can replace this with your actual data
  const getExpenseData = () => {
    const months = getLast6Months();
    
    // Sample data - replace with your actual expense data
    const sampleExpenses = {
      'Jan': 500,
      'Feb': 150,
      'Mar': 100,
      'Apr': 600,
      'May': 300,
      'Jun': 50,
      'Jul': 450,
      'Aug': 380,
      'Sep': 250,
      'Oct': 420,
      'Nov': 180,
      'Dec': 320
    };

    return months.map(month => ({
      month,
      amount: sampleExpenses[month] || 0
    }));
  };

  const expenseData = getExpenseData();
  
  // Calculate max amount for scaling
  const maxAmount = Math.max(...expenseData.map(item => item.amount));
  const chartHeight = 135; // 24 * 4 (h-24 = 96px)
  
  // Add height calculation for each bar
  const chartData = expenseData.map(item => ({
    ...item,
    height: maxAmount > 0 ? Math.max((item.amount / maxAmount) * chartHeight, 4) : 4 // Minimum height of 4px
  }));

  // Generate Y-axis labels based on data
  const getYAxisLabels = () => {
    const step = Math.ceil(maxAmount / 4);
    return [
      `£${maxAmount}`,
      `£${Math.round(maxAmount * 0.75)}`,
      `£${Math.round(maxAmount * 0.5)}`,
      `£${Math.round(maxAmount * 0.25)}`,
      '£0'
    ];
  };

  const yAxisLabels = getYAxisLabels();

  return (
    <View className="bg-white rounded-2xl p-6 mb-6 ">
      {/* Chart Header */}
      <Text className="text-gray-900 font-archivo-semi-bold text-lg mb-6">
        Monthly Expenses
      </Text>

      {/* Y-axis Labels and Chart Container */}
      <View className="flex-row">
        {/* Y-axis Labels */}
        <View className="mr-3">
          <View className="h-40 justify-between">
            {yAxisLabels.map((label, index) => (
              <Text key={index} className="text-gray-600 font-archivo-regular text-sm ">
                {label}
              </Text>
            ))}
          </View>
        </View>

        {/* Chart Bars Container */}
        <View className="flex-1">
          {/* Chart Area */}
          <View className="h-40 flex-row items-end justify-between px-2">
            {chartData.map((data, index) => (
              <View key={index} className="items-center">
                {/* Bar */}
                <View 
                  className="bg-red-500 w-8 rounded-t-sm"
                  style={{ height: data.height }}
                />
              </View>
            ))}
          </View>

          {/* X-axis Labels */}
          <View className="flex-row justify-between px-2 mt-2">
            {chartData.map((data, index) => (
              <Text key={index} className="text-gray-600 font-inter-regular text-xs">
                {data.month}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};

const AIsuggestion = ({ number, text }) => (
  <View className="flex-row mb-3">
    <Text className="text-gray-700 font-archivo-regular text-base mr-2">{number}.</Text>
    <Text className="text-gray-700 text-base flex-1">{text}</Text>
  </View>
);

export default function ExpenseAnalytics() {
  const navigation = useNavigation();

  const suggestions = [
    { id: 1, text: "You are spending 15% more on entertainment" },
    { id: 2, text: "Consider Cutting Down on Subscriptions" },
    { id: 3, text: "Reduce Transportation Costs by 10%" }
  ];

  return (
    <SafeAreaView className="flex-1 bg-red-500">
      {/* Header with Back Button */}
      <View className="px-5 pb-3">
            <AppHeader
                left={()=> <BackButtion/>}
                middle={() => <Text className="text-white font-archivo-semi-bold text-2xl">Analytics Chart</Text>}
            />
        </View>
      
      <View className="px-6 pt-4 flex-1 bg-[##e7eaef]">
        {/* Bar Chart Component */}
        <BarChart />

        {/* AI Suggestions Section */}
        <View className="rounded-2xl ">
          <Text className="text-gray-900 font-archivo-semi-bold text-lg mb-4">
            AI Suggestions:
          </Text>
          
          {suggestions.map((suggestion) => (
            <AIsuggestion
              key={suggestion.id}
              number={suggestion.id}
              text={suggestion.text}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}