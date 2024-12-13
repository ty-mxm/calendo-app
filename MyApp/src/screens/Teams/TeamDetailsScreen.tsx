import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TeamDetailsScreen() {
  const [memberName, setMemberName] = useState('');
  const [members, setMembers] = useState(['Sofia K', 'Yanis Y', 'Ty M']);
  const navigation = useNavigation();

  const addMember = () => {
    if (memberName.trim()) {
      setMembers([...members, memberName]);
      setMemberName('');
    }
  };

  const removeMember = (name: string) => {
    setMembers(members.filter((member) => member !== name));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Manage Team Members</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter member's name"
        value={memberName}
        onChangeText={setMemberName}
      />

      <TouchableOpacity style={styles.addButton} onPress={addMember}>
        <Text style={styles.addButtonText}>Add Member</Text>
      </TouchableOpacity>

      <FlatList
        data={members}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.memberContainer}>
            <Text style={styles.memberName}>{item}</Text>
            <TouchableOpacity onPress={() => removeMember(item)}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity
        style={styles.confirmButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.confirmButtonText}>Confirm</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#FFF',
    borderColor: '#D3D3D3',
    borderWidth: 1,
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    fontSize: 16,
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', // Nouvelle syntaxe
  },
  addButton: {
    backgroundColor: '#40E0D0',
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 20,
    alignItems: 'center',
    boxShadow: '0px 2px 5px rgba(64, 224, 208, 0.4)', // Nouvelle syntaxe
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  memberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginBottom: 10,
    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', // Nouvelle syntaxe
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
  confirmButton: {
    backgroundColor: '#FFA500',
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 20,
    alignItems: 'center',
    boxShadow: '0px 2px 5px rgba(255, 165, 0, 0.4)', // Nouvelle syntaxe
  },
  confirmButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
