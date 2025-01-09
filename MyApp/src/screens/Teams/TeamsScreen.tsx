import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { TeamController } from '../controllers/TeamController';
import { Team } from '../models/Team';
import { RootStackParamList } from '../../../types';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Teams'>;

export default function TeamsScreen() {
  const [teams, setTeams] = useState<Team[]>([]);
  const navigation = useNavigation<NavigationProp>();
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchTeams = async () => {
      const fetchedTeams = await TeamController.getAllTeams();
      setTeams(fetchedTeams);
    };

    fetchTeams();
  }, [isFocused]);

  const handleAddTeam = () => {
    navigation.navigate('AddTeam');
  };

  const handleTeamDetails = (team: Team) => {
    navigation.navigate('TeamDetails', { teamName: team.name });
  };

  const handleDeleteTeam = (teamId: string) => {
    setTeams(teams.filter(team => team.id !== teamId));
  };

  const renderTeamItem = ({ item }: { item: Team }) => (
    <TouchableOpacity
      style={styles.teamContainer}
      onPress={() => handleTeamDetails(item)}
    >
      <View style={styles.teamInfo}>
        <Ionicons name="people-outline" size={24} color="#7F57FF" />
        <Text style={styles.teamName}>{item.name}</Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => handleDeleteTeam(item.id)}>
          <Ionicons name="trash-outline" size={24} color="#000" />
        </TouchableOpacity>
        <Ionicons name="chevron-forward-outline" size={24} color="#7F57FF" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mes équipes</Text>
        <Text style={styles.headerSubtitle}>
          Gérez et organisez vos équipes
        </Text>
      </View>

      {/* Add Team Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddTeam}>
        <Ionicons name="add-circle-outline" size={28} color="#FFF" />
        <Text style={styles.addButtonText}>Créer une équipe</Text>
      </TouchableOpacity>

      {/* Teams List */}
      <FlatList
        data={teams}
        keyExtractor={(item) => item.id}
        renderItem={renderTeamItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Aucune équipe disponible. Créez-en une pour commencer !
          </Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: {
    alignItems: 'center',
    backgroundColor: '#7F57FF',
    paddingVertical: 40,
    marginBottom: 20,
  },
  headerTitle: { fontSize: 24, fontWeight: 'bold', color: '#FFF' },
  headerSubtitle: { fontSize: 14, color: '#DDD', marginTop: 8 },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    padding: 15,
    backgroundColor: '#7F57FF',
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
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
    marginVertical: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  teamInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  teamName: {
    marginLeft: 15,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listContent: { paddingBottom: 20 },
  emptyText: {
    textAlign: 'center',
    color: '#AAA',
    fontSize: 14,
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
