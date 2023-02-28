import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Components/Home";
import Login from "./Components/Login";
import initApp from "./firebase/firebase";
import Qr from "./Components/Qr";
import Footer from "./Components/Footer";
import Scanner from "./Components/Scanner";
import QrData from "./Components/QrData";

const Stack = createNativeStackNavigator();

export default function App() {
  initApp();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Qr' component={Qr} />
        <Stack.Screen name='Scanner' component={Scanner} />
        <Stack.Screen name='QrData' component={QrData} />
      </Stack.Navigator>
      <StatusBar style='auto' />
    </NavigationContainer>
  );
}
