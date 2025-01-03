import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { ChoiceController } from '../controllers/ChoiceController';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../../../types';
import { Choice } from '../models/Choice';

type ChoiceScreenRouteProp = RouteProp<RootStackParamList, 'ChoiceScreen'>;

export default function ChoiceScreen() {
  const route = useRoute<ChoiceScreenRouteProp>();
  const { teamId } = route.params;

  const [choices, setChoices] = useState<Choice[]>([]);
  const [newChoice, setNewChoice] = useState<string>('');

  useEffect(() => {
    const fetchChoices = async () => {
      const fetchedChoices = await ChoiceController.getChoices(teamId);
      setChoices(fetchedChoices);
    };

    fetchChoices();
  }, [teamId]);

  const handleAddChoice = async () => {
    if (!newChoice.trim()) {
      alert('Veuillez entrer un nom valide.');
      return;
    }

    const addedChoice = await ChoiceController.addChoice(teamId, newChoice.trim());
    setChoices((prev) => [...prev, addedChoice]);
    setNewChoice('');
  };

  const handleVote = async (choiceId: string) => {
    await ChoiceController.voteForChoice(teamId, choiceId);
    setChoices((prev) =>
      prev.map((choice) =>
        choice.id === choiceId ? { ...choice, votes: choice.votes + 1 } : choice
      )
    );
  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choix de l'équipe</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ajouter un choix"
          value={newChoice}
          onChangeText={setNewChoice}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddChoice}>
          <Text style={styles.addButtonText}>Ajouter</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={choices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.choiceContainer}>
            <Text style={styles.choiceText}>{item.choice}</Text>
            <View style={styles.voteContainer}>
              <Text style={styles.voteCount}>{item.votes} votes</Text>
              <TouchableOpacity onPress={() => handleVote(item.id)}>
                <Text style={styles.voteButton}>Voter</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  inputContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ccc', padding: 10, marginRight: 10 },
  addButton: { padding: 10, backgroundColor: '#007BFF', borderRadius: 5 },
  addButtonText: { color: '#fff' },
  choiceContainer: { flexDirection: 'row', justifyContent: 'space-between', padding: 15, marginBottom: 10, backgroundColor: '#f9f9f9', borderRadius: 5 },
  choiceText: { fontSize: 16 },
  voteContainer: { flexDirection: 'row', alignItems: 'center' },
  voteCount: { marginRight: 10 },
  voteButton: { color: '#007BFF' },
});
