import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import ComponentWrapper from '../../../../components/ComponentWrapper';
import { useFocusEffect } from '@react-navigation/native';
import Indicator from '../../../../components/Indicator';
import { ActivityIndicator } from 'react-native';
import { useCallback } from 'react';
import { get_debt_suggestions } from '../../ScreensAPI';
import { useAuth } from '../../../../context/AuthProvider';

const AISuggestionsComponent = () => {

    const {authToken} = useAuth();
    const [visible, setVisible] = useState(false);

    const handleGetDebtSuggestion = () => {
        setVisible(true);
        get_debt_suggestions(authToken.accessToken, res => {
            
            if(res){
                console.log("Debt suggestions", JSON.stringify(res, null, 2))
            }else{

            }

            setVisible(false);
        })
    }


  return (
    <ComponentWrapper title='AI Suggestions' bg_color='bg-[#FFA950]'>
        <ScrollView className="flex-1">
        {/* Header */}
        <Text className="text-gray-900 text-xl font-bold mb-8">
            AI Suggestions to Pay Off Faster
        </Text>

        {/* Suggestions List */}
        <View className="space-y-8">
            {/* Suggestion 1 */}
            <View>
            <Text className="text-gray-900 text-lg font-semibold mb-3">
                1. Pay Extra Toward Capital
            </Text>
            <Text className="text-gray-600 text-base leading-6">
                Add £500–£1000 more each month only toward the loan balance to reduce interest faster.
            </Text>
            </View>

            {/* Suggestion 2 */}
            <View>
            <Text className="text-gray-900 text-lg font-semibold mb-3">
                2. Refinance the Loan
            </Text>
            <Text className="text-gray-600 text-base leading-6">
                Find a lower-interest loan (5–6%) and use it to pay off this one. That will save thousands in interest.
            </Text>
            </View>

            {/* Suggestion 3 */}
            <View>
            <Text className="text-gray-900 text-lg font-semibold mb-3">
                3. Use Bi-weekly Payments
            </Text>
            <Text className="text-gray-600 text-base leading-6">
                Split monthly payments in half and pay every 2 weeks. This results in 1 extra payment per year, reducing total time and interest.
            </Text>
            </View>

            {/* Suggestion 4 */}
            <View>
            <Text className="text-gray-900 text-lg font-semibold mb-3">
                4. Increase Your Income
            </Text>
            <Text className="text-gray-600 text-base leading-6">
                Any side income (freelancing, part-time) should go straight to capital repayment.
            </Text>
            </View>
        </View>
        </ScrollView>


        {visible && <Indicator onClose={() => setVisible(false)} visible={visible}>
            
                <ActivityIndicator size={"large"}/>
            </Indicator>}
    </ComponentWrapper>
  );
};

export default AISuggestionsComponent;