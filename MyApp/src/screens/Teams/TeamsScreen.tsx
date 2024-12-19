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
  }, [route.params?.newTeam]); // Removed 'teams' from dependency array

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
        <Ionicons name="people" size={20} color="#7F57FF" />
        <Text style={styles.teamName}>{item}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#AAA" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.headerButton}
        >
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>👥 Mes équipes</Text>
        <View style={styles.headerButton} />
      </View>

      <Text style={styles.subtitle}>
        Organise et gère tes équipes facilement
      </Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddTeam}
      >
        <Ionicons name="add-circle-outline" size={24} color="#FFF" />
        <Text style={styles.addButtonText}>Ajouter une équipe</Text>
      </TouchableOpacity>

      <FlatList
        data={teams}
        keyExtractor={(item) => item}
        renderItem={renderTeamItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Aucune équipe disponible. Commencez par en créer une !
          </Text>
        }
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
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: '#FFF' },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    padding: 12,
    backgroundColor: '#7F57FF',
    borderRadius: 10,
    marginBottom: 20,
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
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  teamInfo: { flexDirection: 'row', alignItems: 'center' },
  teamName: { marginLeft: 10, fontSize: 16, fontWeight: 'bold', color: '#333' },
  listContent: { paddingBottom: 30 },
  emptyText: { textAlign: 'center', color: '#666', fontSize: 16, marginTop: 30, paddingHorizontal: 20 },
});
