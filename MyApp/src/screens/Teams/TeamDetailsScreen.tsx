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
    Alert.alert('Succès', 'Les modifications ont été enregistrées.');
  };

  const navigateToBucketlists = () => {
    navigation.navigate('Bucketlists' as never);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Ionicons name="arrow-back" size={20} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{teamName}</Text>
      </View>

      {/* Add Member Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ajouter un membre"
          value={newMember}
          onChangeText={setNewMember}
          placeholderTextColor="#AAA"
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
        ListEmptyComponent={
          <Text style={styles.emptyText}>Aucun membre pour l'instant.</Text>
        }
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.bucketlistButton} onPress={navigateToBucketlists}>
          <Ionicons name="list-outline" size={18} color="#FFF" />
          <Text style={styles.footerButtonText}>Voir Bucketlists</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={saveChanges}>
          <Ionicons name="checkmark-outline" size={18} color="#FFF" />
          <Text style={styles.footerButtonText}>Enregistrer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    marginRight: 10,
    backgroundColor: '#6A5ACD',
    padding: 8,
    borderRadius: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#7F57FF',
    padding: 10,
    borderRadius: 8,
  },
  memberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 12,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  memberName: {
    fontSize: 16,
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    color: '#AAA',
    fontSize: 14,
    marginTop: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  bucketlistButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6A5ACD',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28A745',
    padding: 10,
    borderRadius: 8,
    flex: 1,
  },
  footerButtonText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#FFF',
    fontWeight: '600',
  },
});
