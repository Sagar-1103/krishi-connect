import React, { useState, useEffect } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { setLanguage, getLanguage } from "../i18n.js";

const { width, height } = Dimensions.get("window");

const languages = [
  { code: "en", name: "English"},
  { code: "kn", name: "ಕನ್ನಡ" },
  { code: "hi", name: "हिन्दी" },
  { code: "ta", name: "தமிழ்" },
  { code: "te", name: "తెలుగు" },
  { code: "mr", name: "मराठी" },
  { code: "ur", name: "اُردُو" },
];

const LanguageSelector = ({navigation}) => {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  useEffect(() => {
    (async () => {
      const storedLanguage = await getLanguage();
      setSelectedLanguage(storedLanguage);
    })();
  }, []);

  const handleLanguageChange = async (code) => {
    await setLanguage(code);
    setSelectedLanguage(code);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Choose Language</Text>
      <FlatList
        style={styles.list}
        data={languages}
        keyExtractor={(item) => item.code}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.languageItem, selectedLanguage === item.code && styles.selectedItem]}
            onPress={() => handleLanguageChange(item.code)}
          >
            <Text style={styles.languageText}>{item.name}</Text>
            {selectedLanguage === item.code && <Ionicons name="checkmark" size={24} color="green" />}
          </TouchableOpacity>
        )}
      />

      {/* Fixed Login Button */}
      <TouchableOpacity onPress={()=>navigation.navigate("Login")} style={styles.continueButton}>
        <Text style={styles.continueText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9F9F9",
    paddingHorizontal: "5%",
    paddingTop: "10%",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    marginBottom: "5%",
  },
  languageItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    paddingVertical: "3%",
    paddingHorizontal: "5%",
    marginBottom: "2%",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  selectedItem: {
    borderColor: "green",
    backgroundColor: 'rgba(0, 150, 0, 0.15)',
    borderWidth: 1,
  },
  languageText: {
    fontSize: 20,
    color: "#333",
  },
  continueButton: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    backgroundColor: "green",
    paddingVertical: "4%",
    width: "90%",
    borderRadius: 8,
    alignItems: "center",
    zIndex: 999,
  },
  continueText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  list: {
    marginBottom: "25%",
  }
});

export default LanguageSelector;
