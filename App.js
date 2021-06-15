import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';

export default function App() {
  return (
    <ScrollView>
      <StatusBar style="default" />
      <View style={styles.phoneBar}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  phoneBar: {
    flex: 1,
    backgroundColor: '#e6e6e6',
    height: 50
  }
});
