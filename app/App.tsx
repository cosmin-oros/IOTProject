import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Routes } from './routes/routes';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import RegisterScreen from './screens/RegisterScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName={user?.loggedIn ? Routes.Home : Routes.Register}> */}
      <Stack.Navigator initialRouteName={Routes.Home}>
        <Stack.Screen name={Routes.Register} component={RegisterScreen} options={{ headerShown: false }}/>
        <Stack.Screen name={Routes.Login} component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name={Routes.Home} component={HomeScreen} options={{ headerShown: false }}/>
        <Stack.Screen name={Routes.Settings} component={SettingsScreen} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

