import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Platform } from 'react-native';
import { TextInput as PaperInput, Button as PaperButton, Dialog, Portal } from 'react-native-paper'; // Dialog component for popups
import { Picker } from '@react-native-picker/picker'; // Picker for goal selection
import { Ionicons } from '@expo/vector-icons'; // Adding icons

const PersonalInfoScreen = ({ route, navigation }) => {
  const { plan } = route.params;
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [goal, setGoal] = useState(plan);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // Function to show dialog (success or error)
  const showDialog = (message, isError = false) => {
    setMessage(message);
    setIsError(isError);
    setVisible(true);
  };

  const hideDialog = () => setVisible(false);

  const handleNext = () => {
    if (gender && age && weight && height && goal) {
      // Navigate to next screen and pass parameters if all fields are filled
      navigation.navigate('Diet & Workout Plan', { goal, gender, age, weight, height });
    } else {
      // If any field is missing, show error message
      showDialog('Please fill all fields.', true);
    }
  };

  // Ensure only numeric input for weight and height
  const handleNumericInput = useCallback((setter) => (text) => {
    const numericText = text.replace(/[^0-9]/g, '').slice(0, 3); // Allow only 3 digits max
    setter(numericText);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Personal Information</Text>

      {/* Goal Selector (Weight Loss, Muscle Building, Weight Gain) */}
      <Text style={styles.label}>Select Goal:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={goal}
          onValueChange={(itemValue) => setGoal(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Goal" value="" />
          <Picker.Item label="Body Clean/Detox" value="Body Clean/Detox" />
          <Picker.Item label="Weight Loss" value="Weight Loss" />
          <Picker.Item label="Weight Gain" value="Weight Gain" />
          <Picker.Item label="Muscle Building" value="Muscle Building" />
        </Picker>
      </View>

      {/* Gender Picker */}
      <Text style={styles.label}>Gender:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={gender}
          onValueChange={(itemValue) => setGender(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>

      {/* Age Input */}
      <Text style={styles.label}>Age:</Text>
      <PaperInput
        label="Enter your Age"
        value={age}
        keyboardType="numeric"
        style={styles.input}
        onChangeText={handleNumericInput(setAge)}
        theme={{ colors: { primary: '#3498db', underlineColor: 'transparent' } }}
      />

      {/* Weight Input */}
      <Text style={styles.label}>Weight (Kg):</Text>
      <PaperInput
        label="Enter your Weight"
        value={weight}
        keyboardType="numeric"
        style={styles.input}
        onChangeText={handleNumericInput(setWeight)}
        theme={{ colors: { primary: '#3498db', underlineColor: 'transparent' } }}
      />

      {/* Height Input */}
      <Text style={styles.label}>Height (cm):</Text>
      <PaperInput
        label="Enter your Height"
        value={height}
        keyboardType="numeric"
        style={styles.input}
        onChangeText={handleNumericInput(setHeight)}
        theme={{ colors: { primary: '#3498db', underlineColor: 'transparent' } }}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Generate my Diet</Text>
      </TouchableOpacity>

      {/* Dialog for Success/Error */}
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>{isError ? 'Error' : 'Success'}</Dialog.Title>
          <Dialog.Content>
            <Text style={{ color: isError ? 'red' : 'green' }}>{message}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <PaperButton onPress={hideDialog}>OK</PaperButton>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    color: '#555',
  },
  input: {
    backgroundColor: '#000',
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 8,
    height: 50,
    fontSize: 18,
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ddd',
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  picker: {
    height: 60,
    width: '100%',
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
});

export default PersonalInfoScreen;
