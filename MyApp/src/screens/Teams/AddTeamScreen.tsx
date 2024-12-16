import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  Teams: { newTeam?: string };
};

export default function AddTeamScreen() {
  const [teamName, setTeamName] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleCreateTeam = () => {
    if (teamName.trim()) {
      navigation.navigate('Teams', { newTeam: teamName });
      setTeamName('');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* En-tête stylisée */}
      <View style={styles.header}>
        <Text style={styles.title}>Créer une nouvelle équipe</Text>
        <Text style={styles.subtitle}>Ajoute un nom pour ton équipe et valide</Text>
      </View>

      {/* Champ de saisie */}
      <View style={styles.inputContainer}>
        <Ionicons name="people-outline" size={24} color="#7F57FF" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Nom de l'équipe"
          placeholderTextColor="#999"
          value={teamName}
          onChangeText={setTeamName}
        />
      </View>

      {/* Bouton de validation */}
      <TouchableOpacity style={styles.createButton} onPress={handleCreateTeam}>
        <Text style={styles.createButtonText}>Créer l'équipe</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7F57FF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    borderColor: '#D3D3D3',
    borderWidth: 1,
    paddingHorizontal: 10,
    elevation: 3,
    marginBottom: 20,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
    color: '#333',
  },
  createButton: {
    backgroundColor: '#7F57FF',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#7F57FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  createButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
