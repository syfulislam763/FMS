import React from 'react';
import { View, Text, TouchableOpacity, Pressable, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ComponentWrapper from '../../../../components/ComponentWrapper';
import Card from './Card';

const DebtListComponent = () => {
    const navigation = useNavigation();

    const data = [
        {},
        {},
        {}
    ]



    const renderItem = (data) => {

        return <Pressable onPress={()=>navigation.navigate("LoanDetailComponent")} className="">
            <Card/>
        </Pressable>
    }
  return (
    <ComponentWrapper title='Debt Management' bg_color='bg-[#FFA950]' >
     

        {/* Debt List Header */}
        <View className="flex-row items-center justify-between mb-6">
            <Text className="text-gray-900 text-xl font-semibold">Debt List</Text>
            <TouchableOpacity>
            <Text className="text-orange-400 font-medium underline">All</Text>
            </TouchableOpacity>
        </View>

        <FlatList 
            data={data}
            keyExtractor={(it, idx) => idx.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
        />
        {/* Student Loan Card */}
        
    </ComponentWrapper>
  );
};




export default DebtListComponent;