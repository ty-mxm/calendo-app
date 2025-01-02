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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ajouter un Souhait</Text>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        {/* Wish Title Input */}
        <View style={styles.inputContainer}>
          <Ionicons name="star-outline" size={20} color="#6A5ACD" />
          <TextInput
            style={styles.input}
            placeholder="Titre du souhait"
            placeholderTextColor="#AAA"
            value={wishTitle}
            onChangeText={setWishTitle}
          />
        </View>
        {/* Info Text */}
        <Text style={styles.infoText}>
          Un souhait est une activité ou un événement que vous souhaitez partager avec votre équipe.
        </Text>

        {/* Add Button */}
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
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#6A5ACD',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  backButton: {
    marginRight: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 8,
    borderRadius: 50,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  formContainer: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 10,
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
    backgroundColor: '#6A5ACD',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
