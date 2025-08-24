import "./global.css";
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import FontLoader from "./src/hooks/FontLoader";
import GestureHandlerRootView from "react-native-gesture-handler";
import { AuthProvider } from "./src/context/AuthProvider";
import Toast from "react-native-toast-message";
//import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import RootNavigation from "./src/navigation/RootNavigation";

export default function App() {
  return (
    <FontLoader>
      {/* <GestureHandlerRootView style={{ flex: 1 }}> */}
        <NavigationContainer>
          <AuthProvider>
            <View style={{flex:1, backgroundColor:"white"}}>
              {/* <StatusBar/> */}

              <RootNavigation/>

            </View>
          </AuthProvider>
        </NavigationContainer>
      {/* </GestureHandlerRootView> */}
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
