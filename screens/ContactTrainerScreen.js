import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ContactTrainerScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Trainer</Text>
      <Text style={styles.name}>Kushal {'\n'} (5+ year experience)</Text>
      <Text style={styles.number}>8800637982</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  number: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default ContactTrainerScreen;
