import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { RootStackParamList, Event } from '../../../types';
import { StackNavigationProp } from '@react-navigation/stack';

// Typage des paramètres pour la route
type EditEventRouteProp = RouteProp<RootStackParamList, 'EditEvent'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'EditEvent'>;

export default function EditEventScreen() {
  const route = useRoute<EditEventRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { event } = route.params;

  // États pour les champs modifiables
  const [title, setTitle] = useState(event.title);
  const [location, setLocation] = useState(event.location);
  const [date, setDate] = useState(event.date);
  const [time, setTime] = useState(event.time);
  const [category, setCategory] = useState(event.category);

  // Fonction pour enregistrer les modifications
  const handleSave = () => {
    const updatedEvent: Event = {
      ...event,
      title,
      location,
      date,
      time,
      category,
    };
  
    // Naviguer vers Home via Main (BottomTabNavigator)
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main', params: { screen: 'Home' } }],
    });
  };
  
  
  
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Modifier l'Événement</Text>

      {/* Champs de modification */}
      <TextInput
        style={styles.input}
        placeholder="Titre"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Lieu"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Heure"
        value={time}
        onChangeText={setTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Catégorie"
        value={category}
        onChangeText={setCategory}
      />

      {/* Bouton Enregistrer */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Enregistrer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F5F5F5' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  input: {
    backgroundColor: '#FFF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderColor: '#DDD',
    borderWidth: 1,
  },
  saveButton: {
    backgroundColor: '#7F57FF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});