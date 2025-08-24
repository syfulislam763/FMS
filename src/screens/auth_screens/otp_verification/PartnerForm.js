import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { ChevronDown } from 'lucide-react-native';
import AppHeader from '../../../components/AppHeader';
import BackButtion from '../../../components/BackButtion';
import PrimaryButton from '../../../components/PrimaryButton';
import { useAuth } from '../../../context/AuthProvider';
import { useNavigation } from '@react-navigation/native';

const PartnerForm = () => {
    const [partnerName, setPartnerName] = useState('');
    const [email, setEmail] = useState('');
    const [relationship, setRelationship] = useState('Wife');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const {setIsAuthenticated} = useAuth()
    const navigation = useNavigation();
    

    const relationshipOptions = ['Wife', 'Husband', 'Partner', 'Fiancé', 'Fiancée'];

    const handleRelationshipSelect = (option) => {
        setRelationship(option);
        setIsDropdownOpen(false);
    };

    return (
        <SafeAreaView className="bg-white flex-1">
            <View className="px-5">
            
                <AppHeader
                    left={()=> <BackButtion/>}
                />
       
                <View className="mb-4 mt-10">
                    <Text className="text-gray-700 text-lg font-archivo-semi-bold mb-2">
                        Partner's Name
                    </Text>
                    <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3.5 text-base text-gray-900 bg-white"
                    value={partnerName}
                    onChangeText={setPartnerName}
                    placeholder="Enter you name"
                    placeholderTextColor="#9CA3AF"
                    />
                </View>

            {/* Email Field */}
                <View className="mb-6">
                    <Text className="text-gray-700 text-lg font-archivo-semi-bold mb-2">
                    Email
                    </Text>
                    <TextInput
                    className="border border-gray-300 rounded-lg px-4 py-3.5 text-base text-gray-400 bg-white"
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    placeholderTextColor="#9CA3AF"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    />
                </View>

                <View className="mb-14">
                    <Text className="text-gray-700 text-lg font-archivo-semi-bold mb-2">
                    Relationship
                    </Text>
                    <View className="relative">
                    <TouchableOpacity
                        className="border border-gray-300 rounded-lg px-4 py-3.5 bg-white flex-row justify-between items-center"
                        onPress={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <Text className="text-base text-gray-900">
                        {relationship}
                        </Text>
                        <ChevronDown 
                        size={20} 
                        color="#6B7280"
                        style={{
                            transform: [{ rotate: isDropdownOpen ? '180deg' : '0deg' }]
                        }}
                        />
                    </TouchableOpacity>

                    {/* Dropdown Options */}
                    {isDropdownOpen && (
                        <View className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                        {relationshipOptions.map((option, index) => (
                            <TouchableOpacity
                            key={index}
                            className={`px-4 py-3 ${
                                index < relationshipOptions.length - 1 ? 'border-b border-gray-200' : ''
                            } ${relationship === option ? 'bg-gray-50' : ''}`}
                            onPress={() => handleRelationshipSelect(option)}
                            >
                            <Text className={`text-base ${
                                relationship === option ? 'text-gray-900 font-medium' : 'text-gray-700'
                            }`}>
                                {option}
                            </Text>
                            </TouchableOpacity>
                        ))}
                        </View>
                    )}


                    </View>
                </View>

                <PrimaryButton 
                    onPress={()=>{navigation.navigate("SignInScreen")}}
                    text='Send Invite'
                />

            </View>
        </SafeAreaView>
    );
};

export default PartnerForm;