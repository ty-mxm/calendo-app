import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { RootStackParamList } from '../../../types';

type TeamsScreenRouteProp = RouteProp<RootStackParamList, 'Teams'>;
type TeamsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Teams'>;

export default function TeamsScreen() {
  const [teams, setTeams] = useState<string[]>(['Team 1', 'Team 2', 'Team 3']);
  const navigation = useNavigation<TeamsScreenNavigationProp>();
  const route = useRoute<TeamsScreenRouteProp>();

  useEffect(() => {
    if (route.params?.newTeam && typeof route.params.newTeam === 'string' && !teams.includes(route.params.newTeam)) {
      setTeams((prevTeams) => [...prevTeams, route.params.newTeam]);
    }
  }, [route.params?.newTeam]);

  const handleTeamDetails = (team: string) => {
    navigation.navigate('TeamDetails', { teamName: team });
  };

  const handleAddTeam = () => {
    navigation.navigate('AddTeam');
  };

  const renderTeamItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.teamContainer}
      onPress={() => handleTeamDetails(item)}
    >
      <View style={styles.teamInfo}>
        <Ionicons name="people" size={20} color="#6A5ACD" />
        <Text style={styles.teamName}>{item}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#AAA" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>👥 Mes Équipes</Text>
        <Text style={styles.headerSubtitle}>Gérez vos équipes de manière efficace</Text>
      </View>

      {/* Add Team Button */}
      <TouchableOpacity style={styles.addButton} onPress={handleAddTeam}>
        <Ionicons name="add-circle" size={24} color="#FFF" />
        <Text style={styles.addButtonText}>Nouvelle Équipe</Text>
      </TouchableOpacity>

      {/* Team List */}
      <FlatList
        data={teams}
        keyExtractor={(item) => item}
        renderItem={renderTeamItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Aucune équipe disponible. Commencez par en ajouter une !
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
    paddingVertical: 25,
    backgroundColor: '#6A5ACD',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#FFF' },
  headerSubtitle: { fontSize: 14, color: '#DCDCDC', marginTop: 5 },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    padding: 12,
    backgroundColor: '#6A5ACD',
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  addButtonText: { color: '#FFF', fontWeight: 'bold', fontSize: 16, marginLeft: 8 },
  teamContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    marginHorizontal: 20,
    marginVertical: 8,
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: '#6A5ACD', // Ligne colorée à gauche pour distinction
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  teamInfo: { flexDirection: 'row', alignItems: 'center' },
  teamName: { marginLeft: 10, fontSize: 16, fontWeight: '500', color: '#333' },
  listContent: { paddingBottom: 30 },
  emptyText: {
    textAlign: 'center',
    color: '#AAA',
    fontSize: 14,
    marginTop: 20,
    paddingHorizontal: 20,
  },
});
