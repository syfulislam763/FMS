import React from 'react';
//app sign in
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useAuth } from '../../../context/AuthProvider';
import { useNavigation } from '@react-navigation/native';
const SignInScreen = () => {
    const navigation = useNavigation()
    const {setIsAuthenticated} = useAuth();
    return (
        <View>
            <Text>SignInScreen</Text>
            <Pressable onPress={()=> setIsAuthenticated(true)}>
                <Text className='bg-green-700 text-purple-100 text-6xl'>Login</Text>
            </Pressable>
            <Pressable 
                onPress={()=> navigation.navigate("SignUpScreen")}
            >
                <Text className="bg-red-300 text-4xl">Go to Sign up</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({})

export default SignInScreen;
