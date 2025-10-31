import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { ShoppingBag, Home, Zap, Building2, Briefcase, Shirt, Plus, MinusCircle } from 'lucide-react-native';
import AppHeader from '../../../../components/AppHeader';
import BackButtion from '../../../../components/BackButtion';
import { useNavigation } from '@react-navigation/native';
import PrimaryButton from '../../../../components/PrimaryButton';
import { get_expence, get_formated_time } from '../../ScreensAPI';
import Indicator from '../../../../components/Indicator';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import ExpenseAnalytics from './ExpenseAnalytics';


const ExpenseItemCard = ({ icon: Icon, title, date, amount, iconBg, iconColor }) => (

  <View className="flex-row items-center justify-between bg-white rounded-[7px] p-3 mb-2">
    <View className="flex-row items-center flex-1">
      <View className={`w-12 h-12 rounded-xl ${iconBg} items-center justify-center mr-4`}>
        <Icon size={20} color={iconColor} />
      </View>
      <View className="flex-1">
        <Text className="text-gray-900 font-semibold text-base">{title}</Text>
        <Text className="text-gray-500 text-sm mt-1">{date}</Text>
      </View>
    </View>
    <Text className="text-red-500 font-bold text-lg">£{amount}</Text>
  </View>
);





export default function ExpenseItem() {
    const navigation = useNavigation()
    const [expenceList, setExpenceList] = useState([])
    const [visible, setVisible] = useState(false);
    const [totalExpence, setTotalExpence] = useState(0);


    const handleGetExpence = () => {
      setVisible(true);
      get_expence(res => {
        if(res){
          const temp = res.data.map(item => {
            const d = get_formated_time(item.createdAt)
            return {
              id: item._id,
              userId: item.userId,
              icon: MinusCircle,
              title: item.name,
              date: d.month+" "+d.day+", "+d.year,
              amount: Number(item.amount),
              iconBg: 'bg-pink-100',
              iconColor: '#EC4899'
            }
          })

          let sum = 0;

          temp.forEach(item => {
            sum+= item.amount;
          })
          

          setExpenceList(temp);
          setTotalExpence(sum);

        }else{

        }

        setVisible(false);
      })



    }


    useFocusEffect(
      useCallback(() => {
        handleGetExpence()
      }, [])
    )




  const expenses = [
    {
      id: 1,
      icon: ShoppingBag,
      title: 'Weekly Shopping',
      date: 'Jul 3, 2024',
      amount: '350',
      iconBg: 'bg-pink-100',
      iconColor: '#EC4899'
    },
    {
      id: 2,
      icon: Home,
      title: 'Home Rent Payment',
      date: 'Jul 7, 2024',
      amount: '120',
      iconBg: 'bg-orange-100',
      iconColor: '#F97316'
    },
    {
      id: 3,
      icon: Zap,
      title: 'Electricity Bill',
      date: 'July 15,2025',
      amount: '500',
      iconBg: 'bg-yellow-100',
      iconColor: '#EAB308'
    },
    {
      id: 4,
      icon: Building2,
      title: 'Council Tax',
      date: 'July 15,2025',
      amount: '600',
      iconBg: 'bg-green-100',
      iconColor: '#22C55E'
    },
    {
      id: 5,
      icon: Briefcase,
      title: 'Side Project Payment',
      date: 'July 15,2025',
      amount: '400',
      iconBg: 'bg-purple-100',
      iconColor: '#A855F7'
    },
    {
      id: 6,
      icon: Shirt,
      title: 'New Clothes',
      date: 'July 15,2025',
      amount: '50',
      iconBg: 'bg-pink-100',
      iconColor: '#EC4899'
    }
  ];

  const renderExpenseItem = ({ item }) => (
    <ExpenseItemCard
      icon={item.icon}
      title={item.title}
      date={item.date}
      amount={item.amount}
      iconBg={item.iconBg}
      iconColor={item.iconColor}
    />
  );

  return (
    <SafeAreaView className="flex-1 bg-red-500 ">

        <View className="px-5 pb-3">
            <AppHeader
                left={()=> <BackButtion/>}
                middle={() => <Text className="text-white font-archivo-semi-bold text-2xl">Expenses</Text>}
            />
        </View>


        <View className="flex-1 bg-[##e7eaef] px-5">
            <View className="bg-red-500 rounded-xl h-32 my-5 justify-center items-center">
                <View>
                    <Text className="text-white text-lg font-archivo-semi-bold mb-2 text-center">
                        Monthly Expenses
                    </Text>
                    <Text className="text-white text-4xl font-archivo-extra-bold text-center">
                        £{totalExpence}
                    </Text>
                </View>
            </View>

            <FlatList
                data={expenceList}
                renderItem={renderExpenseItem}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ 
                // paddingHorizontal: 0, 
                // paddingTop: 0, 
                // paddingBottom: 32 
                }}
            />
            <View className="my-5">
                <View className="flex-row-reverse items-end">
                    {/* Add New Expenses Button */}
                    <TouchableOpacity 
                        className="bg-red-500 h-14 rounded-[4px] p-3 mb-4 "
                        activeOpacity={0.8}
                        onPress={()=> navigation.navigate("AddExpenseForm")}
                    >
                        <View className="flex-row items-center justify-center">
                        <Plus size={24} color="white" />
                        <Text className="text-white font-bold text-lg ml-3">Add New Expenses</Text>
                        </View>
                    </TouchableOpacity>

                    {/* Optimize Button */}
                    
                </View>
                
                <PrimaryButton 
                    bgColor='bg-red-500'
                    text='Optimize Your Expenses With AI'
                    onPress={()=>navigation.navigate("ExpenseAnalytics")}
                />
            </View>
        </View>


        {visible && <Indicator visible={visible} onClose={() => setVisible(false)}>
            <ActivityIndicator size={"large"}/>
          </Indicator>}
    </SafeAreaView>
  );
}