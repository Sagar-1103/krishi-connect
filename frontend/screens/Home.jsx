import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { View, ScrollView, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";

const products = [
  {
    id: 1,
    name: "Tractor without plough",
    description: "IMT 549.3 DL Diesel Tractor - Use it for ploughing or carrying goods",
    price: "₹2500 / day",
    image: "https://picsum.photos/600",
  },
  {
    id: 2,
    name: "Pesticide and Sprayer",
    description: "30L Pesticide with sprayer - Double pump, battery sprayer",
    price: "₹1800",
    image: "https://picsum.photos/700",
  },
  {
    id: 3,
    name: "Tractor plough (only)",
    description: "Plough without tractor - Suitable for all medium and large tractors",
    price: "₹600 / day",
    image: "https://picsum.photos/800",
  },
  {
    id: 4,
    name: "Harvester/Thrasher",
    description: "John Deere Harvester - Most suitable for wheat",
    price: "₹3200 / day",
    image: "https://picsum.photos/900",
  },
];

const categories = ["All Items", "Machines", "Tools", "Irrigation", "Fertilizers", "Pesticides", "Livestock", "Storage", "Safety"];

const HomeScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Items");

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../assets/krishiConnectLogo.png")} style={styles.logo} />
      </View>

      {/* Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 60, paddingBottom: 20 }} >
        <View style={styles.searchContainer}>
          <TextInput placeholderTextColor={"gray"} placeholder="Search any product..." style={styles.searchInput} />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.filterTab, selectedCategory === category && styles.activeFilterTab]}
              onPress={() => setSelectedCategory(category)}
            >
              <Text style={[styles.filterText, selectedCategory === category && styles.activeFilterText]}>
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView >

        <Text style={styles.heading}>All Featured</Text>

        <View>
          {products.map((product) => (
            <View key={product.id} style={styles.productCard}>
              <TouchableOpacity onPress={() => navigation.navigate("BuyProductDetails", { product })}>
              <Image  source={{ uri: product.image }} style={styles.productImage} />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productDesc}>{product.description}</Text>
              <Text style={styles.productPrice}>{product.price}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    paddingHorizontal: 16,
  },
  logoContainer: {
    position: "absolute",
    top: 10,
    left: 16,
    zIndex: 10,
    width:"100%",
    marginTop:-10,
    paddingTop:'5%',
    paddingBottom: "2%",
    backgroundColor:"white"
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: "contain",
  },
  searchContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  filterContainer: {
    flexDirection: "row",
    marginVertical: 10,
  },
  filterTab: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  activeFilterTab: {
    backgroundColor: "#008000",
  },
  filterText: {
    fontSize: 16,
    color: "#000",
  },
  activeFilterText: {
    color: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    color:"black"
  },
  productCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    color:"black"
  },
  productDesc: {
    fontSize: 14,
    color: "#555",
    marginVertical: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#008000",
    marginTop: 5,
  },
});

export default HomeScreen;
