import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { ChevronDown, Calendar, Clock, MapPin, ConstructionIcon } from 'lucide-react-native';
import AppHeader from '../../../../components/AppHeader';
import ComponentWrapper from '../../../../components/ComponentWrapper';
import { useNavigation } from '@react-navigation/native';
import { calculate_regular_savings } from '../../ScreensAPI';
import Indicator from '../../../../components/Indicator';
import { ActivityIndicator } from 'react-native';
import ToastMessage from '../../../../constants/ToastMessage';
import vi from 'dayjs/locale/vi';


const FinancialForm = () => {

  const [budget, setBudget] = useState('');
  const [repeatEvery, setRepeatEvery] = useState('Monthly');
 
  const [showDropdown, setShowDropdown] = useState(false);
  const [returnRate, setReturnRate] = useState("")
  const [inflationRate, setInflationRate] = useState("")
  const [taxation, setTaxation] = useState("")
  const [taxationDropdown, setTaxationDropdown] = useState(false);

  const taxationOptions = ["20% BRT"]

  const repeatOptions = ['Daily', 'Weekly', 'Monthly', 'Yearly'];
  const navigation = useNavigation()


  const [visible, setVisible]  = useState(false);


  const handleCalculateSavings = () => {
    const payload = {
        amount: Number(budget),
        frequency: repeatEvery,
        returnRate:parseInt(returnRate),
        years:1,
        inflationRate:parseInt(inflationRate),
        taxRate:parseInt(taxation)
    }

    setVisible(true);

    console.log(payload)

    calculate_regular_savings(payload, res => {
        if(res){
            navigation.navigate("FinancialSummary", {...res.data})
            //console.log(res.data);
        }else{
            ToastMessage("error", "Faild to calculate, try again!")
        }

        setVisible(false);
    })




  }

  return (
    <ComponentWrapper title='Regular Savings' bg_color='bg-[#2E7D32]' >
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="">
            

            {/* Budget Field */}
            <View className="mb-6">
            <Text className="text-lg font-archivo-semi-bold text-gray-900 mb-3">
                Amount
            </Text>
            <TextInput
                className="bg-white rounded-[5px] px-4 py-4 text-lg text-gray-900"
                placeholder="£85"
                placeholderTextColor="#9CA3AF"
                value={budget}
                onChangeText={setBudget}
                keyboardType="numeric"
            />
            </View>

            {/* Repeat Every Dropdown */}
            <View className="mb-6">
            <Text className="text-lg font-archivo-semi-bold text-gray-900 mb-3">
                Frequency:
            </Text>
            <TouchableOpacity
                className="bg-white rounded-[5px] px-4 py-4 flex-row items-center justify-between"
                onPress={() => setShowDropdown(!showDropdown)}
            >
                <Text className="text-lg text-gray-900">{repeatEvery}</Text>
                <ChevronDown size={20} color="#6B7280" />
            </TouchableOpacity>
            
            {showDropdown && (
                <View className="bg-white rounded-[5px] mt-2 shadow-sm">
                {repeatOptions.map((option, index) => (
                    <TouchableOpacity
                    key={index}
                    className="px-4 py-3 border-b border-gray-100 last:border-b-0"
                    onPress={() => {
                        setRepeatEvery(option);
                        setShowDropdown(false);
                    }}
                    >
                    <Text className="text-lg text-gray-900">{option}</Text>
                    </TouchableOpacity>
                ))}
                </View>
            )}
            </View>


            <View className="mb-6">
            <Text className="text-lg font-archivo-semi-bold text-gray-900 mb-3">
                Return Rate(%)
            </Text>
            <TextInput
                className="bg-white rounded-[5px] px-4 py-4 text-lg text-gray-900"
                placeholder="5%"
                placeholderTextColor="#9CA3AF"
                value={returnRate}
                onChangeText={setReturnRate}
                keyboardType="numeric"
            />
            </View>

            <View className="mb-6">
            <Text className="text-lg font-archivo-semi-bold text-gray-900 mb-3">
                Inflation Rate (Years):
            </Text>
            <TextInput
                className="bg-white rounded-[5px] px-4 py-4 text-lg text-gray-900"
                placeholder="1"
                placeholderTextColor="#9CA3AF"
                value={inflationRate}
                onChangeText={setInflationRate}
                keyboardType="numeric"
            />
            </View>



        
            <View className="mb-6">
            <Text className="text-lg font-archivo-semi-bold text-gray-900 mb-3">
                Taxation Rate
            </Text>
            <TextInput
                className="bg-white rounded-[5px] px-4 py-4 text-lg text-gray-900"
                placeholder="1"
                placeholderTextColor="#9CA3AF"
                value={taxation}
                onChangeText={setTaxation}
                keyboardType='numeric'
            />
            {/* <TouchableOpacity
                className="bg-white rounded-[5px] px-4 py-4 flex-row items-center justify-between"
                onPress={() => setTaxationDropdown(!taxationDropdown)}
            >
                <Text className="text-lg text-gray-900">{taxation}</Text>
                <ChevronDown size={20} color="#6B7280" />
            </TouchableOpacity> */}
            
            {taxationDropdown && (
                <View className="bg-white rounded-[5px] mt-2 shadow-sm">
                {taxationOptions.map((option, index) => (
                    <TouchableOpacity
                    key={index}
                    className="px-4 py-3 border-b border-gray-100 last:border-b-0"
                    onPress={() => {
                        setTaxation(option);
                        setTaxationDropdown(false);
                    }}
                    >
                    <Text className="text-lg text-gray-900">{option}</Text>
                    </TouchableOpacity>
                ))}
                </View>
            )}
            </View>


            {/* Save Button */}
            <TouchableOpacity onPress={() => handleCalculateSavings()} className="bg-[#2E7D32] rounded-[5px] py-3 items-center ">
            <Text className="text-white text-lg font-semibold">
                Calculate Savings
            </Text>
            </TouchableOpacity>

        </View>
        </ScrollView>


        {visible && <Indicator visible={visible} onClose={() => setVisible(false)}>
            
                <ActivityIndicator size={"large"}/>
            </Indicator>}
    </ComponentWrapper>
  );
};

export default FinancialForm
;