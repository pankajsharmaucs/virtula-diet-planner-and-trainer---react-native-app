import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../screens/LoginScreen';
import PersonalInfoScreen from '../screens/PersonalInfoScreen';
import DietWorkoutScreen from '../screens/DietWorkoutScreen';
import ContactTrainerScreen from '../screens/ContactTrainerScreen';
import SliderIntro from '../screens/SliderIntro';
import Category from '../screens/Category';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux'; // Import Redux hooks
import { logout } from '../src/redux/actions/authActions'; // Import the logout action
import { login } from '../src/redux/actions/authActions'; // Import the login action
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons for logout icon

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); // Get the login status from Redux

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await AsyncStorage.getItem('loggedIn');
      if (loggedIn === 'true') {
        dispatch(login());
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async (navigation) => {
    await AsyncStorage.removeItem('loggedIn'); // Remove loggedIn flag
    dispatch(logout());
    navigation.navigate('Login'); // Optional: Navigate to Login screen after logout
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro">
        <Stack.Screen
          name="Intro"
          options={{ 
            headerShown: false, 
            title: 'Intro' 
          }}
          component={SliderIntro}
        />

        <Stack.Screen
          name="Login"
          options={{ 
            title: 'Login',
            headerTitleStyle: {
              fontWeight: 'bold', 
              fontSize: 22,
              color: '#555', // You can also customize the color
            }
          }}
          component={LoginScreen}
        />

        <Stack.Screen
          name="Category"
          options={({ navigation }) => ({
            title: 'Choose Your Goal',
            headerTitleStyle: {
              fontWeight: 'bold', 
              fontSize: 22, 
              color: '#555', // Customize color here
            },
            headerRight: () => (
              isLoggedIn ? (
                <Ionicons
                  name="log-out-outline"
                  size={25}
                  color="red"
                  onPress={() => handleLogout(navigation)}
                  style={{ marginRight: 10 }}
                />
              ) : null
            ),
          })}
          component={Category}
        />

        <Stack.Screen
          name="Personal Info"
          options={({ navigation }) => ({
            title: 'Personal Info',
            headerTitleStyle: {
              fontWeight: 'bold', 
              fontSize: 22,
              color: '#555', // Customize color here
            },
            headerRight: () => (
              isLoggedIn ? (
                <Ionicons
                  name="log-out-outline"
                  size={25}
                  color="red"
                  onPress={() => handleLogout(navigation)}
                  style={{ marginRight: 10 }}
                />
              ) : null
            ),
          })}
          component={PersonalInfoScreen}
        />

        <Stack.Screen
          name="Diet & Workout Plan"
          options={({ navigation }) => ({
            title: 'Diet & Workout Plan',
            headerTitleStyle: {
              fontWeight: 'bold', 
              fontSize: 22,
              color: '#555', // Customize color here
            },
            headerRight: () => (
              isLoggedIn ? (
                <Ionicons
                  name="log-out-outline"
                  size={25}
                  color="red"
                  onPress={() => handleLogout(navigation)}
                  style={{ marginRight: 10 }}
                />
              ) : null
            ),
          })}
          component={DietWorkoutScreen}
        />

        <Stack.Screen
          name="Contact"
          options={({ navigation }) => ({
            title: 'Contact Trainer',
            headerTitleStyle: {
              fontWeight: 'bold', 
              fontSize: 22,
              color: '#555', // Customize color here
            },
            headerRight: () => (
              isLoggedIn ? (
                <Ionicons
                  name="log-out-outline"
                  size={25}
                  color="red"
                  onPress={() => handleLogout(navigation)}
                  style={{ marginRight: 10 }}
                />
              ) : null
            ),
          })}
          component={ContactTrainerScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
