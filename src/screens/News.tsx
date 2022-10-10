import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const News = () => {
  return (
    <View style={styles.screen}>
      <Text>News</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
