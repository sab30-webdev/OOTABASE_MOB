import { StatusBar } from "expo-status-bar";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./Components/Home";
import Login from "./Components/Login";
import initApp from "./firebase/firebase";
import Qr from "./Components/Qr";
import Scanner from "./Components/Scanner";
import StaffLogin from "./Components/StaffLogin";
import StaffHome from "./Components/StaffHome";
import Bookings from "./Components/Bookings";
import Menu from "./Components/Menu";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import { useState, useEffect } from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  initApp();
  LogBox.ignoreLogs(["AsyncStorage has been extracted from react-native core"]);
  const [user, setUser] = useState();
  const auth = getAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, [user]);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user ? (
          <>
            <Stack.Screen
              name='Login'
              component={Login}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='StaffLogin'
              component={StaffLogin}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='StaffHome'
              component={StaffHome}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Scanner'
              component={Scanner}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Bookings'
              component={Bookings}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              name='Home'
              component={Home}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Qr'
              component={Qr}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Menu'
              component={Menu}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>
      <StatusBar style='auto' />
    </NavigationContainer>
  );
}
