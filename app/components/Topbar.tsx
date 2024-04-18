import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { AntDesign } from '@expo/vector-icons';

interface TopBarProps {
  onLogOutPress: () => void;
  title: string;
  onSettingsPress: () => void;
}

const TopBar: React.FC<TopBarProps> = ({ onLogOutPress, title, onSettingsPress }) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity onPress={onLogOutPress}>
          <AntDesign name="logout" size={24} color="orange" />
        </TouchableOpacity>
        
        <Text style={styles.title}>{title}</Text>

        <TouchableOpacity onPress={onSettingsPress}>
          <Ionicons name="settings" size={24} color="orange" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'orange',
  },
});

export default TopBar;