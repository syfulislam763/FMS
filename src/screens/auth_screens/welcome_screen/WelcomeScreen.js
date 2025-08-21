import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{flex:1}}>
            <View>
                <Text style={{color:"red", fontSize:20}} >WelcomeScreen</Text>
                <Pressable 
                    onPress={()=> navigation.navigate("SignInScreen")}
                >
                    <Text className="bg-red-300 text-4xl mb-3">Continue</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default WelcomeScreen;
