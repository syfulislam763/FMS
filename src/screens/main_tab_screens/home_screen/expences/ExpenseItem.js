import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image, ActivityIndicator, FlatList } from 'react-native';
import { ShoppingBag, Home, Zap, Building2, Briefcase, Shirt, Plus, MinusCircle } from 'lucide-react-native';
import AppHeader from '../../../../components/AppHeader';
import BackButtion from '../../../../components/BackButtion';
import { useNavigation } from '@react-navigation/native';
import PrimaryButton from '../../../../components/PrimaryButton';
import { get_expence, get_formated_time, delete_expence } from '../../ScreensAPI';
import Indicator from '../../../../components/Indicator';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';
import { Swipeable } from 'react-native-gesture-handler';
import { Trash2 } from 'lucide-react-native';
import ToastMessage from '../../../../constants/ToastMessage';
import { SafeAreaView } from 'react-native-safe-area-context';


const icons = {
  'Mortgage or Rent': require("../../../../../assets/expence/Holiday-Expenses.png"),
  'Building or Home insurance': require("../../../../../assets/expence/Building-and-Home-Insurance-Expenses.png"),
  'Travel expenses': require("../../../../../assets/expence/Travel-Expenses.png"),
  'Car insurance': require("../../../../../assets/expence/Car-Insurance-Expenses.png"),
  'Food and grocery shopping':require("../../../../../assets/expence/Food-and-grocery-shopping-expenses.png"),
  'Childcare cost': require("../../../../../assets/expence/Childcare-cost-Expenses.png"),
  'Clothing': require("../../../../../assets/expence/Clothing-Expenses.png"),
  'Gas Bill': require("../../../../../assets/expence/Gas-Bill-Expenses.png"),
  'Electricity Bill': require("../../../../../assets/expence/Electricity-Bill-Expenses.png"),
  'Water Bill': require("../../../../../assets/expence/Broadband-Expenses.png"),
  'Broadband cost': require("../../../../../assets/expence/Broadband-Expenses.png"),
  'Mobile phone bill': require("../../../../../assets/expence/Mobile-Phone-Expenses.png"),
  'Entertainment': require("../../../../../assets/expence/Entertainment-Expenses.png"),
  'Credit card': require("../../../../../assets/expence/Credit-card-expenses.png"),
  'Student Loan': require("../../../../../assets/expence/Student-Loan-Expenses.png"),
  'Loans': require("../../../../../assets/expence/Loans-Expenses.png"),
  'Personal Upkeep': require("../../../../../assets/expence/Personal-Upkeep-Expenses.png"),
  'Health Insurance': require("../../../../../assets/expence/Health-Insurance-Expenses.png"),
  'Gym Membership': require("../../../../../assets/expence/Gym-Membership-Expenses.png"),
  'Sport Membership': require("../../../../../assets/expence/Holiday-Expenses.png"),
  'Life insurance': require("../../../../../assets/expence/Holiday-Expenses.png"),
  'TV Licence': require("../../../../../assets/expence/Holiday-Expenses.png"),
  'Council Tax': require("../../../../../assets/expence/Council-Tax-Expenses.png"),
  'Subscription i.e. TV packages, netflix': require("../../../../../assets/expence/Subscriptions-Expenses.png"),
  'Other': require("../../../../../assets/expence/Holiday-Expenses.png")
};

export default function ExpenseItem() {

    const navigation = useNavigation();
    const [expenceList, setExpenceList] = useState([]);
    const [visible, setVisible] = useState(false);
    const [totalExpence, setTotalExpence] = useState(0);

    const handleGetExpence = () => {
      setVisible(true);
      get_expence(res => {
        if(res){
          const temp = res.data.map(item => {
            const d = get_formated_time(item.createdAt);
            return {
              id: item._id,
              userId: item.userId,
              title: item.name,
              date: d.month+" "+d.day+", "+d.year,
              amount: Number(item.amount),
              icon: icons[item.name] ? icons[item.name] : '',
              iconBg: 'bg-pink-100'
            }
          });

          let sum = 0;
          temp.forEach(item => {
            sum += item.amount;
          });
          
          setExpenceList(temp);
          setTotalExpence(sum);
        }
        setVisible(false);
      });
    };

    useFocusEffect(
      useCallback(() => {
        handleGetExpence();
      }, [])
    );

    const handleDelete = (id) => {
      setVisible(true);

      delete_expence(id, res => {
        if(res){
          const updatedList = expenceList.filter(item => item.id !== id);
          
          setExpenceList(updatedList);
          
          let newTotal = 0;
          updatedList.forEach(item => {
            newTotal += item.amount;
          });
          setTotalExpence(newTotal);
          ToastMessage("success", "Deleted successfully!", 2000);
        }
        setVisible(false);
      });
    };

    const renderRightActions = (id) => {
      return (
        <TouchableOpacity
          onPress={() => handleDelete(id)}
          className="bg-red-500 justify-center items-center px-6 rounded-r-[7px] mb-2"
          style={{ opacity: 0.9 }}
        >
          <Trash2 color="white" />
        </TouchableOpacity>
      );
    };

    return (
      <SafeAreaView className="flex-1 bg-red-500 ">
          <View className="px-5 pb-3">
              <AppHeader
                  left={()=> <BackButtion/>}
                  middle={() => <Text className="text-white font-archivo-semi-bold text-2xl">Expenses</Text>}
              />
          </View>

          <View className="h-full bg-[##e7eaef] px-5">
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
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                  <Swipeable
                    renderRightActions={() => renderRightActions(item.id)}
                    overshootRight={false}
                    rightThreshold={40}
                  >
                    <View className="bg-white rounded-[7px] p-3 mb-2">
                      <View className="flex-row items-center">
                        {/* Icon Container */}
                        <View className={`w-12 h-12 ${item.iconBg} rounded-xl items-center justify-center mr-4`}>
                          {item.icon && <Image
                            source={item.icon}
                            className="w-12 h-12"
                            style={{
                              objectFit:'contain'
                            }}
                          />}
                        </View>
                        
                        {/* Content */}
                        <View className="flex-1">
                          <Text className="text-gray-900 font-inter-semi-bold text-lg mb-1">
                            {item.title}
                          </Text>
                          <Text className="text-gray-500 font-inter-regular text-sm">
                            {item.date}
                          </Text>
                        </View>
                        
                        {/* Amount */}
                        <Text className="text-red-500 font-inter-semi-bold text-lg">
                          £{item.amount}
                        </Text>
                      </View>
                    </View>
                  </Swipeable>
                )}
              />

              <View className="my-20">
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
                  </View>
                  
                  <PrimaryButton 
                      bgColor='bg-red-500'
                      text='Start Optimization Expenses With ReHo'
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