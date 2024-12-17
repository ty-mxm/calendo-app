import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../types';

type NavigationPropType = StackNavigationProp<RootStackParamList, 'Teams'>;

export default function AddTeamScreen() {
  const navigation = useNavigation<NavigationPropType>();

  const [teamName, setTeamName] = useState('');
  const [members, setMembers] = useState<string[]>([]);
  const [memberName, setMemberName] = useState('');

  // Ajouter un membre à l'équipe
  const handleAddMember = () => {
    if (memberName.trim()) {
      setMembers((prev) => [...prev, memberName]);
      setMemberName('');
    }
  };

  // Créer l'équipe et revenir à l'écran Teams
  const handleCreateTeam = () => {
    if (teamName.trim()) {
      // Naviguer vers Teams sans réinitialiser la pile
      navigation.navigate('Teams', { newTeam: teamName });
    }
  };

  useEffect(() => {
    console.log('Navigating to Teams...');
  }, [navigation]);

  return (
    <FlatList
      data={members}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={() => (
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Créer une nouvelle équipe</Text>
            <Text style={styles.headerSubtitle}>
              Saisis les informations pour ajouter ton équipe
            </Text>
          </View>

          {/* Formulaire Nom d'équipe */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>🏷️ Nom de l'équipe</Text>
            <TextInput
              style={styles.input}
              placeholder="Nom de l'équipe"
              placeholderTextColor="#999"
              value={teamName}
              onChangeText={setTeamName}
            />
          </View>

          {/* Ajouter des membres */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>👤 Ajouter des membres</Text>
            <View style={styles.memberInputContainer}>
              <TextInput
                style={styles.memberInput}
                placeholder="Nom du membre"
                placeholderTextColor="#999"
                value={memberName}
                onChangeText={setMemberName}
              />
              <TouchableOpacity style={styles.addButton} onPress={handleAddMember}>
                <Ionicons name="add-circle-outline" size={30} color="#7F57FF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Bouton Créer l'équipe */}
          <TouchableOpacity style={styles.createButton} onPress={handleCreateTeam}>
            <Text style={styles.createButtonText}>Créer l'équipe</Text>
          </TouchableOpacity>
        </>
      )}
      renderItem={({ item }) => (
        <View style={styles.memberItem}>
          <Text style={styles.memberText}>👤 {item}</Text>
        </View>
      )}
      ListEmptyComponent={<Text style={styles.emptyText}>Aucun membre ajouté</Text>}
      contentContainerStyle={{ paddingBottom: 80 }}
    />
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#7F57FF',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 16,
  },
  headerTitle: { fontSize: 26, fontWeight: 'bold', color: '#FFF' },
  headerSubtitle: { fontSize: 16, color: '#E0E0E0' },
  inputContainer: { marginHorizontal: 16, marginBottom: 16 },
  label: { fontSize: 16, fontWeight: 'bold', color: '#7F57FF', marginBottom: 8 },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    elevation: 2,
  },
  memberInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  memberInput: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    elevation: 2,
    marginRight: 8,
  },
  addButton: { alignItems: 'center', justifyContent: 'center' },
  createButton: {
    backgroundColor: '#7F57FF',
    paddingVertical: 15,
    borderRadius: 30,
    marginHorizontal: 16,
    marginTop: 20,
    alignItems: 'center',
    elevation: 3,
  },
  createButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  memberItem: {
    backgroundColor: '#FFF',
    padding: 12,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 2,
    borderLeftWidth: 5,
    borderLeftColor: '#87CEEB',
  },
  memberText: { fontSize: 16, color: '#333' },
  emptyText: { textAlign: 'center', fontSize: 16, color: '#999', marginTop: 10 },
});
