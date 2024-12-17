import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

export default function TeamDetailsScreen() {
  const [memberName, setMemberName] = useState('');
  const [members, setMembers] = useState(['Sofia K', 'Yanis Y', 'Ty', 'Bri']);
  const navigation = useNavigation();

  // Ajouter un membre
  const addMember = () => {
    if (memberName.trim()) {
      setMembers([...members, memberName]);
      setMemberName('');
    }
  };

  // Supprimer un membre
  const removeMember = (name: string) => {
    setMembers(members.filter((member) => member !== name));
  };

  return (
    <FlatList
      data={members}
      keyExtractor={(item) => item}
      ListHeaderComponent={() => (
        <>
          {/* En-tête stylisé */}
          <View style={styles.header}>
            <Text style={styles.title}>👥 Gérer l'équipe</Text>
            <Text style={styles.subtitle}>Ajoute ou retire des membres</Text>
          </View>

          {/* Champ d'entrée pour ajouter un membre */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nom du membre"
              value={memberName}
              onChangeText={setMemberName}
            />
            <TouchableOpacity style={styles.addButton} onPress={addMember}>
              <Text style={styles.addButtonText}>➕ Ajouter</Text>
            </TouchableOpacity>
          </View>

          {/* Séparateur */}
          <View style={styles.separatorLine} />
        </>
      )}
      renderItem={({ item }) => (
        <View style={styles.memberContainer}>
          <Text style={styles.memberName}>👤 {item}</Text>
          <TouchableOpacity onPress={() => removeMember(item)}>
        <Ionicons name="close-circle-outline" size={24} color="#FF6C6C" />
      </TouchableOpacity>
        </View>
      )}
      ListEmptyComponent={() => (
        <Text style={styles.emptyText}>Aucun membre dans l'équipe pour le moment.</Text>
      )}
      ListFooterComponent={() => (
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.confirmButtonText}>Confirmer</Text>
        </TouchableOpacity>
      )}
      contentContainerStyle={styles.contentContainer}
    />
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: '#F5F5F5',
  },
  header: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#7F57FF',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFF',
    borderColor: '#DDD',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#40E0D0',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    elevation: 2,
  },
  addButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 10,
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
  },
  memberName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  removeText: {
    color: '#FF6CB8',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
  confirmButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    elevation: 2,
  },
  confirmButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});