import React, { useState, useRef, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import * as Animatable from 'react-native-animatable';
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import { login } from '../src/redux/actions/authActions'

const LoginScreen = ({ navigation }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch(); // Dispatch function to trigger login
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Get the login status from Redux

  const handleLogin = async () => {
    if (mobileNumber.length === 10) {
      await AsyncStorage.setItem('loggedIn', 'true'); // Mark app as launched
      dispatch(login()); // Dispatch login action to Redux
      navigation.navigate('Category'); // Navigate to Category screen
    } else {
      setErrorMsg('Please enter a valid 10-digit mobile number');
    }
  };

  // Function to handle only numeric input for mobile number
  const handleNumericInput = (setter) => (text) => {
    const numericText = text.replace(/[^0-9]/g, '').slice(0, 10); // Replace non-numeric characters
    setter(numericText); // Update state with the cleaned numeric value
  };

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasLaunched = await AsyncStorage.getItem('loggedIn');
      if (hasLaunched === 'true') {
        // If app has been launched before, navigate directly to Category
        navigation.replace('Category');
      }
    };

    checkFirstLaunch();
  }, [dispatch, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Animatable.Image
          animation="zoomIn"
          easing="ease-out"
          source={require('../assets/icon.png')}
          style={styles.logoImage}
        />

        <Text style={styles.title}>Enter your Mobile Number</Text>

        {/* Mobile Number Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter your mobile number"
          placeholderTextColor="#8e8e8e"
          keyboardType="numeric"
          value={mobileNumber}
          onChangeText={handleNumericInput(setMobileNumber)}
          maxLength={10}
          autoFocus={true}
        />

        {/* Next Button */}
        <Animatable.View animation="bounceIn" duration={1500}>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        </Animatable.View>

        {/* Error Message */}
        {errorMsg ? (
          <Text style={styles.errorText}>{errorMsg}</Text>
        ) : null}

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9', // Subtle background color
    paddingHorizontal: 30,
  },
  content: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoImage: {
    width: 150,
    height: 150,
    marginBottom: 40, // Space between logo and input
  },
  title: {
    fontSize: 17,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333', // Dark text for clarity
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#3498db',
    borderWidth: 2,
    borderRadius: 25,
    marginBottom: 20,
    paddingHorizontal: 15,
    textAlign:"center",
    fontSize: 16,
    color: '#333', // Text color for input
    fontWeight: '600', // Slightly bold text for mobile number
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 20,
  },
  button: {
    width: 200,
    height: 50,
    backgroundColor: '#3498db',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // For shadow effect on Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
