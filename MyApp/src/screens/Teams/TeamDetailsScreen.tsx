import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute, RouteProp } from '@react-navigation/native';
import { TeamController } from '../controllers/TeamController';
import { RootStackParamList } from '../../../types';

type TeamDetailsRouteProp = RouteProp<RootStackParamList, 'TeamDetails'>;

export default function TeamDetailsScreen() {
  const route = useRoute<TeamDetailsRouteProp>();
  const { teamName } = route.params;

  const [members, setMembers] = useState<string[]>([]);
  const [newMember, setNewMember] = useState<string>('');

  useEffect(() => {
    const fetchTeamMembers = async () => {
      const team = await TeamController.getTeamByName(teamName);
      if (team && team.members) {
        setMembers(team.members);
      } else {
        Alert.alert('Erreur', "L'équipe n'existe pas ou n'a pas de membres.");
      }
    };

    fetchTeamMembers();
  }, [teamName]);

  const addMember = async () => {
    if (newMember.trim() === '') {
      Alert.alert('Erreur', 'Veuillez entrer un nom valide.');
      return;
    }

    await TeamController.addMember(teamName, newMember.trim());
    setMembers((prev) => [...prev, newMember.trim()]);
    setNewMember('');
  };

  const removeMember = async (name: string) => {
    Alert.alert(
      'Supprimer un membre',
      `Voulez-vous vraiment supprimer ${name} de l'équipe ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          onPress: async () => {
            await TeamController.removeMember(teamName, name);
            setMembers((prev) => prev.filter((member) => member !== name));
          },
        },
      ]
    );
  };

  const saveChanges = async () => {
    try {
      await TeamController.saveTeamChanges(teamName, members);
      Alert.alert('Succès', 'Les modifications ont été enregistrées.');
    } catch (error) {
      Alert.alert('Erreur', "Impossible d'enregistrer les modifications.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{teamName}</Text>
      </View>

      {/* Add Member Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ajouter un membre"
          value={newMember}
          onChangeText={setNewMember}
        />
        <TouchableOpacity style={styles.addButton} onPress={addMember}>
          <Ionicons name="add" size={18} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Members List */}
      <FlatList
        data={members}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.memberContainer}>
            <Text style={styles.memberName}>{item}</Text>
            <TouchableOpacity onPress={() => removeMember(item)}>
              <Ionicons name="close-circle-outline" size={20} color="#FF6C6C" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Save Changes Button */}
      <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
        <Text style={styles.saveButtonText}>Enregistrer les changements</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { marginBottom: 20 },
  headerTitle: { fontSize: 24, fontWeight: 'bold' },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: { flex: 1, borderBottomWidth: 1, marginRight: 10 },
  addButton: { backgroundColor: '#7F57FF', padding: 10, borderRadius: 8 },
  memberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  memberName: { fontSize: 16 },
  saveButton: {
    backgroundColor: '#28A745',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
});