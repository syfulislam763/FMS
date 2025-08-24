import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView } from 'react-native';
import BackButtion from '../../../components/BackButtion';
import AppHeader from '../../../components/AppHeader';
import PrimaryButton from '../../../components/PrimaryButton';
import { useNavigation } from '@react-navigation/native';
import PrimaryInputFieldWithVisibility from '../../../components/PrimaryInputFieldWithVisibility';


const CreateNewPassword = () => {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState("");
    const [showConfrimPassword, setShowConfirmPassword] = useState("")

    const navigation = useNavigation()


    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="px-5">
                <AppHeader
                    left={()=> <BackButtion/>}
                />


                <View className="items-center my-5">
                    <Text className="font-archivo-semi-bold text-lg mb-3">Forgot Password</Text>
                    <Text className="font-inter-regular text-sm text-[#7D848D]">The password must be different than previous</Text>
                </View>


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

                <View className="h-7"/>

                <PrimaryButton 
                    onPress={()=>{navigation.navigate("ConfirmPasswordChange")}}
                    text='Update Password'
                />





            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default CreateNewPassword;
