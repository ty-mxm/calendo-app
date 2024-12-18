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

// Typage des paramètres de la route
type TeamDetailsRouteProp = RouteProp<RootStackParamList, 'TeamDetails'>;

export default function TeamDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute<TeamDetailsRouteProp>();
  const { teamName } = route.params;

  // Liste des membres d'une équipe
  const [members, setMembers] = useState<string[]>(['Sofia K', 'Yanis Y', 'Ty', 'Bri']);
  const [newMember, setNewMember] = useState<string>('');

  // Ajouter un membre
  const addMember = () => {
    if (newMember.trim() === '') {
      Alert.alert('Erreur', 'Veuillez entrer un nom valide.');
      return;
    }
    setMembers([...members, newMember.trim()]);
    setNewMember('');
  };

  // Supprimer un membre
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

  // Enregistrer les modifications
  const saveChanges = () => {
    Alert.alert('Succès', 'Les modifications ont été enregistrées.');
    navigation.navigate('Teams' as never);
  };

  return (
    <View style={styles.container}>
      {/* En-tête */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.title}>👥 {teamName}</Text>
        <View style={{ width: 24 }} /> {/* Pour équilibrer */}
       
      </View>

      <Text style={styles.subtitle}>Gère les membres de cette équipe</Text>

      {/* Champ pour ajouter un membre */}
      <View style={styles.inputContainer}>
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

      {/* Liste des membres */}
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
      />

      {/* Bouton Enregistrer */}
      <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
        <Text style={styles.saveButtonText}>Enregistrer</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#7F57FF',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#40E0D0',
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
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  saveButton: {
    backgroundColor: '#7F57FF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 20,
    alignSelf: 'center',
    width: '50%',
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});