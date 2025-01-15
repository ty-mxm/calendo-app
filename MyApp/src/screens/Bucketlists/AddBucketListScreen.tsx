import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function AddWishScreen() {
  const navigation = useNavigation();

  const [wishTitle, setWishTitle] = useState('');

  const handleAddWish = () => {
    if (!wishTitle.trim()) {
      Alert.alert('Erreur', 'Veuillez entrer un souhait.');
      return;
    }

    // Simule une réussite sans API
    Alert.alert('Succès', `Souhait "${wishTitle}" ajouté avec succès !`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
    
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ajouter un souhait</Text>
      </View>

     
      <View style={styles.formContainer}>
        
        <View style={styles.inputContainer}>
          <Ionicons name="star-outline" size={20} color="#7F57FF" />
          <TextInput
            style={styles.input}
            placeholder="Titre du souhait"
            placeholderTextColor="#AAA"
            value={wishTitle}
            onChangeText={setWishTitle}
          />
        </View>
     
        <Text style={styles.infoText}>
          Un souhait est une activité ou un événement que vous souhaitez partager avec votre équipe.
        </Text>

        
        <TouchableOpacity style={styles.addButton} onPress={handleAddWish}>
          <Text style={styles.addButtonText}>Ajouter le souhait</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7F57FF',
    paddingVertical: 40,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  formContainer: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0EFFF', 
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  addButton: {
    backgroundColor: '#7F57FF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
