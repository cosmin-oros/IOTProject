import React from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet, View, Text, TouchableOpacity } from "react-native";
import TopBar from "../components/Topbar";
import { StackNavigationProp } from "@react-navigation/stack";
import { RouteParams } from "../routes/types";
import { Routes } from "../routes/routes";
import { useNavigation } from "@react-navigation/native";

type RoutePropType = StackNavigationProp<RouteParams, Routes.Home>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<RoutePropType>();

  const handleLogOutPress = () => {
    // ! change the variable in the store to isLoggedIn false
    // ! or fetch data from firebase to determine if he's loggedin or not
    navigation.navigate(Routes.Register);
  };

  const handleSettingsPress = () => {
    navigation.navigate(Routes.Settings);
  };

  const handleButtonPress = () => {
    
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <TopBar
        onLogOutPress={handleLogOutPress}
        title="Title of the app"
        onSettingsPress={handleSettingsPress}
      />
      <View style={styles.content}>
        {/* Your main content here */}
        {/* display temp and maybe a lottie with a progress bar for the temp */}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
        <Text style={styles.buttonText}>Button</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', 
    paddingBottom: 20, 
  },
  content: {
    flex: 1,
  },
  button: {
    backgroundColor: "orange",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 20, 
    alignSelf: 'center', 
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HomeScreen;