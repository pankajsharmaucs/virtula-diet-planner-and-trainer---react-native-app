import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import ImageSlider from 'react-native-image-slider';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage

const { width } = Dimensions.get('window'); // Get the screen width for responsive layout

const SliderIntro = ({ navigation }) => {
  const [images, setImages] = useState([
    require('../assets/slider/img1.jpg'),
    require('../assets/slider/img2.jpg'),
    require('../assets/slider/img3.jpg'),
  ]);
  const [index, setIndex] = useState(0);
  const delay = 2000; // Delay between images in milliseconds (2 seconds)

  // Function to handle button actions (e.g., start app)
  const handleStart = async () => {
    await AsyncStorage.setItem('hasLaunched', 'true'); // Mark app as launched
    navigation.navigate('Login'); // Navigate to Login screen
  };

  // Check if it's the first time the app is launched
  useEffect(() => {
    const checkFirstLaunch = async () => {
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      if (hasLaunched === 'true') {
        // If app has been launched before, navigate directly to Login
        navigation.replace('Login');
      }
    };

    checkFirstLaunch();

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length); // Change the slide
    }, delay);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, [images.length, delay, navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.sliderContainer}>
        {/* Image Slider */}
        <ImageSlider
          images={images}
          position={index}
          onPositionChanged={setIndex}
          loop // Loop through the images
        />

        {/* Start Button with Animation */}
        <Animatable.View
          animation="fadeInUp"
          easing="ease-out"
          duration={1000}
          style={styles.buttonContainer}
        >
          <TouchableOpacity style={styles.startButton} onPress={handleStart}>
            <Text style={styles.startButtonText}>Let's Start</Text>
          </TouchableOpacity>
        </Animatable.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  sliderContainer: {
    width: '100%',
    height: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    position: 'absolute', // Position button at the bottom of the screen
    bottom: 50,
    width: '100%',
    alignItems: 'center',
  },
  startButton: {
    width: width * 0.7, // Responsive width (70% of the screen width)
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498db',
    borderRadius: 30, // Rounded button for modern look
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5, // Android shadow effect
  },
  startButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default SliderIntro;
