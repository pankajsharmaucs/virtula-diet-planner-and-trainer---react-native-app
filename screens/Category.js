import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const Category = ({ navigation }) => {

  const handleLogin = async (plan) => {
    await AsyncStorage.setItem('selected_plan', plan); // Store selected plan in AsyncStorage
    navigation.navigate('Personal Info', { plan });
  };

  return (
    <View style={styles.container}>

      <Animatable.Image
        animation="zoomIn"
        easing="ease-out"
        source={require('../assets/icon.png')}
        style={styles.logoImage}
      />

      <Text style={styles.title}>Select your Plan</Text>

      {/* Button Options with Animations */}
      <Animatable.View animation="fadeInUp" duration={1000} style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => handleLogin("Body Clean/Detox")}
        >
          <Text style={styles.buttonText}>Body Clean/Detox</Text>
        </TouchableOpacity>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" duration={1000} style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => handleLogin("Weight Loss")}
        >
          <Text style={styles.buttonText}>Weight Loss</Text>
        </TouchableOpacity>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" duration={1000} style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => handleLogin("Weight Gain")}
        >
          <Text style={styles.buttonText}>Weight Gain</Text>
        </TouchableOpacity>
      </Animatable.View>

      <Animatable.View animation="fadeInUp" duration={1000} style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.selectButton}
          onPress={() => handleLogin("Muscle Building")}
        >
          <Text style={styles.buttonText}>Muscle Building</Text>
        </TouchableOpacity>
      </Animatable.View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#f4f4f4',
  },
  logoImage: {
    width: 150,
    height: 150,
    marginBottom: 40, // Space between logo and input
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  buttonContainer: {
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  selectButton: {
    width: '80%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5, // Add shadow effect for Android
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 1,
  },
});

export default Category;
