import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

// Définition des paramètres de navigation
type RootStackParamList = {
  Teams: { newTeam: string };
  TeamDetails: { teamName: string };
};

export default function AddTeamScreen() {
  const [teamName, setTeamName] = useState('');
  const [members, setMembers] = useState<string[]>([]);
  const [memberName, setMemberName] = useState('');
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Ajouter un membre à l'équipe
  const handleAddMember = () => {
    if (memberName.trim()) {
      setMembers((prev) => [...prev, memberName]);
      setMemberName('');
    }
  };

  // Créer l'équipe et naviguer vers Teams
  const handleCreateTeam = () => {
    if (teamName.trim()) {
      console.log(`Nouvelle équipe ajoutée: ${teamName} avec membres: ${members.join(', ')}`);
      navigation.navigate('Teams', { newTeam: teamName }); // Passe le nom de l'équipe
      setTeamName('');
      setMembers([]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Créer une nouvelle équipe</Text>
      <Text style={styles.subtitle}>Saisis le nom de ton équipe pour commencer</Text>

      {/* Nom de l'équipe */}
      <TextInput
        style={styles.input}
        placeholder="Nom de l'équipe"
        placeholderTextColor="#999"
        value={teamName}
        onChangeText={setTeamName}
      />

      {/* Ajouter des membres */}
      <Text style={styles.sectionTitle}>Ajouter des membres</Text>
      <View style={styles.memberInputContainer}>
        <TextInput
          style={styles.memberInput}
          placeholder="Nom du membre"
          placeholderTextColor="#999"
          value={memberName}
          onChangeText={setMemberName}
        />
        <TouchableOpacity style={styles.addMemberButton} onPress={handleAddMember}>
          <Text style={styles.addMemberButtonText}>Ajouter</Text>
        </TouchableOpacity>
      </View>

      {/* Liste des membres */}
      <FlatList
        data={members}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.memberItem}>
            <Text style={styles.memberText}>👤 {item}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Aucun membre ajouté</Text>}
      />

      {/* Bouton Créer l'équipe */}
      <TouchableOpacity style={styles.createButton} onPress={handleCreateTeam}>
        <Text style={styles.createButtonText}>Créer l'équipe</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', padding: 20, justifyContent: 'center' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#333', marginBottom: 10, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#666', marginBottom: 20, textAlign: 'center' },
  input: {
    backgroundColor: '#FFF',
    borderColor: '#D3D3D3',
    borderWidth: 1,
    padding: 15,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 20,
    width: '100%',
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  memberInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  memberInput: {
    flex: 1,
    backgroundColor: '#FFF',
    borderColor: '#D3D3D3',
    borderWidth: 1,
    padding: 10,
    borderRadius: 12,
    fontSize: 16,
    marginRight: 10,
    elevation: 3,
  },
  addMemberButton: {
    backgroundColor: '#7F57FF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    elevation: 3,
  },
  addMemberButtonText: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
  memberItem: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
    elevation: 2,
  },
  memberText: { fontSize: 16, color: '#333' },
  emptyText: { textAlign: 'center', fontSize: 14, color: '#999', marginBottom: 10 },
  createButton: {
    backgroundColor: '#40E0D0',
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    elevation: 3,
    marginTop: 20,
  },
  createButtonText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
});
