import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import BackButtion from '../../../components/BackButtion';
import AppHeader from '../../../components/AppHeader';
import PrimaryInputField from '../../../components/PrimaryInputField';
import PrimaryButton from '../../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';


const ForgetPassword = () => {

    const [email, setEmail] = useState("")
    const navigation = useNavigation()


    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="px-5">
                <AppHeader
                    left={()=> <BackButtion/>}
                />


                <View className="items-center my-5">
                    <Text className="font-archivo-semi-bold text-lg mb-3">Forgot Password</Text>
                    <Text className="font-inter-regular text-sm text-[#7D848D]">Enter your email account to reset your password</Text>
                </View>


                <PrimaryInputField
                    value={email}
                    onChange={setEmail}
                    type='default'
                    label='Email'
                    placeholder='Enter your new email'
                />

                <View className="h-7"/>

                <PrimaryButton 
                    onPress={()=>{navigation.navigate("ForgetPassOTPVerification")}}
                    text='Forgot Password'
                />





            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default ForgetPassword;
