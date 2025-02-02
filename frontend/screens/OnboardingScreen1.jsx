import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const onboardingData = [
  {
    id: 1,
    image: require("../assets/onboarding1.png"),
    title: "Borrow Machines",
    description:
      "Easily Borrow machines from your or nearby villages and increase your farming potential.",
  },
  {
    id: 2,
    image: require("../assets/onboarding2.png"),
    title: "Lend Your Tools",
    description:
      "Lend your tools help other farmers when not using your machines or tools while earning.",
  },
  {
    id: 3,
    image: require("../assets/onboarding3.png"),
    title: "Save and grow",
    description:
      "Save your money and grow exponentially by increasing your productivity at a nominal cost.",
  },
];

const OnboardingScreen1 = ({ navigation }) => {
  const [step, setStep] = useState(0);

  const handleNext = async() => {
    if (step < onboardingData.length - 1) {
      setStep(step + 1);
    } else {
      navigation.navigate("GetStarted")
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.pageNumber}>{step + 1}/3</Text>

      
      <TouchableOpacity style={styles.skipButton} onPress={() => navigation.navigate("Login")}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      
      <Image source={onboardingData[step].image} style={styles.image} />

      
      <Text style={styles.title}>{onboardingData[step].title}</Text>
      <Text style={styles.description}>{onboardingData[step].description}</Text>

      <View style={styles.indicatorContainer}>
        {onboardingData.map((_, index) => (
          <View key={index} style={[styles.dot, step === index && styles.activeDot]} />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleBack} disabled={step === 0}>
          <Text style={[styles.buttonText, step === 0 && styles.disabledText]}>Back</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNext}>
          <Text style={styles.buttonText}>{step === onboardingData.length - 1 ? "Finish" : "Next"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  pageNumber: {
    position: "absolute",
    top: 50,
    left: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "#000"
  },
  skipButton: {
    position: "absolute",
    top: 50,
    right: 20,
    color: '#000'
  },
  skipText: {
    fontSize: 16,
    color: "black",
  },
  image: {
    width: "100%",
    height: 350,
    resizeMode: "contain",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 20,
    color: "#000"
  },
  description: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginHorizontal: 20,
    marginTop: 10,
  },
  indicatorContainer: {
    flexDirection: "row",
    marginTop: 20,
    marginBottom: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "lightgray",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "black",
    width: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    bottom: 50,
    paddingHorizontal: 20,
  },
  buttonText: {
    fontSize: 16,
    color: "green",
  },
  disabledText: {
    color: "gray",
  },
});
