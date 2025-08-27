import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
  Modal
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CommponentWrapper from '../../../../components/ComponentWrapper';



// Add Debt Form Screen
const AddDebtScreen = () => {
    const [newDebt, setNewDebt] = useState({
        name: '',
        amount: '',
        interestRate: '',
        monthlyPayment: '',
        adHocPayment: '',
        capitalRepayment: '',
        interestRepayment: '',
        dueDate: ''
    });

    const navigation = useNavigation()

return <CommponentWrapper title='Add Debt' bg_color='bg-[#FFA950]'>
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
            <View className="space-y-4">
            <View>
                <Text className="text-gray-800 font-medium mb-2">Debt Name</Text>
                <TextInput
                value={newDebt.name}
                onChangeText={(text) => setNewDebt(prev => ({...prev, name: text}))}
                placeholder="Loan name"
                className="bg-white rounded-xl p-4 text-gray-800"
                placeholderTextColor="#9CA3AF"
                />
            </View>

            <View>
                <Text className="text-gray-800 font-medium mb-2">Amount</Text>
                <TextInput
                value={newDebt.amount}
                onChangeText={(text) => setNewDebt(prev => ({...prev, amount: text}))}
                placeholder="£5000"
                className="bg-white rounded-xl p-4 text-gray-800"
                placeholderTextColor="#9CA3AF"
                />
            </View>

            <View>
                <Text className="text-gray-800 font-medium mb-2">Interest Rate%</Text>
                <TextInput
                value={newDebt.interestRate}
                onChangeText={(text) => setNewDebt(prev => ({...prev, interestRate: text}))}
                placeholder="8"
                className="bg-white rounded-xl p-4 text-gray-800"
                placeholderTextColor="#9CA3AF"
                />
            </View>

            <View>
                <Text className="text-gray-800 font-medium mb-2">Monthly Payment</Text>
                <TextInput
                value={newDebt.monthlyPayment}
                onChangeText={(text) => setNewDebt(prev => ({...prev, monthlyPayment: text}))}
                placeholder="monthly Payment"
                className="bg-white rounded-xl p-4 text-gray-800"
                placeholderTextColor="#9CA3AF"
                />
            </View>

            <View>
                <Text className="text-gray-800 font-medium mb-2">Ad-Hoc Payment</Text>
                <TextInput
                value={newDebt.adHocPayment}
                onChangeText={(text) => setNewDebt(prev => ({...prev, adHocPayment: text}))}
                placeholder="Ad-hoc Payment"
                className="bg-white rounded-xl p-4 text-gray-800"
                placeholderTextColor="#9CA3AF"
                />
            </View>

            <View>
                <Text className="text-gray-800 font-medium mb-2">Breakdown</Text>
            </View>

            <View>
                <Text className="text-gray-800 font-medium mb-2">Capital Repayment</Text>
                <TextInput
                value={newDebt.capitalRepayment}
                onChangeText={(text) => setNewDebt(prev => ({...prev, capitalRepayment: text}))}
                placeholder="£15"
                className="bg-white rounded-xl p-4 text-gray-800"
                placeholderTextColor="#9CA3AF"
                />
            </View>

            <View>
                <Text className="text-gray-800 font-medium mb-2">Interest Repayment</Text>
                <TextInput
                value={newDebt.interestRepayment}
                onChangeText={(text) => setNewDebt(prev => ({...prev, interestRepayment: text}))}
                placeholder="£50"
                className="bg-white rounded-xl p-4 text-gray-800"
                placeholderTextColor="#9CA3AF"
                />
            </View>

            <View>
                <Text className="text-gray-800 font-medium mb-2">Pay Due Date</Text>
                <View className="bg-white rounded-xl p-4 flex-row items-center">
                <View className="w-5 h-5 bg-gray-300 rounded mr-3" />
                <Text className="text-gray-400">Payment Due Date</Text>
                </View>
            </View>

            <TouchableOpacity onPress={()=> navigation.goBack()} className="bg-orange-400 rounded-xl py-4 mt-6">
                <Text className="text-white font-semibold text-center text-lg">Save</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
</CommponentWrapper>
};


export default AddDebtScreen