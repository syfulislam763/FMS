import "./global.css";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import FontLoader from "./src/hooks/FontLoader";

export default function App() {
  return (
    <FontLoader>
      <View style={styles.container}>
        <Text style={{
          fontFamily:'Archivo-ExtraBold',
        }} className="text-blue-500">Open up App.js to start working on your app!</Text>
        <StatusBar style="auto" />
      </View>
    </FontLoader>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
