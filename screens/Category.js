import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, SafeAreaView, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';

const Category = ({ navigation }) => {

  const handleLogin = async (plan) => {
    await AsyncStorage.setItem('selected_plan', plan); // Store selected plan in AsyncStorage
    navigation.navigate('Personal Info', { plan });
  };

  const images = [
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1awnWrpjojsKVaFfijOZD9Rx9x5hvvObHB8C2H5XL26HLRnzBIHoVWN8&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAb-3u9u0wMvRdTN-clQ5cKVHl1_UN6WMA_ty7jR4kA_FAm2tPGHktw13p&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVnBn9Zu0lyI0P5yqEJD6Qa9xka9DTe25IyLlpclXGoo2nPWmRpcT93gAV&s=10',
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxGevUVWbdHt9UDzwzYVqAJhh3AjH8dilkolnEQkzd7Uonf4mfPtQWqbv3&s=10',
  ];

  return (

    <ScrollView style={{ width: "100%" }}>

      <View style={styles.container}  >

        <Animatable.Image
          animation="zoomIn"
          easing="ease-out"
          source={require('../assets/icon.png')}
          style={styles.logoImage}
        />

        <Text style={styles.title}>Select your Plan</Text>

        {/* Button Options with Animations */}
        {['Body Clean/Detox', 'Weight Loss', 'Weight Gain', 'Muscle Building'].map((plan, index) => (

          <Animatable.View
            key={index}
            animation="fadeInUp"
            duration={1000}
            style={styles.buttonContainer}
          >
            <TouchableOpacity
              style={styles.selectButton}
              onPress={() => handleLogin(plan)}
            >
              <ImageBackground
                source={images[index]} // Replace with your image
                style={styles.imageBackground}
                imageStyle={styles.imageStyle}
              >
                <LinearGradient
                  // Button Linear Gradient
                  colors={['rgba(255, 255, 255,.5)', 'rgb(8, 92, 166)']}
                  style={styles.gradient}>
                  <Text style={styles.buttonText}>{plan}</Text>
                </LinearGradient>
              </ImageBackground>

            </TouchableOpacity>
          </Animatable.View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#f4f4f4',
    marginBottom: 200,
  },
  logoImage: {
    width: 150,
    height: 150,
    marginBottom: 40,
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
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: "hidden"
  },
  imageBackground: {
    width: "100%",
    height: "100%"
  },
  imageStyle: {
    borderRadius: 12,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10, // Space between title and bottom edge
    opacity: 1,
  },
  buttonText: {
    position: "absolute",
    bottom: 20,
    fontSize: 20,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 1,
  },
});

export default Category;
