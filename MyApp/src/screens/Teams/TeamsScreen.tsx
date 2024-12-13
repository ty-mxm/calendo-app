import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';


type RootStackParamList = {
  TeamDetails: { teamName: string };
};

export default function TeamsScreen() {
  // Typage de la navigation
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const [teams, setTeams] = useState(['Team 1', 'Team 2', 'Team 3']); // Liste d'équipes

  const addTeam = () => {
    const newTeam = `Team ${teams.length + 1}`;
    setTeams([...teams, newTeam]); // nouvelle équipe 
  };

  return (
    <View style={styles.container}>
   
      <Text style={styles.title}>👥 My Teams</Text>

     
      <FlatList
        data={teams}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.teamButton}
            onPress={() => navigation.navigate('TeamDetails', { teamName: item })}
          >
            <Text style={styles.teamButtonText}>🏅 {item}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>No teams created yet. Start by adding one!</Text>
        }
      />

     
      <TouchableOpacity style={styles.addButton} onPress={addTeam}>
        <Text style={styles.addButtonText}>➕ Add a Team</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5', 
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  teamButton: {
    backgroundColor: '#87CEEB',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#87CEEB',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  teamButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyListText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 20,
  },
  addButton: {
    backgroundColor: '#40E0D0', 
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#40E0D0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
