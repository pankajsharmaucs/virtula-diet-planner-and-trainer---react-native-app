import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView } from 'react-native';

const DietWorkoutScreen = ({ route, navigation }) => {
  const { goal, weight, height, Age, Gender } = route.params;
  const [GoalID, setGoadID] = useState(1);



  // Function to calculate BMI
  const calculateBMI = (weight, height) => {
    const heightInMeters = height / 100; // Convert cm to meters
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  };

  // Function to calculate BMR
  const calculateBMR = (weight, height, age, gender) => {
    let bmr;
    if (gender === 'male') {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }
    return bmr.toFixed(2);
  };


  // Function to classify BMI
  const classifyBMI = (bmi) => {
    if (bmi < 18.5) {
      return { status: 'Underweight', message: 'You are underweight. Try gaining some weight for better health.', image: 'https://cdn-icons-png.flaticon.com/512/6723/6723537.png' };
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return { status: 'Healthy', message: 'Your weight is in the healthy range. Keep maintaining a balanced diet!', image: 'https://cdn-icons-png.flaticon.com/512/9340/9340025.png' };
    } else if (bmi >= 25 && bmi < 29.9) {
      return { status: 'Overweight', message: 'You are overweight. A balanced diet and regular exercise can help.', image: 'https://cdn-icons-png.flaticon.com/512/7346/7346053.png' };
    } else {
      return { status: 'Obese', message: 'You are obese. Consult a healthcare professional for advice on weight loss.', image: 'https://cdn-icons-png.flaticon.com/512/10368/10368812.png' };
    }
  };

  // Calculate BMI and BMR
  const bmi = calculateBMI(weight, height);
  const bmr = calculateBMR(weight, height, Age, Gender);

  // Classify BMI
  const bmiClassification = classifyBMI(bmi);

  // Define diet and workout plans for each goal 
  const dietPlans = {
    1: [
      { title: 'Step 1: Start with a Light Breakfast', description: 'Eat a small portion of high-protein breakfast, such as scrambled eggs or Greek yogurt.', image: 'https://example.com/breakfast-image.png' },
      { title: 'Step 2: Balanced Lunch', description: 'Have a lean protein (chicken, turkey) with vegetables and a whole grain (quinoa, brown rice).', image: 'https://example.com/lunch-image.png' },
      { title: 'Step 3: Healthy Snacks', description: 'Include healthy snacks like fruits, nuts, or a protein bar to curb cravings.', image: 'https://example.com/snack-image.png' },
      { title: 'Step 4: Light Dinner', description: 'Opt for light meals in the evening, such as salads with lean protein.', image: 'https://example.com/dinner-image.png' },
      { title: 'Step 5: Drink Water', description: 'Drink plenty of water throughout the day to stay hydrated and avoid overeating.', image: 'https://example.com/water-image.png' },
    ],
    2: [
      { title: 'Step 1: High-Protein Breakfast', description: 'Start your day with a protein-rich breakfast, like eggs and oatmeal.', image: 'https://example.com/protein-breakfast-image.png' },
      { title: 'Step 2: Post-Workout Nutrition', description: 'After workout, consume protein and carbohydrates like a protein shake and banana.', image: 'https://example.com/post-workout-image.png' },
      { title: 'Step 3: Protein-Rich Lunch', description: 'Have a protein-heavy lunch like grilled chicken or tofu with rice and veggies.', image: 'https://example.com/lunch-protein-image.png' },
      { title: 'Step 4: Healthy Snacks', description: 'Include protein snacks like cottage cheese or almonds to fuel muscle growth.', image: 'https://example.com/protein-snack-image.png' },
      { title: 'Step 5: Balanced Dinner', description: 'End your day with a balanced meal, including protein, healthy fats, and carbs like sweet potatoes.', image: 'https://example.com/dinner-muscle-image.png' },
    ],
    3: [
      { title: 'Step 1: High-Calorie Breakfast', description: 'Consume a calorie-dense breakfast like avocado toast with eggs or a smoothie.', image: 'https://example.com/calorie-breakfast-image.png' },
      { title: 'Step 2: Carb-Loaded Lunch', description: 'Focus on complex carbs like pasta or rice with chicken or steak for protein.', image: 'https://example.com/carb-lunch-image.png' },
      { title: 'Step 3: Midday Snack', description: 'Snack on high-calorie options like nut butter, trail mix, or protein bars.', image: 'https://example.com/midday-snack-image.png' },
      { title: 'Step 4: Protein Shake Post-Workout', description: 'After workouts, consume a calorie-rich protein shake to help build muscle.', image: 'https://example.com/protein-shake-image.png' },
      { title: 'Step 5: Heavy Dinner', description: 'For dinner, have a large meal with carbs, protein, and healthy fats, such as a steak with potatoes.', image: 'https://example.com/dinner-weightgain-image.png' },
    ],
    4: [
      { title: 'Step 1: High-Calorie Breakfast', description: 'Consume a calorie-dense breakfast like avocado toast with eggs or a smoothie.', image: 'https://example.com/calorie-breakfast-image.png' },
      { title: 'Step 2: Carb-Loaded Lunch', description: 'Focus on complex carbs like pasta or rice with chicken or steak for protein.', image: 'https://example.com/carb-lunch-image.png' },
      { title: 'Step 3: Midday Snack', description: 'Snack on high-calorie options like nut butter, trail mix, or protein bars.', image: 'https://example.com/midday-snack-image.png' },
      { title: 'Step 4: Protein Shake Post-Workout', description: 'After workouts, consume a calorie-rich protein shake to help build muscle.', image: 'https://example.com/protein-shake-image.png' },
      { title: 'Step 5: Heavy Dinner', description: 'For dinner, have a large meal with carbs, protein, and healthy fats, such as a steak with potatoes.', image: 'https://example.com/dinner-weightgain-image.png' },
    ]

  };

  const workoutPlans = {
    1: 'Cardio (Running, Cycling) + Strength Training (Bodyweight exercises like squats, push-ups)',
    2: 'Weight Lifting + Protein-Rich Diet',
    3: 'Compound Lifts (Deadlifts, Squats) + High-Calorie Diet',
    4: 'Compound Lifts (Deadlifts, Squats) + High-Calorie Diet'
  };

  const dietPlan = dietPlans[GoalID];
  const workoutPlan = workoutPlans[GoalID];

  useEffect(() => {
    if (goal === "Body Clean/Detox") {
      setGoadID(1)
    }
    else if (goal === "Weight Loss") {
      setGoadID(2)
    }
    else if (goal === "Weight Gain") {
      setGoadID(3)
    }
    else if (goal === "Muscle Building") {
      setGoadID(4)
    }
  }, [GoalID])

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Your Health Metrics</Text>

      {/* BMI Section */}
      <View style={styles.bmiSection}>
        <Text style={styles.bmiText}>Your BMI: {bmi}</Text>
        <Text style={styles.bmiStatus}>{bmiClassification.status}</Text>
        <Text style={styles.bmiMessage}>{bmiClassification.message}</Text>
        <Image source={{ uri: bmiClassification.image }} style={styles.image} />
      </View>

      {/* BMR Section */}
      <View style={styles.bmrSection}>
        <Text style={styles.bmrText}>Your BMR: {bmr} kcal/day</Text>
        <Image source={require('../assets/bmr.jpg')} style={styles.image} />
      </View>

      <Text style={styles.title}>Your Diet Plan for {goal.charAt(0).toUpperCase() + goal.slice(1)}</Text>

      {dietPlan.map((step, index) => (
        <View key={index} style={styles.stepContainer}>
          <Text style={styles.stepTitle}>{step.title}</Text>
          <Text style={styles.stepDescription}>{step.description}</Text>
          {/* <View style={{ padding: 20,display:"none" }}>
            <Image source={{ uri: step.image }} style={styles.image} />
          </View> */}
        </View>
      ))}

      <Text style={styles.workoutTitle}>Your Workout Plan</Text>
      <Text style={styles.workoutDescription}>{workoutPlan}</Text>

      <View style={{ marginBottom: 140 }}>
        <Button title="Get Free Consultation" onPress={() => navigation.navigate('Contact')} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
    paddingBottom: 100,

  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  bmiSection: {
    marginBottom: 20,
    backgroundColor: '#e2f7f5',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  bmiText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  bmiStatus: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  bmiMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 5,
  },
  bmrSection: {
    marginBottom: 20,
    backgroundColor: '#f0f4f8',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  bmrText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  stepContainer: {
    marginBottom: 30,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    elevation: 3,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  stepDescription: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
    marginTop: 10,
  },
  workoutTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  workoutDescription: {
    fontSize: 16,
    marginBottom: 20,
    fontStyle: 'italic',
  },
});

export default DietWorkoutScreen;
