import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, TextInput,Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import PrimaryButton from '../../../components/PrimaryButton';
import { Ionicons } from "@expo/vector-icons";
import Checkbox from 'expo-checkbox';
import PrimaryInputField from '../../../components/PrimaryInputField';
import PrimaryInputFieldWithVisibility from '../../../components/PrimaryInputFieldWithVisibility';
import CoupleToggle from '../signin_screen/CoupleToggle';

const google = require("../../../../assets/img/google.png");
const apple = require("../../../../assets/img/apple.png")

const SignUpScreen = () => {
    const navigation = useNavigation()
    const [number, setNumber] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfrimPassword, setShowConfirmPassword] = useState(false)
    const [agreeTerms, setAgreeTerms] = useState(false);

    return (
    <SafeAreaView className="flex-1 bg-white px-5">
        <ScrollView className="p-5">
            {/* Title */}
            <View className="flex-col items-center">
                <Text className="text-2xl font-archivo-semi-bold text-[#090909]">Sign Up</Text>
                <Text className="text-sm text-gray-400 mt-2 text-center font-inter-regular">
                    Please fill the details and create account
                </Text>
            </View>

            {/* Email / Phone Input */}
            <PrimaryInputField
                value={number}
                onChange={setNumber}
                type='numeric'
                label='Phone Number'
                placeholder='Enter your number'
            />
            <PrimaryInputField
                value={email}
                onChange={setEmail}
                type='default'
                label='Email'
                placeholder='Enter your new email'
            />

            <PrimaryInputFieldWithVisibility
                value={password}
                onChange={setPassword}
                type='default'
                label='Password'
                visible={showPassword}
                setIsVisible={setShowPassword}
                placeholder='Enter your new password'
            />

            <PrimaryInputFieldWithVisibility
                value={confirmPassword}
                onChange={setConfirmPassword}
                type='default'
                label='Confirm password'
                visible={showConfrimPassword}
                setIsVisible={setShowConfirmPassword}
                placeholder='Re-enter password'
            />

            <CoupleToggle/>
            {/* Checkbox */}
            <View className="flex-row items-center my-6">
                <Checkbox
                    color={agreeTerms?"#4F55BA":undefined}
                    value={agreeTerms}
                    onValueChange={() => setAgreeTerms(!agreeTerms)}
                />
                <Text className="text-sm text-gray-500 ml-2">
                    I agree with{" "}
                    <Text className="text-[12px] font-inter-regular text-[#4F55BA]">Terms <Text className="text-title-color">&</Text> Conditions</Text>
                </Text>
            </View>

            {/* Log In Button */}
            <PrimaryButton 
                onPress={()=>{}}
                text="Log In"
            />

            {/* Or Separator */}
            <View className="flex-row items-center my-6">
            <View className="flex-1 h-[1px] bg-[#090909]" />
            <Text className="mx-4 text-[#090909]">Or</Text>
            <View className="flex-1 h-[1px] bg-[#090909]" />
            </View>

            {/* Social Login Buttons */}
            <TouchableOpacity className="flex-row items-center border border-gray-300 rounded-[25px] py-4 justify-center mb-4">
                <Image 
                    source={apple}
                    className="h-[21px] w-[21px] mr-2"
                    style={{objectFit:"contain"}}
                />
                <Text className="text-black text-base font-medium">Login with Apple</Text>
            </TouchableOpacity>

            <TouchableOpacity className="flex-row items-center border border-gray-300 rounded-[25px] py-4 justify-center">
                <Image 
                    source={google}
                    className="h-[21px] w-[21px] mr-2"
                    style={{objectFit:"contain"}}
                />
                <Text className="text-black text-base font-medium">Login with Google</Text>
            </TouchableOpacity>

            {/* Sign Up */}
            <View className="flex-row justify-center mt-6">
            <Text className="text-[#707B81] font-inter-regular">Already have an account? </Text>
            <TouchableOpacity onPress={()=>{
                navigation.navigate("SignInScreen")
            }}>
                <Text className="text-[#013D3B] font-inter-regular">Log In</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default SignUpScreen;
