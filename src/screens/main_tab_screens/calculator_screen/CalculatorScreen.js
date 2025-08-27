

import React, { useState } from 'react';
import { View, Text, TextInput, Platform, StyleSheet, Animated } from 'react-native';
import { PanResponder } from 'react-native';
import ComponentWrapper from '../../../components/ComponentWrapper';
import AppHeader from '../../../components/AppHeader';
import PrimaryButton from '../../../components/PrimaryButton';

const CustomSlider = ({ value, setValue, min, max, label, step = 1 }) => {
  const pan = new Animated.Value(0);
  const sliderWidth = 300;
  const thumbSize = 20;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      let newValue = Math.max(
        min,
        Math.min(Math.round((gestureState.moveX / sliderWidth) * max), max)
      );
      setValue(newValue);
      pan.setValue(gestureState.moveX);
    },
    onPanResponderRelease: () => {},
  });

  const thumbPosition = pan.interpolate({
    inputRange: [0, sliderWidth],
    outputRange: [0, sliderWidth - thumbSize],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.sliderContainer}>
      <Text style={styles.sliderLabel}>{label}</Text>
      <View style={styles.sliderTrack}>
        <Animated.View
          style={[styles.thumb, { transform: [{ translateX: thumbPosition }] }]}
          {...panResponder.panHandlers}
        />
      </View>
      <Text style={styles.sliderValue}>{value}</Text>
    </View>
  );
};

const CalculatorScreen = () => {
  const [amount, setAmount] = useState(1000);
  const [interestRate, setInterestRate] = useState(5);
  const [loanTerm, setLoanTerm] = useState(10);

  const calculateRepayment = () => {
    const principal = amount;
    const rate = interestRate / 100;
    const time = loanTerm;
    const monthlyRepayment = (principal * (1 + rate * time)) / (time * 12);
    alert(`Monthly Repayment: ${monthlyRepayment.toFixed(2)}`);
  };

  return (
   <ComponentWrapper headerComponent={() => <AppHeader middle={()=><Text className="text-white font-archivo-semi-bold text-2xl">{"Finance Calculator"}</Text>}/>} bg_color='bg-[#1976D2]'>
     <View style={styles.container}>
        <Text style={styles.title}>Loan Repayment Details</Text>

        {/* Initial Amount Slider */}
        <CustomSlider value={amount} setValue={setAmount} min={100} max={10000} label="Initial Amount" />

        {/* Annual Interest Rate Slider */}
        <CustomSlider value={interestRate} setValue={setInterestRate} min={1} max={20} label="Annual Interest Rate (%)" step={0.5} />

        {/* Loan Term Slider */}
        <CustomSlider value={loanTerm} setValue={setLoanTerm} min={1} max={30} label="Loan Term (years)" />

        <TextInput
            style={styles.input}
            value={amount.toString()}
            keyboardType="numeric"
            onChangeText={(text) => setAmount(Number(text))}
        />
        <TextInput
            style={styles.input}
            value={interestRate.toString()}
            keyboardType="numeric"
            onChangeText={(text) => setInterestRate(Number(text))}
        />
        <TextInput
            style={styles.input}
            value={loanTerm.toString()}
            keyboardType="numeric"
            onChangeText={(text) => setLoanTerm(Number(text))}
        />

        <View style={styles.buttonContainer}>
            <Text onPress={calculateRepayment} style={styles.calculateButton}>
            Calculate Repayment
            </Text>
        </View>
        </View>
   </ComponentWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
  },
  sliderContainer: {
    marginBottom: 30,
  },
  sliderLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  sliderTrack: {
    height: 5,
    backgroundColor: '#d3d3d3',
    borderRadius: 5,
    position: 'relative',
  },
  thumb: {
    width: 20,
    height: 20,
    backgroundColor: '#007bff',
    borderRadius: 10,
    borderWidth:1,
    borderColor: "red",
    position: 'absolute',
    top: -8,
  },
  sliderValue: {
    fontSize: 16,
    color: '#007bff',
    textAlign: 'center',
    marginTop: 10,
  },
  input: {
    height: 40,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
    fontSize: 16,
  },
  buttonContainer: {
    alignItems: 'center',
  },
  calculateButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default CalculatorScreen;
