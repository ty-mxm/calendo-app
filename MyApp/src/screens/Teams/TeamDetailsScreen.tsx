import React, { useState } from 'react';
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
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../../types';

type TeamDetailsRouteProp = RouteProp<RootStackParamList, 'TeamDetails'>;

export default function TeamDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute<TeamDetailsRouteProp>();
  const { teamName } = route.params;

  const [members, setMembers] = useState<string[]>(['Sofia K', 'Yanis Y', 'Ty', 'Bri']);
  const [newMember, setNewMember] = useState<string>('');

  const addMember = () => {
    if (newMember.trim() === '') {
      Alert.alert('Erreur', 'Veuillez entrer un nom valide.');
      return;
    }
    setMembers([...members, newMember.trim()]);
    setNewMember('');
  };

  const removeMember = (name: string) => {
    Alert.alert(
      'Supprimer un membre',
      `Voulez-vous vraiment supprimer ${name} de l'équipe ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          onPress: () => setMembers(members.filter((member) => member !== name)),
        },
      ]
    );
  };

  const saveChanges = () => {
    // Enregistrer les modifications (exemple d'alerte)
    Alert.alert('Succès', 'Les changements ont été enregistrés.');
    // Si besoin, envoyer les données à une API
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Ionicons name="close" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>👥 {teamName}</Text>
        <Text style={styles.headerSubtitle}>Gérez les membres de votre équipe</Text>
      </View>

      {/* Add Member Input */}
      <View style={styles.inputContainer}>
        <Ionicons name="person-add" size={20} color="#7F57FF" />
        <TextInput
          style={styles.input}
          placeholder="Ajouter un membre"
          value={newMember}
          onChangeText={setNewMember}
        />
        <TouchableOpacity style={styles.addButton} onPress={addMember}>
          <Text style={styles.addButtonText}>Ajouter</Text>
        </TouchableOpacity>
      </View>

      {/* Members List */}
      <FlatList
        data={members}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.memberContainer}>
            <Text style={styles.memberName}>👤 {item}</Text>
            <TouchableOpacity onPress={() => removeMember(item)}>
              <Ionicons name="close-circle" size={24} color="#FF6C6C" />
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Aucun membre dans cette équipe.</Text>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Save Changes Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
          <Text style={styles.saveButtonText}>Enregistrer les changements</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#6A5ACD',
    marginBottom: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#DCDCDC',
    marginTop: 8,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    padding: 10,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  input: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#7F57FF',
    padding: 10,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  memberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    marginTop: 30,
    paddingHorizontal: 20,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFF',
  },
  saveButton: {
    backgroundColor: '#6A5ACD',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
