import React, { useState } from 'react';
import { View, Text, SafeAreaView , TouchableOpacity} from 'react-native';
import ComponentWrapper from '../../../components/ComponentWrapper';
import { useNavigation } from '@react-navigation/native';
import { get_budget_analysis, get_budget_suggestions } from '../ScreensAPI';
import Indicator from '../../../components/Indicator';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { useAuth } from '../../../context/AuthProvider';

const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const budgetDataFromAPI = [
    { "month": "Jan", "totalBudget": 2000 },
    { "month": "Feb", "totalBudget": 0 },
    { "month": "Mar", "totalBudget": 10 },
    { "month": "Apr", "totalBudget": 300 },
    { "month": "May", "totalBudget": 3000 },
    { "month": "Jun", "totalBudget": 11100 },
    { "month": "Jul", "totalBudget": 500 },
    { "month": "Aug", "totalBudget": 100 },
    { "month": "Sep", "totalBudget": 5000 },
    { "month": "Oct", "totalBudget": 5650 },
    { "month": "Nov", "totalBudget": 2000 },
    { "month": "Dec", "totalBudget": 1000 }
];

const BarChart = ({budgetDataFromAPI}) => {

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

  const getBudgetExpensesData = () => {
    const months = getLast6Months();
    
    const budgetMap = budgetDataFromAPI.reduce((acc, item) => {
        acc[item.month] = item.totalBudget;
        return acc;
    }, {});

    return months.map(month => ({
      month,
      amount: budgetMap[month] !== undefined ? budgetMap[month] : 0
    }));
  };

  const expenseData = getBudgetExpensesData();
  
  const trueMaxAmount = Math.max(...expenseData.map(item => item.amount));
  
 
  const SCALING_CAP = 15000; 
  
  const chartHeight = 135; 


  const chartData = expenseData.map(item => {
  
    const scaledAmount = Math.min(item.amount, SCALING_CAP); 
    
    const referenceMax = SCALING_CAP;
    
    const height = referenceMax > 0 
      ? Math.max((scaledAmount / referenceMax) * chartHeight, 4) 
      : 4; 

    return {
      ...item,
      height: height
    };
  });

  const getYAxisLabels = () => {
    const displayMax = SCALING_CAP; 

    return [
      `£${formatNumber(displayMax)}${trueMaxAmount > displayMax ? '+' : ''}`, 
      `£${formatNumber(Math.round(displayMax * 0.75))}`, // £11,250
      `£${formatNumber(Math.round(displayMax * 0.5))}`,  // £7,500
      `£${formatNumber(Math.round(displayMax * 0.25))}`, // £3,750
      '£0'
    ];
  };

  const yAxisLabels = getYAxisLabels();

  return (
    <View className="bg-white rounded-2xl p-6 mb-6 ">
      {/* Chart Header */}
      <Text className="text-gray-900 font-semibold text-lg mb-6">
        Monthly Budget
      </Text>

      {/* Y-axis Labels and Chart Container */}
      <View className="flex-row">
        {/* Y-axis Labels */}
        <View className="mr-3">
          <View className="h-40 justify-between">
            {yAxisLabels.map((label, index) => (
              <Text key={index} className="text-gray-600 text-xs ">
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
                {/* Bar Value Display (Only for values exceeding the cap) */}
                <Text 
                  className="text-gray-700 text-xs font-semibold mb-1" 
                  style={{ position: 'absolute', bottom: data.height + 2 }}>
                    {data.amount > SCALING_CAP ? `£${formatNumber(data.amount)}` : ''}
                </Text>

                <View 
                  className="bg-[#1976D2] w-8 rounded-t-sm"
                  style={{ height: data.height }}
                />
              </View>
            ))}
          </View>

          {/* X-axis Labels */}
          <View className="flex-row justify-between px-2 mt-2">
            {chartData.map((data, index) => (
              <Text key={index} className="text-gray-600 text-xs">
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
    <Text className="text-gray-700 font-medium text-base mr-2">{number}.</Text>
    <Text className="text-gray-700 text-base flex-1">{text}</Text>
  </View>
);

export default function BudgetAnalytics() {
  const navigation = useNavigation();
  const {userProfile, authToken} = useAuth();
  const [visible, setVisible] = useState(false);
  const [budgetDataFromAPI, setBudgetDataFromAPI] = useState([]);
  const [rehoSuggestions, setRehoSuggestions] = useState([])

  const handleGetChartData = () => {
    setVisible(true);

    get_budget_analysis(res => {

      if(res){
        setBudgetDataFromAPI(res.data)
      }else{

      }

      setVisible(false);
    })
  }

  const handleGetRehoSuggetions = () => {
    get_budget_suggestions(authToken.accessToken, res => {
      if(res){
        console.log(JSON.stringify(res, null, 2), "Reho budget suggestion")
      }
    })
  }

  useFocusEffect(
    useCallback(() => {
      handleGetChartData()
    }, [])
  )


  const suggestions = [
    { id: 1, text: "You are spending 15% more on entertainment" },
    { id: 2, text: "Consider Cutting Down on Subscriptions" },
    { id: 3, text: "Reduce Transportation Costs by 10%" }
  ];

  return (
    <ComponentWrapper bg_color='bg-[#1976D2]' title='Dashboard chart'>
        <View className=" pt-4 flex-1 bg-[##e7eaef]">
            {/* Bar Chart Component */}
            <BarChart budgetDataFromAPI={budgetDataFromAPI} />

            {/* AI Suggestions Section */}
            <View className="rounded-2xl ">
            
            
            {userProfile?.user?.subscriptionId?
              <View>
                <Text className="text-gray-900 font-bold text-lg mb-4">
                ReHo Suggests:
              </Text>
              {
                suggestions.map((suggestion) => (
                  <AIsuggestion
                    key={suggestion.id}
                    number={suggestion.id}
                    text={suggestion.text}
                  />
                ))
              }



              </View>:

            <View> 

              <TouchableOpacity onPress={() => navigation.navigate("PremiumFinancialAdvice")} className="bg-[#1976D2] p-4 rounded-sm">
                <Text className="text-white text-center font-archivo-semi-bold text-md">Subscribe to optimize budget with ReHo </Text>
              </TouchableOpacity>

            </View>
          
          
            }
            </View>
        </View>

          

          {visible && <Indicator visible={visible} onClose={() => setVisible(false)}>
              <ActivityIndicator size={"large"}/>
            </Indicator>}
        
    </ComponentWrapper>
  );
}