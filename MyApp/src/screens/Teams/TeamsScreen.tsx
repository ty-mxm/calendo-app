import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  Teams: { newTeam?: string };
  TeamDetails: { teamName: string };
};

type TeamsRouteProp = RouteProp<RootStackParamList, 'Teams'>;
type NavigationPropType = NavigationProp<RootStackParamList>;

export default function TeamsScreen() {
  const navigation = useNavigation<NavigationPropType>();
  const route = useRoute<TeamsRouteProp>();

  const [teams, setTeams] = useState<string[]>(['Team 1', 'Team 2', 'Team 3']);

  // Ajouter la nouvelle équipe reçue dans la route
  useEffect(() => {
    const newTeam = route.params?.newTeam;
    if (newTeam) {
      setTeams((prevTeams) => [...prevTeams, newTeam]);
    }
  }, [route.params?.newTeam]);

  // Fonction pour supprimer une équipe
  const removeTeam = (teamName: string) => {
    setTeams((prevTeams) => prevTeams.filter((team) => team !== teamName));
  };

  const renderTeamCard = ({ item }: { item: string }) => (
    <View style={styles.teamCard}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => navigation.navigate('TeamDetails', { teamName: item })}
      >
        <Text style={styles.teamTitle}>👥 {item}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => removeTeam(item)}>
        <Ionicons name="close-circle-outline" size={24} color="#FF6CB8" />
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={teams}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={() => (
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>👥 Mes équipes</Text>
            <Text style={styles.headerSubtitle}>Organise et gère tes équipes facilement</Text>
          </View>
          <View style={styles.separatorContainer}>
            <View style={styles.separatorLine} />
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => navigation.navigate('AddTeam')}
            >
              <Ionicons name="add-circle-outline" size={30} color="#7F57FF" />
              <Text style={styles.addButtonText}>Ajouter une équipe</Text>
            </TouchableOpacity>
            <View style={styles.separatorLine} />
          </View>
        </>
      )}
      renderItem={renderTeamCard}
      ListEmptyComponent={() => (
        <Text style={styles.emptyText}>Aucune équipe pour le moment. Crée ta première équipe !</Text>
      )}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: { paddingBottom: 80 },
  header: { alignItems: 'center', paddingVertical: 20, backgroundColor: '#7F57FF', marginBottom: 16 },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#FFF' },
  headerSubtitle: { fontSize: 16, color: '#E0E0E0', marginTop: 5 },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  separatorLine: { flex: 1, height: 1, backgroundColor: '#E0E0E0' },
  addButton: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 8 },
  addButtonText: { fontSize: 16, fontWeight: 'bold', color: '#7F57FF', marginLeft: 8 },
  teamCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    borderLeftWidth: 5,
    borderLeftColor: '#40E0D0',
    elevation: 2,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    alignItems: 'center',
  },
  teamTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  emptyText: { textAlign: 'center', fontSize: 16, color: '#999', marginTop: 20 },
});
