import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  FlatList,
  Modal
} from 'react-native';
import DebtSummaryComponent from './DebtSummaryComponent';
import PrimaryButton from '../../../../components/PrimaryButton';
import DebtListComponent from './DebtListComponent';
import ComponentWrapper from '../../../../components/ComponentWrapper';
import DebtRecentList from './DebtRecentList';

const DebtManagement = () => {



  return (
    <ComponentWrapper title='Debt Management' bg_color='bg-[#FFA950]'>
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
            <DebtSummaryComponent/>
            <View className="h-4"/>
            <DebtRecentList/>
        </ScrollView>
    </ComponentWrapper>
  );
};

export default DebtManagement;