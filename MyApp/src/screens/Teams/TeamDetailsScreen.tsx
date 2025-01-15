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
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { TeamController } from '../controllers/TeamController';
import { RootStackParamList } from '../../../types';

type TeamDetailsRouteProp = RouteProp<RootStackParamList, 'TeamDetails'>;

export default function TeamDetailsScreen() {
  const route = useRoute<TeamDetailsRouteProp>();
  const navigation = useNavigation();
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

  const navigateToBucketlists = () => {
    navigation.navigate('Bucketlists' as never);
  };

  return (
    <View style={styles.container}>
     
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={28} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{teamName}</Text>
      </View>


      <View style={styles.content}>
    
        <View style={styles.inputContainer}>
          <Ionicons
            name="person-add-outline"
            size={20}
            color="#7F57FF"
            style={styles.icon}
          />
          <TextInput
            style={styles.input}
            placeholder="Ajouter un membre"
            placeholderTextColor="#AAA"
            value={newMember}
            onChangeText={setNewMember}
          />
          <TouchableOpacity style={styles.addButton} onPress={addMember}>
            <Ionicons name="add" size={18} color="#FFF" />
          </TouchableOpacity>
        </View>

        
        <FlatList
          data={members}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.memberContainer}>
              <Text style={styles.memberName}>{item}</Text>
              <TouchableOpacity onPress={() => removeMember(item)}>
                <Ionicons name="close-outline" size={24} color="#333" />
              </TouchableOpacity>
            </View>
          )}
        />

       
        <TouchableOpacity
          style={styles.bucketlistButton}
          onPress={navigateToBucketlists}
        >
          <Ionicons name="list" size={20} color="#FFF" />
          <Text style={styles.bucketlistButtonText}>Voir la bucketlist</Text>
        </TouchableOpacity>

      
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
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7F57FF',
    paddingVertical: 40,
    marginBottom: 20,
  },
  backButton: {
    marginLeft: 20,
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#7F57FF',
    padding: 10,
    borderRadius: 8,
  },
  memberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  bucketlistButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7F57FF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  bucketlistButtonText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    backgroundColor: '#6495ED',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
