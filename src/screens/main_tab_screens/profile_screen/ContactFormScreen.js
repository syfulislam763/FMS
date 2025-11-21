import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import ComponentWrapper from '../../../components/ComponentWrapper';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ContactFormScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    additionalAttendees: '',
    age: '',
    hasChildren: true,
    householdIncome: '',
    investments: 'Less than £50K',
    investmentValue: '15000',
    whatToDiscuss: '',
    whyReachingOut: '',
    askYouThis: ''
  });

  const navigation = useNavigation()

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleChildrenSelect = (value) => {
    setFormData(prev => ({ ...prev, hasChildren: value }));
  };

  const handleInvestmentSelect = (value, n) => {
    setFormData(prev => ({ ...prev, investments: value, investmentValue: String(n) }));
  };

  const handleContinue = () => {
    console.log("form", formData)
    navigation.navigate("TimeSelector", {formData: formData})
  };

  return (
    <ComponentWrapper title='Book Appointment' bg_color='bg-[#5055ba]'>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView className="flex-1 bg-gray-200" showsVerticalScrollIndicator={false}>
          <View className="">
            
            <View className="mb-4">
              <Text className="text-gray-800 text-base mb-2 font-medium">Name</Text>
              <TextInput
                className="bg-white border border-gray-300 rounded-md px-3 py-4 text-gray-800"
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
                placeholder=""
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-800 text-base mb-2 font-medium">Email</Text>
              <TextInput
                className="bg-white border border-gray-300 rounded-md px-3 py-4 text-gray-800"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                placeholder=""
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-800 text-base mb-2 font-medium">Additional Attendees:</Text>
              <TextInput
                className="bg-white border border-gray-300 rounded-md px-3 py-4 text-gray-800"
                value={formData.additionalAttendees}
                onChangeText={(value) => handleInputChange('additionalAttendees', value)}
                placeholder=""
                placeholderTextColor="#9CA3AF"
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-800 text-base mb-2 font-medium">Your Age</Text>
              <TextInput
                className="bg-white border border-gray-300 rounded-md px-3 py-4 text-gray-800"
                value={formData.age}
                onChangeText={(value) => handleInputChange('age', value)}
                placeholder=""
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-800 text-base mb-3 font-medium">
                Do You Have Children?
              </Text>
              <TouchableOpacity 
                className="flex-row items-center mb-2"
                onPress={() => handleChildrenSelect(true)}
              >
                <View className="w-5 h-5 rounded-full border-2 border-gray-400 mr-3 items-center justify-center">
                  {formData.hasChildren === true && (
                    <View className="w-3 h-3 rounded-full bg-blue-600" />
                  )}
                </View>
                <Text className="text-gray-800 text-base">Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="flex-row items-center mb-2"
                onPress={() => handleChildrenSelect(false)}
              >
                <View className="w-5 h-5 rounded-full border-2 border-gray-400 mr-3 items-center justify-center">
                  {formData.hasChildren === false && (
                    <View className="w-3 h-3 rounded-full bg-blue-600" />
                  )}
                </View>
                <Text className="text-gray-800 text-base">No</Text>
              </TouchableOpacity>
            </View>

            <View className="mb-4">
              <Text className="text-gray-800 text-base mb-2 font-medium">What is your approx. Household Income?</Text>
              <TextInput
                className="bg-white border border-gray-300 rounded-md px-3 py-4 text-gray-800"
                value={formData.householdIncome}
                onChangeText={(value) => handleInputChange('householdIncome', value)}
                placeholder=""
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-800 text-base mb-3 font-medium">
                How much do you hold in investments?
              </Text>
              <TouchableOpacity 
                className="flex-row items-center mb-2"
                onPress={() => handleInvestmentSelect('Less than £50K', 15000)}
              >
                <View className="w-5 h-5 border-2 border-gray-400 mr-3 items-center justify-center">
                  {formData.investments === 'Less than £50K' && (
                    <Text className="text-blue-600 font-bold text-sm">✓</Text>
                  )}
                </View>
                <Text className="text-gray-800 text-base">Less than £50K</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="flex-row items-center mb-2"
                onPress={() => handleInvestmentSelect('£50K-£200K', 100000)}
              >
                <View className="w-5 h-5 border-2 border-gray-400 mr-3 items-center justify-center">
                  {formData.investments === '£50K-£200K' && (
                    <Text className="text-blue-600 font-bold text-sm">✓</Text>
                  )}
                </View>
                <Text className="text-gray-800 text-base">£50K-£200K</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                className="flex-row items-center mb-2"
                onPress={() => handleInvestmentSelect('£200K', 200001)}
              >
                <View className="w-5 h-5 border-2 border-gray-400 mr-3 items-center justify-center">
                  {formData.investments === '£200K' && (
                    <Text className="text-blue-600 font-bold text-sm">✓</Text>
                  )}
                </View>
                <Text className="text-gray-800 text-base">£200K</Text>
              </TouchableOpacity>
            </View>

            <View className="mb-4">
              <Text className="text-gray-800 text-base mb-2 font-medium">What Would You Like to Discuss?</Text>
              <TextInput
                className="bg-white border border-gray-300 rounded-md px-3 py-3 text-gray-800"
                value={formData.whatToDiscuss}
                onChangeText={(value) => handleInputChange('whatToDiscuss', value)}
                placeholder=""
                placeholderTextColor="#9CA3AF"
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-800 text-base mb-2 font-medium">Why Are You Reaching Out Now?</Text>
              <TextInput
                className="bg-white border border-gray-300 rounded-md px-3 py-3 text-gray-800"
                value={formData.whyReachingOut}
                onChangeText={(value) => handleInputChange('whyReachingOut', value)}
                placeholder=""
                placeholderTextColor="#9CA3AF"
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <View className="mb-4">
              <Text className="text-gray-800 text-base mb-2 font-medium">I'll Ask You This</Text>
              <TextInput
                className="bg-white border border-gray-300 rounded-md px-3 py-3 text-gray-800"
                value={formData.askYouThis}
                onChangeText={(value) => handleInputChange('askYouThis', value)}
                placeholder=""
                placeholderTextColor="#9CA3AF"
                multiline={true}
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity 
              className="bg-[#5055ba] py-4 rounded-md mt-4 mb-8"
              onPress={() => handleContinue()}
            >
              <Text className="text-white text-center font-semibold text-base">
                Continue
              </Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ComponentWrapper>
  );
};

export default ContactFormScreen;