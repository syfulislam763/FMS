import React, { useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image
} from 'react-native';
import ComponentWrapper from '../../../../components/ComponentWrapper';
import { useNavigation, CommonActions } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { useAuth } from '../../../../context/AuthProvider';
import { get_ad } from '../../ScreensAPI';

const FinancialSummary = () => {
  const route = useRoute();

  const [adData, setAdData] = useState(null)


  const {isSubscribed} = useAuth()
  
  
  const handleGetAdData = () => {
      get_ad(res => {
          if(res){
              setAdData(res?.data);
          }
      })
  }

  useFocusEffect(
      useCallback(() => {
          handleGetAdData()
      }, [])
  )


  console.log(adData)

  const financialData = {
    totalSaved: route.params.totalSavedBeforeTax,
    afterTax: route.params.afterTax,
    inflationAdjusted: route.params.inflationAdjustedValue,
    netGain: route.params.netGain,
    monthlyDecrease: 5060.00
  };

  const navigation = useNavigation()

  const SummaryRow = ({ label, amount, isLast = false }) => (
    <View className={`flex-row justify-between items-center ${!isLast ? 'mb-4' : ''}`}>
      <Text className="text-gray-900 text-base font-normal">{label}</Text>
      <Text className="text-gray-900 text-base font-medium">
        £{typeof amount === 'number' ? amount.toLocaleString() : amount}
      </Text>
    </View>
  );

  return (
    <ComponentWrapper  title='Calculator Results' bg_color='bg-[#2E7D32]' >
      <ScrollView className="flex-1 py-6">
        {/* Financial Summary Card */}
        <View className="bg-white rounded-[7px] p-6 mb-4">
          <SummaryRow 
            label="Total Saved(Before Tax)" 
            amount={financialData.totalSaved} 
          />
          <SummaryRow 
            label="After Tax:" 
            amount={financialData.afterTax} 
          />
          <SummaryRow 
            label="Inflation Adjusted Value:" 
            amount={financialData.inflationAdjusted} 
          />
          <SummaryRow 
            label="Net Gain:" 
            amount={financialData.netGain} 
            isLast={true}
          />
        </View>

        {/* Financial Tip Card */}
        <View className="bg-white rounded-[7px] p-6 mb-4">
          <View className="flex-row items-center mb-3">
            <Text className="text-green-600 text-lg mr-2">💡</Text>
            <Text className="text-green-600 text-lg font-semibold">Financial Tip</Text>
          </View>
          <Text className="text-gray-500 text-sm leading-6">
            Your monthly disposable Income will decrease by %{financialData.monthlyDecrease.toFixed(2)} due to this loan. Plan accordingly!
          </Text>
        </View>

        {/* Ads Section */}
        {!isSubscribed && <View className="bg-gray-100 p-2 rounded-[5px] items-center justify-center min-h-[120px]">
            {(adData)?
                <Image
                    source={{uri: adData?.url}}
                    style={{
                        objectFit:'cover'
                    }}
                    className="min-h-[120px] w-full"
                />:
                
                <View className=" ">
                    <Text className="text-gray-700 text-xl font-medium">Ads</Text>
                </View>
                
        
            }
        </View>}
      </ScrollView>
    </ComponentWrapper>
  );
};

export default FinancialSummary;