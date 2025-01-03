import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { ChoiceController } from '../controllers/ChoiceController';
import { RootStackParamList } from '../../../types';

type VoteScreenRouteProp = RouteProp<RootStackParamList, 'VoteScreen'>;

export default function VoteScreen() {
  const navigation = useNavigation(); // Hook pour la navigation
  const route = useRoute<VoteScreenRouteProp>();
  const { eventId } = route.params;

  const [choices, setChoices] = useState<{ choice: string; votes: number }[]>([
    { choice: 'Restaurant Mexicain', votes: 3 },
    { choice: 'Restaurant Chinois', votes: 5 },
    { choice: 'Restaurant Vietnamien', votes: 2 },
  ]);

  useEffect(() => {
    const fetchChoices = async () => {
      // Simule un appel API pour récupérer les choix
      const fetchedChoices = await ChoiceController.getChoices(eventId);
      setChoices((prevChoices) => {
        return fetchedChoices.length ? fetchedChoices : prevChoices;
      });
    };

    fetchChoices();
  }, [eventId]);

  const handleVote = async (choice: string) => {
    try {
      // Simule un vote
      await ChoiceController.voteForChoice(eventId, choice);

      // Met à jour localement les votes
      setChoices((prevChoices) =>
        prevChoices.map((item) =>
          item.choice === choice ? { ...item, votes: item.votes + 1 } : item
        )
      );

      // Navigue vers EventDetails après le vote
      navigation.navigate('EventDetails', { eventId });
    } catch (error) {
      alert('Erreur lors du vote. Veuillez réessayer.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Votez pour une option</Text>
      {choices.map((item) => (
        <View key={item.choice} style={styles.choiceContainer}>
          <Text style={styles.choiceText}>{item.choice}</Text>
          <Text style={styles.voteCount}>{item.votes} votes</Text>
          <TouchableOpacity
            style={styles.voteButton}
            onPress={() => handleVote(item.choice)}
          >
            <Text style={styles.voteButtonText}>Voter</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  choiceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  choiceText: { fontSize: 16, color: '#333' },
  voteCount: { fontSize: 14, color: '#666' },
  voteButton: { backgroundColor: '#6A5ACD', padding: 10, borderRadius: 8 },
  voteButtonText: { color: '#FFF', fontWeight: 'bold' },
});
