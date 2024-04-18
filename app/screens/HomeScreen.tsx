import React from "react";
import { Platform, SafeAreaView, StatusBar, StyleSheet, View } from "react-native";
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
    navigation.navigate(Routes.Register);
  };

  const handleSettingsPress = () => {
    navigation.navigate(Routes.Settings);
  };
  
  return (
    <SafeAreaView style={styles.content}>
      <TopBar
        onLogOutPress={handleLogOutPress}
        title="Title of the app"
        onSettingsPress={handleSettingsPress}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});


export default HomeScreen;