import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TeamsScreen() {
  const navigation = useNavigation();
  const [teams, setTeams] = useState(['Team 1', 'Team 2', 'Team 3']); // Liste dynamique d'équipes

  const addTeam = () => {
    const newTeam = `Team ${teams.length + 1}`;
    setTeams([...teams, newTeam]); // Ajout d'une nouvelle équipe
  };

  return (
    <View style={styles.container}>
      {/* Titre */}
      <Text style={styles.title}>My Teams</Text>

      {/* Liste des équipes */}
      <FlatList
        data={teams}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.teamButton}>
            <Text style={styles.teamButtonText}>{item}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Bouton pour ajouter une équipe */}
      <TouchableOpacity style={styles.addButton} onPress={addTeam}>
        <Text style={styles.addButtonText}>Add a Team</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', // Fond neutre
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  teamButton: {
    backgroundColor: '#87CEEB', // Bleu clair
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    boxShadow: '0px 4px 10px rgba(135, 206, 235, 0.4)', // Modernisation des ombres
  },
  teamButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#40E0D0', // Turquoise
    paddingVertical: 15,
    borderRadius: 15,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    boxShadow: '0px 4px 10px rgba(64, 224, 208, 0.4)', // Modernisation des ombres
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
