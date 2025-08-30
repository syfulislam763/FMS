import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import ComponentWrapper from '../../../components/ComponentWrapper';
import { useNavigation } from '@react-navigation/native';

const ContactFormScreen = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    additionalAttendees: '',
    age: '',
    hasChildren: null,
    householdIncome: '',
    investments: 'Less than £50K', // Default checked
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

  const handleInvestmentSelect = (value) => {
    setFormData(prev => ({ ...prev, investments: value }));
  };

  const handleSubmit = () => {
    // Basic validation
    if (!formData.name || !formData.email) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    console.log('Form submitted:', formData);
    Alert.alert('Success', 'Form submitted successfully!');
  };

  const InputField = ({ label, value, onChangeText, placeholder = '', multiline = false, numberOfLines = 1 }) => (
    <View className="mb-4">
      <Text className="text-gray-800 text-base mb-2 font-medium">
        {label}
      </Text>
      <TextInput
        className={`bg-white border border-gray-300 rounded-md px-3 ${multiline ? 'py-3' : 'py-4'} text-gray-800`}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={multiline ? 'top' : 'center'}
      />
    </View>
  );

  const RadioButton = ({ selected, onPress, label }) => (
    <TouchableOpacity 
      className="flex-row items-center mb-2"
      onPress={onPress}
    >
      <View className="w-5 h-5 rounded-full border-2 border-gray-400 mr-3 items-center justify-center">
        {selected && (
          <View className="w-3 h-3 rounded-full bg-blue-600" />
        )}
      </View>
      <Text className="text-gray-800 text-base">{label}</Text>
    </TouchableOpacity>
  );

  const CheckBox = ({ selected, onPress, label }) => (
    <TouchableOpacity 
      className="flex-row items-center mb-2"
      onPress={onPress}
    >
      <View className="w-5 h-5 border-2 border-gray-400 mr-3 items-center justify-center">
        {selected && (
          <Text className="text-blue-600 font-bold text-sm">✓</Text>
        )}
      </View>
      <Text className="text-gray-800 text-base">{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ComponentWrapper title='Book Appointment' bg_color='bg-[#5055ba]'>
        <ScrollView className="flex-1 bg-gray-200" showsVerticalScrollIndicator={false}>
        <View className="">
            
            <InputField
            label="Name"
            value={formData.name}
            onChangeText={(value) => handleInputChange('name', value)}
            />

            <InputField
            label="Email"
            value={formData.email}
            onChangeText={(value) => handleInputChange('email', value)}
            />

            <InputField
            label="Additional Attendees:"
            value={formData.additionalAttendees}
            onChangeText={(value) => handleInputChange('additionalAttendees', value)}
            />

            <InputField
            label="Your Age"
            value={formData.age}
            onChangeText={(value) => handleInputChange('age', value)}
            />

            {/* Children Radio Buttons */}
            <View className="mb-4">
            <Text className="text-gray-800 text-base mb-3 font-medium">
                Do You Have Children?
            </Text>
            <RadioButton
                selected={formData.hasChildren === true}
                onPress={() => handleChildrenSelect(true)}
                label="Yes"
            />
            <RadioButton
                selected={formData.hasChildren === false}
                onPress={() => handleChildrenSelect(false)}
                label="No"
            />
            </View>

            <InputField
            label="What is your approx. Household Income?"
            value={formData.householdIncome}
            onChangeText={(value) => handleInputChange('householdIncome', value)}
            />

            {/* Investment Checkboxes */}
            <View className="mb-4">
            <Text className="text-gray-800 text-base mb-3 font-medium">
                How much do you hold in investments?
            </Text>
            <CheckBox
                selected={formData.investments === 'Less than £50K'}
                onPress={() => handleInvestmentSelect('Less than £50K')}
                label="Less than £50K"
            />
            <CheckBox
                selected={formData.investments === '£50K-£200K'}
                onPress={() => handleInvestmentSelect('£50K-£200K')}
                label="£50K-£200K"
            />
            <CheckBox
                selected={formData.investments === '£200K'}
                onPress={() => handleInvestmentSelect('£200K')}
                label="£200K"
            />
            </View>

            <InputField
            label="What Would You Like to Discuss?"
            value={formData.whatToDiscuss}
            onChangeText={(value) => handleInputChange('whatToDiscuss', value)}
            multiline={true}
            numberOfLines={4}
            />

            <InputField
            label="Why Are You Reaching Out Now?"
            value={formData.whyReachingOut}
            onChangeText={(value) => handleInputChange('whyReachingOut', value)}
            multiline={true}
            numberOfLines={4}
            />

            <InputField
            label="I'll Ask You This"
            value={formData.askYouThis}
            onChangeText={(value) => handleInputChange('askYouThis', value)}
            multiline={true}
            numberOfLines={4}
            />

            {/* Submit Button */}
            <TouchableOpacity 
            className="bg-[#5055ba] py-4 rounded-md mt-4 mb-8"
            onPress={() => navigation.navigate("TimeSelector")}
            >
                <Text className="text-white text-center font-semibold text-base">
                    Continue
                </Text>
            </TouchableOpacity>

        </View>
        </ScrollView>
    </ComponentWrapper>
  );
};

export default ContactFormScreen;