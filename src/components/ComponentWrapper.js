import React from 'react';
import { StyleSheet, View, SafeAreaView, Text } from 'react-native';
import AppHeader from './AppHeader';
import BackButtion from './BackButtion';

const ComponentWrapper = ({
    bg_color="bg-red-500", 
    title="Add Expense",
    headerComponent, 
    children,
    container_bg ="bg-[##e7eaef]"
}
) => {
    return (
        <SafeAreaView className={`flex-1 ${bg_color}`}>
            {headerComponent?headerComponent():
                <View className="px-5 pb-3">
                    <AppHeader
                        left={()=> <BackButtion/>}
                        middle={() => <Text className="text-white font-archivo-semi-bold text-2xl">{title}</Text>}
                    />
                </View>
            }
            <View className={`flex-1 px-6 py-8 ${container_bg}`}>
                {children}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default ComponentWrapper;
