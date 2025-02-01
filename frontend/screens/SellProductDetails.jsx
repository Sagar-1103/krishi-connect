import React, { useState, useEffect } from "react";
import { View, Image, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons'; // Updated import for icons
import { SelectList } from 'react-native-dropdown-select-list'; // Import dropdown list

const ProductDetailsScreen = ({ navigation }) => { // Accept navigation as a prop
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [pricingUnit, setPricingUnit] = useState("");
  const [state, setState] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [village, setVillage] = useState("");

  // Define categories and their respective subcategories
  const categories = [
    { key: '1', value: 'Machines' },
    { key: '2', value: 'Tools and Hand Equipment' },
    { key: '3', value: 'Irrigation and Water Management' },
    { key: '4', value: 'Fertilizers and Soil Amendments' },
    { key: '5', value: 'Pesticides and Pest Control' },
    { key: '6', value: 'Livestock Equipment' },
    { key: '7', value: 'Storage and Handling' },
    { key: '8', value: 'Safety and Protective Gear' },
  ];

  const subCategories = {
    Machines: [
      { key: '1', value: 'Tractors' },
      { key: '2', value: 'Harvesting Machines' },
      { key: '3', value: 'Planting and Seeding Machines' },
      { key: '4', value: 'Soil Preparation Machines' },
      { key: '5', value: 'Irrigation Machines' },
      { key: '6', value: 'Post-Harvest Machines' },
      { key: '7', value: 'Specialized Machines' },
    ],
    'Tools and Hand Equipment': [
      { key: '1', value: 'Digging Tools' },
      { key: '2', value: 'Cutting Tools' },
      { key: '3', value: 'Weeding Tools' },
      { key: '4', value: 'Raking and Gathering Tools' },
      { key: '5', value: 'Measuring and Testing Tools' },
      { key: '6', value: 'Miscellaneous Tools' },
    ],
    'Irrigation and Water Management': [
      { key: '1', value: 'Sprinkler Systems' },
      { key: '2', value: 'Drip Irrigation Systems' },
      { key: '3', value: 'Water Pumps' },
      { key: '4', value: 'Hoses and Pipes' },
      { key: '5', value: 'Water Storage' },
    ],
    'Fertilizers and Soil Amendments': [
      { key: '1', value: 'Organic Fertilizers' },
      { key: '2', value: 'Inorganic Fertilizers' },
      { key: '3', value: 'Liquid Fertilizers' },
      { key: '4', value: 'Soil Conditioners' },
      { key: '5', value: 'Biofertilizers' },
    ],
    'Pesticides and Pest Control': [
      { key: '1', value: 'Insecticides' },
      { key: '2', value: 'Herbicides' },
      { key: '3', value: 'Fungicides' },
      { key: '4', value: 'Rodenticides' },
      { key: '5', value: 'Biological Control Agents' },
      { key: '6', value: 'Sprayers' },
    ],
    'Livestock Equipment': [
      { key: '1', value: 'Feeding Equipment' },
      { key: '2', value: 'Milking Equipment' },
      { key: '3', value: 'Housing Equipment' },
      { key: '4', value: 'Health and Grooming Tools' },
      { key: '5', value: 'Transportation Equipment' },
      { key: '6', value: 'Fencing and Handling' },
    ],
    'Storage and Handling': [
      { key: '1', value: 'Grain Storage' },
      { key: '2', value: 'Cold Storage' },
      { key: '3', value: 'Material Handling' },
      { key: '4', value: 'Packaging Equipment' },
      { key: '5', value: 'Drying Equipment' },
    ],
    'Safety and Protective Gear': [
      { key: '1', value: 'Clothing' },
      { key: '2', value: 'Footwear' },
      { key: '3', value: 'Head Protection' },
      { key: '4', value: 'Hand Protection' },
      { key: '5', value: 'Eye and Face Protection' },
      { key: '6', value: 'Respiratory Protection' },
    ],
  };

  const states = [
    { key: '1', value: 'Andhra Pradesh' },
    { key: '2', value: 'Arunachal Pradesh' },
    { key: '3', value: 'Assam' },
    { key: '4', value: 'Bihar' },
    { key: '5', value: 'Chandigarh' },
    { key: '6', value: 'Chhattisgarh' },
    { key: '7', value: 'Dadra and Nagar Haveli and Daman and Diu' },
    { key: '8', value: 'Goa' },
    { key: '9', value: 'Gujarat' },
    { key: '10', value: 'Haryana' },
    { key: '11', value: 'Himachal Pradesh' },
    { key: '12', value: 'Jharkhand' },
    { key: '13', value: 'Karnataka' },
    { key: '14', value: 'Kerala' },
    { key: '15', value: 'Madhya Pradesh' },
    { key: '16', value: 'Maharashtra' },
    { key: '17', value: 'Manipur' },
    { key: '18', value: 'Meghalaya' },
    { key: '19', value: 'Mizoram' },
    { key: '20', value: 'Nagaland' },
    { key: '21', value: 'Odisha' },
    { key: '22', value: 'Puducherry' },
    { key: '23', value: 'Punjab' },
    { key: '24', value: 'Rajasthan' },
    { key: '25', value: 'Sikkim' },
    { key: '26', value: 'Tamil Nadu' },
    { key: '27', value: 'Telangana' },
    { key: '28', value: 'Tripura' },
    { key: '29', value: 'Uttar Pradesh' },
    { key: '30', value: 'Uttarakhand' },
    { key: '31', value: 'West Bengal' },
    { key: '32', value: 'Andaman and Nicobar Islands' },
    { key: '33', value: 'Delhi' },
    { key: '34', value: 'Lakshadweep' },
    { key: '35', value: 'Ladakh' },
    { key: '36', value: 'Jammu and Kashmir' }
  ];

  const [availableSubCategories, setAvailableSubCategories] = useState([]);

  // Update the subcategory options based on the selected category
  useEffect(() => {
    if (category) {
      setAvailableSubCategories(subCategories[category] || []);
      setSubCategory(""); // Reset subcategory when category changes
    }
  }, [category]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff", padding: 16 }}>

      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Text style={{ fontSize: 20, fontWeight: "bold", textAlign: "center", marginBottom: 10, color: "black" }}>
        Product Details
      </Text>

      <Image 
        source={{ uri: 'https://picsum.photos/500' }}
        style={{ height: 150, width: '100%', borderRadius: 10, marginBottom: 10 }} 
      />

      <Text style={{ color: "black" }}>Title</Text>
      <TextInput 
        style={styles.input} 
        value={title} 
        onChangeText={setTitle} 
        placeholder="Title" 
        color="black"
        placeholderTextColor={'black'}
      />

      <Text style={{ color: "black" }}>Category</Text>
      <SelectList
        setSelected={setCategory}
        data={categories}
        save="value"
        placeholder="Select Category"
        boxStyles={styles.dropdown}
        dropdownStyles={styles.dropdownList}
        dropdownItemStyles={styles.item} 
        dropdownTextStyles={styles.itemText} 
        placeholderTextColor={'black'}
        inputStyles={styles.optionInput}
        selectionColor={'black'}
      />

      <Text style={{ color: "black" }}>Sub Category</Text>
      <SelectList
        setSelected={setSubCategory}
        data={availableSubCategories}
        save="value"
        placeholder="Select Sub Category"
        boxStyles={styles.dropdown}
        dropdownStyles={styles.dropdownList}
        color="black"
        dropdownItemStyles={styles.item} 
        inputStyles={styles.optionInput}
        dropdownTextStyles={styles.itemText} 
        placeholderTextColor={'black'}
        disabled={category === ""} // Disable subcategory dropdown until category is selected
      />

      <Text style={{ color: "black" }}>Description</Text>
      <TextInput 
        style={styles.input} 
        value={description} 
        onChangeText={setDescription} 
        placeholder="Enter Description" 
        color="black"
        placeholderTextColor={'black'}
      />

      <Text style={{ color: "black" }}>Pricing Unit</Text>
      <SelectList
        setSelected={setPricingUnit}
        data={[
          { key: '1', value: 'Per Day' },
          { key: '2', value: 'Per Hour' },
          { key: '3', value: 'Full Product'},
        ]}
        save="value"
        inputStyles={styles.optionInput}
        placeholder="Select Pricing Unit"
        boxStyles={styles.dropdown}
        dropdownStyles={styles.dropdownList}
        dropdownItemStyles={styles.item} 
        dropdownTextStyles={styles.itemText}
        color="black"
        placeholderTextColor={'black'}
      />

      <Text style={{ color: "black" }}>Price</Text>
      <TextInput 
        style={styles.input} 
        value={price} 
        onChangeText={setPrice} 
        keyboardType="numeric" 
        placeholder="Enter your price" 
        color="black"
        placeholderTextColor={'black'}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Choose from Calendar</Text>
      </TouchableOpacity>

      <Text style={{ color: "black" }}>Location Details</Text>
      <TouchableOpacity style={styles.mapButton}>
        <Text style={styles.buttonText}>Choose on Map</Text>
      </TouchableOpacity>

      <Text style={{ color: "black" }}>Area</Text>
      <TextInput 
        style={styles.input} 
        value={area} 
        onChangeText={setArea} 
        placeholder="Enter Your Area" 
        color="black"
        placeholderTextColor={'black'}
      />

      <Text style={{ color: "black" }}>Village</Text>
      <TextInput 
        style={styles.input} 
        value={village} 
        onChangeText={setVillage} 
        placeholder="Enter your Village" 
        color="black"
        placeholderTextColor={'black'}
      />

      <Text style={{ color: "black" }}>State</Text>
      <SelectList
        setSelected={setState}
        data={states}
        save="value"
        placeholder="Select your state"
        boxStyles={styles.dropdown}
        dropdownStyles={styles.dropdownList}
        color="black"
        inputStyles={styles.optionInput}
        dropdownItemStyles={styles.item} 
        dropdownTextStyles={styles.itemText} 
        placeholderTextColor={'black'}
      />

      <TouchableOpacity style={styles.listButton}>
        <Text style={styles.listButtonText}>List my Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = {
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    color: "black",
  },
  optionInput: {
    fontSize: 16,
    color: 'black',
  },
  button: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
    color: "black",
  },
  mapButton: {
    backgroundColor: "#e6f4ea",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#2c9c69",
    marginBottom: 10,
    color: "black",
  },
  listButton: {
    backgroundColor: "#2c9c69",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    color: "black",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
  listButtonText: {
    color: "black",
    fontWeight: "bold",
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    color: "black",
  },
  dropdownList: {
    borderRadius: 5,
    borderColor: "#ccc",
    padding: 10,
    color: "black",
  },
  item: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  itemText: {
    color: 'black',
  },
};

export default ProductDetailsScreen;
