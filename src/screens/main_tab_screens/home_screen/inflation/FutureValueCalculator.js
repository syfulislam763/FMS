


import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Image
} from 'react-native';
import CommponentWrapper from '../../../../components/ComponentWrapper';
import { useNavigation } from '@react-navigation/native';

const coin = require("../../../../../assets/img/coin.png")

const FutureValueCalculator = () => {
  const [activeTab, setActiveTab] = useState('future');
  const [futureValues, setFutureValues] = useState({
    initialAmount: '1000',
    inflationRate: '3',
    yearsToProject: '5'
  });
  const [historicalValues, setHistoricalValues] = useState({
    fromYear: '2021',
    toYear: '2025',
    amount: '£100',
    multiplier: 'Auto Fill'
  });

  const tableData = [
    { year: '2021', value: '£100', rate: '6.5%' },
    { year: '2022', value: '£132', rate: '7%' },
    { year: '2023', value: '£140', rate: '7.5%' },
    { year: '2025', value: '£142', rate: '8.0%' },
    { year: '2025', value: '£146', rate: '8.5%' }
  ];
  const navigation = useNavigation()

  const TabButton = ({ title, isActive, onPress }) => (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-1 py-3 px-4 rounded-[5px] ${
        isActive 
          ? 'bg-red-50 border-2 border-red-500' 
          : 'bg-transparent border-2 border-transparent'
      }`}
    >
      <Text className={`text-center text-sm font-medium ${
        isActive ? 'text-red-500' : 'text-gray-700'
      }`}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const InputField = ({ label, value, onChangeText, placeholder }) => (
    <View className="mb-6">
      <Text className="text-gray-800 text-lg font-medium mb-3">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        className="w-full bg-white rounded-[5px] p-4 text-lg border border-gray-200 text-gray-800"
        placeholderTextColor="#9CA3AF"
      />
    </View>
  );

  const TableRow = ({ year, value, rate, isHeader = false }) => (
    <View className="flex-row">
      <View className={`flex-1 p-3 border-r border-gray-200 ${
        isHeader ? 'bg-gray-50' : 'bg-white border-t'
      }`}>
        <Text className={`text-sm ${
          isHeader ? 'text-gray-700 font-medium' : 'text-gray-800'
        }`}>
          {year}
        </Text>
      </View>
      <View className={`flex-1 p-3 border-r border-gray-200 ${
        isHeader ? 'bg-gray-50' : 'bg-white border-t'
      }`}>
        <Text className={`text-sm ${
          isHeader ? 'text-gray-700 font-medium' : 'text-gray-800'
        }`}>
          {value}
        </Text>
      </View>
      <View className={`flex-1 p-3 ${
        isHeader ? 'bg-gray-50' : 'bg-white border-t border-gray-200'
      }`}>
        <Text className={`text-sm ${
          isHeader ? 'text-gray-700 font-medium' : 'text-gray-800'
        }`}>
          {rate}
        </Text>
      </View>
    </View>
  );

  return (
    <CommponentWrapper container_bg='bg-white' title='Inflation Calculator'>
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 pt-8 bg-gray-50 px-3 border border-gray-200 rounded-[5px]">
        {/* Tab Switcher */}
        <View className="flex-row bg-gray-100 rounded-[5px] mb-6">
          <TabButton
            title="Future Value"
            isActive={activeTab === 'future'}
            onPress={() => setActiveTab('future')}
          />
          <TabButton
            title="Historical Value"
            isActive={activeTab === 'historical'}
            onPress={() => setActiveTab('historical')}
          />
        </View>

        {activeTab === 'future' ? (
          // Future Value Content
          <View>
            <InputField
              label="Initial Amount"
              value={futureValues.initialAmount}
              onChangeText={(text) => setFutureValues(prev => ({...prev, initialAmount: text}))}
            />
            
            <InputField
              label="Annual Inflation Rate (%)"
              value={futureValues.inflationRate}
              onChangeText={(text) => setFutureValues(prev => ({...prev, inflationRate: text}))}
            />
            
            <InputField
              label="Years to Project"
              value={futureValues.yearsToProject}
              onChangeText={(text) => setFutureValues(prev => ({...prev, yearsToProject: text}))}
            />

            <TouchableOpacity onPress={()=> navigation.navigate("FutureValueProjection")} className="w-full bg-red-500 rounded-[5px] py-3">
              <Text className="text-white text-lg font-semibold text-center">
                Calculate Future Value
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Historical Value Content
          <View>
            <InputField
              label="From Year"
              value={historicalValues.fromYear}
              onChangeText={(text) => setHistoricalValues(prev => ({...prev, fromYear: text}))}
            />
            
            <InputField
              label="To Year"
              value={historicalValues.toYear}
              onChangeText={(text) => setHistoricalValues(prev => ({...prev, toYear: text}))}
            />
            
            <InputField
              label="Amount"
              value={historicalValues.amount}
              onChangeText={(text) => setHistoricalValues(prev => ({...prev, amount: text}))}
            />
            
            <InputField
              label="Multiplier"
              value={historicalValues.multiplier}
              onChangeText={(text) => setHistoricalValues(prev => ({...prev, multiplier: text}))}
            />

            <TouchableOpacity onPress={()=> navigation.navigate("FutureValueProjection")} className="w-full bg-red-500 rounded-[5px] py-3 mb-8">
              <Text className="text-white text-lg font-semibold text-center">
                Calculate Historical Value
              </Text>
            </TouchableOpacity>

            {/* Result Section */}
            <View>
              <Text className="text-gray-800 text-lg font-semibold mb-4">
                Equivalent of 100 in 2021 is 146 in 2025
              </Text>
              
              {/* Results Table */}
              <View className="bg-white rounded-[5px] border border-gray-200 overflow-hidden mb-10">
                {/* Table Header */}
                <TableRow year="Year" value="Value" rate="Rate" isHeader={true} />
                
                {/* Table Data */}
                {tableData.map((row, index) => (
                  <TableRow
                    key={index}
                    year={row.year}
                    value={row.value}
                    rate={row.rate}
                  />
                ))}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </CommponentWrapper>
  );
};

export default FutureValueCalculator;