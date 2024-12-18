import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function TeamsScreen({ route }: { route: { params?: { newTeam?: string } } }) {
  const [teams, setTeams] = useState(['Team 1', 'Team 2', 'Team 3']);
  const navigation = useNavigation();

  // Récupérer une nouvelle équipe ajoutée
  if (route.params?.newTeam) {
    if (!teams.includes(route.params.newTeam)) {
      setTeams([...teams, route.params.newTeam]);
    }
  }

  const handleTeamDetails = (team: string) => {
    navigation.navigate('TeamDetails', { teamName: team });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>👥 Mes équipes</Text>
        <View style={{ width: 24 }} /> {/* Espacement pour équilibrer */}
      </View>

      {/* Sous-titre */}
      <Text style={styles.subtitle}>Organise et gère tes équipes facilement</Text>

      {/* Ajouter une équipe */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddTeam' as never)}
      >
        <Ionicons name="add-circle-outline" size={24} color="#FFF" />
        <Text style={styles.addButtonText}>Ajouter une équipe</Text>
      </TouchableOpacity>

      {/* Liste des équipes */}
      <FlatList
        data={teams}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.teamContainer}
            onPress={() => handleTeamDetails(item)}
          >
            <View style={styles.teamInfo}>
              <Ionicons name="people" size={20} color="#7F57FF" />
              <Text style={styles.teamName}>{item}</Text> {/* Rendu du texte */}
            </View>
            <Ionicons name="chevron-forward" size={20} color="#AAA" />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F9F9' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#7F57FF',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFF' },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    padding: 12,
    backgroundColor: '#7F57FF',
    borderRadius: 10,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
  },
  teamContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
  },
  teamInfo: { flexDirection: 'row', alignItems: 'center' },
  teamName: { marginLeft: 10, fontSize: 16, fontWeight: 'bold', color: '#333' },
  listContent: { paddingBottom: 30 },
});
