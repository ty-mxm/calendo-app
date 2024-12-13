import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AddTeamScreen() {
  const [teamName, setTeamName] = useState('');
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Titre */}
      <Text style={styles.title}>Create Your Team</Text>

      {/* Champ d'entrée pour le nom de l'équipe */}
      <TextInput
        style={styles.input}
        placeholder="Enter your team's name"
        value={teamName}
        onChangeText={setTeamName}
      />

      {/* Boutons */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('GetStarted' as never)}
      >
        <Text style={styles.createButtonText}>Create Team</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.teamDetailsButton}
        onPress={() => navigation.navigate('TeamDetails' as never)}
        accessibilityLabel="View team details"
        accessible={true}
      >
        <Text style={styles.buttonText}>View Team Details</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.teamsButton}
        onPress={() => navigation.navigate('Teams' as never)}
        accessibilityLabel="View all teams"
        accessible={true}
      >
        <Text style={styles.buttonText}>View All Teams</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Couleur de fond neutre et élégante
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#FFF',
    borderColor: '#D3D3D3',
    borderWidth: 1,
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    fontSize: 16,
    width: '90%',
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', // Nouvelle syntaxe
  },
  createButton: {
    backgroundColor: '#40E0D0', // Turquoise
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
    boxShadow: '0px 2px 5px rgba(64, 224, 208, 0.4)', // Nouvelle syntaxe
  },
  createButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  teamDetailsButton: {
    backgroundColor: '#FFA500', // Orange vif
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
    boxShadow: '0px 2px 5px rgba(255, 165, 0, 0.4)', // Nouvelle syntaxe
  },
  teamsButton: {
    backgroundColor: '#FF6CB8', // Rose pastel
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginBottom: 15,
    width: '80%',
    alignItems: 'center',
    boxShadow: '0px 2px 5px rgba(255, 108, 184, 0.4)', // Nouvelle syntaxe
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
