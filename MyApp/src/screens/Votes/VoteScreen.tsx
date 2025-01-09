import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { ChoiceController } from '../controllers/ChoiceController';
import { RootStackParamList } from '../../../types';

type VoteScreenRouteProp = RouteProp<RootStackParamList, 'VoteScreen'>;

export default function VoteScreen() {
  const navigation = useNavigation();
  const route = useRoute<VoteScreenRouteProp>();
  const { eventId } = route.params;

  const [choices, setChoices] = useState<{ choice: string; votes: number }[]>([
    { choice: 'Restaurant Milos', votes: 3 },
    { choice: 'Restaurant Le St-Urbain', votes: 5 },
    { choice: 'Restaurant Damas', votes: 2 },
  ]);

  useEffect(() => {
    const fetchChoices = async () => {
      const fetchedChoices = await ChoiceController.getChoices(eventId);
      setChoices((prevChoices) => {
        return fetchedChoices.length ? fetchedChoices : prevChoices;
      });
    };

    fetchChoices();
  }, [eventId]);

  const handleVote = async (choice: string) => {
    try {
      await ChoiceController.voteForChoice(eventId, choice);
      setChoices((prevChoices) =>
        prevChoices.map((item) =>
          item.choice === choice ? { ...item, votes: item.votes + 1 } : item
        )
      );
      navigation.navigate('EventDetails', { eventId });
    } catch (error) {
      alert('Erreur lors du vote. Veuillez réessayer.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Votez pour une option</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {choices.map((item) => (
          <View key={item.choice} style={styles.choiceCard}>
            <View>
              <Text style={styles.choiceText}>{item.choice}</Text>
              <Text style={styles.voteCount}>{item.votes} votes</Text>
            </View>
            <TouchableOpacity
              style={styles.voteButton}
              onPress={() => handleVote(item.choice)}
            >
              <Text style={styles.voteButtonText}>Voter</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    backgroundColor: '#7F57FF', // Same as the vote button color
    paddingVertical: 40, // Adjusted padding to account for camera notch
    paddingHorizontal: 16,
    alignItems: 'center',
    marginBottom: 20, // Removed rounded bottom effect
  },
  headerText: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingHorizontal: 16,
  },
  choiceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  choiceText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '500',
    marginBottom: 4,
  },
  voteCount: {
    fontSize: 14,
    color: '#666',
  },
  voteButton: {
    backgroundColor: '#6495ED',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  voteButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
